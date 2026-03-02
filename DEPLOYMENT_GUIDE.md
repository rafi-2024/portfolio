# Portfolio Website - Deployment Guide

Complete setup guide for the portfolio website with PostgreSQL, Docker, and n8n integration.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start (Development)](#quick-start-development)
3. [Project Structure](#project-structure)
4. [Development Setup](#development-setup)
5. [Production Deployment](#production-deployment)
6. [Database Management](#database-management)
7. [n8n Workflow Setup](#n8n-workflow-setup)
8. [Troubleshooting](#troubleshooting)
9. [Available Scripts](#available-scripts)

---

## Prerequisites

### Required Software

- **Node.js** 20.x or higher
- **npm** or **yarn**
- **Docker** and **Docker Compose**
- **PostgreSQL** client tools (optional, for local development)

### Required Accounts (for n8n email)

- Gmail account (or SMTP credentials from SendGrid, Mailgun, etc.)

---

## Quick Start (Development)

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd personalwebsite

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start Docker services (PostgreSQL + n8n)
npm run docker:dev

# 5. Wait for services to start (30 seconds), then initialize database
npm run prisma:migrate

# 6. Generate Prisma Client
npm run prisma:generate

# 7. Start Next.js development server
npm run dev

# 8. Set up n8n workflow (see N8N_WORKFLOW_GUIDE.md)
# Visit http://localhost:5678 and follow the guide

# 9. Open the application
# Visit http://localhost:3000
```

---

## Project Structure

```
personalwebsite/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts         # Contact form API endpoint
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ContactSection.tsx       # Contact form component
│   │   └── ...
│   └── lib/
│       └── prisma.ts                # Prisma client singleton
├── prisma/
│   └── schema.prisma                # Database schema
├── scripts/
│   ├── init-db.sh                   # Database initialization (Linux/Mac)
│   └── init-db.ps1                  # Database initialization (Windows)
├── docker-compose.yml               # Development Docker configuration
├── docker-compose.prod.yml          # Production Docker configuration
├── Dockerfile                       # Multi-stage Docker build
├── .env.local                       # Local development environment
├── .env.production                  # Production environment (create from .env.production.example)
└── N8N_WORKFLOW_GUIDE.md           # n8n setup instructions
```

---

## Development Setup

### Step 1: Environment Configuration

Create `.env.local` from the example:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Database Configuration (Local Development)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/portfolio_db?schema=public"

# n8n Webhook URL
N8N_WEBHOOK_URL="http://localhost:5678/webhook/contact-form"

# Next.js Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### Step 2: Start Docker Services

```bash
# Start PostgreSQL and n8n
npm run docker:dev

# View logs
npm run docker:dev:logs

# Check running containers
docker ps
```

**Expected output:**
- `portfolio-postgres` on port 5432
- `portfolio-n8n` on port 5678
- `portfolio-app` on port 3000 (if using full Docker dev setup)

### Step 3: Database Setup

```bash
# Run migrations to create tables
npm run prisma:migrate

# Generate Prisma Client
npm run prisma:generate

# (Optional) Open Prisma Studio to view database
npm run prisma:studio
```

### Step 4: n8n Workflow Setup

1. Open http://localhost:5678
2. Create account / login
3. Follow [N8N_WORKFLOW_GUIDE.md](./N8N_WORKFLOW_GUIDE.md) to create the workflow
4. Activate the workflow

### Step 5: Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

---

## Production Deployment

### Step 1: Production Environment

Create `.env.production`:

```bash
cp .env.production.example .env.production
```

**Important:** Update all passwords and secrets!

```env
# PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=CHANGE_THIS_SECURE_PASSWORD
POSTGRES_DB=portfolio_db

# n8n
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=CHANGE_THIS_SECURE_PASSWORD

# Application
DATABASE_URL=postgresql://postgres:CHANGE_THIS_SECURE_PASSWORD@postgres:5432/portfolio_db?schema=public
```

### Step 2: Build and Deploy

```bash
# Build production images
npm run docker:prod:build

# View logs
npm run docker:prod:logs

# Check status
docker ps
```

### Step 3: Initialize Production Database

```bash
# Enter the app container
docker exec -it portfolio-app-prod sh

# Run migrations
npx prisma migrate deploy

# Exit container
exit
```

### Step 4: Configure n8n Production

1. Access n8n at http://your-domain:5678
2. Login with credentials from `.env.production`
3. Import workflow from `n8n-workflows/contact-form-notification.json`
4. Update webhook URL to production domain
5. Activate workflow

### Step 5: SSL/TLS (Recommended)

Use a reverse proxy (nginx, Caddy, Traefik) for HTTPS:

```nginx
# Example nginx configuration
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## Database Management

### Prisma Commands

```bash
# Create a new migration
npm run prisma:migrate

# Deploy migrations (production)
npm run prisma:migrate:deploy

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Push schema changes without migration
npm run prisma:push

# Reset database (WARNING: deletes all data)
npm run prisma:reset

# Generate Prisma Client
npm run prisma:generate
```

### Direct Database Access

```bash
# Connect to PostgreSQL (development)
docker exec -it portfolio-postgres psql -U postgres -d portfolio_db

# View contact messages
SELECT * FROM contact_messages;

# Count messages
SELECT status, COUNT(*) FROM contact_messages GROUP BY status;
```

### Backup Database

```bash
# Backup (development)
docker exec portfolio-postgres pg_dump -U postgres portfolio_db > backup.sql

# Restore
docker exec -i portfolio-postgres psql -U postgres portfolio_db < backup.sql

# Backup production
docker exec portfolio-postgres-prod pg_dump -U postgres portfolio_db > backup-prod.sql
```

---

## n8n Workflow Setup

See detailed guide: [N8N_WORKFLOW_GUIDE.md](./N8N_WORKFLOW_GUIDE.md)

**Quick Summary:**

1. Access n8n UI: http://localhost:5678
2. Create new workflow
3. Add **Webhook** node (path: `contact-form`)
4. Add **Gmail** or **SMTP Email** node
5. Configure email template with form data
6. Test with sample request
7. Activate workflow
8. Export and save to `n8n-workflows/`

---

## Troubleshooting

### Database Connection Failed

```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Check logs
docker logs portfolio-postgres

# Restart PostgreSQL
docker restart portfolio-postgres

# Verify connection
docker exec portfolio-postgres pg_isready -U postgres
```

### n8n Webhook Not Working

```bash
# Check n8n logs
docker logs portfolio-n8n

# Verify webhook URL in .env.local
echo $N8N_WEBHOOK_URL

# Test webhook manually
curl -X POST http://localhost:5678/webhook/contact-form \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'
```

### Prisma Client Issues

```bash
# Regenerate Prisma Client
npm run prisma:generate

# Clear Prisma cache
rm -rf node_modules/.prisma
rm -rf src/generated/prisma

# Reinstall
npm install
npm run prisma:generate
```

### Docker Issues

```bash
# Clean everything and restart
npm run docker:clean
docker system prune -a
npm run docker:dev:build

# Check disk space
docker system df

# Remove unused volumes
docker volume prune
```

### Port Already in Use

```powershell
# Windows - Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID <PID> /F

# Or use different ports in docker-compose.yml
```

```bash
# Linux/Mac - Find and kill process
lsof -ti:3000 | xargs kill -9
```

---

## Available Scripts

### Development

```bash
npm run dev                    # Start Next.js dev server
npm run docker:dev             # Start Docker services
npm run docker:dev:build       # Rebuild and start Docker services
npm run docker:dev:down        # Stop Docker services
npm run docker:dev:logs        # View Docker logs
```

### Database

```bash
npm run prisma:generate        # Generate Prisma Client
npm run prisma:migrate         # Run migrations (dev)
npm run prisma:migrate:deploy  # Deploy migrations (prod)
npm run prisma:studio          # Open Prisma Studio
npm run prisma:push            # Push schema changes
npm run prisma:reset           # Reset database
npm run db:init                # Initialize database (Windows)
npm run db:init:bash           # Initialize database (Linux/Mac)
```

### Production

```bash
npm run build                  # Build Next.js app
npm run start                  # Start production server
npm run docker:prod            # Start production Docker stack
npm run docker:prod:build      # Build and start production
npm run docker:prod:down       # Stop production stack
npm run docker:prod:logs       # View production logs
```

### Maintenance

```bash
npm run lint                   # Lint code
npm run docker:clean           # Remove all Docker volumes and containers
```

---

## Security Checklist

### Before Production

- [ ] Change all default passwords in `.env.production`
- [ ] Enable n8n basic authentication
- [ ] Set up SSL/TLS certificates
- [ ] Configure firewall rules
- [ ] Restrict PostgreSQL access
- [ ] Enable database backups
- [ ] Review and update CORS settings
- [ ] Implement rate limiting on API routes
- [ ] Add input sanitization (already implemented)
- [ ] Set up monitoring and logging
- [ ] Configure email SPF/DKIM records

---

## Support

For issues or questions:

1. Check [Troubleshooting](#troubleshooting) section
2. Review logs: `npm run docker:dev:logs`
3. Check n8n documentation: https://docs.n8n.io/
4. Check Prisma documentation: https://www.prisma.io/docs/

---

## License

[Your License Here]

---

**Last Updated:** March 2026
