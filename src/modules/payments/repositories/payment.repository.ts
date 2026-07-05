import { eq } from "drizzle-orm";
import { db, schema } from "../../../database";

export class PaymentRepository {
	async findByOrderId(orderId: string) {
		const result = await db
			.select()
			.from(schema.payments)
			.where(eq(schema.payments.orderId, orderId))
			.limit(1);
		return result[0] || null;
	}

	async create(data: any) {
		const result = await db.insert(schema.payments).values(data).returning();
		return result[0];
	}

	async update(id: string, data: any) {
		const result = await db
			.update(schema.payments)
			.set(data)
			.where(eq(schema.payments.id, id))
			.returning();
		return result[0];
	}
}
