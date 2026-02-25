"use client";

import { motion } from "framer-motion";
import { Send, Phone, ArrowUp, PhoneCall } from "lucide-react";
import { useState, useEffect } from "react";
import { useSettings } from "@/lib/SettingsContext";
import CallbackModal from "./CallbackModal";
import { gtagCtaClick, gtagPhoneClick, gtagTelegramClick } from "@/lib/gtag";
import { fbqCtaClick, fbqContact } from "@/lib/meta-pixel";

const wobble = {
  animate: {
    rotate: [0, -6, 6, -4, 4, -2, 2, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatDelay: 3,
      ease: "easeInOut" as const,
    },
  },
};

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const s = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Scroll to top */}
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            aria-label="Наверх"
            className="w-12 h-12 bg-[#1a1a2e] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#5838a8] transition-colors"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}

        {/* Callback */}
        <motion.button
          onClick={() => { gtagCtaClick('callback_button', 'floating'); fbqCtaClick('callback_button'); setIsCallbackOpen(true); }}
          variants={wobble}
          animate="animate"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Заказать обратный звонок"
          className="w-14 h-14 bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white rounded-full shadow-lg shadow-[#5838a8]/30 flex items-center justify-center hover:shadow-xl transition-shadow"
        >
          <PhoneCall size={24} />
        </motion.button>

        {/* Phone */}
        <motion.a
          href={`tel:${s.contact_phone || "+998901234567"}`}
          onClick={() => { gtagPhoneClick('floating'); fbqContact('phone'); }}
          variants={wobble}
          animate="animate"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Позвонить"
          className="w-14 h-14 bg-[#5838a8] text-white rounded-full shadow-lg shadow-[#5838a8]/30 flex items-center justify-center hover:bg-[#7c5cc9] transition-colors"
        >
          <Phone size={24} />
        </motion.a>

        {/* Telegram */}
        <motion.a
          href={s.contact_telegram || "https://t.me/foodcost"}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { gtagTelegramClick('floating'); fbqContact('telegram'); }}
          variants={wobble}
          animate="animate"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Написать в Telegram"
          className="w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center hover:bg-blue-600 transition-colors animate-pulse-glow"
        >
          <Send size={24} />
        </motion.a>
      </div>

      {/* Callback Modal */}
      <CallbackModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
      />
    </>
  );
}
