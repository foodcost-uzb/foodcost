import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get('days') || '30');
  const since = new Date();
  since.setDate(since.getDate() - days);

  const supabase = getSupabaseAdmin();

  const [pageViewsRes, eventsRes, leadsRes] = await Promise.all([
    supabase
      .from('page_views')
      .select('*')
      .gte('created_at', since.toISOString())
      .order('created_at', { ascending: false }),
    supabase
      .from('analytics_events')
      .select('*')
      .gte('created_at', since.toISOString())
      .order('created_at', { ascending: false }),
    supabase
      .from('leads')
      .select('*')
      .gte('created_at', since.toISOString())
      .order('created_at', { ascending: false }),
  ]);

  // Aggregate pageviews by day
  const pageViews = pageViewsRes.data || [];
  const viewsByDay: Record<string, number> = {};
  const uniqueSessionsByDay: Record<string, Set<string>> = {};

  for (const pv of pageViews) {
    const day = pv.created_at.split('T')[0];
    viewsByDay[day] = (viewsByDay[day] || 0) + 1;
    if (pv.session_id) {
      if (!uniqueSessionsByDay[day]) uniqueSessionsByDay[day] = new Set();
      uniqueSessionsByDay[day].add(pv.session_id);
    }
  }

  const dailyStats = Object.keys(viewsByDay)
    .sort()
    .map((day) => ({
      date: day,
      views: viewsByDay[day],
      unique: uniqueSessionsByDay[day]?.size || 0,
    }));

  // Aggregate events by name
  const events = eventsRes.data || [];
  const eventCounts: Record<string, number> = {};
  for (const e of events) {
    eventCounts[e.event_name] = (eventCounts[e.event_name] || 0) + 1;
  }

  // Top pages
  const pageCounts: Record<string, number> = {};
  for (const pv of pageViews) {
    pageCounts[pv.page] = (pageCounts[pv.page] || 0) + 1;
  }
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([page, count]) => ({ page, count }));

  const leads = leadsRes.data || [];
  const totalSessions = new Set(pageViews.filter(pv => pv.session_id).map(pv => pv.session_id)).size;

  return NextResponse.json({
    totalViews: pageViews.length,
    totalUnique: totalSessions,
    totalEvents: events.length,
    totalLeads: leads.length,
    conversionRate: totalSessions > 0 ? ((leads.length / totalSessions) * 100).toFixed(1) : '0',
    dailyStats,
    eventCounts,
    topPages,
  });
}
