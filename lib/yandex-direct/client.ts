import { YandexDirectCampaign, CampaignStats, YandexDirectApiResponse } from './types';

export class YandexDirectClient {
  private accessToken: string;
  private login: string;
  private baseUrl = 'https://api.direct.yandex.com/json/v5';

  constructor(accessToken: string, login: string) {
    this.accessToken = accessToken;
    this.login = login;
  }

  private async request<T>(
    service: string,
    method: string,
    params: any
  ): Promise<YandexDirectApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}/${service}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        'Client-Login': this.login,
      },
      body: JSON.stringify({
        method,
        params,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Yandex Direct API error (${response.status}): ${errorText}`);
    }

    return response.json();
  }

  async getCampaigns(): Promise<YandexDirectCampaign[]> {
    try {
      const response = await this.request<{ Campaigns: YandexDirectCampaign[] }>(
        'campaigns',
        'get',
        {
          SelectionCriteria: {},
          FieldNames: [
            'Id',
            'Name',
            'Status',
            'State',
            'DailyBudget',
            'Statistics',
            'Type',
            'StartDate',
            'EndDate',
            'Funds',
          ],
        }
      );

      if (response.error) {
        throw new Error(`API Error: ${response.error.error_string}`);
      }

      return response.result?.Campaigns || [];
    } catch (error) {
      console.error('[Yandex Direct Client] Get campaigns error:', error);
      throw error;
    }
  }

  async getCampaign(campaignId: number): Promise<YandexDirectCampaign | null> {
    try {
      // Пробуем получить с BiddingStrategy, если не получится - без него
      const fieldNames = [
        'Id',
        'Name',
        'Status',
        'State',
        'DailyBudget',
        'Statistics',
        'Type',
        'StartDate',
        'EndDate',
      ];

      const response = await this.request<{ Campaigns: YandexDirectCampaign[] }>(
        'campaigns',
        'get',
        {
          SelectionCriteria: {
            Ids: [campaignId],
          },
          FieldNames: fieldNames,
        }
      );

      if (response.error) {
        throw new Error(`API Error: ${response.error.error_string}`);
      }

      return response.result?.Campaigns?.[0] || null;
    } catch (error) {
      console.error('[Yandex Direct Client] Get campaign error:', error);
      throw error;
    }
  }

  async getCampaignStats(
    campaignIds: number[],
    dateFrom: string,
    dateTo: string
  ): Promise<CampaignStats[]> {
    try {
      // Используем Reports API для получения статистики
      const response = await fetch(`${this.baseUrl}/reports`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'Client-Login': this.login,
        },
        body: JSON.stringify({
          params: {
            SelectionCriteria: {
              CampaignIds: campaignIds,
              DateFrom: dateFrom,
              DateTo: dateTo,
            },
            FieldNames: [
              'CampaignId',
              'Impressions',
              'Clicks',
              'Cost',
              'Ctr',
              'AvgCpc',
            ],
            ReportName: `Campaign Performance ${Date.now()}`,
            ReportType: 'CAMPAIGN_PERFORMANCE_REPORT',
            DateRangeType: 'CUSTOM_DATE',
            Format: 'TSV',
            IncludeVAT: 'YES',
            IncludeDiscount: 'NO',
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Reports API error: ${response.statusText}`);
      }

      const tsvData = await response.text();
      return this.parseStatsTSV(tsvData);
    } catch (error) {
      console.error('[Yandex Direct Client] Get stats error:', error);
      // Возвращаем пустой массив при ошибке
      return [];
    }
  }

  private parseStatsTSV(tsvData: string): CampaignStats[] {
    const lines = tsvData.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    // Пропускаем заголовок
    const dataLines = lines.slice(1);
    const stats: CampaignStats[] = [];

    for (const line of dataLines) {
      const columns = line.split('\t');
      if (columns.length < 6) continue;

      const campaignId = parseInt(columns[0], 10);
      const impressions = parseInt(columns[1], 10) || 0;
      const clicks = parseInt(columns[2], 10) || 0;
      const cost = parseFloat(columns[3]) || 0;
      const ctr = parseFloat(columns[4]) || 0;
      const avgCpc = parseFloat(columns[5]) || 0;

      stats.push({
        campaignId,
        impressions,
        clicks,
        cost,
        ctr,
        avgCpc,
      });
    }

    return stats;
  }

  /**
   * Создает новую кампанию
   */
  async createCampaign(campaignData: {
    Name: string;
    StartDate?: string;
    EndDate?: string;
    DailyBudget?: {
      Amount: number;
      Mode?: 'DISTRIBUTED' | 'DAILY';
    };
    Type?: 'TEXT_CAMPAIGN' | 'MOBILE_APP_CAMPAIGN' | 'DYNAMIC_TEXT_CAMPAIGN' | 'PERFORMANCE';
    BiddingStrategy?: {
      Search?: {
        BiddingStrategyType: string;
      };
      Network?: {
        BiddingStrategyType: string;
      };
    };
  }): Promise<number> {
    try {
      console.log('[Yandex Direct Client] Creating campaign:', JSON.stringify(campaignData, null, 2));

      // Формируем структуру для создания кампании
      // StartDate обязателен для создания кампании
      const today = new Date();
      const startDate = campaignData.StartDate || today.toISOString().split('T')[0]; // YYYY-MM-DD

      // Определяем тип кампании и соответствующее поле
      const campaignType = campaignData.Type || 'TEXT_CAMPAIGN';
      
      const newCampaign: any = {
        Name: campaignData.Name,
        StartDate: startDate,
      };

      // Для каждого типа кампании нужно указать соответствующее поле
      // TEXT_CAMPAIGN -> TextCampaign
      // PERFORMANCE -> PerformanceCampaign
      // DYNAMIC_TEXT_CAMPAIGN -> DynamicTextCampaign
      // BiddingStrategy обязателен при создании, нужны и Search и Network
      // Используем AVERAGE_CPC для Search и SERVING_OFF для Network (отключить показы в сети)
      if (campaignType === 'TEXT_CAMPAIGN') {
        newCampaign.TextCampaign = {
          BiddingStrategy: {
            Search: {
              BiddingStrategyType: 'AVERAGE_CPC',
              AverageCpc: {
                AverageCpc: 1000000, // 1 рубль в микрорублях (минимальная ставка)
              },
            },
            Network: {
              BiddingStrategyType: 'SERVING_OFF', // Отключить показы в сети
            },
          },
        };
      } else if (campaignType === 'PERFORMANCE') {
        newCampaign.PerformanceCampaign = {};
      } else if (campaignType === 'DYNAMIC_TEXT_CAMPAIGN') {
        newCampaign.DynamicTextCampaign = {
          BiddingStrategy: {
            Search: {
              BiddingStrategyType: 'AVERAGE_CPC',
              AverageCpc: {
                AverageCpc: 1000000,
              },
            },
            Network: {
              BiddingStrategyType: 'SERVING_OFF',
            },
          },
        };
      } else {
        // По умолчанию создаем текстовую кампанию
        newCampaign.TextCampaign = {
          BiddingStrategy: {
            Search: {
              BiddingStrategyType: 'AVERAGE_CPC',
              AverageCpc: {
                AverageCpc: 1000000,
              },
            },
            Network: {
              BiddingStrategyType: 'SERVING_OFF',
            },
          },
        };
      }

      // EndDate опционален
      if (campaignData.EndDate) {
        newCampaign.EndDate = campaignData.EndDate;
      }

      // DailyBudget нельзя установить при создании, если стратегия не MANUAL_CPC
      // Устанавливаем бюджет после создания кампании через updateCampaign
      // if (campaignData.DailyBudget) {
      //   newCampaign.DailyBudget = {
      //     Amount: campaignData.DailyBudget.Amount,
      //     Mode: campaignData.DailyBudget.Mode || 'DISTRIBUTED',
      //   };
      // }

      // BiddingStrategy нельзя установить при создании кампании
      // Его нужно устанавливать отдельно после создания
      // if (campaignData.BiddingStrategy) {
      //   newCampaign.BiddingStrategy = campaignData.BiddingStrategy;
      // }

      console.log('[Yandex Direct Client] Final create structure:', JSON.stringify(newCampaign, null, 2));

      const response = await this.request<{ AddResults: any[] }>(
        'campaigns',
        'add',
        {
          Campaigns: [newCampaign],
        }
      );

      if (response.error) {
        console.error('[Yandex Direct Client] Create campaign API Error:', response.error);
        throw new Error(`API Error: ${response.error.error_string} (${response.error.error_detail || ''})`);
      }

      const result = response.result?.AddResults?.[0];
      if (result?.Errors && result.Errors.length > 0) {
        console.error('[Yandex Direct Client] Create campaign errors:', result.Errors);
        const errorDetails = result.Errors.map((e: any) => {
          const msg = e.Message || e.ErrorString || '';
          const details = e.Details ? ` (${e.Details})` : '';
          return `${msg}${details}`;
        }).join(', ');
        throw new Error(`Create campaign failed: ${errorDetails}`);
      }

      const campaignId = result?.Id;
      if (!campaignId) {
        throw new Error('Campaign created but no ID returned');
      }

      console.log('[Yandex Direct Client] Campaign created successfully, ID:', campaignId);

      // Если был указан DailyBudget, устанавливаем его после создания
      if (campaignData.DailyBudget) {
        try {
          await this.updateCampaign(campaignId, {
            DailyBudget: {
              Amount: campaignData.DailyBudget.Amount,
              Mode: campaignData.DailyBudget.Mode || 'DISTRIBUTED',
            },
          });
          console.log('[Yandex Direct Client] DailyBudget set after campaign creation');
        } catch (budgetError) {
          console.warn('[Yandex Direct Client] Could not set DailyBudget after creation:', budgetError);
          // Не прерываем выполнение - кампания создана, бюджет можно установить позже
        }
      }

      return campaignId;
    } catch (error) {
      console.error('[Yandex Direct Client] Create campaign error:', error);
      throw error;
    }
  }

  async updateCampaign(
    campaignId: number,
    updates: Partial<YandexDirectCampaign>
  ): Promise<boolean> {
    try {
      // Логируем запрос для отладки
      console.log('[Yandex Direct Client] Updating campaign:', campaignId);
      console.log('[Yandex Direct Client] Updates:', JSON.stringify(updates, null, 2));

      // Получаем текущую кампанию для правильного формата
      const currentCampaign = await this.getCampaign(campaignId);
      if (!currentCampaign) {
        throw new Error(`Campaign ${campaignId} not found`);
      }

      // Формируем структуру для обновления
      const campaignUpdate: any = {
        Id: campaignId,
      };

      // Обрабатываем DailyBudget отдельно
      // Для перфоманс-кампаний DailyBudget работает только с ручными стратегиями
      if (updates.DailyBudget) {
        const currentBudget = currentCampaign.DailyBudget as any;
        const campaignType = (currentCampaign as any).Type;
        
        // Для перфоманс-кампаний пробуем установить стратегию вместе с бюджетом
        // Если это не сработает, пользователь получит понятное сообщение об ошибке
        if (campaignType === 'PERFORMANCE') {
          // Пробуем установить ручную стратегию для перфоманс-кампаний
          // Это может не сработать, но попробуем
          try {
            await this.setBiddingStrategy(campaignId, 'MANUAL_CPC');
            console.log('[Yandex Direct Client] Strategy set successfully, now setting budget');
          } catch (strategyError) {
            console.warn('[Yandex Direct Client] Could not set strategy via API, continuing with budget update');
            // Продолжаем попытку установить бюджет - может быть стратегия уже установлена
          }
        }
        
        campaignUpdate.DailyBudget = {
          Amount: updates.DailyBudget.Amount,
          // Сохраняем существующий Mode или используем DISTRIBUTED по умолчанию
          Mode: updates.DailyBudget.Mode || currentBudget?.Mode || 'DISTRIBUTED',
        };
      }

      // Остальные поля
      if (updates.Name) {
        campaignUpdate.Name = updates.Name;
      }
      if (updates.State) {
        campaignUpdate.State = updates.State;
      }

      console.log('[Yandex Direct Client] Final update structure:', JSON.stringify(campaignUpdate, null, 2));

      const response = await this.request<{ UpdateResults: any[] }>(
        'campaigns',
        'update',
        {
          Campaigns: [campaignUpdate],
        }
      );

      if (response.error) {
        console.error('[Yandex Direct Client] API Error:', response.error);
        throw new Error(`API Error: ${response.error.error_string} (${response.error.error_detail || ''})`);
      }

      const result = response.result?.UpdateResults?.[0];
      if (result?.Errors && result.Errors.length > 0) {
        console.error('[Yandex Direct Client] Update errors:', result.Errors);
        const errorDetails = result.Errors.map((e: any) => {
          const msg = e.Message || e.ErrorString || '';
          const details = e.Details ? ` (${e.Details})` : '';
          return `${msg}${details}`;
        }).join(', ');
        throw new Error(`Update failed: ${errorDetails}`);
      }

      return true;
    } catch (error) {
      console.error('[Yandex Direct Client] Update campaign error:', error);
      throw error;
    }
  }

  async getKeywords(campaignId: number) {
    try {
      const response = await this.request<any>('keywords', 'get', {
        SelectionCriteria: {
          CampaignIds: [campaignId],
        },
        FieldNames: ['Id', 'Keyword', 'Bid', 'Statistics'],
      });

      return response.result?.Keywords || [];
    } catch (error) {
      console.error('[Yandex Direct Client] Get keywords error:', error);
      return [];
    }
  }

  async getAdGroups(campaignId: number) {
    try {
      const response = await this.request<any>('adgroups', 'get', {
        SelectionCriteria: {
          CampaignIds: [campaignId],
        },
        FieldNames: ['Id', 'Name', 'CampaignId'],
      });

      return response.result?.AdGroups || [];
    } catch (error) {
      console.error('[Yandex Direct Client] Get ad groups error:', error);
      return [];
    }
  }

  async getAds(campaignId: number) {
    try {
      const response = await this.request<any>('ads', 'get', {
        SelectionCriteria: {
          CampaignIds: [campaignId],
        },
        FieldNames: ['Id', 'AdGroupId', 'TextAd', 'Type', 'State'],
      });

      return response.result?.Ads || [];
    } catch (error) {
      console.error('[Yandex Direct Client] Get ads error:', error);
      return [];
    }
  }

  /**
   * Устанавливает стратегию ставок для кампании
   * Для перфоманс-кампаний DailyBudget работает только с MANUAL_CPC
   * ВНИМАНИЕ: Для перфоманс-кампаний это может не работать через API
   */
  async setBiddingStrategy(
    campaignId: number,
    strategyType: 'MANUAL_CPC' = 'MANUAL_CPC'
  ): Promise<boolean> {
    try {
      // Пробуем установить стратегию через campaigns.update
      // Но для перфоманс-кампаний это может не работать
      const campaignUpdate: any = {
        Id: campaignId,
        BiddingStrategy: {
          Search: {
            BiddingStrategyType: strategyType,
          },
          Network: {
            BiddingStrategyType: strategyType,
          },
        },
      };

      console.log('[Yandex Direct Client] Setting bidding strategy:', JSON.stringify(campaignUpdate, null, 2));

      const response = await this.request<{ UpdateResults: any[] }>(
        'campaigns',
        'update',
        {
          Campaigns: [campaignUpdate],
        }
      );

      if (response.error) {
        console.error('[Yandex Direct Client] Set strategy API Error:', response.error);
        // Для перфоманс-кампаний стратегия может быть недоступна через API
        throw new Error(`API Error: ${response.error.error_string} (${response.error.error_detail || ''})`);
      }

      const result = response.result?.UpdateResults?.[0];
      if (result?.Errors && result.Errors.length > 0) {
        console.error('[Yandex Direct Client] Set strategy errors:', result.Errors);
        const errorDetails = result.Errors.map((e: any) => {
          const msg = e.Message || e.ErrorString || '';
          const details = e.Details ? ` (${e.Details})` : '';
          return `${msg}${details}`;
        }).join(', ');
        throw new Error(`Set strategy failed: ${errorDetails}`);
      }

      return true;
    } catch (error) {
      console.error('[Yandex Direct Client] Set bidding strategy error:', error);
      throw error;
    }
  }

  /**
   * Добавляет ключевые слова в группу объявлений
   */
  async addKeywords(
    campaignId: number,
    adGroupId: number,
    keywords: Array<{ keyword: string; bid?: number }>
  ): Promise<boolean> {
    try {
      const keywordObjects = keywords.map((kw) => ({
        Keyword: kw.keyword,
        AdGroupId: adGroupId,
        ...(kw.bid ? { Bid: Math.round(kw.bid * 1000000) } : {}), // Конвертация в микрорубли, если указана
      }));

      console.log('[Yandex Direct Client] Adding keywords:', JSON.stringify(keywordObjects, null, 2));

      const response = await this.request<{ AddResults: any[] }>(
        'keywords',
        'add',
        {
          Keywords: keywordObjects,
        }
      );

      if (response.error) {
        throw new Error(`API Error: ${response.error.error_string}`);
      }

      const results = response.result?.AddResults || [];
      const errors: string[] = [];
      
      for (const result of results) {
        if (result?.Errors && result.Errors.length > 0) {
          errors.push(...result.Errors.map((e: any) => e.Message || e.ErrorString || String(e)));
        }
      }

      if (errors.length > 0) {
        throw new Error(`Add keywords failed: ${errors.join(', ')}`);
      }

      console.log('[Yandex Direct Client] Keywords added successfully');
      return true;
    } catch (error) {
      console.error('[Yandex Direct Client] Add keywords error:', error);
      throw error;
    }
  }

  /**
   * Обновляет ставки ключевых слов
   */
  async updateKeywords(
    keywordIds: number[],
    newBid?: number
  ): Promise<boolean> {
    try {
      const keywordUpdates = keywordIds.map((id) => ({
        Id: id,
        Bid: newBid ? Math.round(newBid * 1000000) : undefined, // Конвертация в микрорубли
      }));

      const response = await this.request<{ UpdateResults: any[] }>(
        'keywords',
        'update',
        {
          Keywords: keywordUpdates,
        }
      );

      if (response.error) {
        throw new Error(`API Error: ${response.error.error_string}`);
      }

      const result = response.result?.UpdateResults?.[0];
      if (result?.Errors && result.Errors.length > 0) {
        throw new Error(`Update keywords failed: ${result.Errors.map((e: any) => e.Message || e.ErrorString).join(', ')}`);
      }

      return true;
    } catch (error) {
      console.error('[Yandex Direct Client] Update keywords error:', error);
      throw error;
    }
  }

  /**
   * Удаляет ключевые слова
   */
  async deleteKeywords(keywordIds: number[]): Promise<boolean> {
    try {
      const response = await this.request<{ DeleteResults: any[] }>(
        'keywords',
        'delete',
        {
          SelectionCriteria: {
            Ids: keywordIds,
          },
        }
      );

      if (response.error) {
        throw new Error(`API Error: ${response.error.error_string}`);
      }

      return true;
    } catch (error) {
      console.error('[Yandex Direct Client] Delete keywords error:', error);
      throw error;
    }
  }

  /**
   * Добавляет минус-слова в кампанию или группу объявлений
   */
  async addNegativeKeywords(
    campaignId: number,
    adGroupId: number | null,
    keywords: string[]
  ): Promise<boolean> {
    try {
      // Очищаем ключевые слова от недопустимых символов
      const cleanKeywords = keywords
        .map(kw => kw.trim().replace(/[^\w\sа-яёА-ЯЁ\-]/gi, ''))
        .filter(kw => kw.length > 0 && kw.length <= 50);

      if (cleanKeywords.length === 0) {
        throw new Error('Нет валидных минус-слов после очистки');
      }

      // Для минус-слов используем метод adgroups.update или negativekeywordlists.add
      // Попробуем через adgroups, если указана группа, иначе через negativekeywordlists
      if (adGroupId) {
        // Добавляем минус-слова в группу объявлений
        // Формат: ArrayOfString с полем Items
        // Минус-фразу следует указывать без минуса перед первым словом
        const adGroupUpdate: any = {
          Id: adGroupId,
          NegativeKeywords: {
            Items: cleanKeywords.map(kw => kw.replace(/^-+/, '')), // Убираем минусы в начале
          },
        };

        const response = await this.request<{ UpdateResults: any[] }>(
          'adgroups',
          'update',
          {
            AdGroups: [adGroupUpdate],
          }
        );

        if (response.error) {
          throw new Error(`API Error: ${response.error.error_string}`);
        }

        const result = response.result?.UpdateResults?.[0];
        if (result?.Errors && result.Errors.length > 0) {
          throw new Error(`Add negative keywords failed: ${result.Errors.map((e: any) => e.Message || e.ErrorString).join(', ')}`);
        }
      } else {
        // Добавляем минус-слова на уровне кампании через campaigns.update
        // Получаем группы объявлений и добавляем минус-слова в первую группу
        const adGroups = await this.getAdGroups(campaignId);
        if (adGroups.length > 0) {
          const adGroupId = adGroups[0].Id;
          // Для минус-слов используем объект ArrayOfString с полем Items
          const adGroupUpdate: any = {
            Id: adGroupId,
            NegativeKeywords: {
              Items: cleanKeywords, // Массив строк внутри объекта Items
            },
          };

          console.log('[Yandex Direct Client] Adding negative keywords to ad group:', JSON.stringify(adGroupUpdate, null, 2));

          const response = await this.request<{ UpdateResults: any[] }>(
            'adgroups',
            'update',
            {
              AdGroups: [adGroupUpdate],
            }
          );

          if (response.error) {
            throw new Error(`API Error: ${response.error.error_string}`);
          }

          const result = response.result?.UpdateResults?.[0];
          if (result?.Errors && result.Errors.length > 0) {
            throw new Error(`Add negative keywords failed: ${result.Errors.map((e: any) => e.Message || e.ErrorString).join(', ')}`);
          }
        } else {
          throw new Error('В кампании нет групп объявлений. Создайте группу объявлений вручную.');
        }
      }

      console.log('[Yandex Direct Client] Negative keywords added successfully');
      return true;
    } catch (error) {
      console.error('[Yandex Direct Client] Add negative keywords error:', error);
      throw error;
    }
  }

  /**
   * Создает текстовое объявление
   */
  async createTextAd(
    campaignId: number,
    adGroupId: number,
    text: string
  ): Promise<number> {
    try {
      // Очищаем текст от недопустимых символов
      // "Узкие" символы: !,.;:" - они учитываются по-особому в длине
      // НЕ допускаются: %, &, <, >, некоторые специальные символы
      let cleanText = text
        .replace(/%/g, 'процентов') // Заменяем % на слово
        .replace(/&/g, 'и') // Заменяем & на "и"
        .replace(/[<>]/g, '') // Удаляем < и >
        .replace(/\s+/g, ' ') // Убираем множественные пробелы
        .trim();

      if (cleanText.length < 10) {
        throw new Error('Текст объявления слишком короткий (минимум 10 символов)');
      }

      // Разбиваем текст на заголовок и описание
      // Title: не более 56 символов (с учетом "узких"), каждое слово не более 22 символов
      // Text: не более 81 символа (без учета "узких" плюс не более 15 "узких"), каждое слово не более 23 символов
      
      // Улучшенная логика: разбиваем осмысленно, учитывая структуру текста
      // Сначала пытаемся найти границы предложений (точка, восклицательный, вопросительный знак)
      let sentences = cleanText.split(/[.!?]\s+/).filter(s => s.trim().length > 0);
      
      // Если нет предложений, разбиваем по запятым (для длинных фраз)
      if (sentences.length === 0 || (sentences.length === 1 && sentences[0].length > 56)) {
        const commaSplit = cleanText.split(/,\s+/);
        if (commaSplit.length > 1) {
          sentences = commaSplit;
        }
      }
      
      let title = '';
      let body = '';
      
      if (sentences.length > 1) {
        // Если есть несколько частей, используем первую как заголовок, остальные как текст
        title = sentences[0].trim();
        
        // Если первое предложение слишком длинное, обрезаем его по словам
        if (title.length > 56) {
          const words = title.split(/\s+/);
          title = '';
          for (const word of words) {
            const testTitle = title ? `${title} ${word}` : word;
            if (testTitle.length <= 56) {
              title = testTitle;
            } else {
              break;
            }
          }
        }
        
        // Формируем body из оставшихся частей
        body = sentences.slice(1).join('. ').trim();
        
        // Если body слишком длинный, обрезаем его
        const bodyRegular = body.replace(/[!,.;:"]/g, '').length;
        const bodyNarrow = (body.match(/[!,.;:"]/g) || []).length;
        if (bodyRegular > 81 || bodyNarrow > 15) {
          const words = body.split(/\s+/);
          body = '';
          let regularCount = 0;
          let narrowCount = 0;
          for (const word of words) {
            const testBody = body ? `${body} ${word}` : word;
            const testRegular = testBody.replace(/[!,.;:"]/g, '').length;
            const testNarrow = (testBody.match(/[!,.;:"]/g) || []).length;
            if (testRegular <= 81 && testNarrow <= 15) {
              body = testBody;
              regularCount = testRegular;
              narrowCount = testNarrow;
            } else {
              break;
            }
          }
        }
      } else {
        // Если текст один (нет разделителей), разбиваем по словам, но стараемся не обрывать фразу
        const words = cleanText.split(/\s+/);
        
        // Ищем оптимальную точку разрыва (около 40-50% текста для заголовка)
        const targetTitleLength = Math.min(56, Math.floor(cleanText.length * 0.5));
        let titleWords: string[] = [];
        let titleLength = 0;
        
        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          const testLength = titleLength + (titleLength > 0 ? 1 : 0) + word.length;
          
          // Предпочитаем останавливаться после запятой или перед важными словами
          const hasComma = word.includes(',');
          const isImportantWord = /^(на|в|с|для|под|к|из|от|до|при|без|над|за|про|об|со|во|обо|об|обо)/i.test(word);
          
          if (testLength <= 56) {
            titleWords.push(word);
            titleLength = testLength;
            
            // Если достигли целевой длины и следующее слово не важное, останавливаемся
            if (titleLength >= targetTitleLength && !isImportantWord && i < words.length - 1) {
              const remainingWords = words.slice(i + 1);
              const remainingText = remainingWords.join(' ');
              // Проверяем, что остаток поместится в body
              const remainingRegular = remainingText.replace(/[!,.;:"]/g, '').length;
              if (remainingRegular <= 81) {
                break; // Останавливаемся здесь
              }
            }
          } else {
            // Если следующее слово не помещается, проверяем, не лучше ли остановиться раньше
            if (titleWords.length > 0 && !hasComma) {
              // Откатываемся на одно слово назад, если это не конец фразы
              const lastWord = titleWords[titleWords.length - 1];
              if (!lastWord.includes(',')) {
                titleWords.pop();
                titleLength -= (titleLength > 0 ? 1 : 0) + lastWord.length;
              }
            }
            break;
          }
        }
        
        title = titleWords.join(' ').trim();
        
        // Формируем body из оставшихся слов
        const titleWordCount = titleWords.length;
        const remainingWords = words.slice(titleWordCount);
        body = remainingWords.join(' ').trim();
      }
      
      // Если body пустой или слишком короткий, используем часть cleanText
      if (!body || body.trim().length < 5) {
        if (cleanText.length > title.length + 5) {
          body = cleanText.substring(title.length).trim();
          // Убираем лишние пробелы в начале
          body = body.replace(/^\s+/, '');
        } else {
          // Если весь текст короткий, дублируем для body
          body = cleanText;
        }
      }

      // Убеждаемся, что заголовок и описание не пустые
      if (!title || title.length === 0) {
        title = cleanText.substring(0, Math.min(56, cleanText.length));
      }
      if (!body || body.length === 0) {
        body = cleanText.substring(Math.min(56, cleanText.length), Math.min(137, cleanText.length));
      }

      // Удаляем недопустимые символы из финального текста
      // Разрешаем: буквы, цифры, пробелы, дефис, точка, запятая, восклицательный знак, вопросительный знак, двоеточие, точка с запятой, скобки, кавычки
      // НЕ допускаются: %, &, <, >, и другие специальные символы
      // "Узкие" символы: !,.;:" - они учитываются по-особому
      title = title
        .replace(/[^\w\sа-яёА-ЯЁ\-.,!?():;"]/gi, '') // Разрешаем только допустимые символы
        .replace(/[%&<>]/g, '') // Явно удаляем запрещенные символы
        .replace(/\s+/g, ' ') // Убираем множественные пробелы
        .trim();
      body = body
        .replace(/[^\w\sа-яёА-ЯЁ\-.,!?():;"]/gi, '')
        .replace(/[%&<>]/g, '') // Явно удаляем запрещенные символы
        .replace(/\s+/g, ' ')
        .trim();
      
      // Убеждаемся, что заголовок и описание не пустые после очистки
      if (!title || title.length === 0) {
        throw new Error('Заголовок объявления пуст после очистки');
      }
      if (!body || body.length === 0) {
        throw new Error('Описание объявления пусто после очистки');
      }

      // DisplayUrlPath: может содержать только буквы, цифры, символы /- № # %
      // Точка (.) НЕ разрешена! Используем только домен без точки или путь
      const displayUrl = 'grifun'; // Без точки, только домен
      const href = 'https://grifun.ru';

      // Функция для подсчета "узких" символов
      const countNarrowChars = (str: string): number => {
        return (str.match(/[!,.;:"]/g) || []).length;
      };

      // Функция для подсчета длины с учетом "узких" символов
      const getEffectiveLength = (str: string): number => {
        return str.length; // Все символы учитываются, но узкие имеют особый вес
      };

      // Title: не более 56 символов с учетом "узких"
      // Text: не более 81 символа без учета "узких" плюс не более 15 "узких"
      // Проверяем и корректируем длину
      const titleNarrow = countNarrowChars(title);
      if (getEffectiveLength(title) > 56) {
        title = title.substring(0, 56).trim();
      }

      const bodyNarrow = countNarrowChars(body);
      const bodyRegular = body.replace(/[!,.;:"]/g, '').length;
      if (bodyRegular > 81 || bodyNarrow > 15) {
        // Обрезаем до допустимых значений
        let trimmed = '';
        let regularCount = 0;
        let narrowCount = 0;
        for (const char of body) {
          if (/[!,.;:"]/.test(char)) {
            if (narrowCount < 15) {
              trimmed += char;
              narrowCount++;
            }
          } else {
            if (regularCount < 81) {
              trimmed += char;
              regularCount++;
            }
          }
          if (regularCount >= 81 && narrowCount >= 15) break;
        }
        body = trimmed.trim();
      }

      const adObject = {
        AdGroupId: adGroupId,
        TextAd: {
          Title: title,
          Text: body,
          Mobile: 'NO', // Обязательный параметр, хотя и устарел
          Href: href,
          DisplayUrlPath: displayUrl,
        },
      };

      console.log('[Yandex Direct Client] Creating text ad:', JSON.stringify(adObject, null, 2));

      const response = await this.request<{ AddResults: any[] }>(
        'ads',
        'add',
        {
          Ads: [adObject],
        }
      );

      if (response.error) {
        throw new Error(`API Error: ${response.error.error_string}`);
      }

      const result = response.result?.AddResults?.[0];
      if (result?.Errors && result.Errors.length > 0) {
        const errorDetails = result.Errors.map((e: any) => {
          return `${e.Message || e.ErrorString || 'Unknown error'} (Code: ${e.Code || 'N/A'})`;
        }).join(', ');
        console.error('[Yandex Direct Client] Create ad API errors:', JSON.stringify(result.Errors, null, 2));
        throw new Error(`Create ad failed: ${errorDetails}`);
      }

      const adId = result?.Id;
      if (!adId) {
        throw new Error('Ad created but no ID returned');
      }

      console.log('[Yandex Direct Client] Text ad created successfully, ID:', adId);

      // Автоматически отправляем объявление на модерацию, чтобы оно перешло в статус "Идут показы"
      try {
        await this.moderateAd(adId);
        console.log('[Yandex Direct Client] Ad sent to moderation, ID:', adId);
      } catch (moderateError) {
        console.warn('[Yandex Direct Client] Failed to send ad to moderation (ad still created):', moderateError);
        // Не прерываем выполнение, так как объявление уже создано
      }

      return adId;
    } catch (error) {
      console.error('[Yandex Direct Client] Create text ad error:', error);
      throw error;
    }
  }

  /**
   * Отправляет объявление на модерацию (для перехода из статуса "Черновик" в "Идут показы")
   */
  async moderateAd(adId: number): Promise<boolean> {
    try {
      const response = await this.request<{ ModerateResults: any[] }>(
        'ads',
        'moderate',
        {
          SelectionCriteria: {
            Ids: [adId],
          },
        }
      );

      if (response.error) {
        throw new Error(`API Error: ${response.error.error_string}`);
      }

      const result = response.result?.ModerateResults?.[0];
      if (result?.Errors && result.Errors.length > 0) {
        throw new Error(`Moderate ad failed: ${result.Errors.map((e: any) => e.Message || e.ErrorString).join(', ')}`);
      }

      console.log('[Yandex Direct Client] Ad sent to moderation successfully, ID:', adId);
      return true;
    } catch (error) {
      console.error('[Yandex Direct Client] Moderate ad error:', error);
      throw error;
    }
  }
}

