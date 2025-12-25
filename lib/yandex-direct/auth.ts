/**
 * Утилиты для получения OAuth токена Яндекс.Директа
 */

export interface YandexDirectAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri?: string;
}

/**
 * Получение OAuth токена через Authorization Code Flow
 * 
 * Шаг 1: Получить authorization code
 * Откройте в браузере:
 * https://oauth.yandex.ru/authorize?response_type=code&client_id=YOUR_CLIENT_ID
 * 
 * Шаг 2: Обменять code на токен
 */
export async function getOAuthToken(
  clientId: string,
  clientSecret: string,
  authorizationCode: string
): Promise<{ access_token: string; expires_in: number }> {
  const response = await fetch('https://oauth.yandex.ru/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: authorizationCode,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get OAuth token: ${error}`);
  }

  return response.json();
}

/**
 * Генерация URL для авторизации
 */
export function getAuthorizationUrl(clientId: string, redirectUri?: string): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
  });

  if (redirectUri) {
    params.append('redirect_uri', redirectUri);
  }

  return `https://oauth.yandex.ru/authorize?${params.toString()}`;
}

/**
 * Инструкция по получению токена
 */
export function printAuthInstructions(clientId: string, clientSecret: string) {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║  Инструкция по получению OAuth токена Яндекс.Директа        ║
╚══════════════════════════════════════════════════════════════╝

1. Откройте в браузере URL авторизации:
   ${getAuthorizationUrl(clientId)}

2. Войдите в аккаунт Яндекс и разрешите доступ приложению

3. После авторизации вы будете перенаправлены на redirect_uri
   В URL будет параметр "code" - скопируйте его

4. Используйте полученный code для обмена на токен:
   
   curl -X POST https://oauth.yandex.ru/token \\
     -d "grant_type=authorization_code" \\
     -d "code=ВАШ_CODE" \\
     -d "client_id=${clientId}" \\
     -d "client_secret=${clientSecret}"

5. Сохраните полученный access_token в .env.local:
   YANDEX_DIRECT_ACCESS_TOKEN=ваш_access_token

6. Также укажите логин рекламодателя:
   YANDEX_DIRECT_LOGIN=ваш_логин_рекламодателя

═══════════════════════════════════════════════════════════════
`);
}






