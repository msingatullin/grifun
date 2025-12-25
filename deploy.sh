#!/bin/bash
set -euo pipefail

echo "=== Развертывание grifun.ru ==="

# 1) Установки
echo "1. Обновление пакетов и установка nginx/certbot..."
sudo apt-get update
sudo apt-get install -y nginx certbot python3-certbot-nginx

# 2) Проверка/создание .env.local
ENV_FILE="/home/mikhail/vibecoding_www/.env.local"
if [ ! -f "$ENV_FILE" ]; then
  echo ""
  echo "⚠️  .env.local не найден!"
  echo "Введите значения:"
  read -p "TELEGRAM_BOT_TOKEN: " TELEGRAM_BOT_TOKEN
  read -p "TELEGRAM_CHAT_ID: " TELEGRAM_CHAT_ID
  
  cat > "$ENV_FILE" <<EOF
TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
TELEGRAM_CHAT_ID=${TELEGRAM_CHAT_ID}
EOF
  chmod 600 "$ENV_FILE"
  echo "✅ .env.local создан"
else
  echo "✅ .env.local найден"
fi

# 3) Сборка проекта
echo ""
echo "2. Сборка проекта..."
cd /home/mikhail/vibecoding_www
npm install
npm run build

# 4) systemd сервис
echo ""
echo "3. Настройка systemd сервиса..."
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
echo ""
echo "4. Настройка nginx..."
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

# 6) HTTPS
echo ""
echo "5. Выпуск SSL сертификата..."
echo "Введите email для certbot:"
read -p "Email: " CERT_EMAIL
sudo certbot --nginx -d grifun.ru -d www.grifun.ru --agree-tos --no-eff-email -m "$CERT_EMAIL" --redirect

# 7) Проверка
echo ""
echo "6. Проверка статуса..."
echo "=== Статус сервиса ==="
systemctl status vibecoding --no-pager || true

echo ""
echo "=== Проверка локального подключения ==="
curl -I http://localhost:3000 2>&1 | head -3 || echo "⚠️  Локальный сервис не отвечает"

echo ""
echo "✅ Развертывание завершено!"
echo "Проверьте:"
echo "  - https://grifun.ru"
echo "  - https://www.grifun.ru"
echo "  - Отправка формы должна работать"










