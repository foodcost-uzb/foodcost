import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/auth';
import { revalidateTag } from 'next/cache';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('project_logos')
    .update(body)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidateTag('projects', 'max');
  return NextResponse.json(data);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('project_logos').delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidateTag('projects', 'max');
  return NextResponse.json({ success: true });
}
