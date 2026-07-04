import type { Context } from "hono";
import type { ErrorHandler } from "hono/types";
import { AppError } from "../shared/errors";
import { logger } from "../utils/logger";

export const errorHandler: ErrorHandler = (err, c) => {
	if (err instanceof AppError) {
		return c.json(
			{
				success: false,
				message: err.message,
				code: err.code,
			},
			err.statusCode as any,
		);
	}

	logger.error("Unhandled error:", err);
	return c.json(
		{
			success: false,
			message: "Internal server error",
		},
		500,
	);
};
