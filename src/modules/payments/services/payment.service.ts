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

		const totalAmount = Number(product.price) * order.quantity;

		const transaction = await this.midtrans.createTransaction({
			orderId: order.orderCode,
			grossAmount: totalAmount,
			customerName: order.customerName,
			customerEmail: order.customerEmail,
			customerPhone: order.customerPhone,
			items: [
				{
					id: String(product.id),
					name: product.name,
					price: Number(product.price),
					quantity: order.quantity,
				},
			],
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
