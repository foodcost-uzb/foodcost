"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowUpRight, X, ArrowRight } from "lucide-react";

interface CaseResult {
  label: string;
  value: string;
  positive: boolean;
}

interface CaseData {
  id: string;
  title: string;
  location: string;
  image: string;
  results: CaseResult[];
  description: string;
}

interface CasesProps {
  cases?: CaseData[];
}

const defaultCases: CaseData[] = [
  { id: "1", title: "Сеть ресторанов «Плов центр»", location: "Ташкент, Узбекистан", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop", results: [{ label: "Снижение food cost", value: "-12%", positive: true }, { label: "Рост выручки", value: "+25%", positive: true }, { label: "Сокращение потерь", value: "-45%", positive: true }], description: "Комплексный аудит и постановка учёта для сети из 5 ресторанов." },
  { id: "2", title: "Кофейня «Brew & Bite»", location: "Алматы, Казахстан", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop", results: [{ label: "Оптимизация меню", value: "+30%", positive: true }, { label: "Маржинальность", value: "+18%", positive: true }, { label: "Время учёта", value: "-60%", positive: true }], description: "Внедрение системы управленческого учёта и калькуляция меню." },
  { id: "3", title: "Ресторан «Самарканд»", location: "Самарканд, Узбекистан", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop", results: [{ label: "Food cost", value: "28%", positive: true }, { label: "Прибыль", value: "+35%", positive: true }, { label: "ROI проекта", value: "340%", positive: true }], description: "Полный цикл: от аудита до внедрения автоматизированной системы учёта." },
];

export default function Cases({ cases: casesProp }: CasesProps) {
  const cases = casesProp || defaultCases;
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);

  return (
    <>
    {/* Modal */}
    <AnimatePresence>
      {selectedCase && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedCase(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-white" />
            </button>

            {/* Image */}
            <div className="relative h-56 overflow-hidden rounded-t-3xl">
              <img
                src={selectedCase.image}
                alt={selectedCase.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-6 text-white">
                <h3 className="text-2xl font-bold">{selectedCase.title}</h3>
                <p className="text-sm text-white/80">{selectedCase.location}</p>
              </div>
            </div>

            <div className="p-8">
              <p className="text-slate-600 mb-6">{selectedCase.description}</p>

              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Результаты</h4>
              <div className="grid grid-cols-1 gap-3 mb-8">
                {selectedCase.results.map((result) => (
                  <div
                    key={result.label}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50"
                  >
                    <span className="text-slate-600">{result.label}</span>
                    <span className={`flex items-center gap-1 font-bold text-lg ${
                      result.positive ? "text-emerald-500" : "text-red-500"
                    }`}>
                      {result.positive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                      {result.value}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                onClick={() => setSelectedCase(null)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white py-4 rounded-xl font-semibold shadow-lg shadow-[#5838a8]/30 hover:shadow-xl transition-shadow"
              >
                Хочу такой же результат <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    <section id="cases" className="py-24 bg-white">
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
            Кейсы
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-3 mb-4">
            Реальные <span className="gradient-text">результаты</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Посмотрите, как мы помогли нашим клиентам достичь выдающихся результатов
          </p>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={item.id || item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-[#5838a8]/20"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-sm text-white/80">{item.location}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-slate-600 mb-6">{item.description}</p>

                {/* Results */}
                <div className="space-y-3">
                  {item.results.map((result) => (
                    <div
                      key={result.label}
                      className="flex items-center justify-between"
                    >
                      <span className="text-slate-600 text-sm">{result.label}</span>
                      <span
                        className={`flex items-center gap-1 font-bold ${
                          result.positive ? "text-emerald-500" : "text-red-500"
                        }`}
                      >
                        {result.positive ? (
                          <TrendingUp size={16} />
                        ) : (
                          <TrendingDown size={16} />
                        )}
                        {result.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => setSelectedCase(item)}
                  className="mt-6 flex items-center gap-2 text-[#5838a8] font-medium group-hover:gap-3 transition-all"
                >
                  Подробнее о проекте
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
