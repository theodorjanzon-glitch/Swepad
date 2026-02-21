import { NextResponse } from 'next/server';

const adminUser = {
  email: process.env.ADMIN_EMAIL || 'admin@example.com',
  password: process.env.ADMIN_PASSWORD || 'password123',
};

export async function POST(request) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
  }
  if (email === adminUser.email && password === adminUser.password) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
}
