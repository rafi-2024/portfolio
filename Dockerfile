# Base stage - dependencies
FROM node:20-alpine AS base
WORKDIR /app

# Install openssl for Prisma
RUN apk add --no-cache openssl libc6-compat

# Copy package files only (better caching)
COPY package*.json ./

# Development stage
FROM base AS development
# Use cache mount for faster npm installs
RUN --mount=type=cache,target=/root/.npm \
    npm ci
COPY prisma ./prisma/
RUN npx prisma generate
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Dependencies stage - install all dependencies for building
FROM base AS deps
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Builder stage - compile TypeScript and build Next.js
FROM base AS builder

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy prisma schema first and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source code
COPY . .

# Build Next.js application
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

# Production stage - minimal image
FROM node:20-alpine AS production
WORKDIR /app

# Install openssl for Prisma and curl for healthcheck
RUN apk add --no-cache openssl libc6-compat curl

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy ALL node_modules from builder.
# The Prisma CLI (@prisma/config) has transitive runtime deps (effect, c12,
# deepmerge-ts, empathic, ...) that cannot be cherry-picked safely — copying
# only @prisma/prisma/.bin caused "Cannot find module 'effect'" on Render's
# pre-deploy `prisma migrate deploy`.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Set ownership
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

EXPOSE 3000

ENV HOSTNAME="0.0.0.0"

# Health check using curl
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f "http://localhost:${PORT:-3000}/api/health" || exit 1

# Sanitize DATABASE_URL (strip stray quotes / CR chars that break URL parsing
# when the value is pasted into the Render dashboard), validate it, then run
# migrations and start the server.
CMD ["sh", "-c", "DATABASE_URL=$(printf '%s' \"$DATABASE_URL\" | tr -d '\"' | tr -d '\\r'); export DATABASE_URL; node -e \"const raw=process.env.DATABASE_URL||''; let u; try { u=new URL(raw); } catch(e) { console.error('DATABASE_URL is not parseable as a URL. Redacted value:', raw.replace(/\\/\\/[^@]*@/, '//***@').slice(0,80)); throw e; } if(u.protocol!=='postgresql:'&&u.protocol!=='postgres:') throw new Error('DATABASE_URL invalid protocol: '+u.protocol); console.log('DATABASE_URL OK:', u.hostname+':'+u.port)\" && ./node_modules/.bin/prisma migrate deploy && exec node server.js"]
