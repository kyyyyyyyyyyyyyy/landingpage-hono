import type { Context } from "hono";
import { ok } from "../../../shared/helpers/response";
import type { PaymentService } from "../services/payment.service";

export class PaymentController {
	constructor(private service: PaymentService) {}

	async createTransaction(c: Context) {
		const orderId = String(c.req.param("orderId"));
		const result = await this.service.createTransaction(orderId);
		return ok(c, result);
	}
}
