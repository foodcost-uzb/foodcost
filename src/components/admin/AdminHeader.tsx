"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import Link from "next/link";

const pageTitles: Record<string, string> = {
  "/admin": "Дашборд",
  "/admin/content": "Контент",
  "/admin/content/services": "Услуги",
  "/admin/content/products": "Продукты",
  "/admin/content/cases": "Кейсы",
  "/admin/content/testimonials": "Отзывы",
  "/admin/leads": "Заявки",
  "/admin/analytics": "Аналитика",
  "/admin/settings": "Настройки",
};

export default function AdminHeader() {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname.includes("/new")) return "Создание";
    if (pathname.match(/\/[a-f0-9-]{36}$/)) return "Редактирование";
    return pageTitles[pathname] || "Админ-панель";
  };

  const getBreadcrumbs = () => {
    const parts = pathname.split("/").filter(Boolean);
    const crumbs: { label: string; href: string }[] = [];
    let currentPath = "";

    for (const part of parts) {
      currentPath += `/${part}`;
      const title = pageTitles[currentPath];
      if (title) {
        crumbs.push({ label: title, href: currentPath });
      }
    }

    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{getTitle()}</h1>
          {breadcrumbs.length > 1 && (
            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-2">
                  {i > 0 && <span>/</span>}
                  <Link href={crumb.href} className="hover:text-[#5838a8] transition-colors">
                    {crumb.label}
                  </Link>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/admin/leads"
            className="relative p-2 text-slate-400 hover:text-[#5838a8] transition-colors"
          >
            <Bell size={20} />
          </Link>
          <Link
            href="/"
            target="_blank"
            className="text-sm text-slate-500 hover:text-[#5838a8] transition-colors"
          >
            Открыть сайт
          </Link>
        </div>
      </div>
    </header>
  );
}
