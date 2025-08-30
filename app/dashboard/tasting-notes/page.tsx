import { desc, eq } from 'drizzle-orm';
import { headers } from 'next/dist/server/request/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Plus } from 'lucide-react';
import { MobileNavigation } from '@/components/nav-mobile';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardCaption, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { auth, type Session } from '@/lib/auth';
import { db } from '@/lib/db';
import { tastingNote } from '@/lib/db/schema/wine';

async function getAllTastingNotes(session: Session) {
  const notes = await db
    .select()
    .from(tastingNote)
    .where(eq(tastingNote.userId, session.user.id))
    .orderBy(desc(tastingNote.createdAt));

  return notes;
}

export default async function TastingNotesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/login?redirect=/dashboard/tasting-notes');
  }

  const notes = await getAllTastingNotes(session);

  return (
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
              <BreadcrumbLink href="/dashboard/tasting-notes">
                Tasting Notes
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <MobileNavigation activeLink="tasting-notes" className="md:hidden" />

      <main className="pt-6 px-4 pb-32 md:pb-4">
        <h1 className="text-2xl font-semibold mb-6">Your Tasting Notes</h1>
        
        {notes.length === 0 ? (
          <div className="mt-8">
            <p className="text-foreground-muted mb-6">
              You haven't created any tasting notes yet. Start your wine journey by creating your first note.
            </p>
            <Link href="/dashboard/chat" className="block w-36">
              <Card className="size-36">
                <CardContent className="h-full flex items-center justify-center">
                  <Plus className="size-10 text-primary" />
                </CardContent>
              </Card>
              <CardCaption className="mt-2 w-36">
                Tap to write your first note
              </CardCaption>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
            {notes.map((note) => (
              <Link
                href={`/dashboard/tasting-notes/${note.id}`}
                key={note.id}
                className="block w-36"
              >
                <Card
                  className="size-36"
                  style={
                    note.gradient
                      ? note.gradient
                      : {
                          backgroundColor: 'oklch(40.8% 0.153 2.432)',
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1111 1111' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\"),      radial-gradient(circle at 20% 30%, oklch(65% 0.18 15) 0%, transparent 60%),      radial-gradient(circle at 75% 25%, oklch(55% 0.15 350) 0%, transparent 65%),      radial-gradient(circle at 60% 75%, oklch(35% 0.12 25) 0%, transparent 70%),      radial-gradient(circle at 25% 85%, oklch(45% 0.08 20) 0%, transparent 55%)",
                          backgroundBlendMode:
                            'overlay, normal, normal, normal, normal',
                        }
                  }
                />
                <CardCaption className="mt-2 w-36">
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-foreground">{note.title}</p>
                    {note.grapeVarieties && (
                      <p className="line-clamp-1 text-foreground-muted">
                        {note.grapeVarieties}
                      </p>
                    )}
                  </div>
                </CardCaption>
              </Link>
            ))}
            <Link href="/dashboard/chat" className="block w-36">
              <Card className="size-36">
                <CardContent className="h-full flex items-center justify-center">
                  <Plus className="size-10 text-primary" />
                </CardContent>
              </Card>
              <CardCaption className="mt-2 w-36">
                Add a new note
              </CardCaption>
            </Link>
          </div>
        )}
      </main>
    </SidebarInset>
  );
}