import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/auth';

function classifyReferrer(referrer: string | null): string {
  if (!referrer || referrer === '' || referrer === 'null') return 'Прямой заход';
  const r = referrer.toLowerCase();
  if (r.includes('google')) return 'Google';
  if (r.includes('yandex')) return 'Яндекс';
  if (r.includes('t.me') || r.includes('telegram')) return 'Telegram';
  if (r.includes('vk.com')) return 'ВКонтакте';
  if (r.includes('instagram')) return 'Instagram';
  if (r.includes('facebook')) return 'Facebook';
  try {
    return new URL(referrer).hostname;
  } catch {
    return referrer;
  }
}

function classifyDevice(userAgent: string | null): string {
  if (!userAgent) return 'Десктоп';
  const ua = userAgent.toLowerCase();
  if (ua.includes('ipad') || ua.includes('tablet')) return 'Планшет';
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) return 'Мобильный';
  return 'Десктоп';
}

const EVENT_CATEGORIES: Record<string, string[]> = {
  'Конверсии': ['form_submit', 'callback_submit'],
  'Контакты': ['phone_click', 'telegram_click', 'whatsapp_click'],
  'Вовлечённость': ['calculator_started', 'calculator_completed', 'case_study_view', 'video_view', 'service_view', 'product_view'],
  'Навигация': ['section_view', 'cta_click', 'page_view'],
};

