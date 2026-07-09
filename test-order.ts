import { OrderService } from "./src/modules/orders/services/order.service";
import { OrderRepository } from "./src/modules/orders/repositories/order.repository";

const repo = new OrderRepository();
const service = new OrderService(repo);

async function run() {
    const order = await service.create({
        productId: "00000000-0000-0000-0000-000000000000",
        customerName: "Test",
        customerEmail: "test@test.com",
        customerPhone: "1234",
        shippingAddress: { name: "A", phone: "1", address: "A", city: "A", state: "A", postalCode: "1", country: "A" },
        quantity: 2,
        shippingCost: 50000,
    });
    console.log(order);
}
run().catch(console.error);
