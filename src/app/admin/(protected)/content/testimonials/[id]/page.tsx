"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Save,
  Star,
  Video,
  MessageSquare,
} from "lucide-react";

type TestimonialType = "text" | "video";

interface Testimonial {
  id: string;
  type: TestimonialType;
  name: string;
  role: string;
  location: string;
  avatar: string | null;
  text: string | null;
  rating: number;
  video_id: string | null;
  video_title: string | null;
  thumbnail: string | null;
  client_name: string | null;
  sort_order: number;
  is_active: boolean;
}

interface FormData {
  type: TestimonialType;
  name: string;
  role: string;
  location: string;
  avatar: string;
  text: string;
  rating: number;
  video_id: string;
  video_title: string;
  thumbnail: string;
  client_name: string;
  sort_order: number;
  is_active: boolean;
}

export default function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [form, setForm] = useState<FormData>({
    type: "text",
    name: "",
    role: "",
    location: "",
    avatar: "",
    text: "",
    rating: 5,
    video_id: "",
    video_title: "",
    thumbnail: "",
    client_name: "",
    sort_order: 0,
    is_active: true,
  });

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        setLoading(true);
        setLoadError(null);
        const res = await fetch(`/api/content/testimonials/${id}`);
        if (!res.ok) throw new Error("Не удалось загрузить отзыв");
        const data: Testimonial = await res.json();

        setForm({
          type: data.type,
          name: data.name || "",
          role: data.role || "",
          location: data.location || "",
          avatar: data.avatar || "",
          text: data.text || "",
          rating: data.rating || 5,
          video_id: data.video_id || "",
          video_title: data.video_title || "",
          thumbnail: data.thumbnail || "",
          client_name: data.client_name || "",
          sort_order: data.sort_order || 0,
          is_active: data.is_active,
        });
      } catch (err: unknown) {
        setLoadError(
          err instanceof Error ? err.message : "Произошла ошибка при загрузке"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, [id]);

  const updateField = <K extends keyof FormData>(
    key: K,
    value: FormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!form.name.trim()) {
      setError("Укажите имя");
      return;
    }

    if (form.type === "text" && !form.text.trim()) {
      setError("Укажите текст отзыва");
      return;
    }

    if (form.type === "video" && !form.video_id.trim()) {
      setError("Укажите ID видео YouTube");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        type: form.type,
        name: form.name.trim(),
        role: form.role.trim(),
        location: form.location.trim(),
        avatar: form.avatar.trim() || null,
        text: form.type === "text" ? form.text.trim() : null,
        rating: form.type === "text" ? form.rating : 5,
        video_id: form.type === "video" ? form.video_id.trim() : null,
        video_title: form.type === "video" ? form.video_title.trim() : null,
        thumbnail: form.type === "video" ? form.thumbnail.trim() || null : null,
        client_name:
          form.type === "video" ? form.client_name.trim() || null : null,
        sort_order: form.sort_order,
        is_active: form.is_active,
      };

      const res = await fetch(`/api/content/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Не удалось сохранить отзыв");
      }

      router.push("/admin/content/testimonials");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-[#5838a8]" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/admin/content/testimonials"
            className="p-2 text-slate-400 hover:text-[#5838a8] hover:bg-[#5838a8]/5 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-2xl font-bold text-slate-900">
            Редактирование отзыва
          </h2>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <p className="text-red-500 mb-4">{loadError}</p>
          <Link
            href="/admin/content/testimonials"
            className="px-4 py-2 bg-[#5838a8] text-white rounded-lg hover:bg-[#4a2e96] transition-colors text-sm"
          >
            Вернуться к списку
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/content/testimonials"
          className="p-2 text-slate-400 hover:text-[#5838a8] hover:bg-[#5838a8]/5 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Редактировать отзыв
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Изменение{" "}
            {form.type === "text" ? "текстового отзыва" : "видео-отзыва"}
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Type Selector */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Тип отзыва
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => updateField("type", "text")}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                form.type === "text"
                  ? "border-[#5838a8] bg-[#5838a8]/5"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  form.type === "text"
                    ? "bg-[#5838a8] text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                <MessageSquare size={20} />
              </div>
              <div className="text-left">
                <div
                  className={`font-semibold text-sm ${
                    form.type === "text" ? "text-[#5838a8]" : "text-slate-700"
                  }`}
                >
                  Текстовый
                </div>
                <div className="text-xs text-slate-400">
                  Отзыв с текстом и рейтингом
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => updateField("type", "video")}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                form.type === "video"
                  ? "border-[#c04880] bg-[#c04880]/5"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  form.type === "video"
                    ? "bg-[#c04880] text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                <Video size={20} />
              </div>
              <div className="text-left">
                <div
                  className={`font-semibold text-sm ${
                    form.type === "video" ? "text-[#c04880]" : "text-slate-700"
                  }`}
                >
                  Видео
                </div>
                <div className="text-xs text-slate-400">
                  YouTube видео-отзыв
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Common Fields */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">
            Основная информация
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {form.type === "text" ? "Имя клиента" : "Название компании"}{" "}
                <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder={
                  form.type === "text"
                    ? "Например: Алишер Каримов"
                    : 'Например: Сеть ресторанов "Плов Центр"'
                }
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] transition-colors text-sm"
              />
            </div>

            {form.type === "text" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Должность / Роль
                  </label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => updateField("role", e.target.value)}
                    placeholder='Например: Владелец сети "Плов центр"'
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Город / Локация
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    placeholder="Например: Ташкент"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    URL аватара
                  </label>
                  <input
                    type="url"
                    value={form.avatar}
                    onChange={(e) => updateField("avatar", e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] transition-colors text-sm"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Text-specific Fields */}
        {form.type === "text" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              Содержание отзыва
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Текст отзыва <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={form.text}
                  onChange={(e) => updateField("text", e.target.value)}
                  placeholder="Введите текст отзыва клиента..."
                  rows={5}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] transition-colors text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Рейтинг
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => updateField("rating", star)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        size={28}
                        className={
                          star <= form.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300 hover:text-amber-300"
                        }
                      />
                    </button>
                  ))}
                  <span className="text-sm text-slate-500 ml-2">
                    {form.rating} из 5
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video-specific Fields */}
        {form.type === "video" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              Данные видео
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  ID видео YouTube <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.video_id}
                  onChange={(e) => updateField("video_id", e.target.value)}
                  placeholder="Например: hc1IazKcsXo"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] transition-colors text-sm"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Часть URL после &quot;v=&quot; или после &quot;youtu.be/&quot;
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Название видео
                </label>
                <input
                  type="text"
                  value={form.video_title}
                  onChange={(e) => updateField("video_title", e.target.value)}
                  placeholder="Например: Как снизить food cost на 15%"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  URL превью (thumbnail)
                </label>
                <input
                  type="url"
                  value={form.thumbnail}
                  onChange={(e) => updateField("thumbnail", e.target.value)}
                  placeholder="https://example.com/thumbnail.jpg"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] transition-colors text-sm"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Если не указать, будет использована стандартная заглушка
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Имя клиента
                </label>
                <input
                  type="text"
                  value={form.client_name}
                  onChange={(e) => updateField("client_name", e.target.value)}
                  placeholder="Например: Алишер Каримов"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] transition-colors text-sm"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateField("role", form.role === "short" ? "" : "short")}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    form.role === "short" ? "bg-[#c04880]" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      form.role === "short" ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <span className="text-sm text-slate-700">
                  YouTube Shorts (вертикальное видео)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">
            Настройки
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Порядок сортировки
              </label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) =>
                  updateField("sort_order", parseInt(e.target.value) || 0)
                }
                min={0}
                className="w-32 px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5838a8]/20 focus:border-[#5838a8] transition-colors text-sm"
              />
              <p className="text-xs text-slate-400 mt-1">
                Меньшее значение = выше в списке
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => updateField("is_active", !form.is_active)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  form.is_active ? "bg-[#5838a8]" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    form.is_active ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-sm text-slate-700">
                {form.is_active
                  ? "Отзыв активен и виден на сайте"
                  : "Отзыв скрыт"}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#5838a8] text-white rounded-xl hover:bg-[#4a2e96] transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {saving ? "Сохранение..." : "Сохранить изменения"}
          </button>
          <Link
            href="/admin/content/testimonials"
            className="px-6 py-2.5 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors font-medium text-sm"
          >
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}
