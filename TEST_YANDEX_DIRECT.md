# Тестирование модуля Яндекс.Директа

## Шаг 1: Проверка переменных окружения

Убедитесь, что в `.env.local` есть:

```bash
YANDEX_DIRECT_ACCESS_TOKEN=ваш_токен
YANDEX_DIRECT_LOGIN=ваш_логин_рекламодателя
OPENAI_API_KEY=ваш_ключ_openai
```

## Шаг 2: Перезапуск сервиса

```bash
sudo systemctl restart vibecoding
```

## Шаг 3: Тестирование API

### 3.1. Получить список кампаний

```bash
curl https://grifun.ru/api/yandex-direct/campaigns
```

**Ожидаемый ответ:**
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

### 3.2. Оптимизировать кампании

```bash
curl -X POST https://grifun.ru/api/yandex-direct/campaigns/optimize \
  -H "Content-Type: application/json" \
  -d '{"days": 7}'
```

**Ожидаемый ответ:**
```json
{
  "success": true,
  "campaignsAnalyzed": 5,
  "dateFrom": "2024-11-27",
  "dateTo": "2024-12-04",
  "optimizations": [
    {
      "campaignId": 12345,
      "campaignName": "Название кампании",
      "score": 75,
      "summary": "Анализ кампании...",
      "recommendations": ["Рекомендация 1", "Рекомендация 2"],
      "suggestedChanges": [...]
    }
  ]
}
```

### 3.3. Получить статистику

```bash
curl -X POST https://grifun.ru/api/yandex-direct/stats \
  -H "Content-Type: application/json" \
  -d '{
    "campaignIds": [12345, 67890],
    "dateFrom": "2024-11-27",
    "dateTo": "2024-12-04"
  }'
```

## Шаг 4: Проверка логов

Если что-то не работает, проверьте логи:

```bash
# Логи сервиса
sudo journalctl -u vibecoding -n 50 --no-pager

# Или в реальном времени
sudo journalctl -u vibecoding -f
```

## Возможные ошибки

### Ошибка: "Yandex Direct credentials not configured"
- Проверьте, что переменные добавлены в `.env.local`
- Перезапустите сервис: `sudo systemctl restart vibecoding`

### Ошибка: "API Error: Invalid token"
- Токен истек или неверный
- Получите новый токен и обновите `.env.local`

### Ошибка: "Failed to get campaigns"
- Проверьте логин рекламодателя (`YANDEX_DIRECT_LOGIN`)
- Убедитесь, что токен имеет права доступа к API

## Автоматическая оптимизация

После успешного тестирования настройте автоматическую оптимизацию:

```bash
# Добавьте в crontab (crontab -e)
0 9 * * * curl -X POST https://grifun.ru/api/yandex-direct/auto-optimize?days=7 \
  -H "Authorization: Bearer ваш_секретный_ключ"
```

Или используйте Cloud Scheduler в GCP для ежедневной оптимизации.






