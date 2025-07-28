import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { db } from '@/lib/db';
import { appellation, appellationRegion, region } from '@/lib/db/schema/wine';

interface AppellationData {
  name: string;
  key: string;
  region: {
    key: string;
    name: string;
    country: {
      key: string;
      name: string;
    };
  };
}

interface AppellationsJSON {
  data: {
    allAppellations: AppellationData[];
  };
}

export async function seedAppellations() {
  try {
    // Read appellations.json file
    const appellationsPath = join(__dirname, 'appellations.json');
    const appellationsFile = readFileSync(appellationsPath, 'utf-8');
    const appellationsData: AppellationsJSON = JSON.parse(appellationsFile);

    console.log(
      `Processing ${appellationsData.data.allAppellations.length} appellations...`,
    );

    for (const appellationData of appellationsData.data.allAppellations) {
      // Create region if it doesn't exist
      const regionId = appellationData.region.key;
      try {
        await db
          .insert(region)
          .values({
            id: regionId,
            name: appellationData.region.name,
            country: appellationData.region.country.name,
          })
          .onConflictDoNothing();
        console.log(`Created region: ${appellationData.region.name}`);
      } catch (error) {
        console.log(
          `Region ${appellationData.region.name} already exists, skipping...: ${error}`,
        );
        // Region already exists, continue
      }

      // Create appellation if it doesn't exist
      const appellationId = appellationData.key;
      try {
        await db
          .insert(appellation)
          .values({
            id: appellationId,
            name: appellationData.name,
          })
          .onConflictDoNothing();
        console.log(`Created appellation: ${appellationData.name}`);
      } catch (error) {
        console.log(
          `Appellation ${appellationData.name} already exists, skipping...: ${error}`,
        );
      }

      // Link appellation to region
      try {
        await db
          .insert(appellationRegion)
          .values({
            appellationId,
            regionId,
          })
          .onConflictDoNothing();
        console.log(
          `Linked appellation ${appellationData.name} to region ${appellationData.region.name}`,
        );
      } catch (error) {
        console.error(
          `Error linking appellation ${appellationData.name} to region ${appellationData.region.name}: ${error}`,
        );
      }
    }

    console.log('✅ Appellations seeding completed successfully');
  } catch (error) {
    console.error('❌ Error seeding appellations:', error);
    throw error;
  }
}
