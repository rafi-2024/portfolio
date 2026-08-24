# Database Initialization Script for Portfolio Application (Windows)
# This script waits for PostgreSQL to be ready and runs Prisma migrations

Write-Host "🔄 Database Initialization Script Started" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Configuration
$DB_HOST = if ($env:DB_HOST) { $env:DB_HOST } else { "localhost" }
$DB_PORT = if ($env:DB_PORT) { $env:DB_PORT } else { "5432" }
$DB_USER = if ($env:DB_USER) { $env:DB_USER } else { "postgres" }
$DB_NAME = if ($env:DB_NAME) { $env:DB_NAME } else { "portfolio_db" }
$DB_PASSWORD = $env:DB_PASSWORD
$MAX_RETRIES = 30
$RETRY_INTERVAL = 2

# Function to check if PostgreSQL is ready
function Test-PostgreSQL {
    try {
        $env:PGPASSWORD = $DB_PASSWORD
        $null = psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c '\q' 2>&1
        return $LASTEXITCODE -eq 0
    }
    catch {
        return $false
    }
}

# Wait for PostgreSQL to be ready
Write-Host "⏳ Waiting for PostgreSQL to be ready..." -ForegroundColor Yellow
$RETRY_COUNT = 0

while (-not (Test-PostgreSQL)) {
    $RETRY_COUNT++
    
    if ($RETRY_COUNT -ge $MAX_RETRIES) {
        Write-Host "❌ Failed to connect to PostgreSQL after $MAX_RETRIES attempts" -ForegroundColor Red
        Write-Host "Connection details: $DB_USER@${DB_HOST}:${DB_PORT}/$DB_NAME" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "   Attempt $RETRY_COUNT/$MAX_RETRIES - PostgreSQL not ready yet, retrying in ${RETRY_INTERVAL}s..." -ForegroundColor Yellow
    Start-Sleep -Seconds $RETRY_INTERVAL
}

Write-Host "✅ PostgreSQL is ready!" -ForegroundColor Green
Write-Host ""

# Run Prisma migrations
Write-Host "🔄 Running Prisma migrations..." -ForegroundColor Yellow

$migrateResult = npx prisma migrate deploy 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Prisma migrations completed successfully!" -ForegroundColor Green
}
else {
    Write-Host "❌ Prisma migrations failed" -ForegroundColor Red
    Write-Host $migrateResult -ForegroundColor Red
    exit 1
}

Write-Host ""

# Generate Prisma Client
Write-Host "🔄 Generating Prisma Client..." -ForegroundColor Yellow

$generateResult = npx prisma generate 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Prisma Client generated successfully!" -ForegroundColor Green
}
else {
    Write-Host "❌ Prisma Client generation failed" -ForegroundColor Red
    Write-Host $generateResult -ForegroundColor Red
    exit 1
}

Write-Host ""

# Database statistics
Write-Host "📊 Database Information:" -ForegroundColor Yellow
$env:PGPASSWORD = $DB_PASSWORD
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c @"
SELECT 
    schemaname as schema,
    tablename as table,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
"@ 2>$null

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "✅ Database Initialization Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
