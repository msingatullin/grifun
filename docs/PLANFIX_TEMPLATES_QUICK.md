# Быстрая инструкция: Шаблоны Planfix

## Что нужно сделать

1. **Создать шаблоны в Planfix** (6 штук):
   - Консультация: AI-аудит
   - Консультация: Proof of Concept
   - Консультация: Интеграции под ключ
   - Консультация: Поддержка 24/7
   - Консультация (общий)
   - Обратный звонок

2. **Получить ID каждого шаблона** (из URL или через API)

3. **Добавить в `.env.local`**:
```bash
PLANFIX_TEMPLATE_CONSULTATION_AI_AUDIT=12345
PLANFIX_TEMPLATE_CONSULTATION_POC=12346
PLANFIX_TEMPLATE_CONSULTATION_TURNKEY=12347
PLANFIX_TEMPLATE_CONSULTATION_SUPPORT=12348
PLANFIX_TEMPLATE_CONSULTATION=12349
PLANFIX_TEMPLATE_CALLBACK=12350
```

4. **Перезапустить сервис**: `sudo systemctl restart vibecoding`

## Как система выбирает шаблон

- **Консультация + AI-аудит** → `PLANFIX_TEMPLATE_CONSULTATION_AI_AUDIT`
- **Консультация + POC** → `PLANFIX_TEMPLATE_CONSULTATION_POC`
- **Консультация + Интеграции** → `PLANFIX_TEMPLATE_CONSULTATION_TURNKEY`
- **Консультация + Поддержка** → `PLANFIX_TEMPLATE_CONSULTATION_SUPPORT`
- **Консультация (без услуги)** → `PLANFIX_TEMPLATE_CONSULTATION`
- **Обратный звонок** → `PLANFIX_TEMPLATE_CALLBACK`

## Подробная инструкция

См. `docs/PLANFIX_TEMPLATES.md`

