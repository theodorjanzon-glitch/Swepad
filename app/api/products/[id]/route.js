import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient('your-supabase-url', 'your-supabase-key');

// Handle GET request to fetch a product by ID
export async function GET(req, { params }) {
    const { id } = await params;

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
}