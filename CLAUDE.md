# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Package Manager
This project uses `pnpm` as the package manager.

### Common Commands
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linter and formatter with auto-fix
- `pnpm db:generate` - Generate Drizzle migration files
- `pnpm db:migrate` - Apply database migrations
- `pnpm db:studio` - Open Drizzle Studio for database management

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: Turso (LibSQL) with Drizzle ORM
- **Authentication**: Better Auth with Drizzle adapter
- **Linting/Formatting**: Biome (replaces ESLint/Prettier)

### Directory Structure
- `app/` - Next.js App Router pages and API routes
- `lib/auth/` - Authentication configuration with Better Auth
- `lib/db/` - Database connection and schema definitions
- `lib/db/schema/` - Drizzle schema files (auth.ts contains user/session tables)
- `components/ui/` - Reusable UI components from shadcn/ui
- `migrations/` - Drizzle database migration files

### Database Architecture
- Uses Turso (LibSQL) as the database provider
- Drizzle ORM for type-safe database operations
- Authentication tables: `user`, `session`, `account`, `verification`
- Database connection configured in `lib/db/index.ts`
- Migrations managed through `drizzle.config.ts`

### Authentication System
- Better Auth library with Next.js integration
- Drizzle adapter for database persistence
- Cookie-based session management
- Authentication configuration in `lib/auth/index.ts`

### Environment Configuration
- Environment variables loaded via `envConfig.ts` using Next.js `loadEnvConfig`
- Required environment variables: `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`

### Code Style
- Biome configuration enforces consistent formatting
- 2-space indentation, 80 character line width
- React JSX with double quotes for attributes
- Import organization with unused import warnings