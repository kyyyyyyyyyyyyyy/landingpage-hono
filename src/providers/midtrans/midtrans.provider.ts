import { config } from "../../config";
import type {
	MidtransTransactionParams,
	MidtransTransactionResponse,
	MidtransWebhookPayload,
} from "./midtrans.types";

export class MidtransProvider {
	private baseUrl: string;
	private serverKey: string;

	constructor() {
		this.serverKey = config.midtrans.serverKey;
		this.baseUrl = config.midtrans.isProduction
			? "https://app.midtrans.com/snap/v1"
			: "https://app.sandbox.midtrans.com/snap/v1";
	}

	async createTransaction(
		params: MidtransTransactionParams,
	): Promise<MidtransTransactionResponse> {
		const response = await fetch(`${this.baseUrl}/transactions`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Basic ${btoa(this.serverKey + ":")}`,
			},
			body: JSON.stringify({
				transaction_details: {
					order_id: params.orderId,
					gross_amount: params.grossAmount,
				},
				credit_card: { secure: true },
				customer_details: {
					first_name: params.customerName,
					email: params.customerEmail,
					phone: params.customerPhone,
				},
				item_details: params.items,
			}),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(`Midtrans error: ${JSON.stringify(error)}`);
		}

		const data: any = await response.json();
		return {
			token: data.token as string,
			redirectUrl: data.redirect_url as string,
		};
	}

	verifySignature(payload: MidtransWebhookPayload): boolean {
		const hash = require("crypto")
			.createHash("sha512")
			.update(
				`${payload.order_id}${payload.status_code}${payload.gross_amount}${this.serverKey}`,
			)
			.digest("hex");
		return hash === payload.signature_key;
	}

	isSettlement(status: string): boolean {
		return ["settlement", "capture"].includes(status);
	}

	isExpired(status: string): boolean {
		return status === "expire";
	}

	isDeny(status: string): boolean {
		return ["deny", "cancel"].includes(status);
	}
}
