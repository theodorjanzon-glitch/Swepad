import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    select: { id: true, name: true, stock: true },
    orderBy: { id: "asc" },
  });
  return NextResponse.json(products);
}

export async function POST(request) {
  const { productId, quantity } = await request.json();
  const product = await prisma.product.update({
    where: { id: parseInt(productId) },
    data: { stock: { increment: parseInt(quantity) } },
  });
  return NextResponse.json(product, { status: 201 });
}