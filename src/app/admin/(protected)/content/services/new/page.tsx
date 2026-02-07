"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  Plus,
  X,
  ClipboardCheck,
  Settings,
  Rocket,
  GraduationCap,
  HeadphonesIcon,
} from "lucide-react";

const ICON_OPTIONS = [
  { value: "ClipboardCheck", label: "Аудит", Icon: ClipboardCheck },
  { value: "Settings", label: "Настройка", Icon: Settings },
  { value: "Rocket", label: "Внедрение", Icon: Rocket },
  { value: "GraduationCap", label: "Обучение", Icon: GraduationCap },
  { value: "HeadphonesIcon", label: "Поддержка", Icon: HeadphonesIcon },
];

const COLOR_PRESETS = [
  { value: "from-[#5838a8] to-[#7c5cc9]", label: "Фиолетовый" },
  { value: "from-[#6b4fad] to-[#9b6fb3]", label: "Сиреневый" },
  { value: "from-[#8560b5] to-[#b278b8]", label: "Лавандовый" },
  { value: "from-[#9e71bc] to-[#c487be]", label: "Розово-фиолетовый" },
  { value: "from-[#b782c0] to-[#c04880]", label: "Розовый" },
  { value: "from-[#5838a8] to-[#c04880]", label: "Градиент" },
];

export default function NewServicePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [icon, setIcon] = useState("ClipboardCheck");
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [color, setColor] = useState("from-[#5838a8] to-[#7c5cc9]");
  const [sortOrder, setSortOrder] = useState(0);

  const addFeature = () => setFeatures([...features, ""]);

  const updateFeature = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const removeFeature = (index: number) => {
    if (features.length <= 1) return;
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanedFeatures = features.filter((f) => f.trim() !== "");
    if (!title.trim()) {
      setError("Введите название услуги");
      return;
    }
    if (!shortDesc.trim()) {
      setError("Введите краткое описание");
      return;
    }
    if (cleanedFeatures.length === 0) {
      setError("Добавьте хотя бы одну особенность");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/content/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          icon,
          title: title.trim(),
          short_desc: shortDesc.trim(),
          description: description.trim(),
          features: cleanedFeatures,
          color,
          sort_order: sortOrder,
          is_active: true,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Не удалось создать услугу");
      }

      router.push("/admin/content/services");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
      setSaving(false);
    }
  };

  const selectedIcon = ICON_OPTIONS.find((o) => o.value === icon);

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/content/services"
          className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Новая услуга</h2>
          <p className="text-slate-500 text-sm mt-1">
            Заполните форму для создания новой услуги
          </p>
        </div>
      </div>

      {/* Error */}
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Icon selection */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Иконка
          </label>
          <div className="flex flex-wrap gap-3">
            {ICON_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setIcon(option.value)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 transition-all ${
                  icon === option.value
                    ? "border-[#5838a8] bg-[#5838a8]/5 text-[#5838a8]"
                    : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                }`}
              >
                <option.Icon size={20} />
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Title & Short desc */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Название <span className="text-red-400">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Аудит"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#5838a8] focus:ring-2 focus:ring-[#5838a8]/10 outline-none transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>
          <div>
            <label
              htmlFor="short_desc"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Краткое описание <span className="text-red-400">*</span>
            </label>
            <input
              id="short_desc"
              type="text"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="Например: Полная диагностика учёта"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#5838a8] focus:ring-2 focus:ring-[#5838a8]/10 outline-none transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Полное описание
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Подробное описание услуги..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#5838a8] focus:ring-2 focus:ring-[#5838a8]/10 outline-none transition-all text-slate-900 placeholder:text-slate-400 resize-none"
            />
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Особенности <span className="text-red-400">*</span>
          </label>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-500 flex-shrink-0">
                  {index + 1}
                </span>
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="Введите особенность..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#5838a8] focus:ring-2 focus:ring-[#5838a8]/10 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  disabled={features.length <= 1}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:hover:text-slate-400 disabled:hover:bg-transparent"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addFeature}
            className="mt-3 inline-flex items-center gap-2 text-sm text-[#5838a8] font-medium hover:text-[#c04880] transition-colors"
          >
            <Plus size={16} />
            Добавить особенность
          </button>
        </div>

        {/* Color & Sort order */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Цвет
            </label>
            <div className="flex flex-wrap gap-3">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setColor(preset.value)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 transition-all ${
                    color === preset.value
                      ? "border-[#5838a8] bg-[#5838a8]/5"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg bg-gradient-to-br ${preset.value}`}
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="sort_order"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Порядок сортировки
            </label>
            <input
              id="sort_order"
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              min={0}
              className="w-32 px-4 py-3 rounded-xl border border-slate-200 focus:border-[#5838a8] focus:ring-2 focus:ring-[#5838a8]/10 outline-none transition-all text-slate-900"
            />
            <p className="text-xs text-slate-400 mt-1">
              Меньшее число = выше в списке
            </p>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Предпросмотр
          </label>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}
              >
                {selectedIcon && (
                  <selectedIcon.Icon className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h4 className="font-bold text-slate-900">
                  {title || "Название услуги"}
                </h4>
                <p className="text-sm text-[#5838a8] font-medium mt-0.5">
                  {shortDesc || "Краткое описание"}
                </p>
                {description && (
                  <p className="text-sm text-slate-600 mt-2">{description}</p>
                )}
                {features.filter((f) => f.trim()).length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {features
                      .filter((f) => f.trim())
                      .map((f, i) => (
                        <li
                          key={i}
                          className="text-xs text-slate-500 flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5838a8]" />
                          {f}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-[#5838a8]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {saving ? "Сохранение..." : "Создать услугу"}
          </button>
          <Link
            href="/admin/content/services"
            className="px-6 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}
