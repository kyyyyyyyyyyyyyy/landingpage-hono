import { z } from "zod";

export const biteshipWebhookSchema = z.object({
	tracking_id: z.string(),
	waybill_id: z.string(),
	status: z.string(),
	delivered_at: z.string().optional(),
});

export type BiteshipWebhookDto = z.infer<typeof biteshipWebhookSchema>;
