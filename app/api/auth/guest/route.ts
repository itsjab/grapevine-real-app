import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get('redirectUrl') || '/chat';

  await auth.api.signInAnonymous();

  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
