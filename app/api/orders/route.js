import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'your_supabase_url'; // Replace with your Supabase URL
const supabaseKey = 'your_supabase_key'; // Replace with your Supabase API key
const supabase = createClient(supabaseUrl, supabaseKey);

// Handle POST requests to create new orders
export async function POST(req) {
    const { userId, orderDetails } = await req.json();
    const { data, error } = await supabase
        .from('orders')
        .insert([{ user_id: userId, order_details: orderDetails }]);

    if (error) return new Response(JSON.stringify({ error }), { status: 400 });
    return new Response(JSON.stringify(data), { status: 201 });
}

// Handle GET requests to fetch user orders
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId);

    if (error) return new Response(JSON.stringify({ error }), { status: 400 });
    return new Response(JSON.stringify(data), { status: 200 });
}
