"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  Eye,
  Users,
  MousePointerClick,
  Target,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Clock,
  Filter,
  BarChart3,
  Activity,
} from "lucide-react";

// --- Types ---

interface DailyStat {
  date: string;
  views: number;
  unique: number;
  events: number;
  leads: number;
}

interface TrafficSource {
  source: string;
  count: number;
}

interface Device {
  device: string;
  count: number;
}

interface EventCategory {
  category: string;
  events: { name: string; count: number }[];
}

interface LeadSource {
  source: string;
  count: number;
}

interface UtmCampaign {
  source: string;
  medium: string;
  campaign: string;
  leads: number;
}

interface FunnelStep {
  step: string;
  count: number;
}

interface RecentEvent {
  event_name: string;
  event_data: Record<string, unknown> | null;
  page: string | null;
  created_at: string;
}

interface HourlyActivity {
  hour: number;
  count: number;
}

interface AnalyticsData {
  totalViews: number;
  totalUnique: number;
  totalEvents: number;
  totalLeads: number;
  conversionRate: string;
  dailyStats: DailyStat[];
  eventCounts: Record<string, number>;
  topPages: { page: string; count: number }[];
  trafficSources: TrafficSource[];
  devices: Device[];
  eventsByCategory: EventCategory[];
  leadsBySource: LeadSource[];
  utmCampaigns: UtmCampaign[];
  funnel: FunnelStep[];
  recentEvents: RecentEvent[];
  hourlyActivity: HourlyActivity[];
}

// --- Helpers ---

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "только что";
  if (diffMin < 60) return `${diffMin} мин назад`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours} ч назад`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} д назад`;
}

const LEAD_SOURCE_LABELS: Record<string, string> = {
  form: "Форма",
  callback: "Обратный звонок",
  calculator: "Калькулятор",
};

const DEVICE_ICONS: Record<string, typeof Monitor> = {
  Десктоп: Monitor,
  Мобильный: Smartphone,
  Планшет: Tablet,
};

