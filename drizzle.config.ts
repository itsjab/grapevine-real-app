import './envConfig.ts';

import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/db/schema',
  out: './migrations',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;
