#!/bin/bash

# Database Initialization Script for Portfolio Application
# This script waits for PostgreSQL to be ready and runs Prisma migrations

set -e

echo "🔄 Database Initialization Script Started"
echo "=========================================="

# Configuration
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_USER="${DB_USER:-postgres}"
DB_NAME="${DB_NAME:-portfolio_db}"
MAX_RETRIES=30
RETRY_INTERVAL=2

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if PostgreSQL is ready
check_postgres() {
    PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c '\q' 2>/dev/null
    return $?
}

# Wait for PostgreSQL to be ready
echo -e "${YELLOW}⏳ Waiting for PostgreSQL to be ready...${NC}"
RETRY_COUNT=0

while ! check_postgres; do
    RETRY_COUNT=$((RETRY_COUNT + 1))
    
    if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
        echo -e "${RED}❌ Failed to connect to PostgreSQL after $MAX_RETRIES attempts${NC}"
        echo -e "${RED}Connection details: $DB_USER@$DB_HOST:$DB_PORT/$DB_NAME${NC}"
        exit 1
    fi
    
    echo -e "${YELLOW}   Attempt $RETRY_COUNT/$MAX_RETRIES - PostgreSQL not ready yet, retrying in ${RETRY_INTERVAL}s...${NC}"
    sleep $RETRY_INTERVAL
done

echo -e "${GREEN}✅ PostgreSQL is ready!${NC}"
echo ""

# Run Prisma migrations
echo -e "${YELLOW}🔄 Running Prisma migrations...${NC}"

if npx prisma migrate deploy; then
    echo -e "${GREEN}✅ Prisma migrations completed successfully!${NC}"
else
    echo -e "${RED}❌ Prisma migrations failed${NC}"
    exit 1
fi

echo ""

# Generate Prisma Client
echo -e "${YELLOW}🔄 Generating Prisma Client...${NC}"

if npx prisma generate; then
    echo -e "${GREEN}✅ Prisma Client generated successfully!${NC}"
else
    echo -e "${RED}❌ Prisma Client generation failed${NC}"
    exit 1
fi

echo ""

# Optional: Seed database (uncomment if you create a seed script)
# echo -e "${YELLOW}🔄 Seeding database...${NC}"
# if npx prisma db seed; then
#     echo -e "${GREEN}✅ Database seeded successfully!${NC}"
# else
#     echo -e "${YELLOW}⚠️  Database seeding failed (continuing anyway)${NC}"
# fi
# echo ""

# Database statistics
echo -e "${YELLOW}📊 Database Information:${NC}"
PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "
    SELECT 
        schemaname as schema,
        tablename as table,
        pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
    FROM pg_tables 
    WHERE schemaname = 'public'
    ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
" 2>/dev/null || echo -e "${YELLOW}   Could not fetch database statistics${NC}"

echo ""
echo -e "${GREEN}=========================================="
echo -e "✅ Database Initialization Complete!"
echo -e "==========================================${NC}"
