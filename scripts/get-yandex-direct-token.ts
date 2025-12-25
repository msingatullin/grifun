#!/usr/bin/env ts-node
/**
 * Скрипт для получения OAuth токена Яндекс.Директа
 * 
 * Использование:
 *   npx ts-node scripts/get-yandex-direct-token.ts
 * 
 * Или после компиляции:
 *   node scripts/get-yandex-direct-token.js
 */

import { getAuthorizationUrl, getOAuthToken, printAuthInstructions } from '../lib/yandex-direct/auth';
import * as readline from 'readline';

const CLIENT_ID = 'Oc7090eb0fb140b799538371de732a42';
const CLIENT_SECRET = '65813929bf394de8aa528b07696fc034';

async function main() {
  console.log('\n🔐 Получение OAuth токена для Яндекс.Директа\n');

  // Показываем инструкцию
  printAuthInstructions(CLIENT_ID, CLIENT_SECRET);

  // Спрашиваем authorization code
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const code = await new Promise<string>((resolve) => {
    rl.question('Введите authorization code из URL после авторизации: ', (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });

  if (!code) {
    console.error('❌ Code не может быть пустым');
    process.exit(1);
  }

  try {
    console.log('\n🔄 Обмениваю code на токен...\n');
    const tokenData = await getOAuthToken(CLIENT_ID, CLIENT_SECRET, code);

    console.log('✅ Токен успешно получен!\n');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('Добавьте в .env.local:');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`YANDEX_DIRECT_ACCESS_TOKEN=${tokenData.access_token}`);
    console.log(`YANDEX_DIRECT_LOGIN=ваш_логин_рекламодателя`);
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`\nТокен действителен: ${tokenData.expires_in} секунд`);
    console.log(`Истекает через: ${Math.floor(tokenData.expires_in / 3600)} часов\n`);
  } catch (error) {
    console.error('❌ Ошибка при получении токена:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}






