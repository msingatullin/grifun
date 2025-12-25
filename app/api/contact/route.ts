import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { getPlanfixTemplate } from "@/lib/planfix/templates";

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  telegram?: string;
  task?: string;
  service?: string;
  niche?: string;
  teamSize?: string;
  manualWork?: string;
  type?: "consultation" | "callback" | "ai-check";
};

export async function POST(request: Request) {
  try {
    const { name, company, email, phone, telegram, task, service, type, niche, teamSize, manualWork } =
      (await request.json()) as ContactPayload;

    // 1. Validation
    if (!name) {
      return NextResponse.json(
        { error: "Укажите имя" },
        { status: 400 }
      );
    }

    if (!email && !phone && !telegram) {
      return NextResponse.json(
        { error: "Укажите email, телефон или Telegram" },
        { status: 400 }
      );
    }

    // 2. Check Planfix API configuration
    const planfixAccount = process.env.PLANFIX_ACCOUNT?.trim();
    const planfixApiKey = process.env.PLANFIX_API_KEY?.trim();
    const planfixProjectId = process.env.PLANFIX_PROJECT_ID?.trim(); // Опционально: ID проекта
    
    // Получаем ID шаблона в зависимости от типа заявки и услуги
    const normalizedType = type === "ai-check" ? "consultation" : (type || "consultation");
    const planfixTemplateId = getPlanfixTemplate(normalizedType as "consultation" | "callback", service as any);

      console.log("[CONTACT] Debug - Account:", planfixAccount ? "SET" : "NOT SET", "Key:", planfixApiKey ? "SET" : "NOT SET");
      console.log("[CONTACT] ⚠️ ВАЖНО: Проверьте, что токен имеет scope 'task_add' в настройках Planfix!");
      console.log("[CONTACT] Настройки: Управление аккаунтом → Доступ к API → REST API → Ваш токен → Scope");

    if (!planfixAccount || !planfixApiKey) {
      console.error("[CONTACT] Planfix API credentials not configured", {
        account: planfixAccount,
        key: planfixApiKey ? "present" : "missing"
      });
      return NextResponse.json(
        { error: "CRM не настроена. Обратитесь к администратору." },
        { status: 500 }
      );
    }

    // 3. Send to Planfix via REST API
    const contactInfo = email || telegram || phone || "без контакта";
    console.log(`[CONTACT] Sending lead to Planfix API: ${contactInfo} (${name})`);

    try {
      // Формируем название задачи
      const requestType = type === "ai-check" 
        ? "Проверка применимости AI" 
        : (type === "callback" ? "Обратный звонок" : "Консультация");
      const taskTitle = type === "ai-check"
        ? `Проверка применимости AI: ${name}${company ? ` (${company})` : ""}`
        : `${requestType} с сайта: ${name}${company ? ` (${company})` : ""}`;
      
      // Формируем описание задачи с данными заявки
      let taskDescription: string;
      if (type === "ai-check" && (niche || teamSize || manualWork)) {
        taskDescription = `Тип заявки: ${requestType}
Имя: ${name}
${company ? `Компания: ${company}\n` : ""}${email || telegram ? `Email: ${email || telegram}\n` : ""}${phone || telegram ? `Телефон: ${phone || telegram}\n` : ""}
Проверка применимости AI:
${niche ? `Ниша: ${niche}\n` : ""}${teamSize ? `Команда: ${teamSize}\n` : ""}${manualWork ? `Ручная работа: ${manualWork}\n` : ""}${task ? `\nДополнительно:\n${task}` : ""}`;
      } else {
        taskDescription = `Новая заявка с сайта

Тип заявки: ${requestType}
Имя: ${name}
${company ? `Компания: ${company}\n` : ""}${email || telegram ? `Email: ${email || telegram}\n` : ""}${phone || telegram ? `Телефон: ${phone || telegram}\n` : ""}${service ? `Интересующая услуга: ${service}\n` : ""}${task ? `\nЗадача:\n${task}` : ""}`;
      }

      // Planfix REST API endpoint
      // Согласно документации: POST /task для создания задачи
      // Токен должен иметь scope: task_add
      // Спецификация: https://help.planfix.com/restapidocs/
      const planfixUrl = `https://${planfixAccount}.planfix.ru/rest/task`;
      
      // Формируем тело запроса для Planfix API
      // ВАЖНО: поле называется 'name', а не 'title'!
      const requestBody: Record<string, any> = {
        name: taskTitle,
        description: taskDescription,
      };

      // Добавляем проект, если указан
      if (planfixProjectId) {
        requestBody.project = planfixProjectId;
      }

      // Добавляем шаблон задачи, если указан
      if (planfixTemplateId) {
        requestBody.template = planfixTemplateId;
        console.log(`[CONTACT] Template selected: ${type || "consultation"}${service ? `-${service}` : ""} (ID: ${planfixTemplateId})`);
      } else {
        console.log(`[CONTACT] No template found for: ${type || "consultation"}${service ? `-${service}` : ""}`);
      }

      // Authorization через Bearer токен
      // Токен должен иметь scope: task_add (проверьте в настройках Planfix)
      const planfixResponse = await fetch(planfixUrl, {
            method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${planfixApiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      const responseText = await planfixResponse.text();
      let planfixData;
      try {
        planfixData = JSON.parse(responseText);
      } catch {
        planfixData = { raw: responseText };
      }

      // 4. Сохранение заявки в файл (резервная копия)
      const leadData = {
        timestamp: new Date().toISOString(),
        type: type || "consultation",
        name,
        company,
        email,
        phone,
        service,
        task,
        planfix_status: planfixResponse.status,
        planfix_response: planfixData,
        planfix_success: planfixResponse.ok,
      };

      try {
        const leadsDir = join(process.cwd(), "data", "leads");
        await mkdir(leadsDir, { recursive: true });
        const contactId = (email || telegram || phone || name || "unknown").replace(/[^a-z0-9]/gi, "_");
        const filename = `lead_${Date.now()}_${contactId}.json`;
        await writeFile(join(leadsDir, filename), JSON.stringify(leadData, null, 2));
        console.log(`[CONTACT] 💾 Lead saved to file: ${filename}`);
      } catch (fileError) {
        console.error("[CONTACT] Failed to save lead to file:", fileError);
      }

      // 5. Logging - ВСЕГДА логируем, даже при ошибках
      console.log(JSON.stringify(leadData, null, 2));

      // ВСЕГДА возвращаем успех пользователю, чтобы не терять заявки
      // Ошибки логируются в консоль для анализа
      if (!planfixResponse.ok) {
        console.error("[CONTACT] ⚠️ Planfix API error (but returning success to user):", responseText);
    } else {
        console.log(`[CONTACT] ✅ Successfully sent to Planfix API`, planfixData);
      }

      return NextResponse.json({
        ok: true,
        message: "Заявка успешно отправлена",
      });
    } catch (error) {
      // Даже при исключении логируем и возвращаем успех
      console.error("[CONTACT] ⚠️ Exception (but returning success to user):", error);
      
      const errorLeadData = {
      timestamp: new Date().toISOString(),
        type: type || "consultation",
      name,
      company,
      email,
        phone,
        service,
      task,
        error: error instanceof Error ? error.message : String(error),
        saved_locally: true,
      };

      // Сохраняем заявку в файл даже при ошибке API
      try {
        const leadsDir = join(process.cwd(), "data", "leads");
        await mkdir(leadsDir, { recursive: true });
        const contactId = (email || telegram || phone || name || "unknown").replace(/[^a-z0-9]/gi, "_");
        const filename = `lead_${Date.now()}_${contactId}_error.json`;
        await writeFile(join(leadsDir, filename), JSON.stringify(errorLeadData, null, 2));
        console.log(`[CONTACT] 💾 Lead saved to file (error): ${filename}`);
      } catch (fileError) {
        console.error("[CONTACT] Failed to save lead to file:", fileError);
      }

      console.log(JSON.stringify(errorLeadData, null, 2));
      
      // ВСЕГДА возвращаем успех, чтобы не терять заявки
    return NextResponse.json({
      ok: true,
        message: "Заявка получена",
    });
    }
  } catch (error) {
    console.error("[CONTACT] Unexpected error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
