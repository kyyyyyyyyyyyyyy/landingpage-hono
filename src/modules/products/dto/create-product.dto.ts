import { z } from "zod";

export const variantSchema = z.object({
	name: z.string().min(1, "Variant name cannot be empty"),
	options: z.array(z.string().min(1, "Option value cannot be empty")).min(1, "At least one option is required"),
});

export const createProductSchema = z.object({
	name: z.string().min(1),
	slug: z.string().min(1),
	description: z.string().optional(),
	price: z.number().positive(),
	weight: z.number().positive().default(1000),
	image_url: z.string().url("Image URL must be a valid URL"),
	variants: z.array(variantSchema)
		.optional()
		.default([])
		.refine((variants) => {
			if (!variants) return true;
			const names = variants.map(v => v.name.trim().toLowerCase());
			return names.length === new Set(names).size;
		}, {
			message: "Variant names must be unique",
		}),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
