"use client";

import { motion } from "framer-motion";
import { Eye, Target, Cog, ClipboardList, GraduationCap, Award, Users, Globe } from "lucide-react";

const principles = [
  {
    icon: Eye,
    title: "Прозрачность через цифры",
    description: "Каждое решение подкреплено данными. Никаких догадок — только факты и аналитика."
  },
  {
    icon: Target,
    title: "Ответственность за результат",
    description: "Мы отвечаем за результат нашей работы. Ваш успех — наша репутация."
  },
  {
    icon: Cog,
    title: "Системность вместо героизма",
    description: "Выстраиваем процессы так, чтобы бизнес работал как часы, а не держался на энтузиазме."
  },
  {
    icon: ClipboardList,
    title: "Контроль через регламенты",
    description: "Чёткие регламенты и процедуры — основа стабильного и предсказуемого бизнеса."
  },
  {
    icon: GraduationCap,
    title: "Обучение и развитие",
    description: "Инвестируем в развитие команды клиента, чтобы изменения были устойчивыми."
  },
];

interface AboutProps {
  settings?: Record<string, string>;
}

export default function About({ settings }: AboutProps) {
  const s = settings || {};

  const stats = [
    { icon: Award, value: s.about_stat_1_value || "50+", label: s.about_stat_1_label || "лет общего стажа" },
    { icon: Users, value: s.about_stat_2_value || "100+", label: s.about_stat_2_label || "довольных клиентов" },
    { icon: Globe, value: s.about_stat_3_value || "5", label: s.about_stat_3_label || "стран СНГ" },
  ];
  return (
    <section id="about" className="py-24 bg-[#f8f7fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column - Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#5838a8] font-semibold text-sm uppercase tracking-wider">
              О компании
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-3 mb-6">
              Наша <span className="gradient-text">миссия</span>
            </h2>

            {/* Mission statement */}
            <div className="relative mb-10">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#5838a8] to-[#c04880] rounded-full" />
              <blockquote className="pl-6 text-xl sm:text-2xl text-slate-700 font-medium leading-relaxed">
                {s.about_mission || "«Избавить ресторанный бизнес от хаоса в управлении, учёте и финансах, делая владельцев успешными и свободными»"}
              </blockquote>
            </div>

            <p className="text-lg text-slate-600 mb-8">
              {s.about_description || "FOOD COST — команда экспертов с суммарным опытом более 50 лет в индустрии HoReCa. Мы помогаем ресторанам, кафе и отелям выстроить системный учёт и контроль, который освобождает владельцев от операционной рутины."}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-4 bg-white rounded-2xl shadow-sm border border-[#5838a8]/10"
                >
                  <stat.icon className="w-6 h-6 text-[#5838a8] mx-auto mb-2" />
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column - Principles */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-8">
              Наши принципы
            </h3>

            <div className="space-y-4">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex gap-4 p-5 bg-white rounded-2xl shadow-sm border border-[#5838a8]/10 hover:border-[#5838a8]/20 hover:shadow-md transition-all"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#5838a8]/10 to-[#c04880]/10 flex items-center justify-center group-hover:from-[#5838a8]/20 group-hover:to-[#c04880]/20 transition-colors">
                    <principle.icon className="w-6 h-6 text-[#5838a8]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">
                      {principle.title}
                    </h4>
                    <p className="text-slate-600 text-sm">
                      {principle.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
