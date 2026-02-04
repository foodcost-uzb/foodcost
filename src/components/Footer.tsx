"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Mail, MapPin, Send, MessageCircle, Youtube, Headphones } from "lucide-react";
import Logo from "./Logo";

const footerLinks = {
  services: [
    { label: "Аудит", href: "#services" },
    { label: "Настройка", href: "#services" },
    { label: "Внедрение", href: "#services" },
    { label: "Обучение", href: "#services" },
    { label: "Сопровождение", href: "#services" },
  ],
  products: [
    { label: "BASE CONTROL", href: "#products" },
    { label: "PRO CONTROL", href: "#products" },
    { label: "CONTROL HUB", href: "#products" },
  ],
  company: [
    { label: "О нас", href: "#about" },
    { label: "Подкаст", href: "#podcast" },
    { label: "Кейсы", href: "#cases" },
    { label: "Отзывы", href: "#testimonials" },
    { label: "Контакты", href: "#contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Logo variant="dark" size="md" />
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm">
              Избавляем ресторанный бизнес от хаоса в управлении, учёте и финансах,
              делая владельцев успешными и свободными.
            </p>
            <div className="flex gap-3">
              <motion.a
                href="https://wa.me/998901234567"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <MessageCircle size={20} />
              </motion.a>
              <motion.a
                href="https://t.me/foodcost"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Send size={20} />
              </motion.a>
              <motion.a
                href="https://www.youtube.com/@FoodCostGroup"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <Youtube size={20} />
              </motion.a>
              <motion.a
                href="#podcast"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#5838a8] transition-colors"
              >
                <Headphones size={20} />
              </motion.a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Услуги</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-[#c04880] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products column */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Продукты</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-[#c04880] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-lg font-semibold mb-4 mt-8">Компания</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-[#c04880] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Контакты</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+998901234567"
                  className="flex items-center gap-3 text-slate-400 hover:text-[#c04880] transition-colors"
                >
                  <Phone size={18} />
                  +998 90 123 45 67
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@foodcost.uz"
                  className="flex items-center gap-3 text-slate-400 hover:text-[#c04880] transition-colors"
                >
                  <Mail size={18} />
                  info@foodcost.uz
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-slate-400">
                  <MapPin size={18} />
                  Ташкент, Узбекистан
                </div>
              </li>
            </ul>

            {/* Podcast link */}
            <div className="mt-8 p-4 bg-gradient-to-br from-[#5838a8]/20 to-[#c04880]/20 rounded-xl border border-[#5838a8]/30">
              <div className="flex items-center gap-3 mb-2">
                <Headphones className="text-[#c04880]" size={20} />
                <span className="font-semibold">Подкаст</span>
              </div>
              <p className="text-sm text-slate-400 mb-3">
                «Бизнес на цифрах»
              </p>
              <a
                href="#podcast"
                className="text-sm text-[#c04880] hover:text-[#5838a8] transition-colors"
              >
                Слушать выпуски →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} FOODCOST. Все права защищены.
          </p>
          <p className="text-slate-500 text-sm">
            Консалтинг для ресторанного бизнеса
          </p>
        </div>
      </div>
    </footer>
  );
}
