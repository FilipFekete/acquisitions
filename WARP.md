# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview

- Stack: Node.js (ESM) + Express 5, Drizzle ORM with Neon (Postgres), Zod validation, Winston logging.
- Entry: src/index.js loads env and starts HTTP server via src/server.js; Express app configured in src/app.js.
- Path aliases: package.json "imports" provides #config/_, #models/_, #routes/_, #services/_, #utils/_, #controllers/_, #middleware/_, #validations/_.

Commands

- Install deps (uses package-lock.json):
  - npm ci
- Run dev server (auto-restart on file change):
  - npm run dev
- Lint:
  - npm run lint
  - npm run lint:fix
- Format (Prettier):
  - npm run format:check
  - npm run format
- Database (Drizzle + Neon): ensure DATABASE_URL is set in .env
  - Generate SQL/migrations from schema: npm run db:generate
  - Apply migrations: npm run db:migrate
  - Open Drizzle Studio: npm run db:studio
- Tests: no test runner or scripts are defined in package.json.

Required environment

- .env variables consumed by the app and tooling:
  - DATABASE_URL: Neon/Postgres connection string for drizzle-orm/neon-http
  - JWT_SECRET: secret for signing JWTs (src/utils/jwt.js)
  - PORT (optional, default 3000)
  - LOG_LEVEL (optional, default info; affects Winston)
  - NODE_ENV (development/production; affects logging and cookie security)

High-level architecture

- HTTP server
  - src/server.js reads PORT and calls app.listen; logs startup URL.
  - src/app.js registers core middleware: helmet, cors, JSON/urlencoded parsers, cookie-parser, morgan piping to Winston.
  - Health endpoints: GET / (plain text), GET /health (status, timestamp, uptime), GET /api (status message).
  - Routing: app.use('/api/auth', authRoutes) from src/routes/auth.routes.js.
- Auth module
  - Route definitions: src/routes/auth.routes.js with POST /sign-up mapped to controllers/auth.controller.signup; placeholders for /sign-in, /sign-out.
  - Controller: src/controllers/auth.controller.js validates with Zod (signUpSchema), delegates to service, signs JWT, sets cookie, and returns public user fields.
  - Service: src/services/auth.service.js hashes passwords (bcrypt), checks for existing user, inserts via Drizzle, returns selected fields.
  - Validation: src/validations/auth.validation.js defines Zod schemas for sign-up/sign-in.
  - Cookies/JWT utils: src/utils/cookies.js for secure cookie options; src/utils/jwt.js for sign/verify using JWT_SECRET.
- Data access
  - Drizzle + Neon: src/config/database.js creates neon(sql) using DATABASE_URL and drizzle(sql); exported db and sql.
  - Schema: src/models/user.model.js defines users table with id, name, email (unique), password, role, created_at, updated_at using drizzle-orm/pg-core.
- Logging
  - Winston logger: src/config/logger.js writes JSON logs to logs/combined.log and logs/error.log; console transport enabled when NODE_ENV !== 'production'.
  - HTTP access logs: morgan('combined') streams into Winston.

Conventions and tooling

- ESLint config: eslint.config.js (ESLint v9, @eslint/js). Notable rules: 2-space indent, single quotes, semi required, unix linebreaks, prefer-const, no-var. Ignores node_modules, coverage, logs, drizzle.
- Prettier config: .prettierrc (single quotes, printWidth 80, trailingComma es5, endOfLine lf).

Local API quickstart

- Start server: npm run dev, then visit http://localhost:3000/health or http://localhost:3000/api
- Sign-up request example (application/json): POST /api/auth/sign-up with { name, email, password, role? }.
