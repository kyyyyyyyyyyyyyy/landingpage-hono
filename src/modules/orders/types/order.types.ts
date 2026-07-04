export interface ShippingAddress {
	name: string;
	phone: string;
	address: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
}

export type OrderStatus =
	| "pending"
	| "waiting_payment"
	| "paid"
	| "processing"
	| "shipped"
	| "delivered"
	| "cancelled";

export interface OrderResponse {
	id: number;
	orderCode: string;
	customerName: string;
	customerEmail: string;
	customerPhone: string;
	shippingAddress: ShippingAddress;
	quantity: number;
	totalAmount: string;
	status: OrderStatus;
	snapToken?: string | null;
	redirectUrl?: string | null;
	createdAt: string;
}
