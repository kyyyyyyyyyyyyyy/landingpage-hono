import { OrderRepository } from "../modules/orders/repositories/order.repository";
import { ShipmentRepository } from "../modules/shipments/repositories/shipment.repository";
import { logger } from "../utils/logger";

/**
 * Called when Biteship webhook updates shipment status.
 * Syncs shipment status to the order.
 */
export async function processShipmentJob(shipmentId: number) {
	logger.info(`Processing shipment #${shipmentId}`);

	const orderRepo = new OrderRepository();
	const shipmentRepo = new ShipmentRepository();

	try {
		const shipment = await shipmentRepo.findById(shipmentId);
		if (!shipment) {
			logger.error(`Shipment #${shipmentId} not found`);
			return;
		}

		if (shipment.status === "delivered") {
			await orderRepo.update(shipment.orderId, {
				status: "delivered",
			});
			logger.info(`Order #${shipment.orderId} marked as delivered`);
		}
	} catch (error) {
		logger.error(`Failed to process shipment #${shipmentId}:`, error);
	}
}
