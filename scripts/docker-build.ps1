# Docker Build Script with BuildKit
# Enables BuildKit features like cache mounts and improved layer caching

# Set BuildKit environment variable
$env:DOCKER_BUILDKIT=1
$env:COMPOSE_DOCKER_CLI_BUILD=1

Write-Host "Docker BuildKit enabled for optimized builds" -ForegroundColor Green
Write-Host "Building Docker images with cache optimization..." -ForegroundColor Cyan

# Build with BuildKit
docker-compose build --progress=plain

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build completed successfully!" -ForegroundColor Green
} else {
    Write-Host "Build failed with exit code $LASTEXITCODE" -ForegroundColor Red
    exit $LASTEXITCODE
}
