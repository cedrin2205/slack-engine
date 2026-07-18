# TODO - Fix monorepo

- [ ] Update root `package.json` to enable npm workspaces (`apps/*`, `packages/*`).
- [ ] Update `apps/web/package.json` to depend on the local workspace database package (use `workspace:*` or `file:`).
- [ ] Fix `packages/database/index.js` to export a Prisma client correctly (server-only) and avoid empty export.
- [ ] Fix `apps/web/app/page.tsx` to only import Prisma from server-safe code.
- [ ] Run `npm install` at repo root.
- [ ] Run `npm run build` (in `apps/web`) and ensure it succeeds.

