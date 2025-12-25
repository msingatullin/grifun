import Head from 'next/head'

export default function SEO() {
  return (
    <Head>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "ЛОтос",
            "description": "Профессиональные системы видеонаблюдения и СКС ЛВС в Рязани",
            "url": "https://lotos-ryazan.ru",
            "telephone": "+7 (910) 123-45-67",
            "email": "info@lotos-ryazan.ru",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "ул. Примерная, д. 123",
              "addressLocality": "Рязань",
              "addressCountry": "RU"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "54.6269",
              "longitude": "39.6916"
            },
            "openingHours": "Mo-Fr 09:00-18:00,Sa 10:00-16:00",
            "priceRange": "25000-60000 RUB",
            "serviceArea": {
              "@type": "City",
              "name": "Рязань"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Услуги видеонаблюдения",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Монтаж видеонаблюдения",
                    "description": "Установка систем видеонаблюдения за 7 дней"
                  },
                  "price": "25000",
                  "priceCurrency": "RUB"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Облачное хранение",
                    "description": "Безопасное хранение видео в облаке"
                  },
                  "price": "3000",
                  "priceCurrency": "RUB"
                }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "15"
            }
          })
        }}
      />
      
      {/* Additional meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0052CC" />
      <meta name="msapplication-TileColor" content="#0052CC" />
      
      {/* Open Graph */}
      <meta property="og:site_name" content="ЛОтос - Видеонаблюдение в Рязани" />
      <meta property="og:image" content="https://lotos-ryazan.ru/og-image.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="ЛОтос - Видеонаблюдение и СКС ЛВС в Рязани" />
      <meta name="twitter:description" content="Профессиональный монтаж видеонаблюдения за неделю. Облачное хранение, контроль со смартфона 24/7." />
      <meta name="twitter:image" content="https://lotos-ryazan.ru/og-image.jpg" />
    </Head>
  )
}
