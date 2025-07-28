// Load environment variables first
import '../../../envConfig';

import {
  generateSummary,
  generateVarietalGuide,
} from '../../../app/varieties/[variety]/query';
import { db } from '../index';
import { grapeVariety } from '../schema/wine';
import grapeVarieties from './grape-varieties.json';

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[àáâäæãåā]/g, 'a')
    .replace(/[çćč]/g, 'c')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[ñń]/g, 'n')
    .replace(/[òóôöøōõ]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ýÿ]/g, 'y')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function seedGrapeVariety(
  name: string,
  index: number,
  retries = 3,
): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(
        `[${index + 1}/${grapeVarieties.length}] Processing ${name}... (attempt ${attempt})`,
      );

      // Generate teaser and description using AI functions
      const [teaser, description] = await Promise.all([
        generateSummary(name),
        generateVarietalGuide(name),
      ]);

      // Create the record
      await db.insert(grapeVariety).values({
        id: createSlug(name),
        name,
        teaser: teaser.trim(),
        description: description.trim(),
      });

      console.log(`✓ ${name} completed`);

      // Rate limiting: wait 3 seconds between calls to avoid hitting limits
      if (index < grapeVarieties.length - 1) {
        await delay(3000);
      }
      return;
    } catch (error) {
      console.error(`✗ Error processing ${name} (attempt ${attempt}):`, error);

      if (attempt === retries) {
        console.error(`❌ Failed to process ${name} after ${retries} attempts`);
        throw error;
      }

      // Wait longer before retry
      await delay(5000);
    }
  }
}

export async function seedGrapeVarieties(
  options: {
    clearExisting?: boolean;
    startFrom?: number;
    batchSize?: number;
  } = {},
): Promise<void> {
  const {
    clearExisting = true,
    startFrom = 0,
    batchSize = grapeVarieties.length,
  } = options;

  console.log('🍇 Starting grape varieties seeding...');
  console.log(`📊 Processing ${grapeVarieties.length} grape varieties`);
  console.log(`⚙️  Starting from index: ${startFrom}`);
  console.log(`📦 Batch size: ${batchSize}`);

  try {
    if (clearExisting && startFrom === 0) {
      console.log('🗑️  Clearing existing grape varieties...');
      await db.delete(grapeVariety);
    }

    const endIndex = Math.min(startFrom + batchSize, grapeVarieties.length);
    const failures: string[] = [];

    // Seed varieties sequentially to respect rate limits
    for (let i = startFrom; i < endIndex; i++) {
      try {
        await seedGrapeVariety(grapeVarieties[i], i);
      } catch (error) {
        failures.push(grapeVarieties[i]);
        console.error(
          `⚠️  Continuing after failure with ${grapeVarieties[i]}:`,
          error,
        );
      }
    }

    console.log(`✅ Grape varieties seeding completed!`);
    console.log(`📈 Processed: ${endIndex - startFrom} varieties`);

    if (failures.length > 0) {
      console.warn(
        `⚠️  ${failures.length} varieties failed:`,
        failures.join(', '),
      );
    }
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedGrapeVarieties()
    .then(() => {
      console.log('Seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}
