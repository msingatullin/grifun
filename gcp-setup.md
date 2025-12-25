# 🚀 Деплой лендинга ЛОтос на Google Cloud Platform

## 📋 Предварительные требования

1. **Google Cloud Account** с активной подпиской
2. **Google Cloud SDK** установлен локально
3. **Docker** (опционально, для локальной сборки)

## 🛠️ Настройка GCP

### 1. Создание проекта
```bash
# Создать новый проект
gcloud projects create lotos-landing-project --name="ЛОтос Лендинг"

# Установить проект по умолчанию
gcloud config set project lotos-landing-project
```

### 2. Включение API
```bash
# Включить необходимые API
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 3. Настройка биллинга
- Перейти в [Google Cloud Console](https://console.cloud.google.com/)
- Выбрать проект
- Включить биллинг в разделе "Billing"

## 🚀 Деплой

### Автоматический деплой
```bash
# Запустить скрипт деплоя
./deploy.sh
```

### Ручной деплой
```bash
# 1. Сборка и деплой через Cloud Build
gcloud builds submit --config cloudbuild.yaml .

# 2. Проверка статуса
gcloud run services list --region=europe-central2

# 3. Получение URL
gcloud run services describe lotos-landing --region=europe-central2 --format="value(status.url)"
```

## ⚙️ Конфигурация

### Переменные окружения
Создать в Cloud Run:
```bash
gcloud run services update lotos-landing \
  --region=europe-central2 \
  --set-env-vars="NODE_ENV=production,OPENAI_API_KEY=your_key,RESEND_API_KEY=your_key"
```

### Домен (опционально)
```bash
# Настроить кастомный домен
gcloud run domain-mappings create \
  --service=lotos-landing \
  --domain=lotos-ryazan.ru \
  --region=europe-central2
```

## 📊 Мониторинг

### Логи
```bash
# Просмотр логов
gcloud logs read "resource.type=cloud_run_revision AND resource.labels.service_name=lotos-landing" --limit=50
```

### Метрики
- Перейти в [Cloud Monitoring](https://console.cloud.google.com/monitoring)
- Выбрать сервис `lotos-landing`

## 💰 Стоимость

**Cloud Run** (pay-per-use):
- CPU: $0.00002400 за vCPU-секунду
- Memory: $0.00000250 за GB-секунду
- Requests: $0.40 за миллион запросов

**Container Registry**:
- Storage: $0.026 за GB в месяц
- Network: $0.12 за GB

**Ожидаемая стоимость**: ~$5-15/месяц для небольшого трафика

## 🔧 Управление

### Обновление
```bash
# Пересобрать и обновить
gcloud builds submit --config cloudbuild.yaml .
```

### Масштабирование
```bash
# Увеличить лимиты
gcloud run services update lotos-landing \
  --region=europe-central2 \
  --max-instances=20 \
  --memory=2Gi \
  --cpu=2
```

### Удаление
```bash
# Удалить сервис
gcloud run services delete lotos-landing --region=europe-central2

# Удалить образы
gcloud container images delete gcr.io/PROJECT_ID/lotos-landing --force-delete-tags
```

## 🛡️ Безопасность

### IAM роли
```bash
# Создать service account для CI/CD
gcloud iam service-accounts create lotos-deploy \
  --display-name="ЛОтос Deploy Service Account"

# Назначить роли
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:lotos-deploy@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:lotos-deploy@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/cloudbuild.builds.builder"
```

### SSL сертификаты
- Автоматически управляются Google Cloud
- Поддержка HTTPS из коробки

## 📈 Производительность

### Оптимизации
- ✅ Standalone build для минимального размера
- ✅ Оптимизированные изображения
- ✅ Code splitting
- ✅ CDN через Google Cloud

### Мониторинг
- Google Cloud Monitoring
- Real User Monitoring (RUM)
- Performance Insights

## 🔄 CI/CD

### GitHub Actions (опционально)
```yaml
name: Deploy to GCP
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: google-github-actions/setup-gcloud@v0
      - run: gcloud builds submit --config cloudbuild.yaml .
```

## 📞 Поддержка

При возникновении проблем:
1. Проверить логи в Cloud Console
2. Убедиться в корректности переменных окружения
3. Проверить квоты и лимиты проекта
4. Обратиться в [Google Cloud Support](https://cloud.google.com/support)
