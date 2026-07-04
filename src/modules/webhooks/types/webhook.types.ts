import type { BiteshipWebhookPayload } from "../../../providers/biteship";
import type { MidtransWebhookPayload } from "../../../providers/midtrans";

export type WebhookHandler<T = unknown> = (payload: T) => Promise<void>;

export interface WebhookResult {
	received: boolean;
	message: string;
}
