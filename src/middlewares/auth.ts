import type { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { config } from "../config";
import { UnauthorizedError } from "../shared/errors";

export async function authMiddleware(c: Context, next: Next) {
	const header = c.req.header("Authorization");
	if (!header?.startsWith("Bearer ")) {
		throw new UnauthorizedError("Missing or invalid token");
	}

	try {
		const token = header.slice(7);
		const payload = await verify(token, config.jwt.secret, "HS256");
		c.set("user", payload);
		await next();
	} catch {
		throw new UnauthorizedError("Invalid or expired token");
	}
}
