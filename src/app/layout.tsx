import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThirdPartyScripts from "@/components/ThirdPartyScripts";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

export const metadata: Metadata = {
  metadataBase: new URL("https://foodcost.uz"),
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
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "FOODCOST — Консалтинг для ресторанного бизнеса",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FOODCOST — Консалтинг для ресторанного бизнеса",
    description:
      "Избавляем ресторанный бизнес от хаоса в управлении, учёте и финансах.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/logo-icon.svg",
    apple: "/logo-icon.svg",
  },
  alternates: {
    canonical: "https://foodcost.uz",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_FB_DOMAIN_VERIFICATION
      ? { "facebook-domain-verification": process.env.NEXT_PUBLIC_FB_DOMAIN_VERIFICATION }
      : undefined,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://foodcost.uz/#organization",
      name: "FOODCOST",
      url: "https://foodcost.uz",
      logo: "https://foodcost.uz/logo-full.svg",
      description:
        "Избавляем ресторанный бизнес от хаоса в управлении, учёте и финансах, делая владельцев успешными и свободными.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+998998551110",
        contactType: "customer service",
        availableLanguage: ["Russian", "Uzbek"],
      },
      sameAs: [
        "https://t.me/rustam_foodcost",
        "https://www.youtube.com/@FoodCostGroup",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://foodcost.uz/#localbusiness",
      name: "FOODCOST",
      image: "https://foodcost.uz/logo-full.svg",
      url: "https://foodcost.uz",
      telephone: "+998998551110",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ташкент",
        addressCountry: "UZ",
      },
      priceRange: "$$",
      description:
        "Консалтинг для ресторанного бизнеса. Аудит, настройка, внедрение, обучение и сопровождение.",
    },
    {
      "@type": "WebSite",
      "@id": "https://foodcost.uz/#website",
      url: "https://foodcost.uz",
      name: "FOODCOST",
      publisher: { "@id": "https://foodcost.uz/#organization" },
      inLanguage: "ru",
    },
    {
      "@type": "WebPage",
      "@id": "https://foodcost.uz/#webpage",
      url: "https://foodcost.uz",
      name: "FOODCOST — Консалтинг для ресторанного бизнеса",
      isPartOf: { "@id": "https://foodcost.uz/#website" },
      about: { "@id": "https://foodcost.uz/#organization" },
      inLanguage: "ru",
    },
    {
      "@type": "Service",
      "@id": "https://foodcost.uz/#services",
      provider: { "@id": "https://foodcost.uz/#organization" },
      name: "Консалтинг для ресторанного бизнеса",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Услуги FOODCOST",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Аудит", description: "Полная диагностика учёта" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Настройка", description: "Внедрение iiko и систем учёта" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Внедрение", description: "Запуск учёта с нуля" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Обучение", description: "Тренинги для команды" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Сопровождение", description: "Ежемесячное ведение учёта" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Консультация", description: "Экспертная помощь по запросу" } },
        ],
      },
    },
    {
      "@type": "Product",
      "@id": "https://foodcost.uz/#base-control",
      name: "BASE CONTROL",
      description: "Базовый контроль и отчётность для ресторанного бизнеса",
      brand: { "@id": "https://foodcost.uz/#organization" },
      offers: {
        "@type": "Offer",
        priceCurrency: "UZS",
        price: "2000000",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "Product",
      "@id": "https://foodcost.uz/#pro-control",
      name: "PRO CONTROL",
      description: "Углублённый учёт и аналитика для ресторанного бизнеса",
      brand: { "@id": "https://foodcost.uz/#organization" },
      offers: {
        "@type": "Offer",
        priceCurrency: "UZS",
        price: "5000000",
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://foodcost.uz/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Главная",
          item: "https://foodcost.uz",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-[#5838a8] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
          Перейти к содержимому
        </a>
        {children}
        <ThirdPartyScripts />
        {META_PIXEL_ID && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
      </body>
    </html>
  );
}
