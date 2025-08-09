DROP INDEX "session_token_unique";--> statement-breakpoint
DROP INDEX "user_email_unique";--> statement-breakpoint
ALTER TABLE `tasting_note` ALTER COLUMN "appearance" TO "appearance" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
ALTER TABLE `tasting_note` ALTER COLUMN "nose" TO "nose" text NOT NULL;--> statement-breakpoint
ALTER TABLE `tasting_note` ALTER COLUMN "palate" TO "palate" text NOT NULL;--> statement-breakpoint
ALTER TABLE `tasting_note` ALTER COLUMN "conclusion" TO "conclusion" text NOT NULL;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `wine_name` text;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `grape_varieties` text;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `region_id` text REFERENCES region(id);--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `appellation_id` text REFERENCES appellation(id);--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `producer_id` text REFERENCES producer(id);--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `region_name` text;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `appellation_name` text;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `producer_name` text;--> statement-breakpoint
ALTER TABLE `tasting_note` DROP COLUMN `color`;