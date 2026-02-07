import Link from "next/link";
import { FileText, Package, Briefcase, MessageSquare } from "lucide-react";

const contentSections = [
  {
    title: "Услуги",
    description: "Управление списком услуг компании",
    icon: FileText,
    href: "/admin/content/services",
    color: "from-[#5838a8] to-[#7c5cc9]",
  },
  {
    title: "Продукты",
    description: "Тарифные планы и пакеты",
    icon: Package,
    href: "/admin/content/products",
    color: "from-[#5838a8] to-[#c04880]",
  },
  {
    title: "Кейсы",
    description: "Портфолио и результаты",
    icon: Briefcase,
    href: "/admin/content/cases",
    color: "from-[#8560b5] to-[#b278b8]",
  },
  {
    title: "Отзывы",
    description: "Текстовые и видео отзывы",
    icon: MessageSquare,
    href: "/admin/content/testimonials",
    color: "from-[#b782c0] to-[#c04880]",
  },
];

export default function ContentPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Управление контентом</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contentSections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#5838a8]/20 hover:shadow-lg transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">{section.title}</h3>
              <p className="text-slate-500 text-sm">{section.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
