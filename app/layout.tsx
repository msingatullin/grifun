import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grifun.ru"),
  title: "Монтаж видеонаблюдения в Рязани под ключ — цены от 15 000 ₽ | Грифон",
  description:
    "Установка систем видеонаблюдения в Рязани и области: IP-камеры, СКС, СКУД, сигнализация. Работаем с 2015 года. Гарантия 2 года. Бесплатный выезд инженера.",
  keywords:
    "видеонаблюдение Рязань, монтаж видеонаблюдения, ip камеры, СКС, СКУД, охранная сигнализация, установка камер, Рязань, Грифон",
  authors: [{ name: "Грифон" }],
  creator: "Грифон",
  publisher: "Грифон",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Монтаж видеонаблюдения в Рязани под ключ | Грифон",
    description:
      "Установка IP-камер, СКС и систем контроля доступа в Рязани и области. Гарантия 2 года. Бесплатный выезд инженера.",
    type: "website",
    locale: "ru_RU",
    url: "https://www.grifun.ru",
    siteName: "Грифон",
  },
  twitter: {
    card: "summary_large_image",
    title: "Монтаж видеонаблюдения в Рязани под ключ | Грифон",
    description:
      "Установка систем видеонаблюдения в Рязани и области. Бесплатный выезд инженера, гарантия 2 года.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="canonical" href="https://www.grifun.ru/" />
        <meta name="theme-color" content="#0052CC" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Грифон",
              description:
                "Профессиональный монтаж видеонаблюдения, СКС, СКУД и охранной сигнализации в Рязани и области.",
              url: "https://www.grifun.ru/",
              telephone: "+7 (915) 108-89-98",
              email: "info@grifun.ru",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Рязань",
                addressRegion: "Рязанская область",
                addressCountry: "RU",
              },
              areaServed: ["Рязань", "Рязанская область"],
              priceRange: "15000-200000 RUB",
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
