#!/usr/bin/env tsx

// Load environment variables first
import '../envConfig';

import { seedGrapeVarieties } from '../lib/db/seed/grape-varieties-seeder';

async function main() {
  const args = process.argv.slice(2);
  const startFrom = args.includes('--start-from') 
    ? parseInt(args[args.indexOf('--start-from') + 1]) 
    : 0;
  const batchSize = args.includes('--batch-size') 
    ? parseInt(args[args.indexOf('--batch-size') + 1]) 
    : undefined;
  const skipClear = args.includes('--no-clear');

  console.log('🚀 Starting grape varieties seeding script...');
  
  try {
    await seedGrapeVarieties({
      clearExisting: !skipClear,
      startFrom,
      batchSize,
    });
    
    console.log('🎉 Seeding script completed successfully!');
  } catch (error) {
    console.error('💥 Seeding script failed:', error);
    process.exit(1);
  }
}

main();