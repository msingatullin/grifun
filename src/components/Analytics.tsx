'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function Analytics() {
  useEffect(() => {
    // Google Analytics 4
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Initialize GA4
      window.gtag = window.gtag || Object.assign(function(...args: unknown[]) {
        (window.gtag.q = window.gtag.q || []).push(args)
      }, { q: [] })
      
      window.gtag('js', new Date())
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href,
      })
    }
  }, [])

  const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters)
    }
  }

  // Expose tracking function globally for use in components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.trackEvent = trackEvent
    }
  }, [])

  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />

      {/* Yandex Metrica */}
      <Script
        id="yandex-metrica"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(${process.env.NEXT_PUBLIC_YANDEX_METRICA_ID}, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `,
        }}
      />
    </>
  )
}

// TypeScript declarations
declare global {
  interface Window {
    gtag: {
      (...args: unknown[]): void
      q: unknown[]
    }
    trackEvent: (eventName: string, parameters?: Record<string, unknown>) => void
  }
}
