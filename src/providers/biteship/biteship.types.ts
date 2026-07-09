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
	courierType: string;
	origin: BiteshipShippingAddress;
	destination: BiteshipShippingAddress;
	items: Array<{
		name: string;
		value: number;
		quantity: number;
		weight: number;
	}>;
}

export interface BiteshipShipmentResponse {
    status: string;
    trackingId: string;
    waybillId: string;
    courier: string;
    courierService: string;
    shippingCost: number;
    rawResponse: unknown;
}

export interface BiteshipApiResponse {
    status: string;

    courier: {
        tracking_id: string;
        waybill_id: string;
        company: string;
        type: string;
    };

    price: number;
}

export interface BiteshipWebhookPayload {
	tracking_id: string;
	waybill_id: string;
	status: string;
	delivered_at?: string;
}
