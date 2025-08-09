import Link from 'next/dist/client/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type TastingNoteTextCardProps = {
  title: string;
  summary: string;
  appearance: string;
  nose: string;
  palate: string;
  conclusion: string;
  grapeVarieties: string | null;
  regionName: string | null;
};

export function TastingNoteTextCard({
  title,
  summary,
  appearance,
  nose,
  palate,
  conclusion,
  grapeVarieties,
  regionName,
}: TastingNoteTextCardProps) {
  return (
    <Card className="md:max-w-96">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
        {regionName || grapeVarieties ? (
          <div className="flex flex-wrap gap-1">
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
        <CardDescription className="text-sm">{summary}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-xl font-semibold mb-2">Appearance</p>
          <p className="text-sm">{appearance}</p>
        </div>

        <div>
          <p className="text-xl font-semibold mb-2">Nose</p>
          <p className="text-sm">{nose}</p>
        </div>

        <div>
          <p className="text-xl font-semibold mb-2">Palate</p>
          <p className="text-sm">{palate}</p>
        </div>

        <div>
          <p className="text-xl font-semibold mb-2">Assessment</p>
          <p className="text-sm">{conclusion}</p>
        </div>
      </CardContent>
    </Card>
  );
}
