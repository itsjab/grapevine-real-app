import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { AppSidebar } from '@/components/app-sidebar';
import { Markdown } from '@/components/markdown';
import { MobileNavigation } from '@/components/nav-mobile';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { grapeVariety } from '@/lib/db/schema/wine';
import { generateVarietalGuide } from './query';

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

  const guide = varietyData
    ? varietyData.description
    : await generateVarietalGuide(variety);

  if (!guide) {
    notFound();
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="hidden md:flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/guides">Guides</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <MobileNavigation activeLink="guides" className="md:hidden" />

        <main className="pt-6 px-4 pb-32 md:pb-4">
          <Markdown>{guide}</Markdown>
        </main>
      </SidebarInset>
    </>
  );
}
