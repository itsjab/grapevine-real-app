import '@/envConfig';
import { seedAppellations } from '../lib/db/seed/seed-appellations';

async function main() {
  try {
    await seedAppellations();
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed appellations:', error);
    process.exit(1);
  }
}

main();
