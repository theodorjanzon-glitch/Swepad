import Stripe from "stripe";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { cart } = await req.json();

  // Check stock availability
  for (const item of cart) {
    if (item.id) {
      const product = await prisma.product.findUnique({ where: { id: item.id } });
      if (product && product.stock < (item.quantity || 1)) {
        return NextResponse.json(
          { error: `Insufficient stock for ${item.name}` },
          { status: 400 }
        );
      }
    }
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "klarna"],
    line_items: cart.map(item => ({
      price_data: {
        currency: "sek",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity || 1,
    })),
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?canceled=true`,
    metadata: {
      cart: JSON.stringify(cart),
    },
  });

  return NextResponse.json({ url: session.url });
}
