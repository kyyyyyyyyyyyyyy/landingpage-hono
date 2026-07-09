import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { createProductSchema } from "../dto/create-product.dto";
import { updateProductSchema } from "../dto/update-product.dto";

export const validateCreateProduct = zValidator("json", createProductSchema);
export const validateUpdateProduct = zValidator("json", updateProductSchema);

export const uuidSchema = z.string().uuid("Invalid UUID format");

export const validateUUID = (id: string): boolean => {
	try {
		uuidSchema.parse(id);
		return true;
	} catch {
		return false;
	}
};
