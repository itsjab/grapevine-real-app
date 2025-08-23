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
    <section>
      <h2 className="text-xl font-semibold mb-4">Your Tasting Notes</h2>
      <Carousel
        className="mt-4 -mx-4 max-w-screen"
        opts={{
          dragFree: true,
        }}
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
                  style={note.gradient ? note.gradient : {}}
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
    </section>
  );
}

export { TastingNotesSlider };
