import { and, eq } from 'drizzle-orm';
import { headers } from 'next/dist/server/request/headers';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { AppSidebar } from '@/components/app-sidebar';
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
import { auth, type Session } from '@/lib/auth';
import { db } from '@/lib/db';
import { tastingNote } from '@/lib/db/schema/wine';

async function getTastingNote({
  id,
  session,
}: {
  id: string;
  session: Session;
}) {
  const note = await db
    .select()
    .from(tastingNote)
    .where(
      and(eq(tastingNote.userId, session.user.id), eq(tastingNote.id, id)),
    );

  if (!note || note.length === 0) {
    notFound();
  }

  return note[0];
}

export default async function TastingNotePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/api/auth/guest?redirect=/');
  }

  const {
    title,
    summary,
    appearance,
    nose,
    palate,
    conclusion,
    regionName,
    grapeVarieties,
  } = await getTastingNote({ id, session });

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
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/tasting-notes">
                  Tasting Notes
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <MobileNavigation activeLink="home" className="md:hidden" />

        <main className="pt-6 px-4 pb-32 md:pb-4">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {regionName || grapeVarieties ? (
            <div className="flex flex-wrap gap-1 mt-2">
              {regionName && (
                <Link
                  href={`/regions/${regionName.toLowerCase()}`}
                  className="flex items-center h-6 px-2 text-xs bg-chart-5 text-accent-foreground rounded-md"
                >
                  {regionName}
                </Link>
              )}
              {grapeVarieties?.split(',').map((variety) => (
                <Link
                  key={variety}
                  href={`/varieties/${variety.toLowerCase()}`}
                  className="flex items-center h-6 px-2 text-xs bg-chart-5 text-accent-foreground rounded-md"
                >
                  {variety}
                </Link>
              ))}
            </div>
          ) : null}
          <p className="text-sm mt-4 mb-6">{summary}</p>

          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Appearance</h2>
              <p className="text-sm">{appearance}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Nose</h2>
              <p className="text-sm">{nose}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Palate</h2>
              <p className="text-sm">{palate}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Assessment</h2>
              <p className="text-sm">{conclusion}</p>
            </div>
          </section>
        </main>
      </SidebarInset>
    </>
  );
}
