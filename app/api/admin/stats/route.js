// stats API endpoint for dashboard analytics

import { NextResponse } from 'next/server';

export async function GET(request) {
    // Sample response, to be modified with actual data retrieval logic
    const stats = {
        users: 100,
        orders: 200,
        revenue: 3000,
    };
    
    return NextResponse.json(stats);
}