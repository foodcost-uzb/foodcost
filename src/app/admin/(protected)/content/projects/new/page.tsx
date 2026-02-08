"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [website, setWebsite] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/content/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          logo,
          website: website || null,
          sort_order: sortOrder,
          is_active: isActive,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка создания проекта");
      }

      router.push("/admin/content/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/content/projects"
          className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Новый проект</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Добавьте логотип клиента или проекта
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Название компании или проекта"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Логотип *
            </label>
            <ImageUpload value={logo} onChange={setLogo} folder="projects" />
            <div className="mt-3">
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Или вставьте URL вручную
              </label>
              <input
                type="url"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Сайт
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] outline-none transition-colors"
            />
          </div>
        </div>

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
                Создать проект
              </>
            )}
          </button>
          <Link
            href="/admin/content/projects"
            className="px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}
