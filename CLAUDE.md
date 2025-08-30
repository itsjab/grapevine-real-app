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
- `pnpm db:generate` - Generate Drizzle migration files after schema changes
- `pnpm db:migrate` - Apply database migrations to Turso
- `pnpm db:studio` - Open Drizzle Studio for database management
- `pnpm db:seed:grape-varieties` - Seed grape variety educational content

## Architecture Overview

### Application Purpose
Grapevine is an AI-powered wine tasting journal that helps users create professional tasting notes through conversational AI, track their wine experiences, and learn about wine through educational guides.

### Tech Stack
- **Framework**: Next.js 15 with App Router and server components
- **Language**: TypeScript with strict type safety
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Database**: Turso (LibSQL) edge database with Drizzle ORM
- **Authentication**: Better Auth with Drizzle adapter, supports anonymous users
- **AI**: Anthropic Claude 4 via AI SDK with tool execution
- **Linting/Formatting**: Biome (replaces ESLint/Prettier)

### Key Architectural Patterns

#### AI Tool System
The application uses AI tools for specific actions:
- Tools are defined in `lib/ai/tools/` with schemas and server-side handlers
- Each tool has a schema file and implementation file
- Tools can be executed during AI conversations for actions like saving tasting notes
- Tool execution happens server-side with proper error handling

#### Database Schema Organization
- Schema files in `lib/db/schema/` are modular (auth.ts, chat.ts, wine.ts, grape-varieties.ts)
- Wine domain model follows WSET systematic tasting methodology
- Tasting notes denormalize some data (wine name, producer, region) for performance
- Comprehensive enums for wine characteristics ensure data consistency

#### Authentication Flow
- Better Auth handles both authenticated and anonymous users
- Anonymous users get 10 messages/day, authenticated get 100
- User quotas tracked in database with daily reset
- Session management through cookies

#### AI Conversation System
- Chat messages stored with role (user/assistant/system) and content
- Streaming responses with real-time tool execution
- Messages can include tool invocations and results
- Conversation context maintained across sessions

### API Routes Structure
- `/api/auth/*` - Better Auth endpoints
- `/api/chat` - AI conversation endpoint with streaming and tool execution
- `/api/tasting-notes/*` - CRUD operations for wine tasting notes
- Server actions used for direct database operations where appropriate

### Environment Configuration
Required environment variables:
- `TURSO_DATABASE_URL` - Database connection URL
- `TURSO_AUTH_TOKEN` - Database authentication token
- `ANTHROPIC_API_KEY` - Claude AI API key
- `BETTER_AUTH_SECRET` - Authentication secret
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - OAuth credentials (optional)

### Wine Domain Model
The wine schema includes:
- **TastingNote**: Complete tasting with appearance, nose, palate, conclusions
- **Wine**: Structured wine data with producer and appellation references
- **Producer**: Wine producer information
- **Region/Appellation**: Geographic wine regions
- **GrapeVariety**: Educational content about grape varieties
- **Gradient**: AI-generated visual representations of wines

### Development Patterns
- Use server components for data fetching
- Client components only for interactivity
- Streaming for AI responses to improve perceived performance
- Tool execution happens server-side only
- Database queries use Drizzle's type-safe query builder
- Error boundaries for graceful error handling