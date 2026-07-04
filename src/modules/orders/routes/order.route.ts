import { Hono } from "hono";
import { authMiddleware } from "../../../middlewares";
import { OrderController } from "../controllers/order.controller";
import { OrderRepository } from "../repositories/order.repository";
import { OrderService } from "../services/order.service";
import { validateCreateOrder } from "../validators/order.validator";

const router = new Hono();
const repo = new OrderRepository();
const service = new OrderService(repo);
const controller = new OrderController(service);

router.get("/", authMiddleware, (c) => controller.list(c));
router.get("/code/:code", (c) => controller.getByCode(c));
router.get("/:id", authMiddleware, (c) => controller.getById(c));
router.post("/", validateCreateOrder, (c) => controller.create(c));

export default router;
