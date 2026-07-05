import {
	integer,
	jsonb,
	pgTable,
	text,
	timestamp,
	varchar,
	uuid,
} from "drizzle-orm/pg-core";

export const shipments = pgTable("shipments", {
	id: uuid("id").defaultRandom().primaryKey(),
	orderId: uuid("order_id").notNull(),
	courier: varchar("courier", { length: 100 }),
	trackingId: varchar("tracking_id", { length: 255 }),
	waybillId: varchar("waybill_id", { length: 255 }),
	status: varchar("status", { length: 50 }).notNull().default("pending"),
	courierService: varchar("courier_service", { length: 100 }),
	shippingCost: varchar("shipping_cost", { length: 50 }),
	rawResponse: jsonb("raw_response"),
	deliveredAt: timestamp("delivered_at"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
