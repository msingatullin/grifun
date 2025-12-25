import { createHash } from "crypto";

/**
 * Нормализует запрос: убирает мусор, приводит к нижнему регистру, создает короткую версию
 */
export function normalizeQuery(query: string): string {
  if (!query) return "";

  // Убираем лишние пробелы и приводим к нижнему регистру
  let normalized = query
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

  // Убираем специальные символы и пунктуацию (кроме дефисов и пробелов)
  normalized = normalized.replace(/[^\w\s-]/g, "");

  // Ограничиваем длину (берем первые 100 символов)
  normalized = normalized.substring(0, 100).trim();

  return normalized;
}

/**
 * Генерирует slug из запроса
 */
export function generateSlug(query: string): string {
  const normalized = normalizeQuery(query);
  
  // Заменяем пробелы на дефисы
  const slug = normalized
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  // Если slug пустой, генерируем из хеша
  if (!slug) {
    const hash = createHash("md5").update(query).digest("hex").substring(0, 8);
    return `lp-${hash}`;
  }

  return slug;
}

/**
 * Генерирует хеш для кэширования
 */
export function hashQuery(query: string): string {
  return createHash("md5").update(normalizeQuery(query)).digest("hex");
}

