import { zValidator } from "@hono/zod-validator";
import { createOrderSchema } from "../dto/create-order.dto";

export const validateCreateOrder = zValidator("json", createOrderSchema);
