import { relations } from "drizzle-orm/relations";
import { user, account, session, region, appellation, wine, tastingNote, producer, regionsToAppellations } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
	tastingNotes: many(tastingNote),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const appellationRelations = relations(appellation, ({one, many}) => ({
	region: one(region, {
		fields: [appellation.regionId],
		references: [region.id]
	}),
	wines: many(wine),
	regionsToAppellations: many(regionsToAppellations),
}));

export const regionRelations = relations(region, ({many}) => ({
	appellations: many(appellation),
	regionsToAppellations: many(regionsToAppellations),
}));

export const tastingNoteRelations = relations(tastingNote, ({one}) => ({
	wine: one(wine, {
		fields: [tastingNote.wineId],
		references: [wine.id]
	}),
	user: one(user, {
		fields: [tastingNote.userId],
		references: [user.id]
	}),
}));

export const wineRelations = relations(wine, ({one, many}) => ({
	tastingNotes: many(tastingNote),
	appellation: one(appellation, {
		fields: [wine.appellationId],
		references: [appellation.id]
	}),
	producer: one(producer, {
		fields: [wine.producerId],
		references: [producer.id]
	}),
}));

export const producerRelations = relations(producer, ({many}) => ({
	wines: many(wine),
}));

export const regionsToAppellationsRelations = relations(regionsToAppellations, ({one}) => ({
	region: one(region, {
		fields: [regionsToAppellations.regionId],
		references: [region.id]
	}),
	appellation: one(appellation, {
		fields: [regionsToAppellations.appellationId],
		references: [appellation.id]
	}),
}));