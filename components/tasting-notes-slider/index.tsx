import { desc } from 'drizzle-orm';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Card, CardCaption, CardContent } from '@/components/ui/card';
import { db } from '@/lib/db';
import { tastingNote } from '@/lib/db/schema/wine';

async function getLatestTastingNotes() {
  const latestNotes = await db
    .select()
    .from(tastingNote)
    .orderBy(desc(tastingNote.createdAt))
    .limit(5);

  return latestNotes;
}

async function TastingNotesSlider() {
  const notes = await getLatestTastingNotes();

  if (!notes || notes.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Tasting Notes</h2>
        <Link href="/tasting-notes">
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
      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.summary}</p>
        </div>
      ))}
    </div>
  );
}

export { TastingNotesSlider };
