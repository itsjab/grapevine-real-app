import { relations } from "drizzle-orm/relations";
import { user, account, session, region, appellation, wine, tastingNote, producer, regionsToAppellations, chat, message, stream } from "./schema";

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
	chats: many(chat),
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

export const chatRelations = relations(chat, ({one, many}) => ({
	user: one(user, {
		fields: [chat.userId],
		references: [user.id]
	}),
	messages: many(message),
	streams: many(stream),
}));

export const messageRelations = relations(message, ({one}) => ({
	chat: one(chat, {
		fields: [message.chatId],
		references: [chat.id]
	}),
}));

export const streamRelations = relations(stream, ({one}) => ({
	chat: one(chat, {
		fields: [stream.chatId],
		references: [chat.id]
	}),
}));