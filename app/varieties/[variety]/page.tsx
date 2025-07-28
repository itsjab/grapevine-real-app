import { generateSummary, generateVarietalGuide } from './query';

export default async function Home({
  params,
}: {
  params: Promise<{ variety: string }>;
}) {
  const variety = (await params).variety;

  const guide = await generateVarietalGuide(variety);
  const summary = await generateSummary(variety);

  return (
    <div>
      <p>{summary}</p>
      <section>{guide}</section>
    </div>
  );
}
