# Database Seeding

## Grape Varieties Seeder

This directory contains functionality to seed the `grape_variety` table with comprehensive data for 100 of the most relevant wine grape varieties.

### Files

- `grape-varieties.json` - List of 100 grape varieties to be seeded
- `grape-varieties-seeder.ts` - Main seeding logic with AI content generation
- `README.md` - This documentation file

### Usage

#### Install dependencies first

```bash
pnpm install
```

#### Basic usage

```bash
# Seed all grape varieties (will take ~5-8 minutes due to AI generation)
pnpm run db:seed:grape-varieties
```

#### Advanced usage

```bash
# Start from a specific index (useful for resuming after failures)
pnpm run db:seed:grape-varieties -- --start-from 50

# Process only a batch of varieties
pnpm run db:seed:grape-varieties -- --batch-size 10

# Don't clear existing data before seeding
pnpm run db:seed:grape-varieties -- --no-clear

# Combine options
pnpm run db:seed:grape-varieties -- --start-from 25 --batch-size 25 --no-clear
```

### How it works

1. **AI Content Generation**: For each grape variety, the seeder calls:
   - `generateSummary()` - Creates a concise teaser description
   - `generateVarietalGuide()` - Generates comprehensive markdown guide

2. **Rate Limiting**: Built-in 3-second delays between AI calls to respect API limits

3. **Error Handling**: 
   - 3 retry attempts per variety
   - Failed varieties are logged but don't stop the process
   - Progress tracking with detailed logging

4. **Database Integration**: 
   - Automatically generates URL-friendly slugs for IDs
   - Clears existing data by default (can be disabled)
   - Inserts generated content into `grape_variety` table

### Expected Runtime

- **Full seeding (100 varieties)**: ~5-8 minutes
- **Per variety**: ~3-5 seconds (including AI generation + rate limiting)

### Schema

The seeder populates these fields in the `grape_variety` table:

```typescript
{
  id: string,           // URL-friendly slug (e.g., "cabernet-sauvignon")
  name: string,         // Display name (e.g., "Cabernet Sauvignon") 
  teaser: string,       // Short description (~10-15 words)
  description: string,  // Full markdown guide with sections
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date | null
}
```

### Troubleshooting

- **API Rate Limits**: If you hit rate limits, use `--start-from` to resume
- **Network Issues**: The retry mechanism handles temporary failures automatically  
- **Memory Issues**: Use `--batch-size` to process smaller chunks
- **Incomplete Data**: Check the console output for any varieties that failed to process