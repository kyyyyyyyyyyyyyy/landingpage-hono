import { config } from "../../config";
import type {
	BiteshipCreateShipmentParams,
	BiteshipShipmentResponse,
} from "./biteship.types";

export class BiteshipProvider {
	private baseUrl: string;
	private apiKey: string;

	constructor() {
		this.baseUrl = config.biteship.baseUrl;
		this.apiKey = config.biteship.apiKey;
	}

	async createShipment(
		params: BiteshipCreateShipmentParams,
	): Promise<BiteshipShipmentResponse> {
		const response = await fetch(`${this.baseUrl}/shipments`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.apiKey}`,
			},
			body: JSON.stringify({
				courier: params.courier,
				courier_service: params.courierService,
				origin: params.origin,
				destination: params.destination,
				items: params.items,
			}),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(`Biteship error: ${JSON.stringify(error)}`);
		}

		return response.json() as Promise<BiteshipShipmentResponse>;
	}
}
