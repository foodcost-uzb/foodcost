"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { CaseStudy } from "@/lib/supabase/types";

export default function CasesListPage() {
  const router = useRouter();
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/content/cases");
      if (!res.ok) throw new Error("Ошибка загрузки кейсов");
      const data = await res.json();
      setCases(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить этот кейс? Это действие нельзя отменить.")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/content/cases/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Ошибка удаления");
      setCases((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Ошибка удаления");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleActive = async (caseItem: CaseStudy) => {
    try {
      const res = await fetch(`/api/content/cases/${caseItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !caseItem.is_active }),
      });
      if (!res.ok) throw new Error("Ошибка обновления");
      setCases((prev) =>
        prev.map((c) =>
          c.id === caseItem.id ? { ...c, is_active: !c.is_active } : c
        )
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Ошибка обновления");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/content"
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Кейсы</h2>
            <p className="text-slate-500 text-sm mt-0.5">
              Портфолио и результаты работы
            </p>
          </div>
        </div>
        <Link
          href="/admin/content/cases/new"
          className="flex items-center gap-2 bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white px-4 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Добавить кейс
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm border border-red-100">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#5838a8]" />
        </div>
      ) : cases.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500 mb-4">Кейсы пока не добавлены</p>
          <Link
            href="/admin/content/cases/new"
            className="inline-flex items-center gap-2 text-[#5838a8] font-medium hover:underline"
          >
            <Plus className="w-4 h-4" />
            Добавить первый кейс
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Кейс
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Локация
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Результаты
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Порядок
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseItem) => (
                <tr
                  key={caseItem.id}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {caseItem.image && (
                        <img
                          src={caseItem.image}
                          alt={caseItem.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium text-slate-900">
                          {caseItem.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 max-w-[250px]">
                          {caseItem.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {caseItem.location}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#5838a8]/10 text-[#5838a8]">
                      {caseItem.results?.length || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-slate-600">
                    {caseItem.sort_order}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleActive(caseItem)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        caseItem.is_active
                          ? "bg-green-50 text-green-700 hover:bg-green-100"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {caseItem.is_active ? (
                        <>
                          <Eye className="w-3 h-3" />
                          Активен
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" />
                          Скрыт
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() =>
                          router.push(`/admin/content/cases/${caseItem.id}`)
                        }
                        className="p-2 rounded-lg text-slate-400 hover:text-[#5838a8] hover:bg-[#5838a8]/5 transition-colors"
                        title="Редактировать"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(caseItem.id)}
                        disabled={deletingId === caseItem.id}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                        title="Удалить"
                      >
                        {deletingId === caseItem.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
