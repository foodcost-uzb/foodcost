import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { type, page, event_name, event_data, session_id } = body;

  if (!type || (type !== 'pageview' && type !== 'event')) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  const supabase = getSupabaseClient();

  if (type === 'pageview') {
    if (!page || typeof page !== 'string') {
      return NextResponse.json({ error: 'Page is required' }, { status: 400 });
    }
    const { error } = await supabase.from('page_views').insert({
      page: page.slice(0, 500),
      referrer: (body.referrer || '').slice(0, 1000) || null,
      user_agent: request.headers.get('user-agent')?.slice(0, 500) || null,
      ip: request.headers.get('x-forwarded-for') || null,
      session_id: session_id?.slice(0, 100) || null,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else if (type === 'event') {
    if (!event_name || typeof event_name !== 'string') {
      return NextResponse.json({ error: 'event_name is required' }, { status: 400 });
    }
    const { error } = await supabase.from('analytics_events').insert({
      event_name: event_name.slice(0, 200),
      event_data: event_data || null,
      page: page?.slice(0, 500) || null,
      session_id: session_id?.slice(0, 100) || null,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
