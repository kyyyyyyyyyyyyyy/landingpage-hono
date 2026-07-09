import type { MidtransProvider } from "../../../providers/midtrans";
import { BadRequestError } from "../../../shared/errors";
import type { CreateOrderDto } from "../../orders/dto/create-order.dto";
import type { OrderRepository } from "../../orders/repositories/order.repository";
import type { ProductRepository } from "../../products/repositories/product.repository";
import type { PaymentRepository } from "../repositories/payment.repository";

export class PaymentService {
	constructor(
		private paymentRepo: PaymentRepository,
		private orderRepo: OrderRepository,
		private productRepo: ProductRepository,
		private midtrans: MidtransProvider,
	) {}

	async createTransaction(orderId: string) {
		const order = await this.orderRepo.findById(orderId);
		if (!order) throw new BadRequestError("Order not found");

		const product = await this.productRepo.findById(order.productId);
		if (!product) throw new BadRequestError("Product not found");

		const totalAmount = Number(order.totalAmount);

		const items: any[] = [
			{
				id: String(product.id),
				name: product.name,
				price: Number(product.price),
				quantity: order.quantity,
			},
		];

		if (Number(order.shippingCost) > 0) {
			items.push({
				id: "SHIPPING",
				name: "Ongkos Kirim",
				price: Number(order.shippingCost),
				quantity: 1,
			});
		}

		const transaction = await this.midtrans.createTransaction({
			orderId: order.orderCode,
			grossAmount: totalAmount,
			customerName: order.customerName,
			customerEmail: order.customerEmail,
			customerPhone: order.customerPhone,
			items,
		});

		await this.orderRepo.update(order.id, {
			totalAmount: String(totalAmount),
			snapToken: transaction.token,
			redirectUrl: transaction.redirectUrl,
			status: "waiting_payment",
		});

		await this.paymentRepo.create({
			orderId: order.id,
			grossAmount: String(totalAmount),
			status: "pending",
		});

		return transaction;
	}
}
