export interface ProductResponse {
	id: string;
	name: string;
	slug: string;
	description: string | null;
	price: string;
	weight: number;
	imageUrls: string[];
	variants: Array<{ name: string; options: string[] }>;
	isActive: boolean;
}
