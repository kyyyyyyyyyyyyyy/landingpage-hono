import { z } from "zod";

export const createShipmentSchema = z.object({
	orderId: z.number().positive(),
	courier: z.string().min(1),
	courierService: z.string().min(1),
});

export type CreateShipmentDto = z.infer<typeof createShipmentSchema>;
