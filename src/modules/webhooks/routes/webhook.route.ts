import { Hono } from "hono";
import { WebhookController } from "../controllers/webhook.controller";
import {
	validateBiteshipWebhook,
	validateMidtransWebhook,
} from "../validators/webhook.validator";

const controller = new WebhookController();
const router = new Hono();

router.post("/midtrans", validateMidtransWebhook, (c) =>
	controller.handleMidtrans(c),
);
router.post("/biteship", validateBiteshipWebhook, (c) =>
	controller.handleBiteship(c),
);

export default router;
