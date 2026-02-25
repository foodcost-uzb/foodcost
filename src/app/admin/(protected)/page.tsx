"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, Users, Eye, Target, TrendingUp, ArrowRight, Clock, Phone, Mail } from "lucide-react";

interface DashboardData {
  totalViews: number;
  totalUnique: number;
  totalLeads: number;
  conversionRate: string;
  dailyStats: { date: string; views: number }[];
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  source: string;
  status: string;
  created_at: string;
}

const statusLabels: Record<string, string> = {
  new: "Новая",
  in_progress: "В работе",
  completed: "Завершена",
  cancelled: "Отменена",
};

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<DashboardData | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsRes, leadsRes] = await Promise.all([
          fetch("/api/analytics?days=30"),
          fetch("/api/leads?status=new"),
        ]);
        if (analyticsRes.ok) {
          setAnalytics(await analyticsRes.json());
        }
        if (leadsRes.ok) {
          const leadsData = await leadsRes.json();
          setLeads(Array.isArray(leadsData) ? leadsData.slice(0, 5) : []);
        }
      } catch {
        // Network error — leave defaults
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#5838a8]" />
      </div>
    );
  }

  const maxViews = Math.max(...(analytics?.dailyStats.map((d) => d.views) || [1]), 1);

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Дашборд</h2>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Просмотры (30д)", value: analytics?.totalViews || 0, icon: Eye, color: "text-blue-600 bg-blue-50" },
          { label: "Уникальные", value: analytics?.totalUnique || 0, icon: Users, color: "text-purple-600 bg-purple-50" },
          { label: "Новые заявки", value: leads.length, icon: Target, color: "text-green-600 bg-green-50" },
          { label: "Конверсия", value: `${analytics?.conversionRate || 0}%`, icon: TrendingUp, color: "text-pink-600 bg-pink-50" },
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Просмотры</h3>
            <Link href="/admin/analytics" className="text-sm text-[#5838a8] hover:underline flex items-center gap-1">
              Подробнее <ArrowRight size={14} />
            </Link>
          </div>
          {!analytics?.dailyStats.length ? (
            <p className="text-slate-500 text-center py-8">Нет данных</p>
          ) : (
            <div className="flex items-end gap-1 h-40">
              {analytics.dailyStats.slice(-14).map((day) => (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-gradient-to-t from-[#5838a8] to-[#c04880] rounded-t-md min-h-[4px]"
                    style={{ height: `${(day.views / maxViews) * 100}%` }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent leads */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Последние заявки</h3>
            <Link href="/admin/leads" className="text-sm text-[#5838a8] hover:underline flex items-center gap-1">
              Все заявки <ArrowRight size={14} />
            </Link>
          </div>
          {leads.length === 0 ? (
            <p className="text-slate-500 text-center py-8">Новых заявок нет</p>
          ) : (
            <div className="space-y-3">
              {leads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <div className="font-medium text-slate-900 text-sm">{lead.name}</div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1"><Phone size={10} /> {lead.phone}</span>
                      {lead.email && <span className="flex items-center gap-1"><Mail size={10} /> {lead.email}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[lead.status]}`}>
                      {statusLabels[lead.status]}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(lead.created_at).toLocaleDateString("ru-RU")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
