import { serve } from "@hono/node-server";
import { createApp } from "./app";
import { config } from "./config";
import { logger } from "./utils/logger";

const app = createApp();

serve(
	{
		fetch: app.fetch,
		port: config.app.port,
	},
	(info) => {
		logger.info(`Server running on http://localhost:${info.port}`);
	},
);
