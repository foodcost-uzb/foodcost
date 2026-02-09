"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  GripVertical,
  ClipboardCheck,
  Settings,
  Rocket,
  GraduationCap,
  HeadphonesIcon,
  Phone,
} from "lucide-react";
import type { Service } from "@/lib/supabase/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ClipboardCheck,
  Settings,
  Rocket,
  GraduationCap,
  HeadphonesIcon,
  Phone,
};

export default function ServicesListPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const fetchServices = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch("/api/content/services");
      if (!res.ok) throw new Error("Не удалось загрузить услуги");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleToggleActive = async (service: Service) => {
    setTogglingId(service.id);
    try {
      const res = await fetch(`/api/content/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !service.is_active }),
      });
      if (!res.ok) throw new Error("Не удалось обновить статус");
      setServices((prev) =>
        prev.map((s) =>
          s.id === service.id ? { ...s, is_active: !s.is_active } : s
        )
      );
      showSuccess(
        service.is_active ? "Услуга деактивирована" : "Услуга активирована"
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (service: Service) => {
    if (!confirm(`Удалить услугу "${service.title}"? Это действие необратимо.`))
      return;

    setDeletingId(service.id);
    try {
      const res = await fetch(`/api/content/services/${service.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Не удалось удалить услугу");
      setServices((prev) => prev.filter((s) => s.id !== service.id));
      showSuccess("Услуга удалена");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-[#5838a8]" />
        <span className="ml-3 text-slate-500 text-lg">Загрузка услуг...</span>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/content"
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Услуги</h2>
            <p className="text-slate-500 text-sm mt-1">
              {services.length}{" "}
              {services.length === 1
                ? "услуга"
                : services.length < 5
                  ? "услуги"
                  : "услуг"}
            </p>
          </div>
        </div>
        <Link
          href="/admin/content/services/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white px-5 py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-[#5838a8]/25 transition-all"
        >
          <Plus size={18} />
          Добавить услугу
        </Link>
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="mb-6 flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-3 rounded-xl">
          <CheckCircle2 size={18} />
          {successMessage}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl">
          <AlertCircle size={18} />
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-400 hover:text-red-600"
          >
            &times;
          </button>
        </div>
      )}

      {/* Empty state */}
      {services.length === 0 && !error && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ClipboardCheck className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Нет услуг
          </h3>
          <p className="text-slate-500 mb-6">
            Создайте первую услугу для отображения на сайте
          </p>
          <Link
            href="/admin/content/services/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white px-5 py-2.5 rounded-xl font-medium hover:shadow-lg transition-all"
          >
            <Plus size={18} />
            Добавить услугу
          </Link>
        </div>
      )}

      {/* Services list */}
      {services.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <div className="w-8" />
            <div>Услуга</div>
            <div className="w-20 text-center">Порядок</div>
            <div className="w-24 text-center">Статус</div>
            <div className="w-28 text-center">Действия</div>
          </div>
          {services.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-6 py-4 border-b border-slate-100 last:border-b-0 items-center hover:bg-slate-50/50 transition-colors"
              >
                {/* Drag handle (visual) */}
                <div className="w-8 flex items-center justify-center text-slate-300">
                  <GripVertical size={16} />
                </div>

                {/* Service info */}
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}
                  >
                    {IconComponent ? (
                      <IconComponent className="w-5 h-5 text-white" />
                    ) : (
                      <ClipboardCheck className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-900 truncate">
                      {service.title}
                    </div>
                    <div className="text-sm text-slate-500 truncate">
                      {service.short_desc}
                    </div>
                  </div>
                </div>

                {/* Sort order */}
                <div className="w-20 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-sm font-medium text-slate-600">
                    {service.sort_order}
                  </span>
                </div>

                {/* Status toggle */}
                <div className="w-24 flex justify-center">
                  <button
                    onClick={() => handleToggleActive(service)}
                    disabled={togglingId === service.id}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      service.is_active
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {togglingId === service.id ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : service.is_active ? (
                      <Eye size={12} />
                    ) : (
                      <EyeOff size={12} />
                    )}
                    {service.is_active ? "Активна" : "Скрыта"}
                  </button>
                </div>

                {/* Actions */}
                <div className="w-28 flex items-center justify-center gap-1">
                  <Link
                    href={`/admin/content/services/${service.id}`}
                    className="p-2 rounded-lg text-slate-400 hover:text-[#5838a8] hover:bg-[#5838a8]/5 transition-colors"
                    title="Редактировать"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(service)}
                    disabled={deletingId === service.id}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                    title="Удалить"
                  >
                    {deletingId === service.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
