import { Suspense } from 'react';
import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  return (
    <div className="w-full bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full md:max-w-3xl">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
