import { eq } from "drizzle-orm";
import { db, schema } from "../../../database";

export class AuthRepository {
	async findByEmail(email: string) {
		const result = await db
			.select()
			.from(schema.users)
			.where(eq(schema.users.email, email))
			.limit(1);
		return result[0] || null;
	}

	async findById(id: string) {
		const result = await db
			.select()
			.from(schema.users)
			.where(eq(schema.users.id, id))
			.limit(1);
		return result[0] || null;
	}

	async create(data: {
		name: string;
		email: string;
		password: string;
	}) {
		const result = await db.insert(schema.users).values(data).returning();
		return result[0];
	}
}
