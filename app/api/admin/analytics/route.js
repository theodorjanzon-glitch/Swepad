import { NextResponse } from 'next/server';

export async function POST(request) {
  const analyticsData = await request.json();
  console.log('Tracking Analytics Data:', analyticsData);
  return NextResponse.json({ message: 'Data tracked successfully' }, { status: 201 });
}

export async function GET() {
  const analyticsData = [];
  return NextResponse.json(analyticsData);
}