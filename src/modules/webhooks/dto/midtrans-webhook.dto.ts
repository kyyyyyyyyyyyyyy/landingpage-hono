import { z } from "zod";

export const midtransWebhookSchema = z.object({
	transaction_status: z.string(),
	order_id: z.string(),
	gross_amount: z.string(),
	transaction_id: z.string(),
	payment_type: z.string(),
	settlement_time: z.string().optional(),
	status_code: z.string(),
	signature_key: z.string(),
});

export type MidtransWebhookDto = z.infer<typeof midtransWebhookSchema>;
