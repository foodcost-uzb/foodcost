"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Save,
  Plus,
  Trash2,
} from "lucide-react";
import { CaseStudy, CaseResult } from "@/lib/supabase/types";

export default function EditCasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [results, setResults] = useState<CaseResult[]>([]);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const res = await fetch("/api/content/cases");
        if (!res.ok) throw new Error("Ошибка загрузки кейса");
        const data: CaseStudy[] = await res.json();
        const caseItem = data.find((c) => c.id === id);
        if (!caseItem) throw new Error("Кейс не найден");

        setTitle(caseItem.title);
        setLocation(caseItem.location);
        setImage(caseItem.image || "");
        setDescription(caseItem.description);
        setSortOrder(caseItem.sort_order);
        setIsActive(caseItem.is_active);
        setResults(caseItem.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Произошла ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [id]);

  const addResult = () => {
    setResults([...results, { label: "", value: "", positive: true }]);
  };

  const removeResult = (index: number) => {
    setResults(results.filter((_, i) => i !== index));
  };

  const updateResult = (
    index: number,
    field: keyof CaseResult,
    value: string | boolean
  ) => {
    setResults(
      results.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch(`/api/content/cases/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          location,
          image,
          description,
          sort_order: sortOrder,
          is_active: isActive,
          results: results.filter((r) => r.label.trim() && r.value.trim()),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка сохранения кейса");
      }

      router.push("/admin/content/cases");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#5838a8]" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/content/cases"
          className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Редактирование кейса
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Измените данные кейса
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main info */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
            Основная информация
          </h3>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Название *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Ресторан «Название»"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Локация *
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="Москва, Россия"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              URL изображения
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] outline-none transition-colors"
            />
            {image && (
              <div className="mt-3">
                <img
                  src={image}
                  alt="Preview"
                  className="w-32 h-20 rounded-lg object-cover border border-slate-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Описание *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              placeholder="Опишите проект и выполненную работу..."
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] outline-none transition-colors resize-none"
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              Результаты
            </h3>
            <button
              type="button"
              onClick={addResult}
              className="flex items-center gap-1.5 text-sm text-[#5838a8] font-medium hover:text-[#4a2d96] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Добавить
            </button>
          </div>

          {results.length === 0 && (
            <p className="text-slate-400 text-sm">
              Добавьте хотя бы один результат
            </p>
          )}

          <div className="space-y-4">
            {results.map((result, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl"
              >
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Метрика
                    </label>
                    <input
                      type="text"
                      value={result.label}
                      onChange={(e) =>
                        updateResult(index, "label", e.target.value)
                      }
                      placeholder="Снижение food cost"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Значение
                    </label>
                    <input
                      type="text"
                      value={result.value}
                      onChange={(e) =>
                        updateResult(index, "value", e.target.value)
                      }
                      placeholder="-12%"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={result.positive}
                      onChange={(e) =>
                        updateResult(index, "positive", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:ring-2 peer-focus:ring-[#5838a8]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500" />
                    <span className="ml-2 text-xs text-slate-500 whitespace-nowrap">
                      {result.positive ? "Позитивный" : "Негативный"}
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() => removeResult(index)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Удалить результат"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
            Настройки
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Порядок сортировки
              </label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] outline-none transition-colors"
              />
            </div>

            <div className="flex items-center gap-3 pt-7">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:ring-2 peer-focus:ring-[#5838a8]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5838a8]" />
                <span className="ml-3 text-sm font-medium text-slate-700">
                  Активен
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Сохранение...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Сохранить
              </>
            )}
          </button>
          <Link
            href="/admin/content/cases"
            className="px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}
