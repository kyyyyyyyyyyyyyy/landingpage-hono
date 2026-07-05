import { desc, eq } from "drizzle-orm";
import { db, schema } from "../../../database";

export class OrderRepository {
	async findAll() {
		return db
			.select()
			.from(schema.orders)
			.orderBy(desc(schema.orders.createdAt));
	}

	async findByCode(code: string) {
		const result = await db
			.select()
			.from(schema.orders)
			.where(eq(schema.orders.orderCode, code))
			.limit(1);
		return result[0] || null;
	}

	async findById(id: string) {
		const result = await db
			.select()
			.from(schema.orders)
			.where(eq(schema.orders.id, id))
			.limit(1);
		return result[0] || null;
	}

	async create(data: any) {
		const result = await db.insert(schema.orders).values(data).returning();
		return result[0];
	}

	async update(id: string, data: any) {
		const result = await db
			.update(schema.orders)
			.set(data)
			.where(eq(schema.orders.id, id))
			.returning();
		return result[0];
	}
}
