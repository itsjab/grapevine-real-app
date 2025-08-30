import { headers } from 'next/dist/server/request/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { GrapevineIcon } from '@/components/grapevine-icon';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect('/dashboard');
  }

  return (
    <main className="w-full max-w-xl mx-auto flex flex-col items-center justify-center h-screen px-4 -mt-10">
      <div className="flex gap-2">
        <GrapevineIcon />
        <h1 className="text-2xl">Grapevine</h1>
      </div>

      <p className="mt-2 px-6 text-center">
        The wine companion for MWs and those in the making.
      </p>

      <ul className="mt-10 space-y-2">
        <li className="flex gap-1">
          <GrapevineIcon className="size-4 mt-1" />
          Develop your palate with detailed tasting notes
        </li>
        <li className="flex gap-1">
          <GrapevineIcon className="size-4 mt-1" />
          Keep track of the wines you (don't) like
        </li>
        <li className="flex gap-1">
          <GrapevineIcon className="size-4 mt-1" />
          Learn to identify grape varieties, regions, and wine styles.
        </li>
      </ul>

      <div className="flex gap-4 mt-6 md:mt-10">
        <Button asChild>
          <Link href="/signup">Sign up (it's free)</Link>
        </Button>
        <Button asChild variant={'ghost'}>
          <Link href="/api/auth/guest">Try as guest</Link>
        </Button>
      </div>
    </main>
  );
}
