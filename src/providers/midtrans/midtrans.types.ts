export interface MidtransTransactionParams {
	orderId: string;
	grossAmount: number;
	customerName: string;
	customerEmail: string;
	customerPhone: string;
	items: Array<{
		id: string;
		name: string;
		price: number;
		quantity: number;
	}>;
}

export interface MidtransTransactionResponse {
	token: string;
	redirectUrl: string;
}

export interface MidtransWebhookPayload {
	transaction_status: string;
	order_id: string;
	gross_amount: string;
	transaction_id: string;
	payment_type: string;
	settlement_time?: string;
	status_code: string;
	signature_key: string;
}
