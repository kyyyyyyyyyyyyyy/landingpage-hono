import { NotFoundError } from "../../../shared/errors";
import type { CreateProductDto, UpdateProductDto } from "../dto";
import type { ProductRepository } from "../repositories/product.repository";

export class ProductService {
	constructor(private repo: ProductRepository) {}

	async findAll() {
		return this.repo.findAll();
	}

	async findBySlug(slug: string) {
		const product = await this.repo.findBySlug(slug);
		if (!product) throw new NotFoundError("Product not found");
		return product;
	}

	async findById(id: string) {
		const product = await this.repo.findById(id);
		if (!product) throw new NotFoundError("Product not found");
		return product;
	}

	async create(dto: CreateProductDto) {
		const { image_url, ...data } = dto;
		return this.repo.create({
			...data,
			imageUrl: image_url,
		} as Record<string, unknown>);
	}

	async update(id: string, dto: UpdateProductDto) {
		await this.findById(id);
		const { image_url, ...data } = dto;
		return this.repo.update(id, {
			...data,
			...(image_url !== undefined ? { imageUrl: image_url } : {}),
		} as Record<string, unknown>);
	}

	async delete(id: string) {
		await this.findById(id);
		await this.repo.delete(id);
	}
}
