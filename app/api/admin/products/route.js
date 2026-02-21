import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json(products);
}

export async function POST(request) {
  const { name, price, description, stock } = await request.json();
  const product = await prisma.product.create({
    data: {
      name,
      price: parseInt(price),
      description: description || "",
      stock: parseInt(stock) || 0,
    },
  });
  return NextResponse.json(product, { status: 201 });
}
