# Portfolio Website

A modern, full-stack portfolio website built with Next.js 15, featuring a contact form with PostgreSQL database, Docker containerization, and automated email notifications via n8n.

## ✨ Features

- 🎨 **Modern UI**: Built with Material-UI and Framer Motion animations
- 📧 **Contact Form**: Fully functional contact form with database persistence
- 🗄️ **PostgreSQL Database**: Contact message storage with Prisma ORM
- 🐳 **Docker Ready**: Complete containerization with Docker Compose
- 🔔 **Email Notifications**: Automated workflows via n8n integration
- 🎯 **Type Safe**: Full TypeScript implementation
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- ⚡ **Next.js 15**: Built with the latest Next.js features and Turbopack

## 📝 Recent Updates (2026-03-03)

- ✅ Switched from mixed hash/path navigation to dedicated path-based routes
- ✅ Added section pages: `/about`, `/skills`, `/services`, `/projects`, `/experience`, `/certifications`, `/contact`
- ✅ Unified header/footer navigation with shared route config (`src/lib/siteNavigation.ts`)
- ✅ Fixed global theme toggling so full-page theme updates across all routes
- ✅ Enhanced Services content for international clients (timezone-friendly delivery, milestone-based execution, documentation handoff)
- ✅ Updated documentation to match the new route architecture

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.5.23 with React 19
- **UI Library**: Material-UI (MUI) 7.3.8
- **Styling**: Tailwind CSS 3.4.1 + Emotion
- **Animations**: Framer Motion 12.34.3
- **Icons**: MUI Icons + React Icons

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL 16
- **ORM**: Prisma 6.19.2
- **Automation**: n8n (workflow engine)

### DevOps
- **Containerization**: Docker & Docker Compose
- **Development**: Turbopack (Next.js 15)
- **Type Checking**: TypeScript 5

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.x or higher
- **Docker Desktop** (for database and n8n)
- **npm** or **yarn**

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd personalwebsite

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Start Docker services (PostgreSQL + n8n)
npm run docker:dev

# 5. Initialize database
npm run prisma:migrate
npm run prisma:generate

# 6. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### First-Time Setup

For detailed first-time setup instructions, see the **[Quick Start Guide](docs/QUICKSTART.md)**.

## 📚 Documentation

Comprehensive documentation is available in the [docs](docs/) directory:

| Document | Description |
|----------|-------------|
| **[Quick Start Guide](docs/QUICKSTART.md)** | Fast setup for first-time users with troubleshooting |
| **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)** | Complete deployment documentation for dev & production |
| **[n8n Workflow Guide](docs/N8N_WORKFLOW_GUIDE.md)** | Step-by-step n8n email automation setup |
| **[Implementation Summary](docs/IMPLEMENTATION_SUMMARY.md)** | Technical implementation details and architecture |

## 🎯 Key Features Explained

### Multi-Page Navigation
- Dedicated section routes for easier direct linking and sharing
- Header navigation available across all pages
- Footer keeps a focused set of quick links
- Core routes: `/about`, `/skills`, `/services`, `/projects`, `/experience`, `/certifications`, `/contact`

### Contact Form with Database
- Full-stack contact form with validation
- PostgreSQL database storage via Prisma
- Message status tracking (UNREAD/READ/ARCHIVED)
- Health check endpoint at `/api/contact`

### Docker Integration
- Multi-container setup (App, PostgreSQL, n8n)
- Development and production configurations
- Volume persistence for data
- Health checks and auto-restart

### n8n Automation
- Webhook integration for form submissions
- Automated email notifications
- Extensible for multi-channel alerts (Slack, Discord, SMS)
- Visual workflow editor

## 🔧 Available Scripts

### Development
```bash
npm run dev                    # Start Next.js dev server (with Turbopack)
npm run docker:dev             # Start Docker services (PostgreSQL + n8n)
npm run docker:dev:build       # Rebuild and start Docker services
npm run docker:dev:down        # Stop Docker services
npm run docker:dev:logs        # View live Docker logs
```

