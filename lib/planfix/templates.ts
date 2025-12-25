/**
 * Маппинг шаблонов Planfix для разных типов заявок и услуг
 * 
 * Структура:
 * - Ключ: тип_заявки-услуга (например: "consultation-ai-audit")
 * - Значение: ID шаблона в Planfix
 * 
 * Если услуга не указана, используется общий шаблон для типа заявки
 */

export type RequestType = "consultation" | "callback";
export type ServiceId = "ai-audit" | "poc" | "turnkey" | "support" | "";

export interface PlanfixTemplateConfig {
  // Шаблоны для консультаций
  "consultation-ai-audit": string;      // Консультация: AI-аудит
  "consultation-poc": string;           // Консультация: Proof of Concept
  "consultation-turnkey": string;        // Консультация: Интеграции под ключ
  "consultation-support": string;        // Консультация: Поддержка 24/7
  "consultation": string;               // Консультация: общий шаблон (если услуга не указана)
  
  // Шаблоны для обратных звонков
  "callback": string;                   // Обратный звонок: общий шаблон
}

/**
 * Получить ID шаблона Planfix для заявки
 */
export function getPlanfixTemplate(
  type: RequestType,
  serviceId?: ServiceId
): string | undefined {
  // Загружаем конфигурацию из переменных окружения
  const config: Partial<PlanfixTemplateConfig> = {
    "consultation-ai-audit": process.env.PLANFIX_TEMPLATE_CONSULTATION_AI_AUDIT?.trim(),
    "consultation-poc": process.env.PLANFIX_TEMPLATE_CONSULTATION_POC?.trim(),
    "consultation-turnkey": process.env.PLANFIX_TEMPLATE_CONSULTATION_TURNKEY?.trim(),
    "consultation-support": process.env.PLANFIX_TEMPLATE_CONSULTATION_SUPPORT?.trim(),
    "consultation": process.env.PLANFIX_TEMPLATE_CONSULTATION?.trim(),
    "callback": process.env.PLANFIX_TEMPLATE_CALLBACK?.trim(),
  };

  // Если указана услуга, ищем специфичный шаблон
  if (type === "consultation" && serviceId) {
    const specificKey = `consultation-${serviceId}` as keyof PlanfixTemplateConfig;
    if (config[specificKey]) {
      return config[specificKey];
    }
  }

  // Возвращаем общий шаблон для типа заявки
  const generalKey = type as keyof PlanfixTemplateConfig;
  return config[generalKey];
}

/**
 * Получить все используемые шаблоны (для документации)
 */
export function getAllTemplateKeys(): Array<{ key: string; description: string }> {
  return [
    { key: "PLANFIX_TEMPLATE_CONSULTATION_AI_AUDIT", description: "Консультация: AI-аудит" },
    { key: "PLANFIX_TEMPLATE_CONSULTATION_POC", description: "Консультация: Proof of Concept" },
    { key: "PLANFIX_TEMPLATE_CONSULTATION_TURNKEY", description: "Консультация: Интеграции под ключ" },
    { key: "PLANFIX_TEMPLATE_CONSULTATION_SUPPORT", description: "Консультация: Поддержка 24/7" },
    { key: "PLANFIX_TEMPLATE_CONSULTATION", description: "Консультация: общий шаблон" },
    { key: "PLANFIX_TEMPLATE_CALLBACK", description: "Обратный звонок: общий шаблон" },
  ];
}

