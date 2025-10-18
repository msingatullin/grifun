#!/bin/bash

# Скрипт для деплоя лендинга ЛОтос на GCP Cloud Run

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Деплой лендинга ЛОтос на GCP Cloud Run${NC}"

# Проверяем наличие gcloud CLI
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ gcloud CLI не установлен. Установите Google Cloud SDK${NC}"
    exit 1
fi

# Проверяем авторизацию
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo -e "${YELLOW}⚠️  Необходима авторизация в gcloud${NC}"
    gcloud auth login
fi

# Получаем PROJECT_ID
PROJECT_ID=$(gcloud config get-value project)
if [ -z "$PROJECT_ID" ]; then
    echo -e "${RED}❌ PROJECT_ID не установлен. Установите проект:${NC}"
    echo "gcloud config set project YOUR_PROJECT_ID"
    exit 1
fi

echo -e "${GREEN}✅ Проект: $PROJECT_ID${NC}"

# Включаем необходимые API
echo -e "${BLUE}📋 Включаем необходимые API...${NC}"
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Устанавливаем регион
REGION="europe-central2"
echo -e "${GREEN}✅ Регион: $REGION${NC}"

# Собираем и деплоим
echo -e "${BLUE}🔨 Запускаем сборку и деплой...${NC}"
gcloud builds submit --config cloudbuild.yaml .

# Получаем URL сервиса
SERVICE_URL=$(gcloud run services describe lotos-landing --region=$REGION --format="value(status.url)")

echo -e "${GREEN}🎉 Деплой завершен!${NC}"
echo -e "${GREEN}🌐 URL: $SERVICE_URL${NC}"

# Открываем в браузере (если возможно)
if command -v xdg-open &> /dev/null; then
    echo -e "${BLUE}🌐 Открываем в браузере...${NC}"
    xdg-open "$SERVICE_URL"
elif command -v open &> /dev/null; then
    echo -e "${BLUE}🌐 Открываем в браузере...${NC}"
    open "$SERVICE_URL"
fi

echo -e "${GREEN}✅ Лендинг ЛОтос успешно развернут на GCP Cloud Run!${NC}"
