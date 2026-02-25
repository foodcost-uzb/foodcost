"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles, Zap, Crown, X, type LucideIcon } from "lucide-react";
import { gtagProductView } from "@/lib/gtag";
import { fbqViewContent } from "@/lib/meta-pixel";

const iconMap: Record<string, LucideIcon> = { Zap, Sparkles, Crown };

interface ProductData {
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
}

interface ProductsProps {
  products?: ProductData[];
}

function parseTagline(tagline: string): { tagline: string; price: string | null } {
  const parts = tagline.split('|');
  return {
    tagline: parts[0].trim(),
    price: parts[1]?.trim() || null,
  };
}

const defaultProducts: ProductData[] = [
  { id: "1", name: "BASE CONTROL", tagline: "Базовый контроль и отчётность|от 2 000 000 сум", description: "Идеальный старт для тех, кто хочет навести порядок в учёте и получать регулярные отчёты о состоянии бизнеса.", icon: "Zap", features: ["Ежемесячные отчёты по food cost", "Контроль остатков", "Базовая аналитика", "Консультации по запросу", "Telegram-поддержка"], is_popular: false, badge: null, color: "from-slate-600 to-slate-700", bg_color: "bg-slate-50", border_color: "border-slate-200" },
  { id: "2", name: "PRO CONTROL", tagline: "Углублённый учёт + аналитика|от 5 000 000 сум", description: "Для тех, кто серьёзно относится к контролю. Полный цикл управления учётом с глубокой аналитикой.", icon: "Sparkles", features: ["Всё из BASE CONTROL", "Еженедельная аналитика", "Контроль отклонений", "Работа с поставщиками", "Оптимизация закупок", "Приоритетная поддержка", "Ежемесячные встречи"], is_popular: true, badge: null, color: "from-[#5838a8] to-[#c04880]", bg_color: "bg-gradient-to-br from-[#5838a8]/5 to-[#c04880]/5", border_color: "border-[#5838a8]/20" },
  { id: "3", name: "CONTROL HUB", tagline: "Цифровая платформа контроля|Договорная", description: "Наша собственная платформа для автоматизированного контроля всех процессов в реальном времени.", icon: "Crown", features: ["Всё из PRO CONTROL", "Доступ к платформе 24/7", "Дашборды в реальном времени", "Автоматические уведомления", "API-интеграции", "Кастомные отчёты", "Персональный менеджер", "SLA 99.9%"], is_popular: false, badge: "Скоро", color: "from-amber-500 to-orange-500", bg_color: "bg-amber-50", border_color: "border-amber-200" },
];

export default function Products({ products: productsProp }: ProductsProps) {
  const products = productsProp || defaultProducts;
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  return (
    <>
    {/* Modal */}
    <AnimatePresence>
      {selectedProduct && (() => {
        const ModalIcon = iconMap[selectedProduct.icon] || Zap;
        const { tagline, price } = parseTagline(selectedProduct.tagline);
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <X size={20} className="text-slate-600" />
              </button>

              {selectedProduct.is_popular && (
                <span className="inline-block bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Популярный выбор
                </span>
              )}

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedProduct.color} flex items-center justify-center mb-6`}>
                <ModalIcon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-1">{selectedProduct.name}</h3>
              <p className="text-[#5838a8] font-medium mb-2">{tagline}</p>

              {price && (
                <p className="text-2xl font-bold text-slate-900 mb-4">{price}</p>
              )}

              <p className="text-slate-600 mb-6">{selectedProduct.description}</p>

              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Что включено</h4>
              <ul className="space-y-3 mb-8">
                {selectedProduct.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-[#5838a8] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={() => setSelectedProduct(null)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white py-4 rounded-xl font-semibold shadow-lg shadow-[#5838a8]/30 hover:shadow-xl transition-shadow"
              >
                Оставить заявку <ArrowRight size={18} />
              </a>
            </motion.div>
          </motion.div>
        );
      })()}
    </AnimatePresence>
    <section id="products" className="py-24 bg-gradient-to-b from-white to-[#f8f7fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[#5838a8] font-semibold text-sm uppercase tracking-wider">
            Продукты
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-3 mb-4">
            Выберите свой уровень <span className="gradient-text">контроля</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Три уровня сопровождения для разных потребностей бизнеса
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const IconComponent = iconMap[product.icon] || Zap;
            const { tagline, price } = parseTagline(product.tagline);
            return (
            <motion.div
              key={product.id || product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${product.bg_color} border ${product.border_color} ${
                product.is_popular ? "ring-2 ring-[#5838a8] shadow-xl shadow-[#5838a8]/10" : "shadow-lg"
              } transition-all duration-300 hover:shadow-xl`}
            >
              {/* Popular badge */}
              {product.is_popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                    Популярный выбор
                  </span>
                </div>
              )}

              {/* Coming soon badge */}
              {product.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6`}>
                <IconComponent className="w-7 h-7 text-white" />
              </div>

              {/* Header */}
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {product.name}
              </h3>
              <p className={`font-medium mb-2 ${product.is_popular ? "text-[#5838a8]" : "text-slate-500"}`}>
                {tagline}
              </p>

              {/* Price */}
              {price && (
                <p className={`text-2xl font-bold mb-4 ${product.is_popular ? "text-[#5838a8]" : "text-slate-900"}`}>
                  {price}
                </p>
              )}

              <p className="text-slate-600 mb-6">
                {product.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      product.is_popular ? "text-[#5838a8]" : "text-slate-400"
                    }`} />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                whileHover={!product.badge ? { scale: 1.02 } : undefined}
                whileTap={!product.badge ? { scale: 0.98 } : undefined}
                onClick={() => { if (!product.badge) { gtagProductView(product.name); fbqViewContent(product.name, 'product'); setSelectedProduct(product); } }}
                disabled={!!product.badge}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${
                  product.is_popular
                    ? "bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white shadow-lg shadow-[#5838a8]/30"
                    : product.badge
                    ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                    : "bg-white text-slate-700 border-2 border-slate-200 hover:border-[#5838a8]/30"
                }`}
              >
                {product.badge ? "Скоро доступно" : "Узнать подробнее"}
                {!product.badge && <ArrowRight size={18} />}
              </motion.button>
            </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-slate-500 mt-12"
        >
          Все тарифы включают бесплатную первичную консультацию и аудит текущего состояния учёта
        </motion.p>
      </div>
    </section>
    </>
  );
}
