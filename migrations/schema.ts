import { sqliteTable, AnySQLiteColumn, foreignKey, text, integer, uniqueIndex, primaryKey } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const account = sqliteTable("account", {
	id: text().primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: integer("access_token_expires_at"),
	refreshTokenExpiresAt: integer("refresh_token_expires_at"),
	scope: text(),
	password: text(),
	createdAt: integer("created_at").notNull(),
	updatedAt: integer("updated_at").notNull(),
});

export const session = sqliteTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: integer("expires_at").notNull(),
	token: text().notNull(),
	createdAt: integer("created_at").notNull(),
	updatedAt: integer("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
},
(table) => [
	uniqueIndex("session_token_unique").on(table.token),
]);

export const user = sqliteTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: integer("email_verified").notNull(),
	image: text(),
	createdAt: integer("created_at").notNull(),
	updatedAt: integer("updated_at").notNull(),
},
(table) => [
	uniqueIndex("user_email_unique").on(table.email),
]);

export const verification = sqliteTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: integer("expires_at").notNull(),
	createdAt: integer("created_at"),
	updatedAt: integer("updated_at"),
});

export const appellation = sqliteTable("appellation", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	regionId: text("region_id").references(() => region.id, { onDelete: "set null" } ),
	teaser: text(),
	description: text(),
	updatedAt: integer(),
	createdAt: integer(),
	deletedAt: integer(),
});

export const grapeVariety = sqliteTable("grape_variety", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	teaser: text(),
	description: text(),
	updatedAt: integer(),
	createdAt: integer(),
	deletedAt: integer(),
});

export const producer = sqliteTable("producer", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	updatedAt: integer(),
	createdAt: integer(),
	deletedAt: integer(),
});

export const region = sqliteTable("region", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	country: text(),
	teaser: text(),
	description: text(),
	updatedAt: integer(),
	createdAt: integer(),
	deletedAt: integer(),
});

export const tastingNote = sqliteTable("tasting_note", {
	id: text().primaryKey().notNull(),
	title: text().notNull(),
	summary: text().notNull(),
	vintage: text(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	wineId: text("wine_id").references(() => wine.id, { onDelete: "set null" } ),
	updatedAt: integer(),
	createdAt: integer(),
	deletedAt: integer(),
	appearance: text(),
	nose: text(),
	palate: text(),
	conclusion: text(),
	color: text(),
	colorIntensity: text("color_intensity"),
	colorShade: text("color_shade"),
	noseIntensity: text("nose_intensity"),
	palateIntensity: text("palate_intensity"),
	finish: text(),
	sweetness: text(),
	acidity: text(),
	tannins: text(),
	body: text(),
	alcohol: text(),
	rating: integer().default(75),
});

export const wine = sqliteTable("wine", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	producerId: integer("producer_id").references(() => producer.id, { onDelete: "set null" } ),
	appellationId: integer("appellation_id").references(() => appellation.id, { onDelete: "set null" } ),
	updatedAt: integer(),
	createdAt: integer(),
	deletedAt: integer(),
});

export const regionsToAppellations = sqliteTable("regions_to_appellations", {
	appellationId: text("appellation_id").notNull().references(() => appellation.id),
	regionId: text("region_id").notNull().references(() => region.id),
	updatedAt: integer(),
	createdAt: integer(),
	deletedAt: integer(),
},
(table) => [
	primaryKey({ columns: [table.appellationId, table.regionId], name: "regions_to_appellations_appellation_id_region_id_pk"})
]);

