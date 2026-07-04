import type { BiteshipProvider } from "../../../providers/biteship";
import { BadRequestError, NotFoundError } from "../../../shared/errors";
import type { OrderRepository } from "../../orders/repositories/order.repository";
import type { OrderStatus } from "../../orders/types/order.types";
import type { ProductRepository } from "../../products/repositories/product.repository";
import type { ShipmentRepository } from "../repositories/shipment.repository";

export class ShipmentService {
	constructor(
		private repo: ShipmentRepository,
		private orderRepo: OrderRepository,
		private productRepo: ProductRepository,
		private biteship: BiteshipProvider,
	) {}

	async createShipment(orderId: number) {
		const order = await this.orderRepo.findById(orderId);
		if (!order) throw new NotFoundError("Order not found");

		const product = await this.productRepo.findById(order.productId);
		if (!product) throw new NotFoundError("Product not found");

		const address = order.shippingAddress as {
			name: string;
			phone: string;
			address: string;
			city: string;
			state: string;
			postalCode: string;
			country: string;
		};

		const shipment = await this.biteship.createShipment({
			orderId: order.orderCode,
			courier: "jne",
			courierService: "reg",
			origin: {
				name: "Go Store",
				phone: "6281234567890",
				address: "Jl. Contoh No. 1",
				city: "Jakarta",
				postalCode: "12345",
			},
			destination: {
				name: address.name,
				phone: address.phone,
				address: address.address,
				city: address.city,
				postalCode: address.postalCode,
			},
			items: [
				{
					name: product.name,
					quantity: order.quantity,
					weight: product.weight,
					price: Number(product.price),
				},
			],
		});

		await this.repo.create({
			orderId: order.id,
			courier: shipment.courier,
			trackingId: shipment.tracking_id,
			waybillId: shipment.waybill_id,
			status: "processing",
			courierService: shipment.courier_service,
			shippingCost: String(shipment.shipping_cost),
			rawResponse: JSON.stringify(shipment),
		});

		await this.orderRepo.update(order.id, {
			status: "shipped" as OrderStatus,
		});

		return shipment;
	}
}
