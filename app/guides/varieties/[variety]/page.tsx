import { eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { generateVarietalGuide } from '@/app/dashboard/guides/varieties/[variety]/query';
import { Markdown } from '@/components/markdown';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { grapeVariety } from '@/lib/db/schema/wine';

async function getVarietyFromDatabase(variety: string) {
  try {
    const varietyFromDb = await db
      .select()
      .from(grapeVariety)
      .where(eq(grapeVariety.id, variety))
      .limit(1)
      .execute();

    return varietyFromDb[0];
  } catch (error) {
    console.error('Error fetching variety from database:', error);
    return null;
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ variety: string }>;
}) {
  const variety = (await params).variety;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect(`/dashboard/guides/varieties/${variety}`);
  }

  const varietyData = await getVarietyFromDatabase(variety);

  const cachedGenerateVarietalGuide = unstable_cache(
    async (variety: string) => generateVarietalGuide(variety),
    ['varietal-guide'],
    { tags: [variety, 'varieties'] },
  );

  const guide = varietyData
    ? varietyData.description
    : await cachedGenerateVarietalGuide(variety);

  if (!guide) {
    notFound();
  }

  return (
    <main className="pt-6 px-4 pb-32 md:pb-4">
      <Markdown>{guide}</Markdown>
    </main>
  );
}
