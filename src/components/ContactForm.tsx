"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Phone, Mail, MapPin, Loader2 } from "lucide-react";

interface ContactFormProps {
  settings?: Record<string, string>;
}

export default function ContactForm({ settings }: ContactFormProps) {
  const s = settings || {};
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "form" }),
      });
    } catch {
      // Silently fail — show success anyway for UX
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", phone: "", email: "", message: "" });

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-white via-[#f8f7fc] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#5838a8] font-semibold text-sm uppercase tracking-wider">
              Контакты
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-3 mb-6">
              Готовы <span className="gradient-text">начать?</span>
            </h2>
            <p className="text-lg text-slate-600 mb-10">
              Свяжитесь с нами для бесплатной консультации. Мы ответим на все ваши
              вопросы и поможем определить оптимальное решение для вашего бизнеса.
            </p>

            {/* Contact cards */}
            <div className="space-y-4">
              <motion.a
                href={`tel:${s.contact_phone || "+998901234567"}`}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-[#5838a8]/10 hover:border-[#5838a8]/20"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#5838a8]/10 to-[#c04880]/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#5838a8]" />
                </div>
                <div>
                  <div className="text-sm text-slate-500">Телефон</div>
                  <div className="font-semibold text-slate-900">{s.contact_phone_display || "+998 90 123 45 67"}</div>
                </div>
              </motion.a>

              <motion.a
                href={`mailto:${s.contact_email || "info@foodcost.uz"}`}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-[#5838a8]/10 hover:border-[#5838a8]/20"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#5838a8]/10 to-[#c04880]/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#5838a8]" />
                </div>
                <div>
                  <div className="text-sm text-slate-500">Email</div>
                  <div className="font-semibold text-slate-900">{s.contact_email || "info@foodcost.uz"}</div>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-[#5838a8]/10"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#5838a8]/10 to-[#c04880]/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#5838a8]" />
                </div>
                <div>
                  <div className="text-sm text-slate-500">Адрес</div>
                  <div className="font-semibold text-slate-900">{s.contact_address || "Ташкент, Узбекистан"}</div>
                </div>
              </motion.div>
            </div>

            {/* Social buttons */}
            <div className="flex gap-4 mt-8">
              <motion.a
                href={s.contact_telegram || "https://t.me/foodcost"}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
              >
                <Send size={20} />
                Telegram
              </motion.a>
            </div>
          </motion.div>

          {/* Right column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#5838a8]/10">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Оставьте заявку
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#5838a8]/10 to-[#c04880]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-[#5838a8]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">
                    Спасибо за заявку!
                  </h4>
                  <p className="text-slate-600">
                    Мы свяжемся с вами в ближайшее время.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#5838a8] focus:border-transparent outline-none transition-all"
                      placeholder="Введите ваше имя"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#5838a8] focus:border-transparent outline-none transition-all"
                      placeholder="+998 90 123 45 67"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#5838a8] focus:border-transparent outline-none transition-all"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Сообщение
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#5838a8] focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Опишите вашу задачу..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-[#5838a8]/30 hover:shadow-xl transition-shadow disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        Отправить заявку
                        <Send size={20} />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