// --- Component ---

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState(30);
  const [activeEventTab, setActiveEventTab] = useState(0);
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/analytics?days=${period}`);
        if (res.ok) {
          setData(await res.json());
        }
      } catch {
        // Network error — leave data as null
      }
      setLoading(false);
    };
    fetchData();
  }, [period]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#5838a8]" />
      </div>
    );
  }

  if (!data) return null;

  const maxViews = Math.max(...data.dailyStats.map((d) => d.views), 1);
  const maxLeads = Math.max(...data.dailyStats.map((d) => d.leads), 1);
  const maxHourly = Math.max(...data.hourlyActivity.map((h) => h.count), 1);
  const totalDevices = data.devices.reduce((s, d) => s + d.count, 0) || 1;
  const totalTraffic = data.trafficSources.reduce((s, t) => s + t.count, 0) || 1;
  const totalLeadSources = data.leadsBySource.reduce((s, l) => s + l.count, 0) || 1;
  const funnelMax = data.funnel[0]?.count || 1;

  const FUNNEL_COLORS = [
    "from-[#7c3aed] to-[#6d28d9]",
    "from-[#8b5cf6] to-[#7c3aed]",
    "from-[#a855f7] to-[#8b5cf6]",
    "from-[#c084fc] to-[#a855f7]",
    "from-[#c04880] to-[#c084fc]",
  ];

  const eventCategories = data.eventsByCategory.length > 0
    ? data.eventsByCategory
    : [{ category: "Нет данных", events: [] }];

  return (
    <div>
      {/* Header + period selector */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Аналитика</h2>
        <div className="flex gap-2">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setPeriod(d)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === d
                  ? "bg-[#5838a8] text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-[#5838a8]/20"
              }`}
            >
              {d} дней
            </button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Просмотры", value: data.totalViews, icon: Eye, color: "text-blue-600 bg-blue-50" },
          { label: "Уникальные", value: data.totalUnique, icon: Users, color: "text-purple-600 bg-purple-50" },
          { label: "События", value: data.totalEvents, icon: MousePointerClick, color: "text-amber-600 bg-amber-50" },
          { label: "Заявки", value: data.totalLeads, icon: Target, color: "text-green-600 bg-green-50" },
          { label: "Конверсия", value: `${data.conversionRate}%`, icon: TrendingUp, color: "text-pink-600 bg-pink-50" },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-white rounded-2xl p-5 border border-slate-200">
              <div className={`w-10 h-10 rounded-xl ${kpi.color} flex items-center justify-center mb-3`}>
                <Icon size={20} />
              </div>
              <div className="text-2xl font-bold text-slate-900">{kpi.value}</div>
              <div className="text-sm text-slate-500">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* Daily chart — views + leads */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <BarChart3 size={20} className="text-[#5838a8]" />
            Динамика по дням
          </h3>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#5838a8]" />
              Просмотры
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-500" />
              Заявки
            </span>
          </div>
        </div>
        {data.dailyStats.length === 0 ? (
          <p className="text-slate-500 text-center py-8">Нет данных за выбранный период</p>
        ) : (
          <div className="flex items-end gap-1 h-52">
            {data.dailyStats.map((day) => (
              <div key={day.date} className="flex-1 group relative flex flex-col items-center gap-1">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:block z-10">
                  <div className="bg-slate-800 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                    <div className="font-medium mb-1">
                      {new Date(day.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}
                    </div>
                    <div>Просмотры: {day.views}</div>
                    <div>Уникальные: {day.unique}</div>
                    <div>События: {day.events}</div>
                    <div>Заявки: {day.leads}</div>
                  </div>
                </div>
                {/* Bars */}
                <div className="w-full flex items-end justify-center gap-px" style={{ height: "180px" }}>
                  <div
                    className="flex-1 bg-[#5838a8] rounded-t-sm min-h-[2px] transition-all"
                    style={{ height: `${(day.views / maxViews) * 100}%` }}
                  />
                  {maxLeads > 0 && (
                    <div
                      className="flex-1 bg-emerald-500 rounded-t-sm min-h-[2px] transition-all"
                      style={{ height: `${(day.leads / Math.max(maxLeads, 1)) * 100}%` }}
                    />
                  )}
                </div>
                <div className="text-[10px] text-slate-400 rotate-[-45deg] origin-top-left whitespace-nowrap mt-1">
                  {new Date(day.date).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Funnel + Devices */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Funnel */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
            <Filter size={20} className="text-[#5838a8]" />
            Воронка конверсии
          </h3>
          {data.funnel.every((f) => f.count === 0) ? (
            <p className="text-slate-500 text-center py-6">Нет данных</p>
          ) : (
            <div className="space-y-3">
              {data.funnel.map((step, i) => {
                const pct = funnelMax > 0 ? (step.count / funnelMax) * 100 : 0;
                const dropoff =
                  i > 0 && data.funnel[i - 1].count > 0
                    ? ((step.count / data.funnel[i - 1].count) * 100).toFixed(0)
                    : null;
                return (
                  <div key={step.step}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-700 font-medium">{step.step}</span>
                      <span className="text-slate-500">
                        {step.count}
                        {dropoff !== null && (
                          <span className="text-slate-400 ml-1 text-xs">({dropoff}%)</span>
                        )}
                      </span>
                    </div>
                    <div className="h-6 bg-slate-100 rounded-lg overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${FUNNEL_COLORS[i] || FUNNEL_COLORS[4]} rounded-lg transition-all duration-500`}
                        style={{ width: `${Math.max(pct, 2)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Devices */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
            <Smartphone size={20} className="text-[#5838a8]" />
            Устройства
          </h3>
          {data.devices.length === 0 ? (
            <p className="text-slate-500 text-center py-6">Нет данных</p>
          ) : (
            <div className="space-y-4">
              {data.devices.map((d) => {
                const pct = ((d.count / totalDevices) * 100).toFixed(1);
                const DeviceIcon = DEVICE_ICONS[d.device] || Monitor;
                return (
                  <div key={d.device}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="flex items-center gap-2 text-slate-700 font-medium">
                        <DeviceIcon size={16} className="text-slate-400" />
                        {d.device}
                      </span>
                      <span className="text-slate-500">
                        {d.count} <span className="text-slate-400">({pct}%)</span>
                      </span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#5838a8] to-[#c04880] rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Traffic sources + Lead sources */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Traffic sources */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
            <Globe size={20} className="text-[#5838a8]" />
            Источники трафика
          </h3>
          {data.trafficSources.length === 0 ? (
            <p className="text-slate-500 text-center py-6">Нет данных</p>
          ) : (
            <div className="space-y-3">
              {data.trafficSources.map((t) => {
                const pct = ((t.count / totalTraffic) * 100).toFixed(1);
                return (
                  <div key={t.source}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-700">{t.source}</span>
                      <span className="text-slate-500">
                        {t.count} <span className="text-slate-400">({pct}%)</span>
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#5838a8] rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Lead sources */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
            <Target size={20} className="text-[#5838a8]" />
            Источники заявок
          </h3>
          {data.leadsBySource.length === 0 ? (
            <p className="text-slate-500 text-center py-6">Нет заявок</p>
          ) : (
            <div className="space-y-4">
              {data.leadsBySource.map((l) => {
                const pct = ((l.count / totalLeadSources) * 100).toFixed(1);
                return (
                  <div key={l.source}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-slate-700 font-medium">
                        {LEAD_SOURCE_LABELS[l.source] || l.source}
                      </span>
                      <span className="text-slate-500">
                        {l.count} <span className="text-slate-400">({pct}%)</span>
                      </span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Hourly activity */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-6">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
          <Clock size={20} className="text-[#5838a8]" />
          Активность по часам
        </h3>
        {data.hourlyActivity.every((h) => h.count === 0) ? (
          <p className="text-slate-500 text-center py-6">Нет данных</p>
        ) : (
          <div>
            <div className="flex gap-1 items-end h-20">
              {data.hourlyActivity.map((h) => {
                const intensity = maxHourly > 0 ? h.count / maxHourly : 0;
                return (
                  <div
                    key={h.hour}
                    className="flex-1 group relative"
                    title={`${h.hour}:00 — ${h.count} просмотров`}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block z-10">
                      <div className="bg-slate-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                        {h.hour}:00 — {h.count}
                      </div>
                    </div>
                    <div
                      className="w-full rounded-sm transition-all"
                      style={{
                        height: `${Math.max(intensity * 100, 8)}%`,
                        backgroundColor: intensity > 0.7
                          ? "#5838a8"
                          : intensity > 0.4
                          ? "#8b5cf6"
                          : intensity > 0.1
                          ? "#c4b5fd"
                          : "#e2e8f0",
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-400">
              <span>00</span>
              <span>06</span>
              <span>12</span>
              <span>18</span>
              <span>23</span>
            </div>
          </div>
        )}
      </div>

      {/* UTM campaigns */}
      {data.utmCampaigns.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-[#5838a8]" />
            UTM-кампании
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 px-3 font-medium text-slate-500">Источник</th>
                  <th className="text-left py-2 px-3 font-medium text-slate-500">Канал</th>
                  <th className="text-left py-2 px-3 font-medium text-slate-500">Кампания</th>
                  <th className="text-right py-2 px-3 font-medium text-slate-500">Заявки</th>
                </tr>
              </thead>
              <tbody>
                {data.utmCampaigns.map((utm, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0">
                    <td className="py-2 px-3 text-slate-700">{utm.source}</td>
                    <td className="py-2 px-3 text-slate-700">{utm.medium}</td>
                    <td className="py-2 px-3 text-slate-700">{utm.campaign}</td>
                    <td className="py-2 px-3 text-right font-medium text-slate-900">{utm.leads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Events by category */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-6">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
          <Activity size={20} className="text-[#5838a8]" />
          События по категориям
        </h3>
        {data.eventsByCategory.length === 0 ? (
          <p className="text-slate-500 text-center py-6">Нет событий</p>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {eventCategories.map((cat, i) => (
                <button
                  key={cat.category}
                  onClick={() => setActiveEventTab(i)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeEventTab === i
                      ? "bg-[#5838a8] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>
            {/* Event list */}
            <div className="space-y-2">
              {eventCategories[activeEventTab]?.events.length === 0 ? (
                <p className="text-slate-500 text-center py-4">Нет событий в этой категории</p>
              ) : (
                eventCategories[activeEventTab]?.events.map((ev) => {
                  const maxEvCount = Math.max(
                    ...eventCategories[activeEventTab].events.map((e) => e.count),
                    1
                  );
                  const evPct = (ev.count / maxEvCount) * 100;
                  return (
                    <div key={ev.name} className="flex items-center gap-3">
                      <span className="text-sm text-slate-600 w-48 shrink-0 font-mono">{ev.name}</span>
                      <div className="flex-1 h-6 bg-slate-100 rounded overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#5838a8]/80 to-[#c04880]/80 rounded transition-all"
                          style={{ width: `${Math.max(evPct, 3)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-700 w-12 text-right">{ev.count}</span>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>

      {/* Top pages + Recent events */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top pages */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Популярные страницы</h3>
          {data.topPages.length === 0 ? (
            <p className="text-slate-500">Нет данных</p>
          ) : (
            <div className="space-y-3">
              {data.topPages.map((p, i) => (
                <div key={p.page} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-400 w-6">{i + 1}.</span>
                    <span className="text-sm text-slate-700 font-mono">{p.page}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-600">{p.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent events */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
            <Clock size={20} className="text-[#5838a8]" />
            Последние события
          </h3>
          {data.recentEvents.length === 0 ? (
            <p className="text-slate-500">Нет событий</p>
          ) : (
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {data.recentEvents.map((ev, i) => (
                <div key={i} className="border-b border-slate-100 last:border-0">
                  <button
                    onClick={() => setExpandedEvent(expandedEvent === i ? null : i)}
                    className="w-full flex items-center gap-3 py-2 text-left hover:bg-slate-50 rounded px-1 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5838a8] shrink-0" />
                    <span className="text-sm font-medium text-slate-700 flex-1 font-mono">
                      {ev.event_name}
                    </span>
                    {ev.page && (
                      <span className="text-xs text-slate-400 truncate max-w-[120px]">{ev.page}</span>
                    )}
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {timeAgo(ev.created_at)}
                    </span>
                    {ev.event_data && (
                      expandedEvent === i
                        ? <ChevronDown size={14} className="text-slate-400 shrink-0" />
                        : <ChevronRight size={14} className="text-slate-400 shrink-0" />
                    )}
                  </button>
                  {expandedEvent === i && ev.event_data && (
                    <div className="ml-5 mb-2 p-2 bg-slate-50 rounded text-xs font-mono text-slate-600 overflow-x-auto">
                      {JSON.stringify(ev.event_data, null, 2)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
