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

export const payments = pgTable("payments", {
	id: serial("id").primaryKey(),
	orderId: integer("order_id").notNull(),
	transactionId: varchar("transaction_id", { length: 255 }),
	grossAmount: numeric("gross_amount", { precision: 12, scale: 2 }).notNull(),
	status: varchar("status", { length: 50 }).notNull().default("pending"),
	paymentType: varchar("payment_type", { length: 50 }),
	rawResponse: jsonb("raw_response"),
	settledAt: timestamp("settled_at"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
