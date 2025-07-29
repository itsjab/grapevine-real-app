import { TastingNotesSlider } from '@/components/tasting-notes-slider';
import { TopPicks } from '@/components/top-picks';

export default async function Home() {
  return (
    <main className="grid gap-8">
      <TopPicks />
      <TastingNotesSlider />
    </main>
  );
}
