export type PaymentStatus =
	| "pending"
	| "settlement"
	| "capture"
	| "expire"
	| "deny"
	| "cancel"
	| "refund";

export interface PaymentResponse {
	id: number;
	orderId: number;
	transactionId: string | null;
	grossAmount: string;
	status: PaymentStatus;
	paymentType: string | null;
	settledAt: string | null;
	createdAt: string;
}
