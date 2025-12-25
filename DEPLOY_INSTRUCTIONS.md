# Инструкция по развертыванию grifun.ru

## Подготовка

1. Подключитесь к серверу:
```bash
ssh mikhail@34.116.227.229
```

2. Скопируйте скрипт на сервер (с вашей машины):
```bash
scp /home/mikhail/vibecoding_www/deploy.sh mikhail@34.116.227.229:/home/mikhail/
```

Или создайте скрипт прямо на сервере (см. ниже).

## Выполнение развертывания

### Вариант A: Использовать готовый скрипт

На сервере выполните:
```bash
chmod +x /home/mikhail/deploy.sh
bash /home/mikhail/deploy.sh
```

Скрипт интерактивно запросит:
- TELEGRAM_BOT_TOKEN
- TELEGRAM_CHAT_ID  
- Email для certbot

### Вариант B: Выполнить команды вручную

Выполните на сервере следующие команды:

```bash
set -euo pipefail

# 1) Установки
sudo apt-get update
sudo apt-get install -y nginx certbot python3-certbot-nginx

# 2) Создание .env.local (введите ваши значения)
cat > /home/mikhail/vibecoding_www/.env.local <<'EOF'
TELEGRAM_BOT_TOKEN=ВАШ_ТОКЕН_ЗДЕСЬ
TELEGRAM_CHAT_ID=ВАШ_CHAT_ID_ЗДЕСЬ
EOF
chmod 600 /home/mikhail/vibecoding_www/.env.local

# 3) Сборка проекта
cd /home/mikhail/vibecoding_www
npm install
npm run build

# 4) systemd сервис
sudo tee /etc/systemd/system/vibecoding.service >/dev/null <<'SERVICE'
[Unit]
Description=Next.js grifun.ru
After=network.target

[Service]
Type=simple
User=mikhail
Group=mikhail
WorkingDirectory=/home/mikhail/vibecoding_www
Environment=NODE_ENV=production
EnvironmentFile=/home/mikhail/vibecoding_www/.env.local
ExecStart=/usr/bin/npm run start -- --hostname 127.0.0.1 --port 3000
Restart=always

[Install]
WantedBy=multi-user.target
SERVICE

sudo systemctl daemon-reload
sudo systemctl enable vibecoding
sudo systemctl restart vibecoding

# 5) nginx конфиг
sudo tee /etc/nginx/sites-available/grifun.ru >/dev/null <<'NGINX'
server {
  listen 80;
  server_name grifun.ru www.grifun.ru;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
NGINX

sudo ln -sf /etc/nginx/sites-available/grifun.ru /etc/nginx/sites-enabled/grifun.ru
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

# 6) HTTPS (замените email на свой)
sudo certbot --nginx -d grifun.ru -d www.grifun.ru --agree-tos --no-eff-email -m admin@grifun.ru --redirect

# 7) Проверка
systemctl status vibecoding --no-pager
curl -I http://localhost:3000
```

## Проверка после развертывания

1. Статус сервиса:
```bash
systemctl status vibecoding
```

2. Проверка сайта:
```bash
curl -I https://grifun.ru
curl -I https://www.grifun.ru
```

3. Тест отправки формы на сайте - должно прийти сообщение в Telegram.

## Логи

Просмотр логов сервиса:
```bash
journalctl -u vibecoding -f
```

Логи nginx:
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```


# Role
Backend Developer & AI Engineer.

# Task
Create a robust lead processing API route in Next.js (`app/api/contact/route.ts`) that filters spam using OpenAI/Anthropic and sends valid leads to Telegram.

# Workflow
1. **Validation**: Check if fields (name, email, task) are present.
2. **AI Qualification (The Core)**:
   - Use OpenAI `gpt-4o-mini` (it's cheap and fast).
   - Prompt the AI to analyze the user's message ("Task").
   - AI must output a JSON object: `{ "score": number (0-100), "summary": string, "is_spam": boolean, "suggested_reply": string }`.
   - Criteria:
     - Gibberish (e.g., "asdf", "оролр") -> Score 0, is_spam: true.
     - Solicitation/Ads -> Score 0, is_spam: true.
     - Real business request -> Score 70-100.
     - Vague but real -> Score 40-60.
3. **Telegram Notification**:
   - IF `is_spam` is false OR `score` > 30:
     - Send a structured message to my Telegram Chat via Bot API.
     - Format:
       🔥 **NEW LEAD** (Score: {score}/100)
       👤 **Name:** {name}
       🏢 **Company:** {company}
       📧 **Email:** {email}
       📝 **Task:** {task}
       🤖 **AI Analysis:** {summary}
       💡 **Suggested Reply:** {suggested_reply}
4. **Database/Logging**:
   - For now, just `console.log` the result (I will add DB later).

# Environment Variables needed
- `OPENAI_API_KEY`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

# Tech Stack
- Next.js 14 App Router (Route Handlers)
- `openai` npm package
- standard `fetch` for Telegram

Please write the code for `route.ts` and the system prompt for the AI qualifier.







