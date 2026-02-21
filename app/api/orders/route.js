import { createClient } from '@supabase/supabase-js';

function getSupabase() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
}

// Handle POST requests to create new orders
export async function POST(req) {
    const supabase = getSupabase();
    const { userId, orderDetails } = await req.json();
    const { data, error } = await supabase
        .from('orders')
        .insert([{ user_id: userId, order_details: orderDetails }]);

    if (error) return new Response(JSON.stringify({ error }), { status: 400 });
    return new Response(JSON.stringify(data), { status: 201 });
}

// Handle GET requests to fetch user orders
export async function GET(req) {
    const supabase = getSupabase();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId);

    if (error) return new Response(JSON.stringify({ error }), { status: 400 });
    return new Response(JSON.stringify(data), { status: 200 });
}
