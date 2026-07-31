# Gmail Monorepo

This repository is a monorepo with two app packages:

- `apps/api` — Express backend
- `apps/web` — React frontend using Vite

## Initial Requirements

- setup google console cloud project and get oauth2 credentials
- add scopes in data access scope for mail.google.com, userinfo.email and userinfo.profile
- add the gmail account you want to use as a test user if its in testing mode
- ensure redirect url matches ur frontend's homepage url

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

The frontend proxies `/api` requests to the backend.
