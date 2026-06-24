import type { Metadata } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  title: "ЛОтос - Видеонаблюдение и СКС ЛВС в Рязани",
  description: "Профессиональный монтаж видеонаблюдения за неделю. Облачное хранение, контроль со смартфона 24/7. СКС ЛВС системы в Рязани.",
  keywords: "видеонаблюдение, СКС ЛВС, монтаж, Рязань, камеры, безопасность, облачное хранение, контроль доступа",
  authors: [{ name: "ЛОтос" }],
  creator: "ЛОтос",
  publisher: "ЛОтос",
  openGraph: {
    title: "ЛОтос - Видеонаблюдение и СКС ЛВС в Рязани",
    description: "Профессиональный монтаж видеонаблюдения за неделю. Облачное хранение, контроль со смартфона 24/7.",
    type: "website",
    locale: "ru_RU",
    url: "https://lotos-ryazan.ru",
    siteName: "ЛОтос",
  },
  twitter: {
    card: "summary_large_image",
    title: "ЛОтос - Видеонаблюдение и СКС ЛВС в Рязани",
    description: "Профессиональный монтаж видеонаблюдения за неделю. Облачное хранение, контроль со смартфона 24/7.",
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
    google: "your-google-verification-code",
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
        <link rel="canonical" href="https://lotos-ryazan.ru" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0052CC" />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
