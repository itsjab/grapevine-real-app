DROP INDEX "session_token_unique";--> statement-breakpoint
DROP INDEX "user_email_unique";--> statement-breakpoint
ALTER TABLE `tasting_note` ALTER COLUMN "summary" TO "summary" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `appearance` text;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `nose` text;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `palate` text;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `conclusion` text;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `color` text;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `color_intensity` text;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `color_shade` text;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `nose_intensity` text;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `palate_intensity` text;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `finish` text;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `sweetness` text;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `acidity` text;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `tannins` text;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `body` text;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `alcohol` text;--> statement-breakpoint
ALTER TABLE `tasting_note` ADD `rating` integer DEFAULT 75;--> statement-breakpoint
ALTER TABLE `tasting_note` DROP COLUMN `description`;