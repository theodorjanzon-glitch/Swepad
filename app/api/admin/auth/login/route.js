import { NextResponse } from 'next/server';

export async function POST(request) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    if (email === adminEmail && password === adminPassword) {
        return NextResponse.json({ token: 'admin-token' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
}
