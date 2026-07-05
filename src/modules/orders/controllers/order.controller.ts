import type { Context } from "hono";
import { created, ok } from "../../../shared/helpers/response";
import type { CreateOrderDto } from "../dto/create-order.dto";
import type { OrderService } from "../services/order.service";

export class OrderController {
	constructor(private service: OrderService) {}

	async list(c: Context) {
		const orders = await this.service.findAll();
		return ok(c, orders);
	}

	async getById(c: Context) {
		const id = String(c.req.param("id"));
		const order = await this.service.findById(id);
		return ok(c, order);
	}

	async getByCode(c: Context) {
		const code = c.req.param("code") as string;
		const order = await this.service.findByCode(code);
		return ok(c, order);
	}

	async create(c: Context) {
		const dto = (c.req.valid as any)("json") as CreateOrderDto;
		const order = await this.service.create(dto);
		return created(c, order);
	}
}
