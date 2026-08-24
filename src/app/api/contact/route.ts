import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const FIELD_LIMITS = {
  name: 100,
  email: 320,
  subject: 200,
  message: 10_000,
} as const;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toContactPayload(data: Record<string, unknown>): ContactPayload | null {
  const { name, email, subject, message } = data;

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof subject !== 'string' ||
    typeof message !== 'string'
  ) {
    return null;
  }

  return {
    name,
    email,
    subject,
    message,
  };
}

// Validation helper
function validateContactData(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!isObject(data)) {
    return {
      valid: false,
      errors: ['Invalid payload'],
    };
  }

  const name = data.name;
  const email = data.email;
  const subject = data.subject;
  const message = data.message;

  if (
    !name ||
    typeof name !== 'string' ||
    name.trim().length < 2 ||
    name.trim().length > FIELD_LIMITS.name
  ) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!email || typeof email !== 'string' || email.trim().length > FIELD_LIMITS.email) {
    errors.push('Valid email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Invalid email format');
    }
  }

  if (
    !subject ||
    typeof subject !== 'string' ||
    subject.trim().length < 5 ||
    subject.trim().length > FIELD_LIMITS.subject
  ) {
    errors.push('Subject must be at least 5 characters long');
  }

  if (
    !message ||
    typeof message !== 'string' ||
    message.trim().length < 10 ||
    message.trim().length > FIELD_LIMITS.message
  ) {
    errors.push('Message must be at least 10 characters long');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Trigger n8n webhook
async function triggerN8nWebhook(contactData: ContactPayload & { id: string; createdAt: Date }) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('N8N_WEBHOOK_URL not configured, skipping webhook trigger');
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      console.error('n8n webhook failed:', response.status, response.statusText);
    } else {
      console.log('n8n webhook triggered successfully');
    }
  } catch (error) {
    console.error('Error triggering n8n webhook:', error);
    // Don't throw - we don't want to fail the request if webhook fails
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: unknown = await request.json();
    if (!isObject(body)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request payload.',
        },
        { status: 400 }
      );
    }


    // Validate input
    const validation = validateContactData(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const typedBody = toContactPayload(body);
    if (!typedBody) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request payload.',
        },
        { status: 400 }
      );
    }

    // Sanitize and prepare data
    const contactData = {
      name: typedBody.name.trim(),
      email: typedBody.email.trim().toLowerCase(),
      subject: typedBody.subject.trim(),
      message: typedBody.message.trim(),
    };

    // Save to database
    let savedMessage;
    try {
      savedMessage = await prisma.contactMessage.create({
        data: contactData,
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        {
          success: false,
          message: 'Database error. Please try again later.',
        },
        { status: 503 }
      );
    }

    // Trigger n8n webhook (non-blocking)
    triggerN8nWebhook({
      ...contactData,
      id: savedMessage.id,
      createdAt: savedMessage.createdAt,
    }).catch((error) => {
      console.error('Webhook trigger failed:', error);
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully! I will get back to you soon.',
        data: {
          id: savedMessage.id,
          createdAt: savedMessage.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);

    // Check for JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request format. Please ensure you are sending valid JSON.',
        },
        { status: 400 }
      );
    }

    // Check for Prisma-specific errors
    if (error instanceof Error) {
      if (error.message.includes('Prisma')) {
        return NextResponse.json(
          {
            success: false,
            message: 'Database connection error. Please try again later.',
          },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        success: true,
        message: 'Contact API is healthy',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Database connection failed',
      },
      { status: 503 }
    );
  }
}
