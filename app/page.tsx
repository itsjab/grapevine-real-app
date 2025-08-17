import { headers } from 'next/dist/server/request/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect('/dashboard');
  }

  return (
    <main>
      <h1>Welcome to Grapevine</h1>
    </main>
  );
}
