export interface ProductResponse {
	id: number;
	name: string;
	slug: string;
	description: string | null;
	price: string;
	weight: number;
	imageUrl: string | null;
	isActive: boolean;
}
