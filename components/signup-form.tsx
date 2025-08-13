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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const router = useRouter();

  type ActionState = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    success: boolean;
  };

  async function handleEmailSignup(
    _previousState: ActionState,
    formData: FormData,
  ): Promise<ActionState> {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return { name, email, password, confirmPassword, success: false };
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return { name, email, password, confirmPassword, success: false };
    }

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Account created successfully!');
    }

    return {
      name,
      email,
      password,
      confirmPassword,
      success: Boolean(data && !error),
    };
  }

  const [formState, formAction, isPending] = useActionState(handleEmailSignup, {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <GrapevineIcon className="size-8" />
                  <h1 className="text-2xl font-bold">Grapevine</h1>
                </Link>
                <h2 className="text-xl font-semibold">Create your account</h2>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <LoadingRipple /> : 'Create Account'}
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
                Already have an account?{' '}
                <Link
                  href={`/login${redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </Form>
          <div className="bg-muted relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <div className="text-center p-8">
                {/* <h3 className="text-lg font-semibold mb-4">
                  Start Your Wine Journey
                </h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="size-2 bg-primary rounded-full" />
                    <span className="text-sm text-muted-foreground">
                      Save and organize your tasting notes
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="size-2 bg-primary rounded-full" />
                    <span className="text-sm text-muted-foreground">
                      Discover new wines and varietals
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="size-2 bg-primary rounded-full" />
                    <span className="text-sm text-muted-foreground">
                      Chat with our AI wine expert
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
