#!/bin/bash
# Тестирование всех методов Yandex Direct API

BASE_URL="https://grifun.ru/api/yandex-direct"

echo "🧪 Тестирование Yandex Direct API"
echo "=================================="
echo ""

# 1. Получение списка кампаний
echo "1️⃣ Тест: Получение списка кампаний"
response=$(curl -s "$BASE_URL/campaigns")
status=$(echo "$response" | python3 -c "import sys, json; print(json.load(sys.stdin).get('success', False))" 2>/dev/null || echo "false")
if [ "$status" = "True" ]; then
    count=$(echo "$response" | python3 -c "import sys, json; print(len(json.load(sys.stdin).get('campaigns', [])))" 2>/dev/null || echo "0")
    echo "   ✅ Успешно. Кампаний: $count"
else
    echo "   ❌ Ошибка"
    echo "$response" | python3 -m json.tool 2>/dev/null | head -5
fi
echo ""

# 2. Получение статистики
echo "2️⃣ Тест: Получение статистики кампаний"
campaign_id=$(echo "$response" | python3 -c "import sys, json; campaigns = json.load(sys.stdin).get('campaigns', []); print(campaigns[0].get('Id') if campaigns else '')" 2>/dev/null)
if [ -n "$campaign_id" ]; then
    stats_response=$(curl -s -X POST "$BASE_URL/stats" \
        -H "Content-Type: application/json" \
        -d "{\"campaignIds\": [$campaign_id], \"dateFrom\": \"2024-12-01\", \"dateTo\": \"2024-12-04\"}")
    stats_success=$(echo "$stats_response" | python3 -c "import sys, json; data = json.load(sys.stdin); print('success' in data or 'stats' in data)" 2>/dev/null || echo "false")
    if [ "$stats_success" = "True" ]; then
        echo "   ✅ Успешно. Статистика получена"
    else
        echo "   ❌ Ошибка"
        echo "$stats_response" | python3 -m json.tool 2>/dev/null | head -5
    fi
else
    echo "   ⚠️ Пропущено (нет кампаний)"
fi
echo ""

# 3. Получение отчетов
echo "3️⃣ Тест: Получение отчетов оптимизации"
reports_response=$(curl -s "$BASE_URL/reports?latest=true")
reports_success=$(echo "$reports_response" | python3 -c "import sys, json; data = json.load(sys.stdin); print('success' in data or 'report' in data)" 2>/dev/null || echo "false")
if [ "$reports_success" = "True" ]; then
    echo "   ✅ Успешно. Отчеты получены"
else
    echo "   ⚠️ Отчетов нет (это нормально, если оптимизация еще не запускалась)"
fi
echo ""

# 4. Запуск оптимизации
echo "4️⃣ Тест: Запуск оптимизации (может занять время)"
optimize_response=$(curl -s -X POST "$BASE_URL/campaigns/optimize" \
    -H "Content-Type: application/json" \
    -d "{}")
optimize_success=$(echo "$optimize_response" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data.get('success', False))" 2>/dev/null || echo "false")
if [ "$optimize_success" = "True" ]; then
    echo "   ✅ Успешно. Оптимизация запущена"
else
    error_msg=$(echo "$optimize_response" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data.get('error', 'Unknown error'))" 2>/dev/null || echo "Unknown")
    echo "   ⚠️ Ошибка или предупреждение: $error_msg"
fi
echo ""

echo "=================================="
echo "✅ Тестирование завершено"






