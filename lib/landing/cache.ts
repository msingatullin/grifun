import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import type { LandingCache, LandingSpec } from "./types";

const CACHE_DIR = join(process.cwd(), "data", "landings");
const TTL_DAYS = 7;

/**
 * Сохраняет спек в кэш
 */
export async function saveLandingCache(
  query: string,
  slug: string,
  spec: LandingSpec
): Promise<void> {
  await mkdir(CACHE_DIR, { recursive: true });

  const cache: LandingCache = {
    spec,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000).toISOString(),
    query,
    slug,
  };

  const filePath = join(CACHE_DIR, `${slug}.json`);
  await writeFile(filePath, JSON.stringify(cache, null, 2));
}

/**
 * Загружает спек из кэша по slug
 */
export async function loadLandingCacheBySlug(slug: string): Promise<LandingCache | null> {
  const filePath = join(CACHE_DIR, `${slug}.json`);
  
  if (!existsSync(filePath)) {
    return null;
  }

  try {
    const content = await readFile(filePath, "utf-8");
    const cache: LandingCache = JSON.parse(content);

    // Проверяем срок действия
    if (new Date(cache.expiresAt) < new Date()) {
      return null; // Кэш истек
    }

    return cache;
  } catch (error) {
    console.error(`[LANDING CACHE] Failed to load cache for slug ${slug}:`, error);
    return null;
  }
}

/**
 * Загружает спек из кэша по query (через хеш)
 */
export async function loadLandingCacheByQuery(query: string, hash: string): Promise<LandingCache | null> {
  // Ищем файлы с соответствующим хешем в slug или в содержимом
  // Для упрощения: если есть slug с query, используем его
  const normalized = query.toLowerCase().trim().replace(/\s+/g, "-");
  
  // Пробуем найти по slug
  const possibleSlug = normalized.substring(0, 50);
  return loadLandingCacheBySlug(possibleSlug);
}

/**
 * Проверяет существование кэша
 */
export function isCacheValid(cache: LandingCache | null): boolean {
  if (!cache) return false;
  return new Date(cache.expiresAt) >= new Date();
}

