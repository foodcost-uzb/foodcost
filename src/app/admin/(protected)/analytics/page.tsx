"use client";

import { useState, useEffect } from "react";
import { Loader2, Eye, Users, MousePointerClick, Target, TrendingUp } from "lucide-react";

interface DailyStat {
  date: string;
  views: number;
  unique: number;
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
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState(30);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`/api/analytics?days=${period}`);
      const json = await res.json();
      setData(json);
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

  return (
    <div>
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

      {/* Chart */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Просмотры по дням</h3>
        {data.dailyStats.length === 0 ? (
          <p className="text-slate-500 text-center py-8">Нет данных за выбранный период</p>
        ) : (
          <div className="flex items-end gap-1 h-48">
            {data.dailyStats.map((day) => (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs text-slate-500">{day.views}</div>
                <div
                  className="w-full bg-gradient-to-t from-[#5838a8] to-[#c04880] rounded-t-md min-h-[4px]"
                  style={{ height: `${(day.views / maxViews) * 100}%` }}
                />
                <div className="text-[10px] text-slate-400 rotate-[-45deg] origin-top-left whitespace-nowrap">
                  {new Date(day.date).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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

        {/* Events */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">События</h3>
          {Object.keys(data.eventCounts).length === 0 ? (
            <p className="text-slate-500">Нет данных</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(data.eventCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([name, count]) => (
                  <div key={name} className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">{name}</span>
                    <span className="text-sm font-medium text-slate-600">{count}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
