import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { cart } = await req.json();

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
      quantity: 1,
    })),
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?canceled=true`,
  });

  return NextResponse.json({ url: session.url });
}
