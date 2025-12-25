# Разница между токенами и ключами

## Токены и ключи в системе

### 1. YANDEX_DIRECT_ACCESS_TOKEN (обязательно)
**Что это:** OAuth токен для доступа к API Яндекс.Директа

**Где используется:** 
- Для всех запросов к API Яндекс.Директа
- Получение кампаний, статистики, обновление настроек

**Где получить:**
- Через OAuth авторизацию Яндекс
- Или токен разработчика в настройках Яндекс.Директа

**Пример:**
```bash
YANDEX_DIRECT_ACCESS_TOKEN=AQAAAAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### 2. YANDEX_DIRECT_LOGIN (обязательно)
**Что это:** Логин рекламодателя в Яндекс.Директе

**Где используется:**
- В заголовке `Client-Login` при запросах к API
- Идентифицирует аккаунт рекламодателя

**Пример:**
```bash
YANDEX_DIRECT_LOGIN=mycompany-direct
```

---

### 3. AUTO_OPTIMIZE_SECRET (опционально)
**Что это:** Секретный ключ для защиты endpoint `/api/yandex-direct/auto-optimize`

**Зачем нужен:**
- Защита от несанкционированных вызовов автоматической оптимизации
- Предотвращение случайных или злонамеренных запросов
- Используется только для endpoint `auto-optimize` (cron задачи)

**Где используется:**
- В заголовке `Authorization: Bearer ваш_секретный_ключ`
- Проверяется только в `/api/yandex-direct/auto-optimize`

**Как создать:**
```bash
# Сгенерируйте случайный ключ
openssl rand -hex 32

# Или используйте любой сложный пароль
# Например: my-super-secret-key-2024-xyz123
```

**Пример:**
```bash
AUTO_OPTIMIZE_SECRET=my-super-secret-key-2024-xyz123
```

**Использование в cron:**
```bash
curl -X POST https://grifun.ru/api/yandex-direct/auto-optimize?days=7 \
  -H "Authorization: Bearer my-super-secret-key-2024-xyz123"
```

---

## Важно!

- **YANDEX_DIRECT_ACCESS_TOKEN** - это токен Яндекс.Директа (у вас уже есть)
- **AUTO_OPTIMIZE_SECRET** - это ваш собственный секретный ключ для защиты (можно создать любой)

Если не установить `AUTO_OPTIMIZE_SECRET`, endpoint `auto-optimize` будет работать без защиты (любой сможет вызвать его).

---

## Рекомендация

Создайте секретный ключ и добавьте в `.env.local`:

```bash
# Сгенерируйте ключ
openssl rand -hex 32

# Добавьте в .env.local
AUTO_OPTIMIZE_SECRET=сгенерированный_ключ
```

Затем перезапустите сервис:
```bash
sudo systemctl restart vibecoding
```

И используйте этот ключ в cron:
```bash
0 9 * * * curl -X POST https://grifun.ru/api/yandex-direct/auto-optimize?days=7 \
  -H "Authorization: Bearer сгенерированный_ключ"
```






