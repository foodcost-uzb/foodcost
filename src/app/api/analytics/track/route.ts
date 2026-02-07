import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type, page, event_name, event_data, session_id } = body;

  const supabase = getSupabaseClient();

  if (type === 'pageview') {
    const { error } = await supabase.from('page_views').insert({
      page,
      referrer: body.referrer || null,
      user_agent: request.headers.get('user-agent') || null,
      ip: request.headers.get('x-forwarded-for') || null,
      session_id: session_id || null,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else if (type === 'event') {
    const { error } = await supabase.from('analytics_events').insert({
      event_name,
      event_data: event_data || null,
      page: page || null,
      session_id: session_id || null,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
