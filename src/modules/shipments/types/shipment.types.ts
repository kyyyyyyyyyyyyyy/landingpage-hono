export type ShipmentStatus =
	| "pending"
	| "processing"
	| "shipped"
	| "delivered"
	| "cancelled";

export interface ShipmentResponse {
	id: number;
	orderId: number;
	courier: string | null;
	trackingId: string | null;
	waybillId: string | null;
	status: ShipmentStatus;
	courierService: string | null;
	shippingCost: string | null;
	deliveredAt: string | null;
	createdAt: string;
}
