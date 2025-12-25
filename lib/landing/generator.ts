import OpenAI from "openai";
import type { LandingSpec } from "./types";

const SYSTEM_PROMPT = `Ты — product copywriter + solution architect. Сгенерируй LandingSpec строго по JSON-схеме ниже, без лишнего текста.

Правила:
- Не выдумывай конкретные цифры (проценты, сроки, "99%"), если они не даны во входе.
- Не обещай "гарантируем", "100%".
- Пиши по-русски, деловой стиль, без воды.
- Подстрой лексику под запрос (если "госсектор" — акцент на регламенты, контроль доступа, аудит-лог; если "продажи" — лиды, CRM, скорость реакции; если "склад" — ошибки, учет, документы).
- CTA должен быть конкретным: "Получить аудит <...>".
- pains: 4–6 пунктов
- solutions.items: 5–8 пунктов
- proof.caseSnippets: 2–3 нейтральных мини-кейса (без конкретных цифр)
- compliance.disclaimers: 1–2 коротких дисклеймера
- compliance.claimsLevel: используй "strict" для госсектора и финансов, "normal" для остального

Схема LandingSpec:
{
  "query": string,
  "audience": {
    "industry": string?,
    "department": string?,
    "context": string?
  },
  "hero": {
    "h1": string,
    "subtitle": string,
    "bullets": string[]
  },
  "pains": string[],
  "solutions": {
    "title": string,
    "items": string[]
  },
  "process": string[],
  "proof": {
    "trustBullets": string[],
    "caseSnippets": [{"title": string, "result": string}]
  },
  "cta": {
    "primary": string,
    "formTitle": string,
    "formHint": string
  },
  "seo": {
    "title": string,
    "description": string,
    "h1": string?,
    "canonical": string?
  },
  "compliance": {
    "claimsLevel": "strict" | "normal",
    "disclaimers": string[]
  }
}

Верни только валидный JSON, без дополнительных комментариев.`;

const DEFAULT_PROCESS = [
  "Анализ ваших бизнес-процессов и выявление точек автоматизации",
  "Разработка технического решения с учетом вашей инфраструктуры",
  "Внедрение и настройка AI-решения",
  "Обучение команды и передача документации",
  "Мониторинг и поддержка работы системы"
];

/**
 * Генерирует LandingSpec на основе query через OpenAI
 */
export async function makeLandingSpec(query: string): Promise<LandingSpec> {
  const openaiKey = process.env.OPENAI_API_KEY;
  
  if (!openaiKey) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  const openai = new OpenAI({
    apiKey: openaiKey,
  });

  const userPrompt = `Сгенерируй LandingSpec для запроса: "${query}"`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error("Empty AI response");
    }

    const parsed = JSON.parse(responseContent);
    
    // Валидация и нормализация
    const spec: LandingSpec = {
      query: parsed.query || query,
      audience: parsed.audience || {},
      hero: parsed.hero || {
        h1: `Автоматизация для ${query}`,
        subtitle: "Внедряем AI-решения в ваш бизнес",
        bullets: [],
      },
      pains: parsed.pains || [],
      solutions: parsed.solutions || {
        title: "Наши решения",
        items: [],
      },
      process: parsed.process || DEFAULT_PROCESS,
      proof: parsed.proof || {
        trustBullets: [],
        caseSnippets: [],
      },
      cta: parsed.cta || {
        primary: "Получить консультацию",
        formTitle: "Оставьте заявку",
        formHint: "Мы свяжемся с вами в течение рабочего дня",
      },
      seo: {
        title: parsed.seo?.title || `AI автоматизация для ${query} | grifun.ru`,
        description: parsed.seo?.description || `Внедряем искусственный интеллект для автоматизации процессов ${query}. Аудит, разработка, внедрение.`,
        h1: parsed.seo?.h1 || parsed.hero?.h1,
        canonical: parsed.seo?.canonical || undefined, // Будет установлен в роуте на основе slug
      },
      compliance: parsed.compliance || {
        claimsLevel: "normal",
        disclaimers: [
          "Результат зависит от специфики процессов компании",
          "Показатели эффективности фиксируются по итогам аудита",
        ],
      },
    };

    // Применяем guardrails
    return applyGuardrails(spec);
  } catch (error) {
    console.error("[LANDING GENERATOR] Error generating spec:", error);
    throw error;
  }
}

/**
 * Применяет guardrails для безопасности и соответствия требованиям
 */
function applyGuardrails(spec: LandingSpec): LandingSpec {
  // Убираем гарантии и конкретные цифры из hero
  spec.hero.h1 = spec.hero.h1.replace(/гарантируем|100%|99%/gi, "");
  spec.hero.subtitle = spec.hero.subtitle.replace(/гарантируем|100%|99%/gi, "");

  // Очищаем bullets от гарантий
  spec.hero.bullets = spec.hero.bullets.map(bullet =>
    bullet.replace(/гарантируем|100%|99%/gi, "").trim()
  );

  // Очищаем solutions
  spec.solutions.items = spec.solutions.items.map(item =>
    item.replace(/гарантируем|100%|99%/gi, "").trim()
  );

  // Очищаем caseSnippets от конкретных цифр
  spec.proof.caseSnippets = spec.proof.caseSnippets.map(snippet => ({
    title: snippet.title.replace(/\d+%/g, "").trim(),
    result: snippet.result
      .replace(/\d+%/g, "")
      .replace(/гарантируем|100%|99%/gi, "")
      .trim(),
  }));

  // Добавляем дисклеймеры если их нет
  if (spec.compliance.disclaimers.length === 0) {
    spec.compliance.disclaimers = [
      "Результат зависит от специфики процессов компании",
      "Показатели эффективности фиксируются по итогам аудита",
    ];
  }

  return spec;
}

