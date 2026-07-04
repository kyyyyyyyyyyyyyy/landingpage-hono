import { z } from "zod";

export const createProductSchema = z.object({
	name: z.string().min(1),
	slug: z.string().min(1),
	description: z.string().optional(),
	price: z.number().positive(),
	weight: z.number().positive().default(1000),
	image_url: z.string().url().optional(),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
