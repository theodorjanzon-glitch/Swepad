import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmation } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const cartItems = JSON.parse(session.metadata?.cart || "[]");
    const customerEmail = session.customer_details?.email;

    const productIds = cartItems.map((i) => i.id).filter(Boolean);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });
    const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

    const orderItems = [];
    for (const item of cartItems) {
      const product = productMap[item.id];
      if (!product) continue;

      const qty = item.quantity || 1;
      if (product.stock < qty) {
        console.warn(`Insufficient stock for product ${item.id} (${item.name})`);
        continue;
      }

      await prisma.product.update({
        where: { id: item.id },
        data: { stock: { decrement: qty } },
      });

      orderItems.push({
        productId: item.id,
        quantity: qty,
        price: item.price,
      });
    }

    if (orderItems.length > 0 && customerEmail) {
      const order = await prisma.order.create({
        data: {
          email: customerEmail,
          total: Math.round(session.amount_total / 100),
          status: "paid",
          orderItems: { create: orderItems },
        },
        include: { orderItems: { include: { product: true } } },
      });

      const emailItems = order.orderItems.map((oi) => ({
        name: oi.product.name,
        quantity: oi.quantity,
        price: oi.price,
      }));

      try {
        await sendOrderConfirmation({
          to: customerEmail,
          orderId: order.id,
          items: emailItems,
          total: order.total,
        });
      } catch (emailErr) {
        console.error("Failed to send confirmation email:", emailErr.message);
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
