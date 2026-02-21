'use client';

import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  const supabase = createServerSupabaseClient({ req });

  let query = supabase.from('products').select('*');

  if (category) {
    query = query.eq('category', category);
  }

  if (searchQuery) {
    query = query.ilike('name', `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}