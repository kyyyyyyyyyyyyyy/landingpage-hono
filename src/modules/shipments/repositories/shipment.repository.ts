import { eq } from "drizzle-orm";
import { db, schema } from "../../../database";

export class ShipmentRepository {
	async findByOrderId(orderId: number) {
		const result = await db
			.select()
			.from(schema.shipments)
			.where(eq(schema.shipments.orderId, orderId))
			.limit(1);
		return result[0] || null;
	}

	async findByTrackingId(trackingId: string) {
		const result = await db
			.select()
			.from(schema.shipments)
			.where(eq(schema.shipments.trackingId, trackingId))
			.limit(1);
		return result[0] || null;
	}

	async findById(id: number) {
		const result = await db
			.select()
			.from(schema.shipments)
			.where(eq(schema.shipments.id, id))
			.limit(1);
		return result[0] || null;
	}

	async create(data: any) {
		const result = await db.insert(schema.shipments).values(data).returning();
		return result[0];
	}

	async update(id: number, data: any) {
		const result = await db
			.update(schema.shipments)
			.set(data)
			.where(eq(schema.shipments.id, id))
			.returning();
		return result[0];
	}
}
