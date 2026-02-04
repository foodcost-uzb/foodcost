"use client";

import { motion } from "framer-motion";
import { Play, Youtube, Bell, Headphones } from "lucide-react";

export default function Podcast() {
  return (
    <section id="podcast" className="py-24 bg-gradient-to-br from-[#1a1a2e] via-[#16162a] to-[#1a1a2e] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Headphones size={18} className="text-[#c04880]" />
              Подкаст
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Бизнес на{" "}
              <span className="bg-gradient-to-r from-[#5838a8] to-[#c04880] bg-clip-text text-transparent">
                цифрах
              </span>
            </h2>

            <p className="text-xl text-slate-300 mb-6">
              Подкаст о финансах, учёте и управлении в ресторанном бизнесе от команды FOOD COST
            </p>

            <p className="text-slate-400 mb-8">
              Делимся опытом, разбираем реальные кейсы, обсуждаем тренды индустрии
              и отвечаем на вопросы владельцев ресторанов. Честно о том, как делать
              бизнес в HoReCa прибыльным.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#5838a8]/20 flex items-center justify-center">
                  <Play size={18} className="text-[#5838a8]" />
                </div>
                <span className="text-slate-300">Еженедельные выпуски</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#c04880]/20 flex items-center justify-center">
                  <Youtube size={18} className="text-[#c04880]" />
                </div>
                <span className="text-slate-300">Food Cost Group</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="https://www.youtube.com/@FoodCostGroup"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
              >
                <Youtube size={20} />
                Смотреть на YouTube
              </motion.a>
              <motion.a
                href="https://www.youtube.com/@FoodCostGroup?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                <Bell size={20} />
                Подписаться
              </motion.a>
            </div>
          </motion.div>

          {/* Right column - Video embed */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#5838a8]/30 to-[#c04880]/30 rounded-3xl blur-2xl" />

            {/* Video container */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <iframe
                src="https://www.youtube.com/embed/hc1IazKcsXo"
                title="Бизнес на цифрах - Подкаст FOOD COST"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -left-6 bg-white text-slate-900 rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5838a8] to-[#c04880] flex items-center justify-center">
                  <Headphones size={24} className="text-white" />
                </div>
                <div>
                  <div className="font-bold">Новый выпуск</div>
                  <div className="text-sm text-slate-500">каждую неделю</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
