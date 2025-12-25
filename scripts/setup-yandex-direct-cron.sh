#!/bin/bash
# Скрипт для настройки автоматической оптимизации через cron

SECRET_KEY="1a7b507793112040355a6e9a84863e8d0a4031b2ec747eca28f77acb15d3feb4"
CRON_CMD="0 9 * * * curl -X POST https://grifun.ru/api/yandex-direct/auto-optimize?days=7 -H 'Authorization: Bearer ${SECRET_KEY}' > /dev/null 2>&1"

# Проверяем, есть ли уже такая задача
if crontab -l 2>/dev/null | grep -q "yandex-direct/auto-optimize"; then
  echo "⚠️  Cron задача уже существует"
  echo "Текущие задачи:"
  crontab -l | grep "yandex-direct"
else
  # Добавляем задачу
  (crontab -l 2>/dev/null; echo "$CRON_CMD") | crontab -
  echo "✅ Cron задача добавлена: ежедневная оптимизация в 9:00"
  echo ""
  echo "Текущие задачи cron:"
  crontab -l
fi

echo ""
echo "Для удаления задачи используйте: crontab -e"

