import { and, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { appellation, appellationRegion, region } from '@/lib/db/schema/wine';

/**
 * Get all regions for a specific appellation
 */
export async function getRegionsForAppellation(appellationId: string) {
  return await db
    .select({
      id: region.id,
      name: region.name,
      country: region.country,
      teaser: region.teaser,
      description: region.description,
    })
    .from(region)
    .innerJoin(appellationRegion, eq(region.id, appellationRegion.regionId))
    .where(eq(appellationRegion.appellationId, appellationId));
}

/**
 * Get all appellations for a specific region
 */
export async function getAppellationsForRegion(regionId: string) {
  return await db
    .select({
      id: appellation.id,
      name: appellation.name,
      teaser: appellation.teaser,
      description: appellation.description,
    })
    .from(appellation)
    .innerJoin(
      appellationRegion,
      eq(appellation.id, appellationRegion.appellationId),
    )
    .where(eq(appellationRegion.regionId, regionId));
}

/**
 * Get an appellation with all its regions
 */
export async function getAppellationWithRegions(appellationId: string) {
  const appellationData = await db
    .select()
    .from(appellation)
    .where(eq(appellation.id, appellationId))
    .limit(1);

  if (appellationData.length === 0) {
    return null;
  }

  const regions = await getRegionsForAppellation(appellationId);

  return {
    ...appellationData[0],
    regions,
  };
}

/**
 * Get a region with all its appellations
 */
export async function getRegionWithAppellations(regionId: string) {
  const regionData = await db
    .select()
    .from(region)
    .where(eq(region.id, regionId))
    .limit(1);

  if (regionData.length === 0) {
    return null;
  }

  const appellations = await getAppellationsForRegion(regionId);

  return {
    ...regionData[0],
    appellations,
  };
}

/**
 * Add a region to an appellation
 */
export async function addRegionToAppellation(
  appellationId: string,
  regionId: string,
) {
  return await db.insert(appellationRegion).values({
    appellationId,
    regionId,
    createdAt: new Date(),
  });
}

/**
 * Remove a region from an appellation
 */
export async function removeRegionFromAppellation(
  appellationId: string,
  regionId: string,
) {
  return await db
    .delete(appellationRegion)
    .where(
      and(
        eq(appellationRegion.appellationId, appellationId),
        eq(appellationRegion.regionId, regionId),
      ),
    );
}

/**
 * Check if an appellation is associated with a region
 */
export async function isAppellationInRegion(
  appellationId: string,
  regionId: string,
): Promise<boolean> {
  const result = await db
    .select()
    .from(appellationRegion)
    .where(
      and(
        eq(appellationRegion.appellationId, appellationId),
        eq(appellationRegion.regionId, regionId),
      ),
    )
    .limit(1);

  return result.length > 0;
}
