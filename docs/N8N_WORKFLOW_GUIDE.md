# n8n Workflow Setup Guide

This guide explains how to set up the n8n workflow to handle contact form submissions and send email notifications.

## Routing Note

- The n8n integration is triggered by the backend API endpoint `/api/contact`.
- UI navigation is now path-based (for example: `/about`, `/services`, `/contact`) instead of hash navigation.
- This routing change does not alter webhook behavior as long as `N8N_WEBHOOK_URL` is configured correctly.

## Prerequisites

- Docker and Docker Compose installed
- SMTP credentials for sending emails (Gmail, SendGrid, Mailgun, etc.)

## Step 1: Start the Services

Start all services including n8n:

```bash
# Development
docker-compose up -d

# Production
docker compose --env-file .env.production -f docker-compose.prod.yml up -d
```

## Step 2: Access n8n Interface

1. Open your browser and navigate to:
   - Development: `http://localhost:5678`
   - Production: `http://localhost:5678` (or your configured domain)

2. **First-time setup:**
   - Create an admin account (email + password)
   - Set up your workspace

3. **Production:** Use the credentials from your `.env.production`:
   - Username: `N8N_BASIC_AUTH_USER`
   - Password: `N8N_BASIC_AUTH_PASSWORD`

## Step 3: Create the Contact Form Workflow

### 3.1. Create New Workflow

1. Click **"New Workflow"** in the n8n interface
2. Name it: **"Contact Form Email Notification"**

### 3.2. Add Webhook Trigger Node

1. Click the **"+"** button
2. Search for **"Webhook"** and select it
3. Configure the webhook:
   - **HTTP Method**: `POST`
   - **Path**: `contact-form`
   - **Response Mode**: `Last Node`
   - **Response Data**: `First Entry JSON`

4. The webhook URL will be: `http://localhost:5678/webhook/contact-form`
5. Make sure this matches your `.env.local` or `.env.production` `N8N_WEBHOOK_URL`

### 3.3. Add Email Send Node

1. Click **"+"** after the Webhook node
2. Search for **"Send Email"** or **"Gmail"** (or your preferred email service)

#### Option A: Gmail (Recommended for testing)

1. Select **"Gmail"** node
2. Click **"Connect my account"** and authenticate with Google
3. Configure the email:

   ```
   From: your-email@gmail.com
   To: your-email@gmail.com (where you want to receive notifications)
   Subject: New Contact Form Submission from {{ $json.name }}
   
   Body (HTML):
   <h2>New Contact Form Submission</h2>
   <p><strong>Name:</strong> {{ $json.name }}</p>
   <p><strong>Email:</strong> {{ $json.email }}</p>
   <p><strong>Subject:</strong> {{ $json.subject }}</p>
   <p><strong>Message:</strong></p>
   <p>{{ $json.message }}</p>
   <hr>
   <p><small>Submitted at: {{ $json.createdAt }}</small></p>
   <p><small>Message ID: {{ $json.id }}</small></p>
   ```

#### Option B: SMTP (For custom email servers)

1. Select **"Send Email"** node
2. Create new credentials:
   - **SMTP Host**: your-smtp-server.com
   - **Port**: 587 (or 465 for SSL)
   - **Secure**: Yes
   - **User**: your-smtp-username
   - **Password**: your-smtp-password

3. Configure the email (same template as Gmail above)

#### Option C: SendGrid / Mailgun / AWS SES

Similar setup - search for your preferred email service in n8n and connect it.

### 3.4. Add Response Node (Optional)

1. Click **"+"** after the Email node
2. Search for **"Respond to Webhook"**
3. Configure:
   ```json
   {
     "success": true,
     "message": "Email notification sent"
   }
   ```

### 3.5. Add Error Handling (Recommended)

1. Right-click on the canvas
2. Select **"Add Error Workflow"**
3. Add a **"Send Email"** node to notify you of failures
4. Configure to send error details to your admin email

