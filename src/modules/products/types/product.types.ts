export interface ProductResponse {
	id: string;
	name: string;
	slug: string;
	description: string | null;
	price: string;
	weight: number;
	imageUrl: string | null;
	variants: Array<{ name: string; options: string[] }>;
	isActive: boolean;
}
