"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, Award, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-[#f8f7fc] to-white pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#5838a8]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#c04880]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#5838a8]/5 to-[#c04880]/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(88,56,168,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(88,56,168,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5838a8]/10 to-[#c04880]/10 text-[#5838a8] px-5 py-2.5 rounded-full text-sm font-semibold mb-8 border border-[#5838a8]/20"
          >
            <span className="w-2 h-2 bg-gradient-to-r from-[#5838a8] to-[#c04880] rounded-full animate-pulse" />
            50+ лет общего стажа команды в HoReCa
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-6 leading-tight"
          >
            Избавьте ваш бизнес
            <br />
            от{" "}
            <span className="gradient-text">хаоса в управлении</span>
          </motion.h1>

          {/* Mission subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
          >
            Делаем владельцев ресторанов успешными и свободными через системный учёт и контроль
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl shadow-[#5838a8]/30 hover:shadow-2xl hover:shadow-[#5838a8]/40 transition-all"
            >
              Получить консультацию
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-full font-semibold text-lg border-2 border-[#5838a8]/20 hover:border-[#5838a8]/40 hover:bg-[#f8f7fc] transition-all"
            >
              Узнать больше
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Users, value: "50+", label: "Лет общего стажа команды" },
              { icon: Award, value: "100+", label: "Успешных проектов" },
              { icon: Zap, value: "24/7", label: "Поддержка клиентов" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="glass rounded-2xl p-6 text-center border border-[#5838a8]/10 hover:border-[#5838a8]/20 transition-colors"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#5838a8]/10 to-[#c04880]/10 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-[#5838a8]" />
                </div>
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-slate-600 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#5838a8]/30 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-3 bg-gradient-to-b from-[#5838a8] to-[#c04880] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
