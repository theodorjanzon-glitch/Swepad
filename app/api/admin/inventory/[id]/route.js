import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {
  const { id } = params;
  const { stock } = await request.json();
  const product = await prisma.product.update({
    where: { id: parseInt(id) },
    data: { stock: parseInt(stock) },
  });
  return NextResponse.json(product);
}
