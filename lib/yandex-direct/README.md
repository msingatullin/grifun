# Модуль автоматической оптимизации Яндекс.Директа

Модуль для автоматической настройки и оптимизации рекламных кампаний в Яндекс.Директе с использованием AI.

## Возможности

- ✅ Получение списка всех кампаний
- ✅ Анализ статистики кампаний
- ✅ AI-оптимизация с рекомендациями
- ✅ Автоматическая оптимизация по расписанию
- ✅ Детальное логирование результатов

## Настройка

### 1. Получение токена доступа Яндекс.Директа

1. Зарегистрируйте приложение в [Яндекс OAuth](https://oauth.yandex.ru/)
2. Получите OAuth токен для доступа к API Яндекс.Директа
3. Получите Client Login (логин рекламодателя)

### 2. Переменные окружения

Добавьте в `.env.local`:

```bash
# Яндекс.Директ API
YANDEX_DIRECT_ACCESS_TOKEN=ваш_oauth_токен
YANDEX_DIRECT_LOGIN=ваш_логин_рекламодателя

# OpenAI (уже должен быть)
OPENAI_API_KEY=ваш_ключ_openai

# Опционально: секретный ключ для auto-optimize endpoint
AUTO_OPTIMIZE_SECRET=ваш_секретный_ключ
```

### 3. Получение OAuth токена

```bash
# 1. Зарегистрируйте приложение на https://oauth.yandex.ru/
# 2. Получите Client ID и Client Secret
# 3. Получите токен через OAuth flow или используйте токен разработчика
```

## API Endpoints

### GET /api/yandex-direct/campaigns

Получить список всех кампаний.

**Ответ:**
```json
{
  "success": true,
  "campaigns": [...],
  "summary": {
    "total": 10,
    "active": 5,
    "paused": 3,
    "archived": 2
  }
}
```

### POST /api/yandex-direct/campaigns/optimize

Оптимизировать кампании с помощью AI.

**Тело запроса (опционально):**
```json
{
  "campaignIds": [12345, 67890],  // опционально, если не указано - все активные
  "days": 7  // период статистики в днях
}
```

**Ответ:**
```json
{
  "success": true,
  "campaignsAnalyzed": 5,
  "dateFrom": "2024-11-24",
  "dateTo": "2024-12-01",
  "optimizations": [
    {
      "campaignId": 12345,
      "campaignName": "Название кампании",
      "score": 75,
      "summary": "Кампания работает хорошо...",
      "recommendations": ["Рекомендация 1", "Рекомендация 2"],
      "suggestedChanges": [
        {
          "type": "bid",
          "action": "Увеличить ставку на 20%",
          "reason": "Низкий CTR",
          "priority": "high"
        }
      ]
    }
  ]
}
```

### POST /api/yandex-direct/stats

Получить статистику по кампаниям.

**Тело запроса:**
```json
{
  "campaignIds": [12345, 67890],
  "dateFrom": "2024-11-24",
  "dateTo": "2024-12-01"
}
```

### POST /api/yandex-direct/auto-optimize

Автоматическая оптимизация всех активных кампаний (для cron).

**Query параметры:**
- `days=7` - период статистики (по умолчанию 7)
- `minScore=50` - оптимизировать только кампании с score < 50

**Заголовки (опционально):**
```
Authorization: Bearer ваш_секретный_ключ
```

## Автоматическая оптимизация по расписанию

### Вариант 1: Cron job на сервере

Добавьте в crontab:

```bash
# Оптимизация каждый день в 9:00
0 9 * * * curl -X POST https://grifun.ru/api/yandex-direct/auto-optimize?days=7 -H "Authorization: Bearer ваш_секретный_ключ"
```

### Вариант 2: Cloud Scheduler (GCP)

Создайте задачу в Cloud Scheduler, которая вызывает endpoint.

### Вариант 3: Внешний сервис (cron-job.org)

Настройте периодический вызов endpoint через внешний сервис.

## Использование в коде

```typescript
import { YandexDirectClient } from '@/lib/yandex-direct/client';
import { CampaignOptimizer } from '@/lib/yandex-direct/optimizer';

// Получить кампании
const client = new YandexDirectClient(accessToken, login);
const campaigns = await client.getCampaigns();

// Оптимизировать кампанию
const optimizer = new CampaignOptimizer();
const optimization = await optimizer.optimizeCampaign(campaign, stats);
```

## Логирование

Все операции логируются в консоль с префиксом `[Yandex Direct]`:

- `[Yandex Direct Client]` - операции клиента
- `[Yandex Direct Optimizer]` - AI-оптимизация
- `[Auto Optimize]` - автоматическая оптимизация

## Обработка ошибок

Модуль обрабатывает следующие ошибки:
- Отсутствие credentials
- Ошибки API Яндекс.Директа
- Ошибки OpenAI API
- Отсутствие статистики (для новых кампаний)

## Дальнейшее развитие

- [ ] Автоматическое применение рекомендуемых изменений
- [ ] Интеграция с базой данных для хранения истории
- [ ] Dashboard для визуализации оптимизаций
- [ ] A/B тестирование объявлений
- [ ] Автоматическое управление ставками






