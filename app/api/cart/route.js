import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET() {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.from('cart').select('*');
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

export async function POST(request) {
    const { item } = await request.json();
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.from('cart').insert([{ item }]);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
}
