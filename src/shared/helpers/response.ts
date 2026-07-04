import type { Context } from "hono";

export function ok(c: Context, data: unknown, message = "Success") {
	return c.json({ success: true, message, data });
}

export function created(c: Context, data: unknown, message = "Created") {
	return c.json({ success: true, message, data }, 201);
}

export function paginated(
	c: Context,
	data: unknown[],
	meta: { page: number; perPage: number; total: number },
) {
	return c.json({
		success: true,
		data,
		meta: {
			page: meta.page,
			perPage: meta.perPage,
			total: meta.total,
			totalPages: Math.ceil(meta.total / meta.perPage),
		},
	});
}
