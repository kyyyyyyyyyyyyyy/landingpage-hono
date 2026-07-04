import { z } from "zod";

export const paymentResponseSchema = z.object({
	id: z.number(),
	orderId: z.number(),
	transactionId: z.string().nullable(),
	grossAmount: z.string(),
	status: z.string(),
	paymentType: z.string().nullable(),
	settledAt: z.string().nullable(),
	createdAt: z.string(),
});

export type PaymentResponseDto = z.infer<typeof paymentResponseSchema>;
