import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient, getSupabaseAdmin } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/auth';
import { revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const group = searchParams.get('group');

  const supabase = getSupabaseClient();
  let query = supabase.from('site_settings').select('*').order('key');

  if (group) query = query.eq('group', group);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { settings } = body as { settings: { key: string; value: string }[] };

  const supabase = getSupabaseAdmin();

  for (const setting of settings) {
    const { error } = await supabase
      .from('site_settings')
      .update({ value: setting.value })
      .eq('key', setting.key);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidateTag('settings', 'max');
  return NextResponse.json({ success: true });
}
