"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Дашборд" },
  {
    href: "/admin/content",
    icon: FileText,
    label: "Контент",
    children: [
      { href: "/admin/content/services", label: "Услуги" },
      { href: "/admin/content/products", label: "Продукты" },
      { href: "/admin/content/cases", label: "Кейсы" },
      { href: "/admin/content/testimonials", label: "Отзывы" },
    ],
  },
  { href: "/admin/leads", icon: Users, label: "Заявки" },
  { href: "/admin/analytics", icon: BarChart3, label: "Аналитика" },
  { href: "/admin/settings", icon: Settings, label: "Настройки" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(["/admin/content"]);

  const toggleExpand = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href) ? prev.filter((h) => h !== href) : [...prev, href]
    );
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <aside className="w-64 bg-[#1a1a2e] min-h-screen flex flex-col border-r border-white/5">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#5838a8] to-[#c04880] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <div>
            <div className="text-white font-bold">FOODCOST</div>
            <div className="text-slate-500 text-xs">Админ-панель</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.children
            ? pathname.startsWith(item.href)
            : pathname === item.href;
          const isExpanded = expandedItems.includes(item.href);
          const Icon = item.icon;

          return (
            <div key={item.href}>
              {item.children ? (
                <button
                  onClick={() => toggleExpand(item.href)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#5838a8]/20 text-[#c04880]"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={20} />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronRight
                    size={16}
                    className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#5838a8]/20 text-[#c04880]"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              )}

              {/* Children */}
              {item.children && isExpanded && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                        pathname === child.href || pathname.startsWith(child.href + "/")
                          ? "text-[#c04880] bg-[#5838a8]/10"
                          : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full"
        >
          <LogOut size={20} />
          Выйти
        </button>
      </div>
    </aside>
  );
}
