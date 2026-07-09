import { z } from "zod";

export const shippingAddressSchema = z.object({
	name: z.string().min(1),
	phone: z.string().min(1),
	address: z.string().min(1),
	city: z.string().min(1),
	state: z.string().min(1),
	postalCode: z.string().min(1),
	country: z.string().min(1),
});

export const createOrderSchema = z.object({
	productId: z.string().uuid(),
	quantity: z.number().positive().default(1),
	customerName: z.string().min(1),
	customerEmail: z.string().email(),
	customerPhone: z.string().min(1),
	shippingAddress: shippingAddressSchema,
	shippingCost: z.number().nonnegative().default(0),
});

export type CreateOrderDto = z.infer<typeof createOrderSchema>;
