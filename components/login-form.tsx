'use client';

import Form from 'next/form';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { GrapevineIcon } from '@/components/grapevine-icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient, signInWithGoogle } from '@/lib/auth/client';
import { cn } from '@/lib/utils';
import LoadingRipple from './loading-ripple';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const router = useRouter();

  type ActionState = {
    email: string;
    password: string;
    success: boolean;
  };

  async function handleEmailLogin(
    _previousState: ActionState,
    formData: FormData,
  ): Promise<ActionState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return { email, password, success: false };
    }

    return { email, password, success: true };
  }

  const [formState, formAction, isPending] = useActionState(handleEmailLogin, {
    email: '',
    password: '',
    success: false,
  });

  useEffect(() => {
    if (formState.success) {
      router.push(redirect);
    }
  }, [formState.success, redirect, router]);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form className="p-6 md:p-8" action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 mb-4"
                >
                  <GrapevineIcon className="size-8" />
                  <h1 className="text-2xl font-bold">Grapevine</h1>
                </Link>
                <h2 className="text-xl font-semibold">Welcome back</h2>
                <p className="text-muted-foreground text-balance">
                  Sign in to your account
                </p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  name="email"
                  required
                />
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <LoadingRipple /> : 'Sign In'}
              </Button>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 px-2 bg-card text-muted-foreground">
                  Or continue with
                </span>
              </div>

              <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={signInWithGoogle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-5"
                >
                  <title>Google Icon</title>
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
              </Button>

              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link
                  href={`/signup${redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
                  className="font-medium text-primary dark:text-secondary hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </Form>
          <div className="bg-muted relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <div className="text-center p-8"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
