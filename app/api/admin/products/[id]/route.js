import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {
  const { id } = params;
  const { name, price, description, stock } = await request.json();
  const product = await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      name,
      price: parseInt(price),
      description: description || "",
      stock: parseInt(stock) || 0,
    },
  });
  return NextResponse.json(product);
}

export async function DELETE(request, { params }) {
  const { id } = params;
  await prisma.product.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}
