"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  Eye,
  EyeOff,
  ArrowLeft,
  Package,
  Star,
  GripVertical,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  features: string[];
  is_popular: boolean;
  badge: string | null;
  color: string;
  bg_color: string;
  border_color: string;
  sort_order: number;
  is_active: boolean;
}

export default function ProductsListPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/content/products");
      if (!res.ok) throw new Error("Ошибка загрузки продуктов");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleActive = async (product: Product) => {
    try {
      setTogglingId(product.id);
      const res = await fetch(`/api/content/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !product.is_active }),
      });
      if (!res.ok) throw new Error("Ошибка обновления");
      await fetchProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка обновления");
    } finally {
      setTogglingId(null);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Удалить продукт? Это действие необратимо.")) return;
    try {
      setDeletingId(id);
      const res = await fetch(`/api/content/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Ошибка удаления");
      await fetchProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка удаления");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/content"
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Продукты</h2>
            <p className="text-sm text-slate-500 mt-1">
              Тарифные планы и пакеты услуг
            </p>
          </div>
        </div>
        <Link
          href="/admin/content/products/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          Добавить продукт
        </Link>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
          {error}
          <button
            onClick={() => setError("")}
            className="ml-2 underline hover:no-underline"
          >
            Закрыть
          </button>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#5838a8]" />
        </div>
      ) : products.length === 0 ? (
        /* Empty state */
        <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">Продуктов пока нет</p>
          <Link
            href="/admin/content/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#5838a8] text-white rounded-lg hover:bg-[#7c5cc9] transition-colors text-sm"
          >
            <Plus size={16} />
            Создать первый продукт
          </Link>
        </div>
      ) : (
        /* Products list */
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-2xl p-6 border transition-colors ${
                product.is_active
                  ? "border-slate-200 hover:border-[#5838a8]/20"
                  : "border-slate-200 bg-slate-50/50 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left: product info */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <GripVertical
                      size={16}
                      className="text-slate-300 flex-shrink-0"
                    />
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                      style={{
                        backgroundColor: product.bg_color || "#f0f0ff",
                        color: product.color || "#5838a8",
                        borderWidth: "1px",
                        borderColor: product.border_color || "#e0e0ff",
                      }}
                    >
                      {product.icon === "Zap"
                        ? "\u26A1"
                        : product.icon === "Crown"
                          ? "\uD83D\uDC51"
                          : "\u2728"}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="font-semibold text-slate-900 truncate">
                        {product.name}
                      </h3>

                      {product.is_popular && (
                        <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium flex-shrink-0">
                          <Star size={12} />
                          Популярный
                        </span>
                      )}

                      {product.badge && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium flex-shrink-0">
                          {product.badge}
                        </span>
                      )}

                      {!product.is_active && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium flex-shrink-0">
                          Скрыт
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-slate-500 mb-2 truncate">
                      {product.tagline}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span>
                        {product.features?.length || 0}{" "}
                        {(() => {
                          const count = product.features?.length || 0;
                          if (count === 1) return "функция";
                          if (count >= 2 && count <= 4) return "функции";
                          return "функций";
                        })()}
                      </span>
                      <span>Порядок: {product.sort_order}</span>
                      <span
                        className="flex items-center gap-1"
                        style={{ color: product.color || "#5838a8" }}
                      >
                        <span
                          className="w-3 h-3 rounded-full inline-block"
                          style={{
                            backgroundColor: product.color || "#5838a8",
                          }}
                        />
                        {product.color}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => toggleActive(product)}
                    disabled={togglingId === product.id}
                    className={`p-2 rounded-lg transition-colors ${
                      product.is_active
                        ? "text-green-600 hover:bg-green-50"
                        : "text-slate-400 hover:bg-slate-100"
                    }`}
                    title={
                      product.is_active
                        ? "Скрыть продукт"
                        : "Показать продукт"
                    }
                  >
                    {togglingId === product.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : product.is_active ? (
                      <Eye size={16} />
                    ) : (
                      <EyeOff size={16} />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      router.push(`/admin/content/products/${product.id}`)
                    }
                    className="p-2 text-slate-400 hover:text-[#5838a8] hover:bg-purple-50 rounded-lg transition-colors"
                    title="Редактировать"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    disabled={deletingId === product.id}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Удалить"
                  >
                    {deletingId === product.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
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
