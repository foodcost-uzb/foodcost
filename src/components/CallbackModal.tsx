"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Phone, Loader2, CheckCircle } from "lucide-react";

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, source: "callback" }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setPhone("");
        setName("");
        onClose();
      }, 2000);
    } catch {
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
    }

    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 mx-4">
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Закрыть"
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#5838a8]/10 to-[#c04880]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-[#5838a8]" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Заявка принята!
                  </h3>
                  <p className="text-slate-600">
                    Мы перезвоним вам в ближайшее время
                  </p>
                </motion.div>
              ) : submitError ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Ошибка отправки
                  </h3>
                  <p className="text-slate-600">
                    Не удалось отправить заявку. Попробуйте ещё раз.
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#5838a8] to-[#c04880] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      Обратный звонок
                    </h3>
                    <p className="text-slate-600">
                      Оставьте номер и мы перезвоним вам
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="cb-name" className="block text-sm font-medium text-slate-700 mb-2">
                        Ваше имя
                      </label>
                      <input
                        id="cb-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete="name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#5838a8] focus:border-transparent outline-none transition-all"
                        placeholder="Как к вам обращаться?"
                      />
                    </div>

                    <div>
                      <label htmlFor="cb-phone" className="block text-sm font-medium text-slate-700 mb-2">
                        Номер телефона
                      </label>
                      <input
                        id="cb-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        autoComplete="tel"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#5838a8] focus:border-transparent outline-none transition-all"
                        placeholder="+998 90 123 45 67"
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
                          <Phone size={20} />
                          Заказать звонок
                        </>
                      )}
                    </motion.button>
                  </form>

                  <p className="text-center text-sm text-slate-500 mt-4">
                    Перезвоним в течение 15 минут в рабочее время
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
