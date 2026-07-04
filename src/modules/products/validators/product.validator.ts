import { zValidator } from "@hono/zod-validator";
import { createProductSchema } from "../dto/create-product.dto";
import { updateProductSchema } from "../dto/update-product.dto";

export const validateCreateProduct = zValidator("json", createProductSchema);
export const validateUpdateProduct = zValidator("json", updateProductSchema);
