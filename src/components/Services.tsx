"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck,
  Settings,
  Rocket,
  GraduationCap,
  HeadphonesIcon,
  Users,
  ArrowRight,
  CheckCircle2,
  X,
  type LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  ClipboardCheck,
  Settings,
  Rocket,
  GraduationCap,
  HeadphonesIcon,
  Users,
};

interface ServiceData {
  id: string;
  icon: string;
  title: string;
  short_desc: string;
  description: string;
  features: string[];
  color: string;
  sort_order: number;
}

interface ServicesProps {
  services?: ServiceData[];
}

const defaultServices: ServiceData[] = [
  { id: "1", icon: "ClipboardCheck", title: "Аудит", short_desc: "Полная диагностика учёта", description: "Комплексная проверка всех процессов учёта на предприятии. Выявляем слабые места, потери и зоны роста.", features: ["Анализ текущих процессов", "Выявление потерь и хищений", "Проверка документооборота", "Рекомендации по оптимизации"], color: "from-[#5838a8] to-[#7c5cc9]", sort_order: 1 },
  { id: "2", icon: "Settings", title: "Настройка", short_desc: "Внедрение iiko и систем учёта", description: "Профессиональная настройка систем автоматизации: iiko, справочники, ТТК, калькуляционные карты.", features: ["Настройка iiko с нуля", "Создание справочников", "Разработка ТТК", "Настройка отчётности"], color: "from-[#6b4fad] to-[#9b6fb3]", sort_order: 2 },
  { id: "3", icon: "Rocket", title: "Внедрение", short_desc: "Запуск учёта с нуля", description: "Полный цикл внедрения товарного и финансового учёта. От нуля до работающей системы.", features: ["Товарный учёт", "Финансовый учёт", "Складская логистика", "Интеграции с поставщиками"], color: "from-[#8560b5] to-[#b278b8]", sort_order: 3 },
  { id: "4", icon: "GraduationCap", title: "Обучение", short_desc: "Тренинги для команды", description: "Практические тренинги для вашей команды по работе с системами учёта и контроля.", features: ["Работа с iiko", "Инвентаризации", "Работа с отчётами", "Контроль себестоимости"], color: "from-[#9e71bc] to-[#c487be]", sort_order: 4 },
  { id: "5", icon: "HeadphonesIcon", title: "Сопровождение", short_desc: "Ежемесячное ведение учёта", description: "Постоянная поддержка и ведение учёта на аутсорсинге. Пакеты BASE и PRO CONTROL.", features: ["Ежедневный контроль", "Еженедельные отчёты", "Оперативная поддержка", "Анализ показателей"], color: "from-[#b782c0] to-[#c04880]", sort_order: 5 },
];

export default function Services({ services: servicesProp }: ServicesProps) {
  const services = servicesProp || defaultServices;
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  return (
    <>
    {/* Modal */}
    <AnimatePresence>
      {selectedService && (() => {
        const ModalIcon = iconMap[selectedService.icon] || ClipboardCheck;
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
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
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <X size={20} className="text-slate-600" />
              </button>

              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedService.color} flex items-center justify-center mb-6`}>
                <ModalIcon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">{selectedService.title}</h3>
              <p className="text-[#5838a8] font-medium mb-4">{selectedService.short_desc}</p>
              <p className="text-slate-600 mb-6">{selectedService.description}</p>

              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Что входит</h4>
              <ul className="space-y-3 mb-8">
                {selectedService.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-[#5838a8] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={() => setSelectedService(null)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white py-4 rounded-xl font-semibold shadow-lg shadow-[#5838a8]/30 hover:shadow-xl transition-shadow"
              >
                Оставить заявку <ArrowRight size={18} />
              </a>
            </motion.div>
          </motion.div>
        );
      })()}
    </AnimatePresence>
    <section id="services" className="py-24 bg-white">
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
            Наши услуги
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-3 mb-4">
            Полный спектр услуг для <span className="gradient-text">HoReCa</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            От аудита до полного сопровождения — выберите то, что нужно именно вам
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || ClipboardCheck;
            return (
            <motion.div
              key={service.id || service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-3xl p-8 border border-slate-100 hover:border-[#5838a8]/20 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {service.title}
              </h3>
              <p className="text-[#5838a8] font-medium mb-3">
                {service.short_desc}
              </p>
              <p className="text-slate-600 mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-[#5838a8] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => setSelectedService(service)}
                className="inline-flex items-center gap-2 text-[#5838a8] font-medium group-hover:gap-3 transition-all"
              >
                Подробнее <ArrowRight size={16} />
              </button>

              {/* Gradient border on hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#5838a8]/5 to-[#c04880]/5" />
              </div>
            </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-600 mb-6">
            Не знаете, какая услуга вам подходит?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white px-8 py-4 rounded-full font-semibold shadow-xl shadow-[#5838a8]/30"
          >
            Получить бесплатную консультацию
            <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
    </>
  );
}
