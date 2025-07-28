import '@/envConfig';
import { db } from '@/lib/db';
import { appellation, appellationRegion, region } from '@/lib/db/schema/wine';

async function cleanupAppellations() {
  try {
    console.log('🧹 Starting appellations cleanup...');

    // Delete junction table records first (no foreign key dependencies)
    const deletedLinks = await db.delete(appellationRegion);
    console.log(`Deleted ${deletedLinks.changes} appellation-region links`);

    // Delete appellations (may have foreign key references from wines)
    const deletedAppellations = await db.delete(appellation);
    console.log(`Deleted ${deletedAppellations.changes} appellations`);

    // Delete regions (may have foreign key references from wines or other tables)
    const deletedRegions = await db.delete(region);
    console.log(`Deleted ${deletedRegions.changes} regions`);

    console.log('✅ Appellations cleanup completed successfully');
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    throw error;
  }
}

async function main() {
  try {
    await cleanupAppellations();
    process.exit(0);
  } catch (error) {
    console.error('Failed to cleanup appellations:', error);
    process.exit(1);
  }
}

main();