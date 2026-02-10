import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

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
        "https://t.me/foodcost",
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
      </body>
    </html>
  );
}
