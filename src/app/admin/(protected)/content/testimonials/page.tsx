"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  Eye,
  EyeOff,
  Star,
  Video,
  MessageSquare,
} from "lucide-react";

interface Testimonial {
  id: string;
  type: "text" | "video";
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

export default function TestimonialsListPage() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/content/testimonials");
      if (!res.ok) throw new Error("Не удалось загрузить отзывы");
      const data = await res.json();
      setTestimonials(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот отзыв?")) return;

    try {
      setDeleting(id);
      const res = await fetch(`/api/content/testimonials/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Не удалось удалить отзыв");
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Ошибка при удалении");
    } finally {
      setDeleting(null);
    }
  };

  const handleToggleActive = async (testimonial: Testimonial) => {
    try {
      setToggling(testimonial.id);
      const res = await fetch(`/api/content/testimonials/${testimonial.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !testimonial.is_active }),
      });
      if (!res.ok) throw new Error("Не удалось обновить статус");
      setTestimonials((prev) =>
        prev.map((t) =>
          t.id === testimonial.id ? { ...t, is_active: !t.is_active } : t
        )
      );
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Ошибка при обновлении");
    } finally {
      setToggling(null);
    }
  };

  const renderRating = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={
              star <= rating
                ? "fill-amber-400 text-amber-400"
                : "text-slate-300"
            }
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-[#5838a8]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchTestimonials}
          className="px-4 py-2 bg-[#5838a8] text-white rounded-lg hover:bg-[#4a2e96] transition-colors"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  const textTestimonials = testimonials.filter((t) => t.type === "text");
  const videoTestimonials = testimonials.filter((t) => t.type === "video");

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Отзывы</h2>
          <p className="text-slate-500 text-sm mt-1">
            {testimonials.length}{" "}
            {testimonials.length === 1
              ? "отзыв"
              : testimonials.length < 5
                ? "отзыва"
                : "отзывов"}
          </p>
        </div>
        <Link
          href="/admin/content/testimonials/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#5838a8] text-white rounded-xl hover:bg-[#4a2e96] transition-colors font-medium text-sm"
        >
          <Plus size={18} />
          Добавить отзыв
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Нет отзывов
          </h3>
          <p className="text-slate-500 mb-6">
            Добавьте первый отзыв клиента
          </p>
          <Link
            href="/admin/content/testimonials/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#5838a8] text-white rounded-xl hover:bg-[#4a2e96] transition-colors font-medium text-sm"
          >
            <Plus size={18} />
            Добавить отзыв
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Text Testimonials */}
          {textTestimonials.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <MessageSquare size={20} className="text-[#5838a8]" />
                Текстовые отзывы
                <span className="text-sm font-normal text-slate-400">
                  ({textTestimonials.length})
                </span>
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="divide-y divide-slate-100">
                  {textTestimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className={`p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors ${
                        !testimonial.is_active ? "opacity-50" : ""
                      }`}
                    >
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        {testimonial.avatar ? (
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5838a8] to-[#c04880] flex items-center justify-center text-white font-semibold text-lg">
                            {testimonial.name.charAt(0)}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-semibold text-slate-900">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-slate-500">
                              {testimonial.role}
                              {testimonial.location &&
                                `, ${testimonial.location}`}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {renderRating(testimonial.rating)}
                          </div>
                        </div>
                        {testimonial.text && (
                          <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                            {testimonial.text}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-3">
                          <span className="text-xs text-slate-400">
                            Порядок: {testimonial.sort_order}
                          </span>
                          {!testimonial.is_active && (
                            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                              Скрыт
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleToggleActive(testimonial)}
                          disabled={toggling === testimonial.id}
                          className="p-2 text-slate-400 hover:text-[#5838a8] hover:bg-[#5838a8]/5 rounded-lg transition-colors disabled:opacity-50"
                          title={
                            testimonial.is_active ? "Скрыть" : "Показать"
                          }
                        >
                          {toggling === testimonial.id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : testimonial.is_active ? (
                            <Eye size={16} />
                          ) : (
                            <EyeOff size={16} />
                          )}
                        </button>
                        <button
                          onClick={() =>
                            router.push(
                              `/admin/content/testimonials/${testimonial.id}`
                            )
                          }
                          className="p-2 text-slate-400 hover:text-[#5838a8] hover:bg-[#5838a8]/5 rounded-lg transition-colors"
                          title="Редактировать"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial.id)}
                          disabled={deleting === testimonial.id}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Удалить"
                        >
                          {deleting === testimonial.id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Video Testimonials */}
          {videoTestimonials.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Video size={20} className="text-[#c04880]" />
                Видео-отзывы
                <span className="text-sm font-normal text-slate-400">
                  ({videoTestimonials.length})
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videoTestimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className={`bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-all ${
                      !testimonial.is_active ? "opacity-50" : ""
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-slate-100">
                      {testimonial.thumbnail ? (
                        <img
                          src={testimonial.thumbnail}
                          alt={testimonial.video_title || testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Video size={32} className="text-slate-300" />
                        </div>
                      )}
                      {testimonial.video_id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                            <Video size={20} className="text-[#5838a8]" />
                          </div>
                        </div>
                      )}
                      {!testimonial.is_active && (
                        <div className="absolute top-2 right-2">
                          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                            Скрыт
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h4 className="font-semibold text-slate-900 text-sm mb-1">
                        {testimonial.video_title || "Без названия"}
                      </h4>
                      <p className="text-xs text-slate-500 mb-1">
                        {testimonial.name}
                      </p>
                      {testimonial.client_name && (
                        <p className="text-xs text-slate-400">
                          {testimonial.client_name}
                        </p>
                      )}
                      <p className="text-xs text-slate-400 mt-1">
                        Порядок: {testimonial.sort_order}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="px-4 pb-4 flex items-center gap-1">
                      <button
                        onClick={() => handleToggleActive(testimonial)}
                        disabled={toggling === testimonial.id}
                        className="p-2 text-slate-400 hover:text-[#5838a8] hover:bg-[#5838a8]/5 rounded-lg transition-colors disabled:opacity-50"
                        title={
                          testimonial.is_active ? "Скрыть" : "Показать"
                        }
                      >
                        {toggling === testimonial.id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : testimonial.is_active ? (
                          <Eye size={16} />
                        ) : (
                          <EyeOff size={16} />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          router.push(
                            `/admin/content/testimonials/${testimonial.id}`
                          )
                        }
                        className="p-2 text-slate-400 hover:text-[#5838a8] hover:bg-[#5838a8]/5 rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        disabled={deleting === testimonial.id}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Удалить"
                      >
                        {deleting === testimonial.id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
