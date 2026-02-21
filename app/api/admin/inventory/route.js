import { NextResponse } from 'next/server';

let inventory = [{ id: 1, name: 'Item 1', quantity: 100 }, { id: 2, name: 'Item 2', quantity: 50 }];

export async function GET() {
    return NextResponse.json(inventory);
}

export async function POST(request) {
    const newItem = await request.json();
    inventory.push(newItem);
    return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(request) {
    const { id, ...updates } = await request.json();
    const index = inventory.findIndex(item => item.id == id);
    if (index !== -1) {
        inventory[index] = { ...inventory[index], ...updates };
        return NextResponse.json(inventory[index]);
    }
    return NextResponse.json({ message: 'Item not found' }, { status: 404 });
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    inventory = inventory.filter(item => item.id != id);
    return new Response(null, { status: 204 });
}