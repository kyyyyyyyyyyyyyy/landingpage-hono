export interface BiteshipShippingAddress {
	name: string;
	phone: string;
	address: string;
	city: string;
	postalCode: string;
}

export interface BiteshipCreateShipmentParams {
	orderId: string;
	courier: string;
	courierService: string;
	origin: BiteshipShippingAddress;
	destination: BiteshipShippingAddress;
	items: Array<{
		name: string;
		quantity: number;
		weight: number;
		price: number;
	}>;
}

export interface BiteshipShipmentResponse {
	status: string;
	tracking_id: string;
	waybill_id: string;
	courier: string;
	courier_service: string;
	shipping_cost: number;
}

export interface BiteshipWebhookPayload {
	tracking_id: string;
	waybill_id: string;
	status: string;
	delivered_at?: string;
}
