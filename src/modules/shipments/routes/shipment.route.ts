import { Hono } from "hono";
import { BiteshipProvider } from "../../../providers/biteship";
import { OrderRepository } from "../../orders/repositories/order.repository";
import { ProductRepository } from "../../products/repositories/product.repository";
import { ShipmentController } from "../controllers/shipment.controller";
import { ShipmentRepository } from "../repositories/shipment.repository";
import { ShipmentService } from "../services/shipment.service";

const router = new Hono();
const repo = new ShipmentRepository();
const orderRepo = new OrderRepository();
const productRepo = new ProductRepository();
const biteship = new BiteshipProvider();
const service = new ShipmentService(repo, orderRepo, productRepo, biteship);
const controller = new ShipmentController(service);

router.post("/:orderId", (c) => controller.create(c));
router.get("/:orderId", (c) => controller.getByOrder(c));

export default router;
