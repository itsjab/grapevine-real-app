import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core';
import { user } from './auth';

const colors = ['white', 'rose', 'red'] as const;
const colorIntensity = ['pale', 'medium', 'deep'] as const;
const colorShade = [
  'green',
  'lemon',
  'gold',
  'amber',
  'brown',
  'pink',
  'salmon',
  'orange',
  'purple',
  'ruby',
  'garnet',
  'brick',
  'brown',
] as const;

const noseIntensity = [
  'light',
  'medium-',
  'medium',
  'medium+',
  'pronounced',
] as const;
const palateIntensity = [
  'light',
  'medium-',
  'medium',
  'medium+',
  'pronounced',
] as const;
const finish = ['short', 'medium-', 'medium', 'medium+', 'long'] as const;
const sweetness = [
  'dry',
  'off-dry',
  'medium-dry',
  'medium-sweet',
  'sweet',
] as const;
const acidity = ['low', 'medium-', 'medium', 'medium+', 'high'] as const;
const tannins = ['low', 'medium-', 'medium', 'medium+', 'high'] as const;
const body = ['light', 'medium-', 'medium', 'medium+', 'full'] as const;
const alcohol = ['low', 'medium', 'high'] as const;

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
  teaser: text('teaser'),
  description: text('description'),
  ...timestamps,
});

export const appellationRegion = sqliteTable(
  'regions_to_appellations',
  {
    appellationId: text('appellation_id')
      .notNull()
      .references(() => appellation.id),
    regionId: text('region_id')
      .notNull()
      .references(() => region.id),
    ...timestamps,
  },
  (table) => [primaryKey({ columns: [table.appellationId, table.regionId] })],
);

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
  summary: text('summary').notNull(),
  appearance: text(),
  nose: text(),
  palate: text(),
  conclusion: text(),
  vintage: text('vintage'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  wineId: text('wine_id').references(() => wine.id, { onDelete: 'set null' }),
  color: text('color', { enum: colors }),
  colorIntensity: text('color_intensity', { enum: colorIntensity }),
  colorShade: text('color_shade', { enum: colorShade }),
  noseIntensity: text('nose_intensity', { enum: noseIntensity }),
  palateIntensity: text('palate_intensity', { enum: palateIntensity }),
  finish: text('finish', { enum: finish }),
  sweetness: text('sweetness', { enum: sweetness }),
  acidity: text('acidity', { enum: acidity }),
  tannins: text('tannins', { enum: tannins }),
  body: text('body', { enum: body }),
  alcohol: text('alcohol', { enum: alcohol }),
  rating: integer('rating').default(75),
  ...timestamps,
});
