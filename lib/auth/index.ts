import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { anonymous } from 'better-auth/plugins';
import { db } from '@/lib/db';

import * as authSchema from '@/lib/db/schema/auth';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: {
      ...authSchema,
      user: authSchema.user,
    },
  }),
  plugins: [nextCookies(), anonymous()],
});

export type Session = typeof auth.$Infer.Session;
export type User = (typeof auth.$Infer.Session)['user'];
