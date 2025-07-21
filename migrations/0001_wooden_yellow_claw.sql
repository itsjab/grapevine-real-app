CREATE TABLE `appellation` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`region_id` text,
	`teaser` text,
	`description` text,
	`updatedAt` integer,
	`createdAt` integer,
	`deletedAt` integer,
	FOREIGN KEY (`region_id`) REFERENCES `region`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `grape_variety` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`teaser` text,
	`description` text,
	`updatedAt` integer,
	`createdAt` integer,
	`deletedAt` integer
);
--> statement-breakpoint
CREATE TABLE `producer` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`updatedAt` integer,
	`createdAt` integer,
	`deletedAt` integer
);
--> statement-breakpoint
CREATE TABLE `region` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`country` text,
	`teaser` text,
	`description` text,
	`updatedAt` integer,
	`createdAt` integer,
	`deletedAt` integer
);
--> statement-breakpoint
CREATE TABLE `tasting_note` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`summary` text,
	`description` text,
	`vintage` text,
	`user_id` text NOT NULL,
	`wine_id` text,
	`updatedAt` integer,
	`createdAt` integer,
	`deletedAt` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`wine_id`) REFERENCES `wine`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `wine` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`producer_id` integer,
	`appellation_id` integer,
	`updatedAt` integer,
	`createdAt` integer,
	`deletedAt` integer,
	FOREIGN KEY (`producer_id`) REFERENCES `producer`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`appellation_id`) REFERENCES `appellation`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
DROP TABLE `foo`;