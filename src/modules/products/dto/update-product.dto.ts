import { z } from "zod";
import { variantSchema } from "./create-product.dto";

export const updateProductSchema = z.object({
	name: z.string().min(1).optional(),
	slug: z.string().min(1).optional(),
	description: z.string().optional(),
	price: z.number().positive().optional(),
	weight: z.number().positive().optional(),
	image_url: z.string().url().optional(),
	isActive: z.boolean().optional(),
	variants: z.array(variantSchema)
		.optional()
		.refine((variants) => {
			if (!variants) return true;
			const names = variants.map(v => v.name.trim().toLowerCase());
			return names.length === new Set(names).size;
		}, {
			message: "Variant names must be unique",
		}),
});

export type UpdateProductDto = z.infer<typeof updateProductSchema>;
