import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { user } from './auth';

const timestamps = {
  updatedAt: integer({ mode: 'timestamp' }),
  createdAt: integer({ mode: 'timestamp' }).$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  deletedAt: integer({ mode: 'timestamp' }),
};

export const region = sqliteTable('region', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  country: text('country'),
  teaser: text('teaser'),
  description: text('description'),
  ...timestamps,
});

export const appellation = sqliteTable('appellation', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  regionId: text('region_id').references(() => region.id, {
    onDelete: 'set null',
  }),
  teaser: text('teaser'),
  description: text('description'),
  ...timestamps,
});

export const grapeVariety = sqliteTable('grape_variety', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  teaser: text('teaser'),
  description: text('description'),
  ...timestamps,
});

export const producer = sqliteTable('producer', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  ...timestamps,
});

export const wine = sqliteTable('wine', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  producerId: integer('producer_id').references(() => producer.id, {
    onDelete: 'set null',
  }),
  appellationId: integer('appellation_id').references(() => appellation.id, {
    onDelete: 'set null',
  }),
  ...timestamps,
});

export const tastingNote = sqliteTable('tasting_note', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  summary: text('summary'),
  description: text('description'),
  vintage: text('vintage'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  wineId: text('wine_id').references(() => wine.id, { onDelete: 'set null' }),
  ...timestamps,
});
