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

	async createShipment(orderId: string) {
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
			courierType: "reg",
			origin: {
				name: "Go Store",
				phone: "6281234567890",
				address: "Jl. Contoh No. 1",
				city: "Jakarta",
				postalCode: "45556",
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
					value: Number(product.price),
					quantity: order.quantity,
					weight: product.weight,
				},
			],
		});

		await this.repo.create({
			orderId: order.id,
			courier: shipment.courier,
			trackingId: shipment.trackingId,
			waybillId: shipment.waybillId,
			status: "processing",
			courierService: shipment.courierService,
			shippingCost: String(shipment.shippingCost),
			rawResponse: JSON.stringify(shipment),
		});

		await this.orderRepo.update(order.id, {
			status: "shipped" as OrderStatus,
		});

		return shipment;
	}
}
