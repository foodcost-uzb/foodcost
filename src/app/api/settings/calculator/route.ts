import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient, getSupabaseAdmin } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/auth';
import { revalidateTag } from 'next/cache';

export async function GET() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('calculator_settings')
    .select('*')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const supabase = getSupabaseAdmin();

  const { data: existing } = await supabase.from('calculator_settings').select('id').single();
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const { data, error } = await supabase
    .from('calculator_settings')
    .update(body)
    .eq('id', existing.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidateTag('calculator', 'max');
  return NextResponse.json(data);
}
