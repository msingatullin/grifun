import OpenAI from 'openai';
import { YandexDirectCampaign, CampaignStats, CampaignOptimization } from './types';

const SYSTEM_PROMPT = `Ты — эксперт по оптимизации рекламных кампаний в Яндекс.Директе для B2B SaaS агентства по автоматизации и внедрению ИИ.

Твоя задача: проанализировать статистику кампании и предложить конкретные улучшения для увеличения конверсий и снижения стоимости лида.

КРИТЕРИИ ОПТИМИЗАЦИИ:
1. CTR (Click-Through Rate) — должен быть > 2% для поиска, > 0.5% для сетей
2. Конверсия — низкая конверсия при высоком трафике = проблема таргетинга
3. Стоимость клика — должна быть оптимальной для B2B ниши (обычно 50-200 руб)
4. Релевантность ключевых слов — убрать нерелевантные запросы
5. Текст объявлений — должен соответствовать поисковым запросам и целям
6. Бюджет — распределение должно быть оптимальным

ВАЖНО: 
- НЕ предлагай установить бюджет, если в описании кампании указано, что бюджет уже установлен (даже если Amount = 0, но есть Mode или другие признаки бюджета).
- Если пользователь говорит, что бюджет установлен (например, "5 000 Р в неделю"), НЕ предлагай установить бюджет.
- Предлагай установить бюджет ТОЛЬКО если явно указано, что бюджет не установлен или равен 0 без Mode.

НАШ ПРОДУКТ:
- B2B SaaS агентство по автоматизации бизнеса с помощью ИИ
- Целевая аудитория: B2B компании, e-commerce, сервисные компании
- Услуги: AI-аудит, Proof of Concept, интеграции под ключ, поддержка 24/7
- Цель: привлечение качественных лидов с низкой стоимостью

ВЕРНИ СТРОГО JSON:
{
  "score": число от 0 до 100 (оценка эффективности кампании),
  "summary": "краткий анализ проблем и возможностей (2-3 предложения)",
  "recommendations": ["список конкретных рекомендаций"],
  "suggestedChanges": [
    {
      "type": "bid" | "keywords" | "negative" | "ad_text" | "budget" | "targeting",
      "action": "конкретное действие (например: 'Увеличить ставку на 20% для высокочастотных запросов')",
      "reason": "обоснование изменения",
      "priority": "high" | "medium" | "low"
    }
  ]
}

ВАЖНО: Всегда возвращай валидный JSON, без дополнительных комментариев.`;

export class CampaignOptimizer {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }
    this.openai = new OpenAI({
      apiKey,
    });
  }

  async optimizeCampaign(
    campaign: YandexDirectCampaign,
    stats?: CampaignStats
  ): Promise<CampaignOptimization> {
    const statsText = stats
      ? `Статистика за период:
- Показы: ${stats.impressions.toLocaleString('ru-RU')}
- Клики: ${stats.clicks.toLocaleString('ru-RU')}
- CTR: ${stats.ctr.toFixed(2)}%
- Стоимость: ${stats.cost.toFixed(2)} руб.
- Средняя стоимость клика: ${stats.avgCpc.toFixed(2)} руб.
${stats.conversions ? `- Конверсии: ${stats.conversions}` : ''}
${stats.conversionRate ? `- Конверсия: ${stats.conversionRate.toFixed(2)}%` : ''}`
      : 'Статистика недоступна (кампания новая или нет данных)';

    // Проверяем бюджет (DailyBudget или WeeklyBudget)
    // Если Amount = 0, но есть Mode, значит бюджет может быть установлен на уровне аккаунта или через другой механизм
    const dailyBudget = campaign.DailyBudget?.Amount ? campaign.DailyBudget.Amount / 100 : 0;
    const hasBudgetMode = campaign.DailyBudget?.Mode !== undefined;
    const weeklyBudget = (campaign as any).WeeklyBudget?.Amount ? (campaign as any).WeeklyBudget.Amount / 100 : 0;
    const funds = (campaign as any).Funds;
    
    // Определяем, установлен ли бюджет
    const budgetIsSet = dailyBudget > 0 || weeklyBudget > 0 || hasBudgetMode || (funds && funds.Mode);
    
    const budgetText = dailyBudget > 0 
      ? `${dailyBudget} руб/день` 
      : weeklyBudget > 0 
        ? `${weeklyBudget} руб/неделю` 
        : hasBudgetMode || (funds && funds.Mode)
          ? 'установлен (режим: ' + (campaign.DailyBudget?.Mode || funds?.Mode) + ')'
          : 'не установлен';

    const prompt = `Проанализируй кампанию Яндекс.Директа и предложи оптимизацию:

Название кампании: ${campaign.Name}
ID кампании: ${campaign.Id}
Статус: ${campaign.Status}
Состояние: ${campaign.State}
Бюджет: ${budgetText}${budgetIsSet ? ' (БЮДЖЕТ УЖЕ УСТАНОВЛЕН - НЕ ПРЕДЛАГАЙ ЕГО УСТАНОВИТЬ!)' : ''}

${statsText}

Наш продукт: B2B SaaS агентство по автоматизации бизнеса с помощью ИИ.
Целевая аудитория: B2B компании, e-commerce, сервисные компании.
Услуги: AI-аудит, Proof of Concept, интеграции под ключ, поддержка 24/7.
Цель: привлечение качественных лидов с низкой стоимостью.

Предложи конкретные улучшения для:
1. Увеличения CTR
2. Снижения стоимости клика
3. Повышения конверсии
4. Оптимизации бюджета
5. Улучшения таргетинга`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      });

      const responseContent = completion.choices[0]?.message?.content;
      if (!responseContent) {
        throw new Error('Empty AI response');
      }

      const analysis = JSON.parse(responseContent);

      // Валидация структуры ответа
      if (
        typeof analysis.score !== 'number' ||
        typeof analysis.summary !== 'string' ||
        !Array.isArray(analysis.recommendations) ||
        !Array.isArray(analysis.suggestedChanges)
      ) {
        throw new Error('Invalid AI response structure');
      }

      return {
        campaignId: campaign.Id,
        campaignName: campaign.Name,
        score: Math.max(0, Math.min(100, analysis.score)),
        summary: analysis.summary,
        recommendations: analysis.recommendations || [],
        suggestedChanges: (analysis.suggestedChanges || []).map((change: any) => ({
          type: change.type || 'targeting',
          action: change.action || '',
          reason: change.reason || '',
          priority: change.priority || 'medium',
        })),
      };
    } catch (error) {
      console.error('[Optimizer] AI analysis failed:', error);
      // Fallback: базовая оценка
      return {
        campaignId: campaign.Id,
        campaignName: campaign.Name,
        score: stats ? (stats.ctr > 2 ? 60 : 40) : 50,
        summary: 'Не удалось проанализировать запрос автоматически. Требуется ручная проверка.',
        recommendations: [
          'Проверить релевантность ключевых слов',
          'Оптимизировать тексты объявлений',
          'Настроить минус-слова',
        ],
        suggestedChanges: [],
      };
    }
  }
}