### Database Management
```bash
npm run prisma:studio          # Open Prisma Studio (database GUI)
npm run prisma:migrate         # Create and run migrations
npm run prisma:migrate:deploy  # Deploy migrations (production)
npm run prisma:generate        # Generate Prisma Client
npm run prisma:push            # Push schema changes to database
npm run prisma:reset           # Reset database (WARNING: deletes data)
```

### Production
```bash
npm run build                  # Build Next.js for production
npm run start                  # Start production server
npm run docker:prod:build      # Build production Docker images
npm run docker:prod            # Start production Docker stack
npm run docker:prod:down       # Stop production stack
npm run docker:prod:logs       # View production logs
```

### Utilities
```bash
npm run lint                   # Run ESLint
npm run docker:clean           # Remove all Docker volumes and containers
```

On Windows, use `npm run db:init` to wait for PostgreSQL, apply migrations, and
generate the Prisma Client. On macOS/Linux, use `npm run db:init:bash`.

## 🗂️ Project Structure

```
personalwebsite/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/         # Contact form API endpoint
│   │   ├── about/               # About page route
│   │   ├── skills/              # Skills page route
│   │   ├── services/            # Services page route
│   │   ├── projects/            # Projects page route
│   │   ├── experience/          # Experience page route
│   │   ├── certifications/      # Certifications page route
│   │   ├── contact/             # Contact page route
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/              # React components
│   │   ├── ContactSection.tsx   # Contact form component
│   │   ├── HeroSection.tsx
│   │   ├── SitePageLayout.tsx   # Shared page shell (header/main/footer)
│   │   └── ...
│   ├── lib/
│   │   ├── prisma.ts            # Prisma client singleton
│   │   └── siteNavigation.ts    # Shared route navigation config
│   └── theme.ts
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Database migrations
├── docs/                       # Documentation
├── scripts/                    # Utility scripts
├── public/                     # Static assets
├── docker-compose.yml          # Development Docker config
├── docker-compose.prod.yml     # Production Docker config
├── Dockerfile                  # Multi-stage Docker build
└── package.json
```

## 🔒 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/portfolio_db?schema=public"

# n8n Webhook
N8N_WEBHOOK_URL="http://localhost:5678/webhook/contact-form"

# Next.js
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

See [.env.example](.env.example) for all available options.

## 🌐 Services

When running with Docker, the following services are available:

- **Next.js App**: http://localhost:3000
- **n8n Workflow**: http://localhost:5678
- **PostgreSQL**: localhost:5432
- **Prisma Studio**: http://localhost:5555 (run `npm run prisma:studio`)

## 🐛 Troubleshooting

### Docker Not Starting
Ensure Docker Desktop is running. Check the system tray/menu bar for Docker's status.

### Database Connection Failed
```bash
# Restart PostgreSQL container
docker restart portfolio-postgres

# Check logs
docker logs portfolio-postgres
```

### Port Already in Use
```powershell
# Windows - Find and kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

For more troubleshooting, see the **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md#troubleshooting)**.

## 📦 Deployment

### Docker Production Deployment

```bash
# 1. Configure production environment
cp .env.production.example .env.production
# Edit .env.production with secure passwords

# 2. Build and start production stack
npm run docker:prod:build

# 3. View logs
npm run docker:prod:logs
```

For detailed deployment instructions, see the **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md#production-deployment)**.

### Vercel Deployment

This project can also be deployed to Vercel. You'll need to:
1. Set up a PostgreSQL database (e.g., Neon, Supabase, Railway)
2. Configure environment variables in Vercel dashboard
3. Deploy via GitHub integration or Vercel CLI

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

[Your License Here]

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Material-UI](https://mui.com/) - UI component library
- [Prisma](https://www.prisma.io/) - Database ORM
- [n8n](https://n8n.io/) - Workflow automation
- [Docker](https://www.docker.com/) - Containerization platform

---

**Need Help?** Check the [Quick Start Guide](docs/QUICKSTART.md) or [Deployment Guide](docs/DEPLOYMENT_GUIDE.md) for detailed instructions.
