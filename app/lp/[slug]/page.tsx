import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";
import { loadLandingCacheBySlug } from "@/lib/landing/cache";
import { makeLandingSpec } from "@/lib/landing/generator";
import { generateSlug, normalizeQuery } from "@/lib/landing/normalize";
import { saveLandingCache } from "@/lib/landing/cache";
import { loadServices } from "@/lib/services/types";
import type { LandingSpec } from "@/lib/landing/types";

interface LandingPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    regenerate?: string;
    query?: string;
    service?: string;
  };
}

export async function generateMetadata({ params, searchParams }: LandingPageProps) {
  const { slug } = params;
  const shouldRegenerate = searchParams.regenerate === process.env.ADMIN_SECRET_KEY;

  let spec: LandingSpec | null = null;

  // Если не требуется регенерация, пробуем загрузить из кэша
  if (!shouldRegenerate) {
    const cache = await loadLandingCacheBySlug(slug);
    if (cache) {
      spec = cache.spec;
    }
  }

  // Если нет в кэше или требуется регенерация, генерируем
  if (!spec) {
    const query = searchParams.query || slug.replace(/-/g, " ");
    const normalized = normalizeQuery(query);
    spec = await makeLandingSpec(normalized);
    
    // Сохраняем в кэш
    const generatedSlug = generateSlug(normalized);
    await saveLandingCache(normalized, generatedSlug, spec);
  }

  // Формируем canonical URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://grifun.ru";
  const canonical = `${baseUrl}/lp/${slug}`;

  return {
    title: spec.seo.title,
    description: spec.seo.description,
    alternates: {
      canonical,
    },
  };
}

export default async function LandingPageBySlug({
  params,
  searchParams,
}: LandingPageProps) {
  const { slug } = params;
  const shouldRegenerate = searchParams.regenerate === process.env.ADMIN_SECRET_KEY;

  let spec: LandingSpec | null = null;

  // Если не требуется регенерация, пробуем загрузить из кэша
  if (!shouldRegenerate) {
    const cache = await loadLandingCacheBySlug(slug);
    if (cache) {
      spec = cache.spec;
    }
  }

  // Если нет в кэше или требуется регенерация, генерируем новый
  if (!spec) {
    try {
      // Пытаемся восстановить query из slug (заменяем дефисы на пробелы)
      const query = searchParams.query || slug.replace(/-/g, " ");
      const normalized = normalizeQuery(query);
      
      spec = await makeLandingSpec(normalized);
      
      // Сохраняем в кэш
      const generatedSlug = generateSlug(normalized);
      await saveLandingCache(normalized, generatedSlug, spec);
    } catch (error) {
      console.error(`[LANDING] Failed to generate spec for slug ${slug}:`, error);
      notFound();
    }
  }

  if (!spec) {
    notFound();
  }

  const adminKey = searchParams.regenerate;
  const services = await loadServices();

  return (
    <>
      <Header />
      <LandingPage 
        spec={spec} 
        slug={slug}
        adminKey={adminKey && adminKey === process.env.ADMIN_SECRET_KEY ? adminKey : undefined}
        services={services}
        initialService={searchParams.service}
      />
      <Footer />
    </>
  );
}

