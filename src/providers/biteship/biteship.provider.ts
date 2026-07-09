import { config } from "../../config";
import type {
	BiteshipApiResponse,
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
		const response = await fetch(`${this.baseUrl}/orders`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.apiKey}`,
			},
			body: JSON.stringify({
				origin_contact_name: params.origin.name,
				origin_contact_phone: params.origin.phone,
				origin_address: params.origin.address,
				origin_postal_code: params.origin.postalCode,
				destination_contact_name: params.destination.name,
				destination_contact_phone: params.destination.phone,
				destination_address: params.destination.address,
				destination_postal_code: params.destination.postalCode,
				courier_company: params.courier,
				courier_type: params.courierType,
				delivery_type: "now",
				items: params.items,
			}),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(`Biteship error: ${JSON.stringify(error)}`);
		}

		const data = await response.json() as BiteshipApiResponse;

		return {
			status: data.status,
			trackingId: data.courier.tracking_id,
			waybillId: data.courier.waybill_id,
			courier: data.courier.company,
			courierService: data.courier.type,
			shippingCost: data.price,
			rawResponse: data,
		};
	}
}
