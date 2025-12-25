# Настройка Яндекс.Директа API

## Ваши данные приложения

- **ClientID**: `Oc7090eb0fb140b799538371de732a42`
- **Client Secret**: `65813929bf394de8aa528b07696fc034`
- **Redirect URI**: `https://oauth.yandex.ru/verification_code`

## Шаг 1: Получение OAuth токена

### ⚠️ Если получаете ошибку "Неизвестно приложение с таким client_id"

**Возможные причины:**
1. ClientID скопирован неправильно (проверьте, нет ли лишних пробелов)
2. Приложение не активировано в панели OAuth
3. Нужно использовать токен разработчика (для тестирования)

### Вариант A: Проверка и активация OAuth приложения

1. **Проверьте ClientID** - убедитесь, что скопировали полностью: `Oc7090eb0fb140b799538371de732a42`

2. **Проверьте статус приложения** на [https://oauth.yandex.ru/](https://oauth.yandex.ru/)
   - Убедитесь, что приложение активно
   - Проверьте, что права "Яндекс.Директ" включены

3. **Попробуйте URL с правильным форматом:**
   ```
   https://oauth.yandex.ru/authorize?response_type=code&client_id=Oc7090eb0fb140b799538371de732a42&force_confirm=yes
   ```

### Вариант B: Использование токена разработчика (для тестирования)

Если OAuth не работает, можно использовать токен разработчика:

1. **Войдите в Яндекс.Директ** → Настройки → API
2. **Создайте токен разработчика** (если еще нет)
3. **Используйте этот токен** как `YANDEX_DIRECT_ACCESS_TOKEN`

**Ограничения токена разработчика:**
- Работает только с тестовыми кампаниями
- Ограниченный функционал
- Для продакшена нужен OAuth токен

### Вариант C: Получение OAuth токена через Яндекс ID

1. **Откройте:**
   ```
   https://oauth.yandex.ru/authorize?response_type=code&client_id=Oc7090eb0fb140b799538371de732a42
   ```

2. **Если видите ошибку 400:**
   - Проверьте, что ClientID правильный (без пробелов)
   - Убедитесь, что приложение создано в том же аккаунте Яндекс
   - Попробуйте войти в аккаунт, где создавали приложение

3. **После успешной авторизации** обменяйте code на токен:
   ```bash
   curl -X POST https://oauth.yandex.ru/token \
     -d "grant_type=authorization_code" \
     -d "code=ВАШ_CODE" \
     -d "client_id=Oc7090eb0fb140b799538371de732a42" \
     -d "client_secret=65813929bf394de8aa528b07696fc034"
   ```

## Шаг 2: Настройка .env.local

Добавьте в `/home/mikhail/vibecoding_www/.env.local`:

```bash
# Яндекс.Директ API
YANDEX_DIRECT_ACCESS_TOKEN=ваш_access_token_из_шага_1
YANDEX_DIRECT_LOGIN=ваш_логин_рекламодателя

# OpenAI (уже должен быть)
OPENAI_API_KEY=ваш_ключ_openai

# Telegram (уже должен быть)
TELEGRAM_BOT_TOKEN=ваш_токен_бота
TELEGRAM_CHAT_ID=ваш_chat_id

# Опционально: секретный ключ для auto-optimize
AUTO_OPTIMIZE_SECRET=ваш_секретный_ключ
```

**Важно:** 
- `YANDEX_DIRECT_LOGIN` - это логин рекламодателя в Яндекс.Директе (например, `mycompany-direct`)
- Токен действителен ограниченное время, после истечения нужно получить новый

## Шаг 3: Перезапуск сервиса

После добавления переменных окружения:

```bash
sudo systemctl restart vibecoding
```

## Шаг 4: Проверка работы

Проверьте, что API работает:

```bash
# Получить список кампаний
curl https://grifun.ru/api/yandex-direct/campaigns

# Оптимизировать кампании
curl -X POST https://grifun.ru/api/yandex-direct/campaigns/optimize \
  -H "Content-Type: application/json" \
  -d '{"days": 7}'
```

## Автоматическая оптимизация

Настройте cron для ежедневной оптимизации:

```bash
# Добавьте в crontab (crontab -e)
0 9 * * * curl -X POST https://grifun.ru/api/yandex-direct/auto-optimize?days=7 \
  -H "Authorization: Bearer ваш_секретный_ключ"
```

## Полезные ссылки

- [Документация API Яндекс.Директа](https://yandex.ru/dev/direct/doc/ru/concepts/overview)
- [OAuth Яндекс](https://oauth.yandex.ru/)

