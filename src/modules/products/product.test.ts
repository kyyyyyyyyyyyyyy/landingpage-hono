import { describe, it, expect, vi, beforeEach } from "vitest";
import { createProductSchema } from "./dto/create-product.dto";
import { updateProductSchema } from "./dto/update-product.dto";
import { ProductService } from "./services/product.service";
import { ProductRepository } from "./repositories/product.repository";
import { NotFoundError } from "../../shared/errors";

describe("Product Module - Validation Tests", () => {
  describe("createProductSchema", () => {
    it("should validate successfully with correct data including image_url and variants", () => {
      const validData = {
        name: "Test Product",
        slug: "test-product",
        description: "Test description",
        price: 150000,
        weight: 1000,
        image_url: "https://res.cloudinary.com/demo/image/upload/v12345/sample.jpg",
        variants: [
          {
            name: "Warna",
            options: ["Merah", "Hitam"],
          },
          {
            name: "Ukuran",
            options: ["S", "M"],
          },
        ],
      };

      const result = createProductSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.image_url).toBe(validData.image_url);
        expect(result.data.variants).toEqual(validData.variants);
      }
    });

    it("should validate successfully with empty/no variants (defaults to [])", () => {
      const validData = {
        name: "Test Product",
        slug: "test-product",
        price: 150000,
        image_url: "https://res.cloudinary.com/demo/image/upload/v12345/sample.jpg",
      };

      const result = createProductSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.variants).toEqual([]);
      }
    });

    it("should fail validation if image_url is missing during creation", () => {
      const invalidData = {
        name: "Test Product",
        slug: "test-product",
        price: 150000,
      };

      const result = createProductSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should fail validation if name is empty", () => {
      const invalidData = {
        name: "",
        slug: "test-product",
        price: 150000,
        image_url: "https://res.cloudinary.com/demo/image/upload/v12345/sample.jpg",
      };

      const result = createProductSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should fail validation if price is negative", () => {
      const invalidData = {
        name: "Test Product",
        slug: "test-product",
        price: -500,
        image_url: "https://res.cloudinary.com/demo/image/upload/v12345/sample.jpg",
      };

      const result = createProductSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should fail validation if image_url is not a valid URL", () => {
      const invalidData = {
        name: "Test Product",
        slug: "test-product",
        price: 150000,
        image_url: "not-a-valid-url",
      };

      const result = createProductSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should fail validation if variant name is empty", () => {
      const invalidData = {
        name: "Test Product",
        slug: "test-product",
        price: 150000,
        image_url: "https://res.cloudinary.com/demo/image/upload/v12345/sample.jpg",
        variants: [
          {
            name: "",
            options: ["Merah"],
          },
        ],
      };

      const result = createProductSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should fail validation if variant options are empty strings", () => {
      const invalidData = {
        name: "Test Product",
        slug: "test-product",
        price: 150000,
        image_url: "https://res.cloudinary.com/demo/image/upload/v12345/sample.jpg",
        variants: [
          {
            name: "Warna",
            options: ["", "Hitam"],
          },
        ],
      };

      const result = createProductSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should fail validation if variant options array is empty", () => {
      const invalidData = {
        name: "Test Product",
        slug: "test-product",
        price: 150000,
        image_url: "https://res.cloudinary.com/demo/image/upload/v12345/sample.jpg",
        variants: [
          {
            name: "Warna",
            options: [],
          },
        ],
      };

      const result = createProductSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should fail validation if variant names are duplicate", () => {
      const invalidData = {
        name: "Test Product",
        slug: "test-product",
        price: 150000,
        image_url: "https://res.cloudinary.com/demo/image/upload/v12345/sample.jpg",
        variants: [
          {
            name: "Warna",
            options: ["Merah"],
          },
          {
            name: "warna",
            options: ["Biru"],
          },
        ],
      };

      const result = createProductSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("updateProductSchema", () => {
    it("should validate successfully with optional image_url and variants", () => {
      const validData = {
        image_url: "https://res.cloudinary.com/demo/image/upload/v12345/sample.jpg",
        variants: [
          {
            name: "Bahan",
            options: ["Katun", "Polyester"],
          },
        ],
      };

      const result = updateProductSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.image_url).toBe(validData.image_url);
        expect(result.data.variants).toEqual(validData.variants);
      }
    });

    it("should fail validation if update contains duplicate variant names", () => {
      const invalidData = {
        variants: [
          {
            name: "Ukuran",
            options: ["M"],
          },
          {
            name: "Ukuran",
            options: ["L"],
          },
        ],
      };

      const result = updateProductSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});

describe("Product Module - Service Unit Tests", () => {
  let repository: any;
  let service: ProductService;

  beforeEach(() => {
    repository = {
      findAll: vi.fn(),
      findBySlug: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    service = new ProductService(repository as any);
  });

  describe("findAll", () => {
    it("should return list of products", async () => {
      const expectedProducts = [{ id: "1", name: "Product A", slug: "product-a", price: "100", variants: [] }];
      repository.findAll.mockResolvedValue(expectedProducts);

      const result = await service.findAll();
      expect(result).toEqual(expectedProducts);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("findBySlug", () => {
    it("should return a product by slug", async () => {
      const expectedProduct = { id: "1", name: "Product A", slug: "product-a", price: "100", variants: [] };
      repository.findBySlug.mockResolvedValue(expectedProduct);

      const result = await service.findBySlug("product-a");
      expect(result).toEqual(expectedProduct);
      expect(repository.findBySlug).toHaveBeenCalledWith("product-a");
    });

    it("should throw NotFoundError if product not found", async () => {
      repository.findBySlug.mockResolvedValue(null);
      await expect(service.findBySlug("non-existent")).rejects.toThrow(NotFoundError);
    });
  });

  describe("findById", () => {
    it("should return a product by id", async () => {
      const expectedProduct = { id: "1", name: "Product A", slug: "product-a", price: "100", variants: [] };
      repository.findById.mockResolvedValue(expectedProduct);

      const result = await service.findById("1");
      expect(result).toEqual(expectedProduct);
      expect(repository.findById).toHaveBeenCalledWith("1");
    });

    it("should throw NotFoundError if product id not found", async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.findById("999")).rejects.toThrow(NotFoundError);
    });
  });

  describe("create", () => {
    it("should map image_url to imageUrl and create product with variants", async () => {
      const dto = {
        name: "New Product",
        slug: "new-product",
        price: 20000,
        weight: 1000,
        image_url: "https://res.cloudinary.com/demo/image/upload/v123/img.jpg",
        variants: [
          {
            name: "Warna",
            options: ["Merah", "Kuning"],
          },
        ],
      };

      const createdProduct = { id: "1", ...dto, imageUrl: dto.image_url };
      repository.create.mockResolvedValue(createdProduct);

      const result = await service.create(dto);
      expect(result).toEqual(createdProduct);
      expect(repository.create).toHaveBeenCalledWith({
        name: "New Product",
        slug: "new-product",
        price: 20000,
        weight: 1000,
        imageUrl: "https://res.cloudinary.com/demo/image/upload/v123/img.jpg",
        variants: [
          {
            name: "Warna",
            options: ["Merah", "Kuning"],
          },
        ],
      });
    });
  });

  describe("update", () => {
    it("should map image_url to imageUrl and update product variants when product exists", async () => {
      const existingProduct = { id: "1", name: "Product", slug: "product", price: "100", imageUrl: null, variants: [] };
      repository.findById.mockResolvedValue(existingProduct);

      const dto = {
        price: 25000,
        image_url: "https://res.cloudinary.com/demo/image/upload/v123/img-updated.jpg",
        variants: [
          {
            name: "Ukuran",
            options: ["All Size"],
          },
        ],
      };

      const updatedProduct = { id: "1", name: "Product", slug: "product", price: 25000, imageUrl: dto.image_url, variants: dto.variants };
      repository.update.mockResolvedValue(updatedProduct);

      const result = await service.update("1", dto);
      expect(result).toEqual(updatedProduct);
      expect(repository.update).toHaveBeenCalledWith("1", {
        price: 25000,
        imageUrl: "https://res.cloudinary.com/demo/image/upload/v123/img-updated.jpg",
        variants: [
          {
            name: "Ukuran",
            options: ["All Size"],
          },
        ],
      });
    });

    it("should throw NotFoundError on update if product not found", async () => {
      repository.findById.mockResolvedValue(null);
      const dto = { name: "Update" };
      await expect(service.update("999", dto)).rejects.toThrow(NotFoundError);
    });
  });

  describe("delete", () => {
    it("should delete product if exists", async () => {
      const existingProduct = { id: "1", name: "Product" };
      repository.findById.mockResolvedValue(existingProduct);

      await service.delete("1");
      expect(repository.delete).toHaveBeenCalledWith("1");
    });

    it("should throw NotFoundError on delete if product not found", async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.delete("999")).rejects.toThrow(NotFoundError);
    });
  });
});
