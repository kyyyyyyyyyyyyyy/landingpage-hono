import type { Context } from "hono";
import { BiteshipProvider } from "../../../providers/biteship";
import type { BiteshipWebhookPayload } from "../../../providers/biteship";
import { MidtransProvider } from "../../../providers/midtrans";
import type { MidtransWebhookPayload } from "../../../providers/midtrans";
import { BadRequestError } from "../../../shared/errors";
import { ok } from "../../../shared/helpers/response";
import { ORDER_STATUS } from "../../orders/constants/order.constants";
import { OrderRepository } from "../../orders/repositories/order.repository";
import { PaymentRepository } from "../../payments/repositories/payment.repository";
import { ProductRepository } from "../../products/repositories/product.repository";
import { ShipmentRepository } from "../../shipments/repositories/shipment.repository";
import { ShipmentService } from "../../shipments/services/shipment.service";

export class WebhookController {
	private midtrans: MidtransProvider;
	private paymentRepo: PaymentRepository;
	private orderRepo: OrderRepository;
	private shipmentRepo: ShipmentRepository;
	private shipmentService: ShipmentService;

	constructor() {
		this.midtrans = new MidtransProvider();
		this.paymentRepo = new PaymentRepository();
		this.orderRepo = new OrderRepository();
		this.shipmentRepo = new ShipmentRepository();
		const productRepo = new ProductRepository();
		const biteship = new BiteshipProvider();
		this.shipmentService = new ShipmentService(
			this.shipmentRepo,
			this.orderRepo,
			productRepo,
			biteship,
		);
	}

	async handleMidtrans(c: Context) {
		const payload = (c.req.valid as any)("json") as MidtransWebhookPayload;

		const isValid = this.midtrans.verifySignature(payload);
		if (!isValid) throw new BadRequestError("Invalid signature");

		const order = await this.orderRepo.findByCode(payload.order_id);
		if (!order) throw new BadRequestError("Order not found");

		const payment = await this.paymentRepo.findByOrderId(order.id);

		if (payment && this.midtrans.isSettlement(payload.transaction_status)) {
			await this.paymentRepo.update(payment.id, {
				transactionId: payload.transaction_id,
				status: "settlement",
				paymentType: payload.payment_type,
				rawResponse: JSON.stringify(payload),
				settledAt: payload.settlement_time
					? new Date(payload.settlement_time)
					: new Date(),
			});

			await this.orderRepo.update(order.id, {
				status: ORDER_STATUS.PAID,
			});

			await this.shipmentService.createShipment(order.id);
		}

		if (payment && this.midtrans.isExpired(payload.transaction_status)) {
			await this.paymentRepo.update(payment.id, { status: "expire" });
			await this.orderRepo.update(order.id, { status: ORDER_STATUS.CANCELLED });
		}

		if (payment && this.midtrans.isDeny(payload.transaction_status)) {
			await this.paymentRepo.update(payment.id, { status: "deny" });
			await this.orderRepo.update(order.id, { status: ORDER_STATUS.CANCELLED });
		}

		return ok(c, { received: true });
	}

	async handleBiteship(c: Context) {
		const payload = (c.req.valid as any)("json") as BiteshipWebhookPayload;

		const shipment = await this.shipmentRepo.findByTrackingId(
			payload.tracking_id,
		);
		if (!shipment) throw new BadRequestError("Shipment not found");

		if (payload.status === "delivered") {
			await this.shipmentRepo.update(shipment.id, {
				status: "delivered",
				deliveredAt: payload.delivered_at
					? new Date(payload.delivered_at).toISOString()
					: new Date().toISOString(),
			});

			await this.orderRepo.update(shipment.orderId, {
				status: ORDER_STATUS.DELIVERED,
			});
		}

		if (payload.status === "shipped") {
			await this.shipmentRepo.update(shipment.id, {
				status: "shipped",
			});

			await this.orderRepo.update(shipment.orderId, {
				status: ORDER_STATUS.SHIPPED,
			});
		}

		return ok(c, { received: true });
	}
}
