import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FOODCOST — Консалтинг для ресторанного бизнеса",
  description:
    "Избавляем ресторанный бизнес от хаоса в управлении, учёте и финансах, делая владельцев успешными и свободными. 50+ лет общего стажа команды в HoReCa.",
  keywords: [
    "food cost",
    "ресторанный консалтинг",
    "учёт в ресторане",
    "калькуляция меню",
    "аудит ресторана",
    "HoReCa",
    "управленческий учёт",
    "себестоимость блюд",
    "iiko",
    "автоматизация ресторана",
  ],
  authors: [{ name: "FOODCOST" }],
  openGraph: {
    title: "FOODCOST — Консалтинг для ресторанного бизнеса",
    description:
      "Избавляем ресторанный бизнес от хаоса в управлении, учёте и финансах. 50+ лет опыта команды в HoReCa.",
    url: "https://foodcost.uz",
    siteName: "FOODCOST",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FOODCOST — Консалтинг для ресторанного бизнеса",
    description:
      "Избавляем ресторанный бизнес от хаоса в управлении, учёте и финансах.",
  },
  icons: {
    icon: "/logo-icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
