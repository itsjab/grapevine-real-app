import type { InferSelectModel } from 'drizzle-orm';
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
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
  appearance: text().notNull(),
  nose: text().notNull(),
  palate: text().notNull(),
  conclusion: text().notNull(),
  vintage: text('vintage'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  wineId: text('wine_id').references(() => wine.id, { onDelete: 'set null' }),
  wineName: text('wine_name'),
  grapeVarieties: text('grape_varieties'),
  regionId: text('region_id').references(() => region.id, {
    onDelete: 'set null',
  }),
  appellationId: text('appellation_id').references(() => appellation.id, {
    onDelete: 'set null',
  }),
  producerId: text('producer_id').references(() => producer.id, {
    onDelete: 'set null',
  }),
  regionName: text('region_name'),
  appellationName: text('appellation_name'),
  producerName: text('producer_name'),
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
  gradient: text({ mode: 'json' }),
  ...timestamps,
});

export type TastingNoteSelect = InferSelectModel<typeof tastingNote>;

export const createTastingNoteSchema = createInsertSchema(tastingNote);

export const tastingNoteToolInputSchema = z.object({
  title: z
    .string()
    .max(200)
    .describe(
      'One-line title for the tasting note, typical the wine name, vintage, and producer.',
    ),
  summary: z
    .string()
    .describe(
      'A brief summary of the tasting note, for example: The wine has aromas of ripe strawberries, cherries, and blackberries, accompanied by subtle spicy notes. On the palate, the wine is full-bodied and presents itself with fine tannins.',
    ),
  appearance: z
    .string()
    .describe(
      'A detailed description of the wine’s appearance, including color, clarity, and viscosity. Improve the writing if necessary. For example: Deep ruby, slightly clear towards the rim. High viscosity.',
    ),
  nose: z
    .string()
    .describe(
      'A detailed description of the wine’s nose. Improve the writing if necessary. For example: The nose is pronounced with aromas of ripe red and dark fruit: strawberries, cherries, and blackberries. A subtle spice note of black pepper, clove and licorice. Im',
    ),
  palate: z
    .string()
    .describe(
      'A detailed description of the wine’s palate. Improve the writing if necessary. For example: On the palate, the wine is dry, full-bodied, with pronounced but fine tannins. The medium acidity provides balance and lends the wine freshness. Again, ripe red and dark fruit. Subtle spice note: black pepper, licorice, and clove. Long finish, high in alcohol (14.5%).',
    ),
  conclusion: z
    .string()
    .describe(
      'The quality assessment of the wine, including a rating on a 100-point scale. Improve the writing if necessary. For example: 93 Points. Excellent wine from Languedoc.',
    ),
  vintage: z.string().optional(),
  wineName: z.string().optional(),
  grapeVarieties: z
    .string()
    .describe(
      'A comma-separated list of grape varieties used in the wine. For example: Grenache, Syrah, Mourvèdre.',
    ),
  regionName: z.string().optional(),
  appellationName: z.string().optional(),
  producerName: z.string().optional(),
  color: z.enum(colors),
  colorIntensity: z
    .enum(colorIntensity)
    .optional()
    .describe(
      'The intensity of the wine’s color, for example: pale, medium, deep. If not provided, infer from user input.',
    ),
  colorShade: z.enum(colorShade),
  noseIntensity: z
    .enum(noseIntensity)
    .optional()
    .describe(
      'The intensity of the wine’s nose, for example: light, medium-, medium, medium+, pronounced. If not provided, infer from user input.',
    ),
  palateIntensity: z
    .enum(palateIntensity)
    .optional()
    .describe(
      'The intensity of the wine’s palate, for example: light, medium-, medium, medium+, pronounced. If not provided, infer from user input.',
    ),
  finish: z.enum(finish),
  sweetness: z.enum(sweetness),
  acidity: z.enum(acidity),
  tannins: z.enum(tannins),
  body: z.enum(body),
  alcohol: z.enum(alcohol),
  rating: z.number().int().min(50).max(100).default(75),
});

export type TastingNoteToolInput = z.infer<typeof tastingNoteToolInputSchema>;
