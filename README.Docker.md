# Docker Setup for TypeScript Monorepo

This monorepo contains Docker configurations for running both the API (Express.js + TypeScript) and Web (Next.js + Tailwind CSS) applications.

## Quick Start

### Production Mode

```bash
# Build and run both services
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Development Mode

```bash
# Run in development mode with hot reload
docker-compose -f docker-compose.dev.yml up --build

# Run specific service in dev mode
docker-compose -f docker-compose.dev.yml up web --build
```

## Services

### API Service
- **Port**: 4000
- **Health Check**: `GET /api/health`
- **Technology**: Express.js + TypeScript
- **Build**: Multi-stage Docker build with production optimization

### Web Service
- **Port**: 3000
- **Technology**: Next.js 14 + Tailwind CSS v3 + TypeScript
- **Build**: Next.js standalone output for minimal Docker image
- **Features**: Server-side rendering, static optimization, Tailwind CSS styling

## Docker Configuration

### Architecture

Both applications use multi-stage Docker builds:

1. **Base Stage**: Node.js 20 Alpine
2. **Dependencies Stage**: Install pnpm and dependencies
3. **Builder Stage**: Build the applications
4. **Runner Stage**: Production-ready minimal image

### Key Features

- ✅ **Monorepo Support**: Properly handles workspace dependencies
- ✅ **Security**: Non-root users (apiuser:1001, nextjs:1001)
- ✅ **Health Checks**: Automatic service health monitoring
- ✅ **Networking**: Internal network for service communication
- ✅ **Optimization**: Multi-stage builds for minimal image sizes
- ✅ **Hot Reload**: Development mode with file watching

### File Structure

```
├── docker-compose.yml           # Production configuration
├── docker-compose.dev.yml       # Development configuration
├── README.Docker.md             # This documentation
├── apps/
│   ├── api/
│   │   ├── Dockerfile           # API service Docker configuration
│   │   └── .dockerignore        # API build context exclusions
│   └── web/
│       ├── Dockerfile           # Web service Docker configuration
│       ├── docker-compose.yml   # Individual web service compose
│       └── .dockerignore        # Web build context exclusions
```

## Environment Variables

### API Service
- `NODE_ENV=production` - Running mode
- `PORT=4000` - Server port

### Web Service
- `NODE_ENV=production` - Running mode
- `PORT=3000` - Server port
- `API_URL=http://api:4000` - Internal API URL for SSR
- `NEXT_TELEMETRY_DISABLED=1` - (Optional) Disable telemetry

## Service Communication

The services communicate through an internal Docker network:

- **Web → API**: `http://api:4000`
- **External Access**: 
  - Web: `http://localhost:3000`
  - API: `http://localhost:4000`

## Health Checks

Both services include health checks:

- **API**: Tests `/api/health` endpoint
- **Web**: Tests root `/` endpoint
- **Timing**: 30s interval, 10s timeout, 3 retries, 40s start period

## Commands Reference

### Production

```bash
# Full stack
docker-compose up --build
docker-compose up -d --build  # detached

# Individual services
docker-compose up api --build
docker-compose up web --build

# Logs
docker-compose logs api
docker-compose logs web
docker-compose logs -f  # follow all

# Stop
docker-compose down
docker-compose down -v  # with volumes
```

### Development

```bash
# Full stack with hot reload
docker-compose -f docker-compose.dev.yml up --build

# Individual services
docker-compose -f docker-compose.dev.yml up api --build
docker-compose -f docker-compose.dev.yml up web --build

# Rebuild specific service
docker-compose -f docker-compose.dev.yml up --build web
```

### Direct Docker Commands

```bash
# Build images individually
docker build -f apps/api/Dockerfile -t monorepo-api .
docker build -f apps/web/Dockerfile -t monorepo-web .

# Run containers individually
docker run -p 4000:4000 monorepo-api
docker run -p 3000:3000 monorepo-web
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Ensure building from monorepo root
   - Check all package.json files exist
   - Verify pnpm-workspace.yaml is present

2. **Port Conflicts**
   - Change port mappings in docker-compose.yml
   - Check for running services on ports 3000/4000

3. **Service Communication**
   - Use service names (api, web) for internal communication
   - Check network configuration

4. **Permission Issues**
   - Services run as non-root users
   - Check file permissions if mounting volumes

### Debugging

```bash
# Shell access
docker-compose exec api sh
docker-compose exec web sh

# Service logs
docker-compose logs api
docker-compose logs web

# Container inspection
docker-compose ps
docker-compose top
```

### Clean Up

```bash
# Remove containers and networks
docker-compose down

# Remove containers, networks, and images
docker-compose down --rmi all

# Remove everything including volumes
docker-compose down -v --rmi all
```

## Performance Optimization

### Image Sizes
- **API**: ~50MB (Alpine + Node.js + built app)
- **Web**: ~120MB (Alpine + Node.js + Next.js standalone)

### Build Optimization
- Multi-stage builds reduce final image size
- .dockerignore files exclude unnecessary files
- Dependency caching improves build times
- Production builds exclude dev dependencies

### Tailwind CSS Configuration

The web service uses Tailwind CSS v3 for optimal Docker compatibility:

- **Standard Configuration**: Uses CommonJS format (`module.exports`) in `tailwind.config.js`
- **CSS Directives**: Traditional `@tailwind` directives in `globals.css`
- **PostCSS Integration**: Standard `tailwindcss` plugin in `postcss.config.js`
- **Build Process**: Tailwind utilities are properly generated during Docker build
- **Production Optimization**: CSS is purged and optimized in the final build

**Note**: While Tailwind CSS v4 is supported for local development, v3 is used for Docker builds to ensure consistent styling across environments.

## Security Features

- Non-root users for both services
- Minimal Alpine Linux base images
- No unnecessary packages in production images
- Network isolation between services
- Health checks for service monitoring
