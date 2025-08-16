import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { SignupForm } from '@/components/signup-form';
import { auth } from '@/lib/auth';

export default async function SignupPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && !session.user.isAnonymous) {
    return redirect('/');
  }

  return (
    <div className="w-full bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full md:max-w-3xl">
        <Suspense>
          <SignupForm />
        </Suspense>
      </div>
    </div>
  );
}
