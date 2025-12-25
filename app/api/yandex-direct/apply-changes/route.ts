import { NextResponse } from 'next/server';
import { YandexDirectClient } from '@/lib/yandex-direct/client';
import { OptimizationReporter } from '@/lib/yandex-direct/reporter';

interface ApplyChangesRequest {
  campaignId: number;
  changes: Array<{
    type: 'bid' | 'keywords' | 'negative' | 'ad_text' | 'budget' | 'targeting';
    action: string;
    value?: any;
  }>;
  confirm?: boolean;
}

export async function POST(request: Request) {
  try {
    const accessToken = process.env.YANDEX_DIRECT_ACCESS_TOKEN;
    const login = process.env.YANDEX_DIRECT_LOGIN;

    if (!accessToken || !login) {
      return NextResponse.json(
        {
          error: 'Yandex Direct credentials not configured',
        },
        { status: 500 }
      );
    }

    const body: ApplyChangesRequest = await request.json();
    const { campaignId, changes, confirm = false } = body;

    if (!confirm) {
      return NextResponse.json({
        success: false,
        message: 'Требуется подтверждение. Добавьте "confirm": true в запрос',
        preview: {
          campaignId,
          changesCount: changes.length,
          changes: changes.map((c) => ({
            type: c.type,
            action: c.action,
          })),
        },
      });
    }

    const client = new YandexDirectClient(accessToken, login);
    const results: Array<{ type: string; success: boolean; message: string }> = [];

    // Применяем изменения по типу
    for (const change of changes) {
      try {
        switch (change.type) {
          case 'budget':
            if (change.value && typeof change.value === 'number') {
              try {
                // Формат для установки бюджета в Яндекс.Директе
                // Amount в копейках для API, минимальное значение 300 копеек (3 рубля)
                // Максимальное значение 1000000000 копеек (10 млн рублей)
                const amountInKopecks = Math.round(change.value * 100);
                
                // Проверяем диапазон
                if (amountInKopecks < 300) {
                  throw new Error(`Бюджет слишком мал. Минимум: 3 руб/день (300 копеек)`);
                }
                if (amountInKopecks > 1000000000) {
                  throw new Error(`Бюджет слишком велик. Максимум: 10 000 000 руб/день`);
                }
                
                const updated = await client.updateCampaign(campaignId, {
                  DailyBudget: {
                    Amount: amountInKopecks,
                    // Mode будет установлен автоматически в updateCampaign
                  },
                });
                
                results.push({
                  type: 'budget',
                  success: updated,
                  message: updated
                    ? `✅ Бюджет установлен: ${change.value} руб/день`
                    : '❌ Не удалось установить бюджет',
                });
              } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                console.error('[Apply Changes] Budget update error:', errorMessage);
                
                // Проверяем, связана ли ошибка с необходимостью ручной стратегии
                let userMessage = errorMessage;
                if (errorMessage.includes('manual strategies') || errorMessage.includes('Inconsistent object state')) {
                  userMessage = `❌ Для установки бюджета требуется ручная стратегия (MANUAL_CPC). Установите стратегию в интерфейсе Яндекс.Директа, затем повторите попытку. Техническая ошибка: ${errorMessage}`;
                }
                
                results.push({
                  type: 'budget',
                  success: false,
                  message: userMessage,
                });
              }
            } else {
              results.push({
                type: 'budget',
                success: false,
                message: '❌ Значение бюджета не указано или неверно',
              });
            }
            break;

          case 'keywords':
            try {
              // Извлекаем ключевые слова из action или value
              let keywords: string[] = [];
              
              // Если есть value (массив или строка)
              if (change.value) {
                if (Array.isArray(change.value)) {
                  keywords = change.value;
                } else if (typeof change.value === 'string') {
                  keywords = change.value.split(/[,;，；\n]/).map(k => k.trim()).filter(k => k.length > 0);
                }
              }
              
              // Если нет value, пытаемся извлечь из action
              if (keywords.length === 0) {
                // Форматы: "Добавить ключевые слова: слово1, слово2"
                // "Провести анализ и добавить: слово1, слово2"
                // "связанные с 'автоматизацией бизнеса', 'интеграцией ИИ'"
                const patterns = [
                  /(?:добавить|ключевые слова|слова)[:：]?\s*(.+)/i,
                  /(?:связанные с|такие как|например)[:：]?\s*['"](.+?)['"]/gi,
                  /['"]([^'"]+)['"]/g,
                ];
                
                for (const pattern of patterns) {
                  const matches = change.action.matchAll(pattern);
                  for (const match of matches) {
                    const text = match[1] || match[0];
                    const extracted = text
                      .split(/[,;，；\n]/)
                      .map(k => k.trim().replace(/['"]/g, ''))
                      .filter(k => k.length > 0);
                    keywords.push(...extracted);
                  }
                  if (keywords.length > 0) break;
                }
              }

              if (keywords.length > 0) {
                // Получаем группы объявлений кампании
                const adGroups = await client.getAdGroups(campaignId);
                if (adGroups.length > 0) {
                  // Добавляем ключевые слова в первую группу
                  const adGroupId = adGroups[0].Id;
                  // Очищаем ключевые слова от недопустимых символов
                  const cleanKeywords = keywords
                    .map(kw => kw.trim().replace(/[^\w\sа-яёА-ЯЁ\-]/gi, ''))
                    .filter(kw => kw.length > 0 && kw.length <= 50);
                  
                  if (cleanKeywords.length > 0) {
                    await client.addKeywords(campaignId, adGroupId, cleanKeywords.map(kw => ({ keyword: kw })));
                    
                    results.push({
                      type: 'keywords',
                      success: true,
                      message: `✅ Добавлено ключевых слов: ${cleanKeywords.length}`,
                    });
                  } else {
                    throw new Error('После очистки не осталось валидных ключевых слов');
                  }
                } else {
                  throw new Error('В кампании нет групп объявлений. Создайте группу объявлений вручную.');
                }
              } else {
                throw new Error('Ключевые слова не найдены. Укажите их в поле value или в описании в формате: "Добавить: слово1, слово2"');
              }
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : String(error);
              console.error('[Apply Changes] Keywords update error:', errorMessage);
              results.push({
                type: 'keywords',
                success: false,
                message: `❌ Ошибка: ${errorMessage}`,
              });
            }
            break;

          case 'negative':
            try {
              // Извлекаем минус-слова из action или value
              let negativeKeywords: string[] = [];
              
              // Если есть value
              if (change.value) {
                if (Array.isArray(change.value)) {
                  negativeKeywords = change.value;
                } else if (typeof change.value === 'string') {
                  negativeKeywords = change.value.split(/[,;，；\n]/).map(k => k.trim()).filter(k => k.length > 0);
                }
              }
              
              // Если нет value, пытаемся извлечь из action
              if (negativeKeywords.length === 0) {
                const patterns = [
                  /(?:добавить|минус|негативные)[\s-]*(?:слова|ключевые слова)?[:：]?\s*(.+)/i,
                  /(?:такие как|например|например:)[:：]?\s*(.+)/i,
                  /['"]([^'"]+)['"]/g,
                ];
                
                for (const pattern of patterns) {
                  const matches = change.action.matchAll(pattern);
                  for (const match of matches) {
                    const text = match[1] || match[0];
                    const extracted = text
                      .split(/[,;，；\n]/)
                      .map(k => k.trim().replace(/['"]/g, ''))
                      .filter(k => k.length > 0);
                    negativeKeywords.push(...extracted);
                  }
                  if (negativeKeywords.length > 0) break;
                }
              }

              if (negativeKeywords.length > 0) {
                // Добавляем минус-слова на уровне кампании
                await client.addNegativeKeywords(campaignId, null, negativeKeywords);
                
                results.push({
                  type: 'negative',
                  success: true,
                  message: `✅ Добавлено минус-слов: ${negativeKeywords.length}`,
                });
              } else {
                throw new Error('Минус-слова не найдены. Укажите их в поле value или в описании в формате: "Добавить минус-слова: слово1, слово2"');
              }
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : String(error);
              console.error('[Apply Changes] Negative keywords update error:', errorMessage);
              results.push({
                type: 'negative',
                success: false,
                message: `❌ Ошибка: ${errorMessage}`,
              });
            }
            break;

          case 'ad_text':
            try {
              // Извлекаем тексты объявлений из action
              // Формат: "Создать 3-5 различных текстов объявлений с акцентом на..."
              // Или: "Создать объявления: текст1, текст2, текст3"
              const adTextMatch = change.action.match(/(?:создать|текст|объявлени)[еяй:：]?\s*(.+)/i);
              
              if (adTextMatch || change.value) {
                // Если есть value, используем его (может быть массив текстов)
                let adTexts: string[] = [];
                
                if (change.value && Array.isArray(change.value)) {
                  adTexts = change.value;
                } else if (change.value && typeof change.value === 'string') {
                  adTexts = [change.value];
                } else if (adTextMatch) {
                  // Парсим тексты из описания (разделители: точка, перенос строки, "или")
                  const text = adTextMatch[1];
                  adTexts = text
                    .split(/[.\n]|или|или:/i)
                    .map(t => t.trim())
                    .filter(t => t.length > 10); // Минимум 10 символов для объявления
                }

                if (adTexts.length > 0) {
                  // Получаем группы объявлений
                  const adGroups = await client.getAdGroups(campaignId);
                  if (adGroups.length > 0) {
                    const adGroupId = adGroups[0].Id;
                    
                    // Создаем объявления для каждой группы
                    let createdCount = 0;
                    for (const adText of adTexts.slice(0, 5)) { // Максимум 5 объявлений
                      try {
                        await client.createTextAd(campaignId, adGroupId, adText);
                        createdCount++;
                      } catch (adError) {
                        const preview = adText.length > 50 ? adText.substring(0, 50) + '...' : adText;
                        console.warn(`[Apply Changes] Failed to create ad: ${preview}`, adError);
                      }
                    }
                    
                    if (createdCount > 0) {
                      results.push({
                        type: 'ad_text',
                        success: true,
                        message: `✅ Создано объявлений: ${createdCount}`,
                      });
                    } else {
                      throw new Error('Не удалось создать ни одного объявления');
                    }
                  } else {
                    throw new Error('В кампании нет групп объявлений. Создайте группу объявлений вручную.');
                  }
                } else {
                  throw new Error('Тексты объявлений не найдены. Укажите тексты в поле value или в описании.');
                }
              } else {
                throw new Error('Не удалось извлечь тексты объявлений из описания');
              }
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : String(error);
              console.error('[Apply Changes] Ad text update error:', errorMessage);
              results.push({
                type: 'ad_text',
                success: false,
                message: `❌ Ошибка: ${errorMessage}`,
              });
            }
            break;

          case 'targeting':
            // Для таргетинга нужны специальные методы
            results.push({
              type: 'targeting',
              success: false,
              message: 'Автоматическая настройка таргетинга требует дополнительной настройки',
            });
            break;

          default:
            results.push({
              type: change.type,
              success: false,
              message: `Тип изменения "${change.type}" не поддерживается для автоматического применения`,
            });
        }
      } catch (error) {
        results.push({
          type: change.type,
          success: false,
          message: `Ошибка: ${error instanceof Error ? error.message : String(error)}`,
        });
      }
    }

    const successCount = results.filter((r) => r.success).length;

    // Логируем результат
    console.log(
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          type: 'apply_changes',
          campaignId,
          changesCount: changes.length,
          successCount,
          results,
        },
        null,
        2
      )
    );

    return NextResponse.json({
      success: successCount > 0,
      campaignId,
      applied: successCount,
      total: changes.length,
      results,
    });
  } catch (error) {
    console.error('[Apply Changes] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to apply changes',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

