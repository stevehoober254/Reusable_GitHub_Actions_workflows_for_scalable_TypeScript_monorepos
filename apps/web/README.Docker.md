# Docker Setup for Next.js Web App

This directory contains the Docker configuration for the Next.js web application in the TypeScript monorepo.

## Quick Start

### Using Docker Compose (Recommended)

```bash
# From the web app directory
cd apps/web
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

### Using Docker directly

```bash
# From the monorepo root directory
docker build -f apps/web/Dockerfile -t nextjs-web-app .
docker run -p 3000:3000 nextjs-web-app
```

## Docker Configuration

### Multi-stage Build

The Dockerfile uses a multi-stage build process:

1. **Base Stage**: Sets up the Node.js Alpine base image
2. **Dependencies Stage**: Installs pnpm and all dependencies
3. **Builder Stage**: Builds the Next.js application with Tailwind CSS
4. **Runner Stage**: Creates the production image with minimal footprint

### Key Features

- **Optimized for monorepo**: Correctly handles workspace dependencies
- **Next.js standalone output**: Reduces image size significantly
- **Security**: Runs as non-root user (nextjs:1001)
- **Production ready**: Proper environment variables and health checks
- **Tailwind CSS**: Fully supports Tailwind CSS v4
- **TypeScript**: Full TypeScript compilation and type checking

### Environment Variables

- `NODE_ENV=production` - Set to production mode
- `PORT=3000` - Server port (default: 3000)
- `HOSTNAME=0.0.0.0` - Server hostname
- `NEXT_TELEMETRY_DISABLED=1` - (Optional) Disable Next.js telemetry

### Health Check

The Docker Compose configuration includes a health check that:
- Tests the application every 30 seconds
- Times out after 10 seconds
- Retries up to 3 times before marking as unhealthy

## Files

- `Dockerfile` - Multi-stage Docker build configuration
- `docker-compose.yml` - Docker Compose setup for easy deployment
- `.dockerignore` - Excludes unnecessary files from Docker context
- `next.config.js` - Configured with `output: 'standalone'` for Docker optimization

## Build Optimization

The build process:
1. Only copies necessary package.json files first (better Docker layer caching)
2. Installs dependencies with frozen lockfile
3. Builds the application with standalone output
4. Creates minimal production image with only required files

## Accessing the Application

Once running, the application will be available at:
- Local: http://localhost:3000
- Container: Port 3000 is exposed

## Troubleshooting

### Common Issues

1. **Build fails**: Ensure you're building from the monorepo root
2. **Dependencies not found**: Check that all package.json files are correctly copied
3. **Port conflicts**: Change the port mapping in docker-compose.yml if needed

### Logs

```bash
# View logs
docker-compose logs web

# Follow logs
docker-compose logs -f web
```

### Shell Access

```bash
# Access running container shell
docker-compose exec web sh
```
