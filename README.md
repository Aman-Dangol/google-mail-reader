# Gmail Monorepo

This repository is a monorepo with two app packages:

- `apps/api` — Express backend
- `apps/web` — React frontend using Vite

## Root scripts

- `pnpm dev` — run both frontend and backend in parallel
- `pnpm build` — build all packages
- `pnpm lint` — lint all packages
- `pnpm check-types` — typecheck all packages
- `pnpm web` — access frontend module
- `pnpm api` — access backend module
- `pnpm pretty` — format with prettier

## Local development

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start both apps:
   ```bash
   pnpm dev
   ```

The frontend proxies `/api` requests to the backend at `http://127.0.0.1:8000`.
