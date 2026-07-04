import { zValidator } from "@hono/zod-validator";
import { biteshipWebhookSchema } from "../dto/biteship-webhook.dto";
import { midtransWebhookSchema } from "../dto/midtrans-webhook.dto";

export const validateMidtransWebhook = zValidator(
	"json",
	midtransWebhookSchema,
);
export const validateBiteshipWebhook = zValidator(
	"json",
	biteshipWebhookSchema,
);
