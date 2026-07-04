import type { Hono } from "hono";

export interface IModuleController {
	registerRoutes(router: Hono): void;
}
