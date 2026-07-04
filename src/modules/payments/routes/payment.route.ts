import { Hono } from "hono";
import { MidtransProvider } from "../../../providers/midtrans";
import { OrderRepository } from "../../orders/repositories/order.repository";
import { ProductRepository } from "../../products/repositories/product.repository";
import { PaymentController } from "../controllers/payment.controller";
import { PaymentRepository } from "../repositories/payment.repository";
import { PaymentService } from "../services/payment.service";

const router = new Hono();
const paymentRepo = new PaymentRepository();
const orderRepo = new OrderRepository();
const productRepo = new ProductRepository();
const midtrans = new MidtransProvider();
const service = new PaymentService(
	paymentRepo,
	orderRepo,
	productRepo,
	midtrans,
);
const controller = new PaymentController(service);

router.post("/:orderId/transactions", (c) => controller.createTransaction(c));

export default router;
