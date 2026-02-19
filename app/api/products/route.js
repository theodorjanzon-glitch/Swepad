import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const body = await req.json();

  const product = await prisma.product.create({
    data: body,
  });

  return Response.json(product);
}

export async function DELETE(req) {
  const { id } = await req.json();

  await prisma.product.delete({
    where: { id },
  });

  return Response.json({ success: true });
}
