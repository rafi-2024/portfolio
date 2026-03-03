# Quick Start Guide

## Prerequisites Setup

Before running the application, ensure you have the following installed and running:

### 1. Install Required Software

#### Docker Desktop (Required)
- **Windows**: Download from https://www.docker.com/products/docker-desktop/
- **Mac**: Download from https://www.docker.com/products/docker-desktop/
- **Linux**: Install Docker Engine and Docker Compose

**After Installation:**
1. Start Docker Desktop application
2. Ensure Docker is running (check system tray/menu bar)
3. Verify installation:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Node.js (Required)
- Download from https://nodejs.org/ (v20.x or higher)
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### 2. First-Time Setup

```bash
# Step 1: Install dependencies
npm install

# Step 2: Copy environment variables
cp .env.example .env.local

# Step 3: Start Docker Desktop (if not already running)
# Check: Docker icon in system tray should show "running"

# Step 4: Start PostgreSQL and n8n
npm run docker:dev

# Step 5: Wait 30 seconds for services to start, then initialize database
npm run prisma:migrate

# Step 6: Generate Prisma Client
npm run prisma:generate

# Step 7: Start development server
npm run dev
```

### 3. Access the Application

- **Website**: http://localhost:3000
- **n8n Workflow**: http://localhost:5678 (for email automation setup)
- **Prisma Studio**: Run `npm run prisma:studio` then visit http://localhost:5555

### 4. Set Up n8n Email Notifications

Follow the detailed guide: [N8N_WORKFLOW_GUIDE.md](./N8N_WORKFLOW_GUIDE.md)

**Quick steps:**
1. Open http://localhost:5678
2. Create an account
3. Create new workflow
4. Add Webhook node (path: `contact-form`)
5. Add Gmail node (or SMTP)
6. Connect and configure email template
7. Activate workflow

### 5. Test the Contact Form

1. Navigate to http://localhost:3000/contact
2. Fill out the form
3. Submit
4. Check:
   - Form shows success message
   - Email arrives in your inbox
   - Database entry created (view in Prisma Studio)

### 6. Verify Multi-Page Navigation

Open these routes to confirm section pages are accessible:

- http://localhost:3000/about
- http://localhost:3000/skills
- http://localhost:3000/services
- http://localhost:3000/projects
- http://localhost:3000/experience
- http://localhost:3000/certifications
- http://localhost:3000/contact

---

## Troubleshooting

### Docker Not Running
**Error**: `Cannot connect to Docker daemon`

**Solution**: 
- Windows: Open Docker Desktop from Start Menu
- Mac: Open Docker from Applications
- Wait for Docker to fully start (icon shows "running")

### Port Already in Use
**Error**: `Port 3000/5432/5678 already in use`

**Solution**:
```powershell
# Windows - Find and kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database Connection Failed
**Error**: `Can't reach database server`

**Solution**:
```bash
# Check if PostgreSQL container is running
docker ps

# Restart PostgreSQL
docker restart portfolio-postgres

# Check logs
docker logs portfolio-postgres
```

### Prisma Client Not Generated
**Error**: `@prisma/client not found`

**Solution**:
```bash
npm run prisma:generate
```

---

## Daily Development Workflow

```bash
# 1. Start Docker services (if not already running)
npm run docker:dev

# 2. Start development server
npm run dev

# 3. Work on your code...

# 4. When done, optionally stop Docker
npm run docker:dev:down
```

---

## Need More Help?

- **Full Documentation**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **n8n Setup**: See [N8N_WORKFLOW_GUIDE.md](./N8N_WORKFLOW_GUIDE.md)
- **Database Issues**: Run `npm run prisma:studio` to inspect database
- **Docker Issues**: Run `docker-compose logs` to view logs

---

**Ready to start?** Run `npm install` and follow the setup steps above!