export async function GET(request: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get('days') || '30');
  const since = new Date();
  since.setDate(since.getDate() - days);

  const supabase = getSupabaseAdmin();

  // Fetch with increased limit (default Supabase limit is 1000) and select only needed columns
  const [pageViewsRes, eventsRes, leadsRes] = await Promise.all([
    supabase
      .from('page_views')
      .select('page, referrer, user_agent, session_id, created_at')
      .gte('created_at', since.toISOString())
      .order('created_at', { ascending: false })
      .limit(50000),
    supabase
      .from('analytics_events')
      .select('event_name, event_data, page, session_id, created_at')
      .gte('created_at', since.toISOString())
      .order('created_at', { ascending: false })
      .limit(50000),
    supabase
      .from('leads')
      .select('source, status, utm_data, created_at')
      .gte('created_at', since.toISOString())
      .order('created_at', { ascending: false })
      .limit(10000),
  ]);

  const pageViews = pageViewsRes.data || [];
  const events = eventsRes.data || [];
  const leads = leadsRes.data || [];

  // --- Daily stats (views, unique, events, leads) ---
  const viewsByDay: Record<string, number> = {};
  const uniqueSessionsByDay: Record<string, Set<string>> = {};
  const eventsByDay: Record<string, number> = {};
  const leadsByDay: Record<string, number> = {};

  for (const pv of pageViews) {
    const day = pv.created_at.split('T')[0];
    viewsByDay[day] = (viewsByDay[day] || 0) + 1;
    if (pv.session_id) {
      if (!uniqueSessionsByDay[day]) uniqueSessionsByDay[day] = new Set();
      uniqueSessionsByDay[day].add(pv.session_id);
    }
  }

  for (const e of events) {
    const day = e.created_at.split('T')[0];
    eventsByDay[day] = (eventsByDay[day] || 0) + 1;
  }

  for (const l of leads) {
    const day = l.created_at.split('T')[0];
    leadsByDay[day] = (leadsByDay[day] || 0) + 1;
  }

  const allDays = new Set([
    ...Object.keys(viewsByDay),
    ...Object.keys(eventsByDay),
    ...Object.keys(leadsByDay),
  ]);

  const dailyStats = Array.from(allDays)
    .sort()
    .map((day) => ({
      date: day,
      views: viewsByDay[day] || 0,
      unique: uniqueSessionsByDay[day]?.size || 0,
      events: eventsByDay[day] || 0,
      leads: leadsByDay[day] || 0,
    }));

  // --- Event counts ---
  const eventCounts: Record<string, number> = {};
  for (const e of events) {
    eventCounts[e.event_name] = (eventCounts[e.event_name] || 0) + 1;
  }

  // --- Top pages ---
  const pageCounts: Record<string, number> = {};
  for (const pv of pageViews) {
    pageCounts[pv.page] = (pageCounts[pv.page] || 0) + 1;
  }
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([page, count]) => ({ page, count }));

  // --- Traffic sources ---
  const sourceCounts: Record<string, number> = {};
  for (const pv of pageViews) {
    const source = classifyReferrer(pv.referrer);
    sourceCounts[source] = (sourceCounts[source] || 0) + 1;
  }
  const trafficSources = Object.entries(sourceCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([source, count]) => ({ source, count }));

  // --- Devices ---
  const deviceCounts: Record<string, number> = {};
  for (const pv of pageViews) {
    const device = classifyDevice(pv.user_agent);
    deviceCounts[device] = (deviceCounts[device] || 0) + 1;
  }
  const devices = Object.entries(deviceCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([device, count]) => ({ device, count }));

  // --- Events by category ---
  const eventNameToCategory: Record<string, string> = {};
  for (const [category, names] of Object.entries(EVENT_CATEGORIES)) {
    for (const name of names) {
      eventNameToCategory[name] = category;
    }
  }

  const categoryEvents: Record<string, Record<string, number>> = {};
  for (const e of events) {
    const category = eventNameToCategory[e.event_name] || 'Другое';
    if (!categoryEvents[category]) categoryEvents[category] = {};
    categoryEvents[category][e.event_name] = (categoryEvents[category][e.event_name] || 0) + 1;
  }

  const eventsByCategory = Object.entries(categoryEvents).map(([category, eventsMap]) => ({
    category,
    events: Object.entries(eventsMap)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count })),
  }));

  // --- Leads by source ---
  const leadSourceCounts: Record<string, number> = {};
  for (const l of leads) {
    const source = l.source || 'Неизвестно';
    leadSourceCounts[source] = (leadSourceCounts[source] || 0) + 1;
  }
  const leadsBySource = Object.entries(leadSourceCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([source, count]) => ({ source, count }));

  // --- UTM campaigns ---
  const utmMap: Record<string, number> = {};
  for (const l of leads) {
    const utm = l.utm_data as { utm_source?: string; utm_medium?: string; utm_campaign?: string } | null;
    if (utm && (utm.utm_source || utm.utm_medium || utm.utm_campaign)) {
      const key = `${utm.utm_source || '(none)'}|||${utm.utm_medium || '(none)'}|||${utm.utm_campaign || '(none)'}`;
      utmMap[key] = (utmMap[key] || 0) + 1;
    }
  }
  const utmCampaigns = Object.entries(utmMap)
    .sort((a, b) => b[1] - a[1])
    .map(([key, count]) => {
      const [source, medium, campaign] = key.split('|||');
      return { source, medium, campaign, leads: count };
    });

  // --- Funnel ---
  const totalSessions = new Set(pageViews.filter(pv => pv.session_id).map(pv => pv.session_id)).size;
  const sectionViewCount = eventCounts['section_view'] || 0;
  const ctaClickCount = eventCounts['cta_click'] || 0;
  const formOpens = (eventCounts['form_submit'] || 0) + (eventCounts['callback_submit'] || 0);

  const funnel = [
    { step: 'Просмотры', count: pageViews.length },
    { step: 'Просмотр секций', count: sectionViewCount },
    { step: 'Клик CTA', count: ctaClickCount },
    { step: 'Отправка формы', count: formOpens },
    { step: 'Заявка', count: leads.length },
  ];

  // --- Recent events (last 50 with details) ---
  const recentEvents = events.slice(0, 50).map((e) => ({
    event_name: e.event_name,
    event_data: e.event_data || null,
    page: e.page || null,
    created_at: e.created_at,
  }));

  // --- Hourly activity ---
  const hourlyCounts: Record<number, number> = {};
  for (let h = 0; h < 24; h++) hourlyCounts[h] = 0;
  for (const pv of pageViews) {
    const hour = new Date(pv.created_at).getHours();
    hourlyCounts[hour] = (hourlyCounts[hour] || 0) + 1;
  }
  const hourlyActivity = Object.entries(hourlyCounts)
    .map(([hour, count]) => ({ hour: parseInt(hour), count }))
    .sort((a, b) => a.hour - b.hour);

  return NextResponse.json({
    totalViews: pageViews.length,
    totalUnique: totalSessions,
    totalEvents: events.length,
    totalLeads: leads.length,
    conversionRate: totalSessions > 0 ? ((leads.length / totalSessions) * 100).toFixed(1) : '0',
    dailyStats,
    eventCounts,
    topPages,
    trafficSources,
    devices,
    eventsByCategory,
    leadsBySource,
    utmCampaigns,
    funnel,
    recentEvents,
    hourlyActivity,
  });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
