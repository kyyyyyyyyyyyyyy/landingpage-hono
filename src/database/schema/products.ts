import {
	integer,
	numeric,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	slug: varchar("slug", { length: 255 }).notNull().unique(),
	description: text("description"),
	price: numeric("price", { precision: 12, scale: 2 }).notNull(),
	weight: integer("weight").notNull().default(1000),
	imageUrl: varchar("image_url", { length: 500 }),
	landingPageId: integer("landing_page_id").notNull().default(1),
	isActive: varchar("is_active", { length: 10 }).notNull().default("true"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
