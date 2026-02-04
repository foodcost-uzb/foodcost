"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, ArrowUp, PhoneCall } from "lucide-react";
import { useState, useEffect } from "react";
import CallbackModal from "./CallbackModal";

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

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
            className="w-12 h-12 bg-[#1a1a2e] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#5838a8] transition-colors"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}

        {/* Callback */}
        <motion.button
          onClick={() => setIsCallbackOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white rounded-full shadow-lg shadow-[#5838a8]/30 flex items-center justify-center hover:shadow-xl transition-shadow"
        >
          <PhoneCall size={24} />
        </motion.button>

        {/* Phone */}
        <motion.a
          href="tel:+998901234567"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-[#5838a8] text-white rounded-full shadow-lg shadow-[#5838a8]/30 flex items-center justify-center hover:bg-[#7c5cc9] transition-colors"
        >
          <Phone size={24} />
        </motion.a>

        {/* WhatsApp */}
        <motion.a
          href="https://wa.me/998901234567"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-green-500 text-white rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center hover:bg-green-600 transition-colors animate-pulse-glow"
        >
          <MessageCircle size={24} />
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
