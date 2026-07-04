import {
	integer,
	jsonb,
	numeric,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
	id: serial("id").primaryKey(),
	orderCode: varchar("order_code", { length: 50 }).notNull().unique(),
	productId: integer("product_id").notNull(),
	customerName: varchar("customer_name", { length: 255 }).notNull(),
	customerEmail: varchar("customer_email", { length: 255 }).notNull(),
	customerPhone: varchar("customer_phone", { length: 50 }).notNull(),
	shippingAddress: jsonb("shipping_address").notNull(),
	quantity: integer("quantity").notNull().default(1),
	totalAmount: numeric("total_amount", { precision: 12, scale: 2 }).notNull(),
	status: varchar("status", { length: 50 }).notNull().default("pending"),
	snapToken: text("snap_token"),
	redirectUrl: text("redirect_url"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