## Step 4: Test the Workflow

### 4.1. Test Webhook

1. Click **"Execute Workflow"** in n8n (top right)
2. The workflow will wait for incoming requests

3. Test using curl:

```bash
curl -X POST http://localhost:5678/webhook/contact-form \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test-123",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test Subject",
    "message": "This is a test message",
    "createdAt": "2024-01-01T12:00:00Z"
  }'
```

4. Check your email inbox for the notification

### 4.2. Test via Contact Form

1. Make sure your Next.js app is running
2. Navigate to `http://localhost:3000/contact`
3. Fill out and submit the contact form
4. Verify:
   - Form submission succeeds
   - Email arrives in your inbox
   - Database entry is created (check Prisma Studio: `npx prisma studio`)

## Step 5: Activate the Workflow

1. Click **"Inactive"** toggle in the top right
2. Change to **"Active"**
3. The workflow will now run automatically on every webhook call

## Step 6: Export Workflow (Version Control)

1. Click the **"⋮"** menu (top right)
2. Select **"Export"**
3. Save the JSON file to: `n8n-workflows/contact-form-notification.json`
4. Commit to your repository

## Advanced Configuration

### Auto-Reply to Contact Form Submitter

Add another email node after the first one:

```
To: {{ $json.email }}
Subject: Thank you for contacting me!

<h2>Thank you for reaching out!</h2>
<p>Hi {{ $json.name }},</p>
<p>I've received your message and will get back to you as soon as possible.</p>
<p>Your message:</p>
<blockquote>{{ $json.message }}</blockquote>
<br>
<p>Best regards,<br>Your Name</p>
```

### Slack Notification

1. Add **"Slack"** node
2. Connect Slack workspace
3. Send notification to a channel:
   ```
   Channel: #contact-forms
   Message: New contact from *{{ $json.name }}* ({{ $json.email }})
   Subject: {{ $json.subject }}
   ```

### Multi-Channel Notifications

Branch the workflow:
- Email → Sends to your inbox
- Slack → Notifies team channel
- Discord → Posts to Discord server
- SMS → Twilio notification (for urgent messages)

## Troubleshooting

### Webhook not receiving data
- Check `N8N_WEBHOOK_URL` in your `.env` file
- Ensure n8n container is running: `docker ps`
- Check n8n logs: `docker logs portfolio-n8n`

### Emails not sending
- Verify SMTP credentials
- Check Gmail "Less secure app access" settings
- Test email node manually in n8n
- Check n8n execution logs

### Workflow not activating
- Ensure webhook node is properly configured
- Check for errors in the workflow
- Verify all required credentials are set

## Security Considerations

### Production Setup

1. **Enable Basic Auth** (already configured in docker-compose.prod.yml)
2. **Use HTTPS** for webhook URLs (configure reverse proxy)
3. **Whitelist IPs** (restrict webhook access)
4. **Secure credentials** (use environment variables)
5. **Rate limiting** (add rate limit node)

### Example: Add Rate Limiting

1. Add **"Function"** node before email
2. Check submission rate:
   ```javascript
   const redis = $input.item.json;
   const email = redis.email;
   // Implement rate limiting logic
   return $input.item;
   ```

## Maintenance

### Regular Tasks

- Monitor n8n execution logs
- Check failed workflow runs
- Update n8n image: `docker-compose pull n8n`
- Backup n8n data: `docker volume backup`
- Review and optimize workflows quarterly

### Logs and Monitoring

```bash
# View n8n logs
docker logs -f portfolio-n8n

# View app logs
docker logs -f portfolio-app

# Check workflow execution history
# Access n8n UI → Executions tab
```

## Resources

- [n8n Documentation](https://docs.n8n.io/)
- [n8n Community](https://community.n8n.io/)
- [Webhook Trigger Guide](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
- [Email Nodes Documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.emailsend/)
