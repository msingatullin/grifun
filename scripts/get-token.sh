#!/bin/bash
# Простой скрипт для получения OAuth токена через curl

CLIENT_ID="Oc7090eb0fb140b799538371de732a42"
CLIENT_SECRET="65813929bf394de8aa528b07696fc034"

echo "═══════════════════════════════════════════════════════════════"
echo "  Получение OAuth токена Яндекс.Директа"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "1. Откройте в браузере:"
echo "   https://oauth.yandex.ru/authorize?response_type=code&client_id=${CLIENT_ID}"
echo ""
echo "2. Войдите в аккаунт и разрешите доступ"
echo ""
echo "3. После авторизации скопируйте 'code' из URL"
echo ""
read -p "Введите authorization code: " CODE

if [ -z "$CODE" ]; then
  echo "❌ Code не может быть пустым"
  exit 1
fi

echo ""
echo "🔄 Обмениваю code на токен..."
echo ""

RESPONSE=$(curl -s -X POST https://oauth.yandex.ru/token \
  -d "grant_type=authorization_code" \
  -d "code=${CODE}" \
  -d "client_id=${CLIENT_ID}" \
  -d "client_secret=${CLIENT_SECRET}")

ACCESS_TOKEN=$(echo $RESPONSE | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$ACCESS_TOKEN" ]; then
  echo "❌ Ошибка при получении токена:"
  echo "$RESPONSE"
  exit 1
fi

echo "✅ Токен успешно получен!"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "Добавьте в .env.local:"
echo "═══════════════════════════════════════════════════════════════"
echo "YANDEX_DIRECT_ACCESS_TOKEN=${ACCESS_TOKEN}"
echo "YANDEX_DIRECT_LOGIN=ваш_логин_рекламодателя"
echo "═══════════════════════════════════════════════════════════════"
echo ""






