import { NextResponse } from 'next/server';

let products = [];

export async function GET() {
    return NextResponse.json(products);
}

export async function POST(request) {
    const newProduct = await request.json();
    newProduct.id = products.length + 1;
    products.push(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
}
