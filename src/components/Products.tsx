"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles, Zap, Crown } from "lucide-react";

const products = [
  {
    name: "BASE CONTROL",
    tagline: "Базовый контроль и отчётность",
    description: "Идеальный старт для тех, кто хочет навести порядок в учёте и получать регулярные отчёты о состоянии бизнеса.",
    icon: Zap,
    features: [
      "Ежемесячные отчёты по food cost",
      "Контроль остатков",
      "Базовая аналитика",
      "Консультации по запросу",
      "Telegram-поддержка",
    ],
    popular: false,
    color: "from-slate-600 to-slate-700",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
  },
  {
    name: "PRO CONTROL",
    tagline: "Углублённый учёт + аналитика",
    description: "Для тех, кто серьёзно относится к контролю. Полный цикл управления учётом с глубокой аналитикой.",
    icon: Sparkles,
    features: [
      "Всё из BASE CONTROL",
      "Еженедельная аналитика",
      "Контроль отклонений",
      "Работа с поставщиками",
      "Оптимизация закупок",
      "Приоритетная поддержка",
      "Ежемесячные встречи",
    ],
    popular: true,
    color: "from-[#5838a8] to-[#c04880]",
    bgColor: "bg-gradient-to-br from-[#5838a8]/5 to-[#c04880]/5",
    borderColor: "border-[#5838a8]/20",
  },
  {
    name: "CONTROL HUB",
    tagline: "Цифровая платформа контроля",
    description: "Наша собственная платформа для автоматизированного контроля всех процессов в реальном времени.",
    icon: Crown,
    features: [
      "Всё из PRO CONTROL",
      "Доступ к платформе 24/7",
      "Дашборды в реальном времени",
      "Автоматические уведомления",
      "API-интеграции",
      "Кастомные отчёты",
      "Персональный менеджер",
      "SLA 99.9%",
    ],
    popular: false,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    badge: "Скоро",
  },
];

export default function Products() {
  return (
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
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${product.bgColor} border ${product.borderColor} ${
                product.popular ? "ring-2 ring-[#5838a8] shadow-xl shadow-[#5838a8]/10" : "shadow-lg"
              } transition-all duration-300 hover:shadow-xl`}
            >
              {/* Popular badge */}
              {product.popular && (
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
                <product.icon className="w-7 h-7 text-white" />
              </div>

              {/* Header */}
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {product.name}
              </h3>
              <p className={`font-medium mb-4 ${product.popular ? "text-[#5838a8]" : "text-slate-500"}`}>
                {product.tagline}
              </p>
              <p className="text-slate-600 mb-6">
                {product.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      product.popular ? "text-[#5838a8]" : "text-slate-400"
                    }`} />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${
                  product.popular
                    ? "bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white shadow-lg shadow-[#5838a8]/30"
                    : product.badge
                    ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                    : "bg-white text-slate-700 border-2 border-slate-200 hover:border-[#5838a8]/30"
                }`}
              >
                {product.badge ? "Скоро доступно" : "Узнать подробнее"}
                {!product.badge && <ArrowRight size={18} />}
              </motion.a>
            </motion.div>
          ))}
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
  );
}
