import { Hono } from "hono";
import { authMiddleware } from "../../../middlewares";
import { ProductController } from "../controllers/product.controller";
import { ProductRepository } from "../repositories/product.repository";
import { ProductService } from "../services/product.service";
import {
	validateCreateProduct,
	validateUpdateProduct,
} from "../validators/product.validator";

const router = new Hono();
const repo = new ProductRepository();
const service = new ProductService(repo);
const controller = new ProductController(service);

router.get("/", (c) => controller.list(c));
router.get("/slug/:slug", (c) => controller.getBySlug(c));
router.get("/:id", (c) => controller.getById(c));
router.post("/", authMiddleware, validateCreateProduct, (c) =>
	controller.create(c),
);
router.patch("/:id", authMiddleware, validateUpdateProduct, (c) =>
	controller.update(c),
);
router.delete("/:id", authMiddleware, (c) => controller.delete(c));

export default router;
