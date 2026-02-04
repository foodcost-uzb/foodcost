"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

const navLinks = [
  { href: "#services", label: "Услуги" },
  { href: "#products", label: "Продукты" },
  { href: "#about", label: "О нас" },
  { href: "#podcast", label: "Подкаст" },
  { href: "#cases", label: "Кейсы" },
  { href: "#contact", label: "Контакты" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Logo variant="horizontal" size="sm" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-[#5838a8] transition-colors font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#5838a8] to-[#c04880] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+998901234567"
              className="flex items-center gap-2 text-slate-600 hover:text-[#5838a8] transition-colors"
            >
              <Phone size={18} />
              <span className="font-medium">+998 90 123 45 67</span>
            </a>
            <motion.a
              href="https://wa.me/998901234567"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white px-5 py-2.5 rounded-full font-medium shadow-lg shadow-[#5838a8]/20 hover:shadow-xl hover:shadow-[#5838a8]/30 transition-shadow"
            >
              <MessageCircle size={18} />
              WhatsApp
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-[#5838a8] transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-[#5838a8]/10"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-slate-600 hover:text-[#5838a8] hover:bg-[#5838a8]/5 transition-colors font-medium py-3 px-4 rounded-xl"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-[#5838a8]/10">
                  <a
                    href="tel:+998901234567"
                    className="flex items-center gap-2 text-slate-600 py-2"
                  >
                    <Phone size={18} />
                    +998 90 123 45 67
                  </a>
                  <a
                    href="https://wa.me/998901234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white px-4 py-3.5 rounded-full font-medium shadow-lg"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
