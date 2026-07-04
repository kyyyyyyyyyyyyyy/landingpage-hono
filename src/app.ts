import { Hono } from "hono";
import { corsMiddleware, errorHandler } from "./middlewares";
import { authRouter } from "./modules/auth";
import { orderRouter } from "./modules/orders";
import { paymentRouter } from "./modules/payments";
import { productRouter } from "./modules/products";
import { shipmentRouter } from "./modules/shipments";
import { webhookRouter } from "./modules/webhooks";

export function createApp() {
	const app = new Hono();

	app.use("*", corsMiddleware);
	app.onError(errorHandler);

	// Health check
	app.get("/health", (c) => c.json({ status: "ok" }));

	// Mount modules
	app.route("/api/v1/auth", authRouter);
	app.route("/api/v1/products", productRouter);
	app.route("/api/v1/orders", orderRouter);
	app.route("/api/v1/payments", paymentRouter);
	app.route("/api/v1/shipments", shipmentRouter);

	// Webhooks (no auth, verified by signature)
	app.route("/api/v1/webhooks", webhookRouter);

	return app;
}

export type App = ReturnType<typeof createApp>;
