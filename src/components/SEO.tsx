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
            "name": "Грифон",
            "description": "Профессиональные системы видеонаблюдения, СКС и СКУД в Рязани",
            "url": "https://www.grifun.ru",
            "telephone": "+7 (915) 108-89-98",
            "email": "info@grifun.ru",
            "address": {
              "@type": "PostalAddress",
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
                    "description": "Установка систем видеонаблюдения под ключ"
                  },
                  "price": "15000",
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
      <meta property="og:site_name" content="Грифон - Видеонаблюдение в Рязани" />
      <meta property="og:image" content="https://www.grifun.ru/og-image.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Грифон - Видеонаблюдение в Рязани" />
      <meta name="twitter:description" content="Профессиональный монтаж видеонаблюдения в Рязани и области." />
      <meta name="twitter:image" content="https://www.grifun.ru/og-image.jpg" />
    </Head>
  )
}
