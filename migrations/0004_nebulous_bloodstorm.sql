CREATE TABLE `regions_to_appellations` (
	`appellation_id` text NOT NULL,
	`region_id` text NOT NULL,
	`updatedAt` integer,
	`createdAt` integer,
	`deletedAt` integer,
	PRIMARY KEY(`appellation_id`, `region_id`),
	FOREIGN KEY (`appellation_id`) REFERENCES `appellation`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`region_id`) REFERENCES `region`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `appellation_region`;