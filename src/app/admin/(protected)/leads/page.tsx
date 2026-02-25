"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Filter, Loader2, Trash2, Phone, Mail, MessageSquare, Clock } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  source: string;
  status: string;
  notes: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  new: "Новая",
  in_progress: "В работе",
  completed: "Завершена",
  cancelled: "Отменена",
};

const sourceLabels: Record<string, string> = {
  form: "Форма",
  callback: "Обратный звонок",
  calculator: "Калькулятор",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState("");

  // Reload trigger — increment to re-fetch from event handlers
  const [reloadKey, setReloadKey] = useState(0);
  const reload = useCallback(() => setReloadKey(k => k + 1), []);

  // Build query URL
  const buildQuery = useCallback(() => {
    const params = new URLSearchParams();
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (sourceFilter !== "all") params.set("source", sourceFilter);
    if (searchTerm) params.set("search", searchTerm);
    return `/api/leads?${params}`;
  }, [statusFilter, sourceFilter, searchTerm]);

  // Fetch leads — setState only in async callbacks (React 19 safe)
  useEffect(() => {
    let cancelled = false;
    const url = buildQuery();

    fetch(url)
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (!cancelled) {
          setLeads(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLeads([]);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [buildQuery, reloadKey]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(search);
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    reload();
  };

  const saveNotes = async (id: string) => {
    await fetch(`/api/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: notesValue }),
    });
    setEditingNotes(null);
    reload();
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Удалить заявку?")) return;
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    reload();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Заявки</h2>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <form onSubmit={handleSearch} className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-700 mb-1">Поиск</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Имя, телефон, email..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#5838a8] focus:border-transparent outline-none"
              />
            </div>
          </form>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <Filter size={14} className="inline mr-1" />
              Статус
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#5838a8] outline-none"
            >
              <option value="all">Все</option>
              <option value="new">Новые</option>
              <option value="in_progress">В работе</option>
              <option value="completed">Завершённые</option>
              <option value="cancelled">Отменённые</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Источник</label>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#5838a8] outline-none"
            >
              <option value="all">Все</option>
              <option value="form">Форма</option>
              <option value="callback">Обратный звонок</option>
              <option value="calculator">Калькулятор</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#5838a8]" />
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center">
          <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Заявок пока нет</p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#5838a8]/20 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-slate-900">{lead.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[lead.status]}`}>
                      {statusLabels[lead.status]}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                      {sourceLabels[lead.source]}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-[#5838a8]">
                      <Phone size={14} /> {lead.phone}
                    </a>
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-[#5838a8]">
                        <Mail size={14} /> {lead.email}
                      </a>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {formatDate(lead.created_at)}
                    </span>
                  </div>

                  {lead.message && (
                    <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3 mb-3">{lead.message}</p>
                  )}

                  {/* Notes */}
                  <div className="mt-3">
                    {editingNotes === lead.id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={notesValue}
                          onChange={(e) => setNotesValue(e.target.value)}
                          className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#5838a8] outline-none"
                          placeholder="Заметка..."
                          autoFocus
                        />
                        <button
                          onClick={() => saveNotes(lead.id)}
                          className="px-3 py-1.5 bg-[#5838a8] text-white rounded-lg text-sm hover:bg-[#7c5cc9]"
                        >
                          Сохранить
                        </button>
                        <button
                          onClick={() => setEditingNotes(null)}
                          className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm hover:bg-slate-200"
                        >
                          Отмена
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingNotes(lead.id);
                          setNotesValue(lead.notes || "");
                        }}
                        className="text-sm text-slate-400 hover:text-[#5838a8] transition-colors"
                      >
                        {lead.notes || "Добавить заметку..."}
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Status change */}
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className="text-sm px-2 py-1 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#5838a8] outline-none"
                  >
                    <option value="new">Новая</option>
                    <option value="in_progress">В работе</option>
                    <option value="completed">Завершена</option>
                    <option value="cancelled">Отменена</option>
                  </select>

                  <button
                    onClick={() => deleteLead(lead.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
