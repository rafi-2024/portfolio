#!/bin/bash
# Docker Build Script with BuildKit
# Enables BuildKit features like cache mounts and improved layer caching

# Set BuildKit environment variable
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

echo "Docker BuildKit enabled for optimized builds"
echo "Building Docker images with cache optimization..."

# Build with BuildKit
docker-compose build --progress=plain

if [ $? -eq 0 ]; then
    echo "Build completed successfully!"
else
    echo "Build failed with exit code $?"
    exit $?
fi
