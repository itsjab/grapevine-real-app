import { desc, eq } from 'drizzle-orm';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Card, CardCaption, CardContent } from '@/components/ui/card';
import type { Session } from '@/lib/auth';
import { db } from '@/lib/db';
import { tastingNote } from '@/lib/db/schema/wine';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

async function getLatestTastingNotes(session: Session) {
  const latestNotes = await db
    .select()
    .from(tastingNote)
    .where(eq(tastingNote.userId, session.user.id)) // Replace with actual user ID logic
    .orderBy(desc(tastingNote.createdAt))
    .limit(5);

  return latestNotes;
}

interface TastingNoteSliderProps {
  session: Session;
}

async function TastingNotesSlider({ session }: TastingNoteSliderProps) {
  const notes = await getLatestTastingNotes(session);

  if (!notes || notes.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Tasting Notes</h2>
        <Link href="/chat" className="block w-36">
          <Card className="size-36">
            <CardContent className="h-full flex items-center justify-center">
              <Plus className="size-10 text-primary" />
            </CardContent>
          </Card>
          <CardCaption className="mt-2 w-36">
            Tap to write your first.
          </CardCaption>
        </Link>
      </section>
    );
  }

  return (
    <div>
      <Carousel
        className="mt-4 -mx-4 max-w-screen"
        opts={{ containScroll: 'trimSnaps' }}
      >
        <CarouselContent>
          {notes.map((note) => (
            <CarouselItem
              className="flex basis-40 first-of-type:ml-4"
              key={note.id}
            >
              <Link
                href={`/dashboard/tasting-notes/${note.id}`}
                key={note.id}
                className="block w-36"
              >
                <Card
                  className="size-36"
                  style={{
                    backgroundImage:
                      'conic-gradient(from 90deg, rgb(47, 17, 54) 0deg, rgb(47, 17, 54) 27.692deg, rgb(52, 18, 52) 27.692deg, rgb(52, 18, 52) 55.385deg, rgb(58, 22, 52) 55.385deg, rgb(58, 22, 52) 83.077deg, rgb(66, 28, 56) 83.077deg, rgb(66, 28, 56) 110.769deg, rgb(74, 35, 62) 110.769deg, rgb(74, 35, 62) 138.462deg, rgb(83, 45, 70) 138.462deg, rgb(83, 45, 70) 166.154deg, rgb(91, 55, 81) 166.154deg, rgb(91, 55, 81) 193.846deg, rgb(99, 67, 93) 193.846deg, rgb(99, 67, 93) 221.538deg, rgb(105, 80, 107) 221.538deg, rgb(105, 80, 107) 249.231deg, rgb(110, 92, 122) 249.231deg, rgb(110, 92, 122) 276.923deg, rgb(112, 104, 138) 276.923deg, rgb(112, 104, 138) 304.615deg, rgb(112, 116, 153) 304.615deg, rgb(112, 116, 153) 332.308deg, rgb(110, 126, 169) 332.308deg, rgb(110, 126, 169) 360deg)',
                  }}
                >
                  {/* <CardContent className="h-full flex items-center justify-center"></CardContent> */}
                </Card>
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
            </CarouselItem>
          ))}
          <CarouselItem className="flex basis-40 pr-4">
            <Link href="/dashboard/chat" className="block w-36">
              <Card className="size-36">
                <CardContent className="h-full flex items-center justify-center">
                  <Plus className="size-10 text-primary" />
                </CardContent>
              </Card>
              <CardCaption className="mt-2 w-36">
                Tap to write a note.
              </CardCaption>
            </Link>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export { TastingNotesSlider };
