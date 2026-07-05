import { eq } from "drizzle-orm";
import { db, schema } from "../../../database";

export class ProductRepository {
	async findAll() {
		return db.select().from(schema.products);
	}

	async findBySlug(slug: string) {
		const result = await db
			.select()
			.from(schema.products)
			.where(eq(schema.products.slug, slug))
			.limit(1);
		return result[0] || null;
	}

	async findById(id: string) {
		const result = await db
			.select()
			.from(schema.products)
			.where(eq(schema.products.id, id))
			.limit(1);
		return result[0] || null;
	}

	async create(data: any) {
		const result = await db.insert(schema.products).values(data).returning();
		return result[0];
	}

	async update(id: string, data: any) {
		const result = await db
			.update(schema.products)
			.set(data)
			.where(eq(schema.products.id, id))
			.returning();
		return result[0];
	}

	async delete(id: string) {
		await db.delete(schema.products).where(eq(schema.products.id, id));
	}
}
