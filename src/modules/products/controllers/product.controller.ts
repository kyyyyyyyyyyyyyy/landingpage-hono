import type { Context } from "hono";
import { created, ok } from "../../../shared/helpers/response";
import type { CreateProductDto, UpdateProductDto } from "../dto";
import type { ProductService } from "../services/product.service";

export class ProductController {
	constructor(private service: ProductService) {}

	async list(c: Context) {
		const products = await this.service.findAll();
		return ok(c, products);
	}

	async getBySlug(c: Context) {
		const slug = c.req.param("slug") as string;
		const product = await this.service.findBySlug(slug);
		return ok(c, product);
	}

	async getById(c: Context) {
		const id = c.req.param("id") as string;
		const product = await this.service.findById(id);
		return ok(c, product);
	}

	async create(c: Context) {
		const dto = (c.req.valid as any)("json") as CreateProductDto;
		const product = await this.service.create(dto);
		return created(c, product);
	}

	async update(c: Context) {
		const id = c.req.param("id") as string;
		const dto = (c.req.valid as any)("json") as UpdateProductDto;
		const product = await this.service.update(id, dto);
		return ok(c, product);
	}

	async delete(c: Context) {
		const id = c.req.param("id") as string;
		await this.service.delete(id);
		return ok(c, null, "Product deleted");
	}
}
