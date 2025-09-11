# Reusable GitHub Actions CI/CD Workflows — Monorepo Template

**Purpose:** Demo monorepo implementing reusable GitHub Actions workflows for TypeScript projects with container support.

Structure:
- apps/web: Next.js-like minimal app (demo)
- apps/api: Node/Express TypeScript API
- packages/utils: shared utilities
- .github/workflows: reusable workflows and caller examples
- Dockerfiles included for container app support

You can run locally (requires pnpm):
1. Install pnpm if you don't have it: `npm install -g pnpm`
2. Bootstrap: `pnpm install`
3. Build: `pnpm -r build`
4. Run apps individually:
   - `pnpm --filter apps/api dev`
   - `pnpm --filter apps/web dev`

Update environment variables in apps/*/.env as needed.

