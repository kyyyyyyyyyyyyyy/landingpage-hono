import type { Context } from "hono";
import { ok } from "../../../shared/helpers/response";
import { ShipmentRepository } from "../repositories/shipment.repository";
import type { ShipmentService } from "../services/shipment.service";

export class ShipmentController {
	private repo: ShipmentRepository;

	constructor(private service: ShipmentService) {
		this.repo = new ShipmentRepository();
	}

	async create(c: Context) {
		const orderId = Number(c.req.param("orderId"));
		const result = await this.service.createShipment(orderId);
		return ok(c, result);
	}

	async getByOrder(c: Context) {
		const orderId = Number(c.req.param("orderId"));
		const shipment = await this.repo.findByOrderId(orderId);
		return ok(c, shipment);
	}
}
