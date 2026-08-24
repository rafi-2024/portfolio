import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: 'Application is healthy',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
