import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const turso = createClient({
  url: 'libsql://grapevine-real-app-eng-why.turso.io',
  authToken:
    'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NTMwMzkyNzgsImlkIjoiYjE5ZjgxOTgtODljOC00OGZkLWEzOWMtYjQ4YzE0NTAwNGY3In0.eQ6mbW4vJeWysFr0-y3luXzzvFvH_nRoyPNu4CWUmIGEjA9XacjjSnis96JR4lUW2tdeMFmOFw68jsymsJC7Cg',
});

export const db = drizzle(turso);
