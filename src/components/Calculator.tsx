"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Calculator as CalcIcon, TrendingDown, DollarSign, Percent } from "lucide-react";
import { gtagCalculatorStarted, gtagCalculatorCompleted, gtagCtaClick } from "@/lib/gtag";
import { fbqCalculatorStarted, fbqCalculatorCompleted, fbqCtaClick } from "@/lib/meta-pixel";

export default function Calculator() {
  const [revenue, setRevenue] = useState<string>("");
  const [currentFoodCost, setCurrentFoodCost] = useState<string>("");
  const [targetFoodCost, setTargetFoodCost] = useState<string>("");
  const hasStarted = useRef(false);
  const hasCompleted = useRef(false);

  // Format number with space separators: 100000000 → 100 000 000
  const formatNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const trackStart = () => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      gtagCalculatorStarted();
      fbqCalculatorStarted();
    }
  };

  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    trackStart();
    const raw = e.target.value.replace(/\s/g, "");
    if (raw === "" || /^\d+$/.test(raw)) {
      setRevenue(raw);
    }
  };

  const calculateSavings = () => {
    const rev = parseFloat(revenue) || 0;
    const current = parseFloat(currentFoodCost) || 0;
    const target = parseFloat(targetFoodCost) || 0;

    if (rev === 0 || current === 0 || target === 0) return null;
    if (target >= current) return null;

    const currentCost = (rev * current) / 100;
    const targetCost = (rev * target) / 100;
    const monthlySavings = currentCost - targetCost;
    const yearlySavings = monthlySavings * 12;

    return {
      currentCost: currentCost.toLocaleString("ru-RU"),
      targetCost: targetCost.toLocaleString("ru-RU"),
      monthlySavings: monthlySavings.toLocaleString("ru-RU"),
      yearlySavings: yearlySavings.toLocaleString("ru-RU"),
      savingsPercent: (current - target).toFixed(1),
    };
  };

  const savings = calculateSavings();

  useEffect(() => {
    if (savings && !hasCompleted.current) {
      hasCompleted.current = true;
      gtagCalculatorCompleted({ revenue, currentFc: currentFoodCost, targetFc: targetFoodCost, savings: savings.monthlySavings });
      fbqCalculatorCompleted({ revenue, savings: savings.monthlySavings });
    }
  }, [savings, revenue, currentFoodCost, targetFoodCost]);

  return (
    <section id="calculator" className="py-24 bg-gradient-to-br from-[#5838a8] via-[#7c5cc9] to-[#c04880] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,white_2px,transparent_2px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CalcIcon size={18} />
              Калькулятор экономии
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Узнайте, сколько вы можете сэкономить
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Введите данные вашего заведения и мы покажем потенциальную экономию
              при оптимизации food cost.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                <TrendingDown className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm opacity-90">Снижение потерь</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm opacity-90">Рост прибыли</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                <Percent className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm opacity-90">Точный учёт</div>
              </div>
            </div>
          </motion.div>

          {/* Right column - Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Рассчитайте экономию
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Месячная выручка (сум)
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatNumber(revenue)}
                    onChange={handleRevenueChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#5838a8] focus:border-transparent outline-none transition-all"
                    placeholder="100 000 000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Текущий Food Cost (%)
                  </label>
                  <input
                    type="number"
                    value={currentFoodCost}
                    onChange={(e) => { trackStart(); setCurrentFoodCost(e.target.value); }}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#5838a8] focus:border-transparent outline-none transition-all"
                    placeholder="35"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Целевой Food Cost (%)
                  </label>
                  <input
                    type="number"
                    value={targetFoodCost}
                    onChange={(e) => { trackStart(); setTargetFoodCost(e.target.value); }}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#5838a8] focus:border-transparent outline-none transition-all"
                    placeholder="28"
                  />
                </div>
              </div>

              {/* Validation hint */}
              {parseFloat(currentFoodCost) > 0 && parseFloat(targetFoodCost) > 0 && parseFloat(targetFoodCost) >= parseFloat(currentFoodCost) && (
                <p className="mt-3 text-sm text-red-500">
                  Целевой food cost должен быть ниже текущего
                </p>
              )}

              {/* Results */}
              {savings && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-gradient-to-br from-[#5838a8]/5 to-[#c04880]/10 rounded-2xl border border-[#5838a8]/20"
                >
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">
                    Потенциальная экономия:
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-slate-500">В месяц</div>
                      <div className="text-2xl font-bold text-[#5838a8]">
                        {savings.monthlySavings} сум
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">В год</div>
                      <div className="text-2xl font-bold text-[#c04880]">
                        {savings.yearlySavings} сум
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#5838a8]/20">
                    <div className="text-sm text-slate-600">
                      Снижение food cost на{" "}
                      <span className="font-bold text-[#5838a8]">
                        {savings.savingsPercent}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.a
                href="#contact"
                onClick={() => { gtagCtaClick('get_consultation', 'calculator'); fbqCtaClick('get_consultation'); }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 w-full bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-[#5838a8]/30 hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
              >
                Получить консультацию
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
