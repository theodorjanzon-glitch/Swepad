import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const orders = await prisma.order.findMany({
    include: { orderItems: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(orders);
}

export async function POST(request) {
  const body = await request.json();
  const order = await prisma.order.create({ data: body });
  return NextResponse.json(order, { status: 201 });
}