import { OrderRepository } from "../modules/orders/repositories/order.repository";
import { PaymentRepository } from "../modules/payments/repositories/payment.repository";
import { ProductRepository } from "../modules/products/repositories/product.repository";
import { ShipmentRepository } from "../modules/shipments/repositories/shipment.repository";
import { ShipmentService } from "../modules/shipments/services/shipment.service";
import { BiteshipProvider } from "../providers/biteship";
import { logger } from "../utils/logger";

/**
 * Called when Midtrans settlement webhook is received.
 * Automatically creates a Biteship shipment for the paid order.
 */
export async function processSettlementJob(orderId: number) {
	logger.info(`Processing settlement for order #${orderId}`);

	const orderRepo = new OrderRepository();
	const productRepo = new ProductRepository();
	const shipmentRepo = new ShipmentRepository();
	const biteship = new BiteshipProvider();

	const shipmentService = new ShipmentService(
		shipmentRepo,
		orderRepo,
		productRepo,
		biteship,
	);

	try {
		const result = await shipmentService.createShipment(orderId);
		logger.info(`Shipment created for order #${orderId}:`, result);
	} catch (error) {
		logger.error(`Failed to create shipment for order #${orderId}:`, error);
		throw error;
	}
}
