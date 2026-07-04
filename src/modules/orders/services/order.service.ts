import { NotFoundError } from "../../../shared/errors";
import type { CreateOrderDto } from "../dto/create-order.dto";
import type { OrderRepository } from "../repositories/order.repository";

export class OrderService {
	constructor(private repo: OrderRepository) {}

	async findAll() {
		return this.repo.findAll();
	}

	async findByCode(code: string) {
		const order = await this.repo.findByCode(code);
		if (!order) throw new NotFoundError("Order not found");
		return order;
	}

	async findById(id: number) {
		const order = await this.repo.findById(id);
		if (!order) throw new NotFoundError("Order not found");
		return order;
	}

	async create(dto: CreateOrderDto) {
		const orderCode = await this.generateOrderCode();
		return this.repo.create({
			orderCode,
			productId: dto.productId,
			customerName: dto.customerName,
			customerEmail: dto.customerEmail,
			customerPhone: dto.customerPhone,
			shippingAddress: JSON.stringify(dto.shippingAddress),
			quantity: dto.quantity,
			totalAmount: "0",
			status: "pending",
		});
	}

	async update(id: number, data: Record<string, unknown>) {
		await this.findById(id);
		return this.repo.update(id, data);
	}

	private async generateOrderCode(): Promise<string> {
		const prefix = "INV";
		const timestamp = Date.now().toString(36).toUpperCase();
		const random = Math.random().toString(36).substring(2, 6).toUpperCase();
		return `${prefix}${timestamp}${random}`;
	}
}
