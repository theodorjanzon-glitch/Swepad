import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  const { id } = params;
  const order = await prisma.order.findUnique({
    where: { id: parseInt(id) },
    include: { orderItems: { include: { product: true } } },
  });
  if (!order) return NextResponse.json({ message: 'Order not found' }, { status: 404 });
  return NextResponse.json(order);
}

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  const order = await prisma.order.update({
    where: { id: parseInt(id) },
    data: body,
  });
  return NextResponse.json(order);
}