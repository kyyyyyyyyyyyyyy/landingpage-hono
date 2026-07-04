import { z } from "zod";

export const updateProductSchema = z.object({
	name: z.string().min(1).optional(),
	slug: z.string().min(1).optional(),
	description: z.string().optional(),
	price: z.number().positive().optional(),
	weight: z.number().positive().optional(),
	image_url: z.string().url().optional(),
	isActive: z.boolean().optional(),
});

export type UpdateProductDto = z.infer<typeof updateProductSchema>;
