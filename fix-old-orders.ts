import { db, schema } from "./src/database";
import { eq } from "drizzle-orm";

async function fix() {
    const orders = await db.select().from(schema.orders);
    for (const order of orders) {
        const product = await db.select().from(schema.products).where(eq(schema.products.id, order.productId)).limit(1);
        if (product.length > 0) {
            const p = product[0];
            const qty = order.quantity;
            const price = Number(p.price);
            const shippingCost = Number(order.shippingCost || 0);
            const total = (qty * price) + shippingCost;
            await db.update(schema.orders).set({ totalAmount: String(total) }).where(eq(schema.orders.id, order.id));
            console.log(`Updated order ${order.id} to totalAmount ${total}`);
        }
    }
    console.log("Done");
}
fix().catch(console.error);
