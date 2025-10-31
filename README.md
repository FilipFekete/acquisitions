# Docker + Neon setup

This repository is dockerized for local development with Neon Local (ephemeral branches) and production with Neon Cloud.

## Files added
- `Dockerfile` — multi-stage build for the app
- `docker-compose.dev.yml` — app + Neon Local proxy (for development)
- `docker-compose.prod.yml` — app only (connects to Neon Cloud)
- `.env.development.example` — sample env for development
- `.env.production.example` — sample env for production

## Prerequisites
- Docker Desktop (Compose v2)
- A Neon account, Project ID, and API key

## 1) Local development (Neon Local)
1. Create `.env.development` from the example and fill in secrets:
   - Copy: `cp .env.development.example .env.development` (PowerShell: `Copy-Item .env.development.example .env.development`)
   - Set:
     - `NEON_API_KEY` — Neon API key
     - `NEON_PROJECT_ID` — Project → Settings → General
     - `PARENT_BRANCH_ID` — the parent branch to fork ephemeral branches from (often your main branch id)
2. Start services:
   - `docker compose -f docker-compose.dev.yml up --build`
3. Your app gets `DATABASE_URL` pointing at Neon Local:
   - `postgres://neon:npg@neon-local:5432/appdb?sslmode=require`

Ephemeral branches: Neon Local will create a fresh branch at startup and delete it when it stops. To persist a branch, set `DELETE_BRANCH=false` and mount the volumes in `docker-compose.dev.yml` (see commented lines).

### If you use node-postgres (pg) or postgres libs
Neon Local uses a self-signed certificate. Add the SSL option in your DB client if needed:
```js path=null start=null
// pg example
new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
```

### If you use @neondatabase/serverless
Configure the Neon Local HTTP endpoint and disable websockets:
```ts path=null start=null
import { neon, neonConfig } from '@neondatabase/serverless'
neonConfig.fetchEndpoint = 'http://neon-local:5432/sql'
neonConfig.useSecureWebSocket = false
neonConfig.poolQueryViaFetch = true
const sql = neon(process.env.DATABASE_URL!)
```

## 2) Production (Neon Cloud)
1. Create `.env.production` from the example and set `DATABASE_URL` to your Neon Cloud URL (contains `neon.tech`):
   - `Copy-Item .env.production.example .env.production`
2. Start:
   - `docker compose -f docker-compose.prod.yml up --build -d`

No Neon Local runs in production. The app connects directly to Neon Cloud using `DATABASE_URL`.

### Migrations (optional)
Run migrations as a one-off task using the same image:
```sh path=null start=null
docker compose -f docker-compose.prod.yml run --rm app npm run migrate
```

## 3) How environment switching works
- Dev compose uses `.env.development` and sets `DATABASE_URL` to Neon Local.
- Prod compose uses `.env.production` and expects a Neon Cloud `DATABASE_URL`.
- No connection strings are hardcoded in images; everything flows via env vars.

## 4) Git hygiene
- `.neon_local/` metadata is ignored by git.
- Do not commit `.env.development` or `.env.production` with secrets.