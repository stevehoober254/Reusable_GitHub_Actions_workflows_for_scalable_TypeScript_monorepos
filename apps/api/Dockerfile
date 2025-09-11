# Use the official Node.js 20 Alpine image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and lockfile from monorepo root
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Copy workspace package.json files
COPY apps/api/package.json ./apps/api/package.json
COPY packages/utils/package.json ./packages/utils/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the source code
FROM base AS builder
WORKDIR /app

# Install pnpm in builder stage
RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set the working directory to the API app
WORKDIR /app/apps/api

# Build the API application
RUN pnpm build

# Production image, copy all the files and run the API
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 apiuser

# Copy the built application
COPY --from=builder --chown=apiuser:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=apiuser:nodejs /app/apps/api/package.json ./package.json

# Install only production dependencies directly with npm
RUN npm install --only=production

USER apiuser

EXPOSE 4000

ENV PORT 4000

CMD ["node", "dist/index.js"]
