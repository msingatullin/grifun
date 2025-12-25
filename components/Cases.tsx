"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, Briefcase, Workflow, ArrowRight, Target, Lightbulb, TrendingUp } from "lucide-react";

export default function Cases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const caseStudies = [
    {
      title: "Типовой сценарий: AI-бот поддержки для e-commerce",
      industry: "Поддержка 24/7",
      icon: Bot,
      gradient: "from-accent-blue to-accent-indigo",
      context: "Компании с 500-1000+ обращений в день в поддержку часто сталкиваются с перегрузкой операторов и долгим временем ответа клиентам.",
      task: "Операторы не успевают отвечать на однотипные вопросы, среднее время ответа — несколько часов. Клиенты жалуются на долгое ожидание и уходят к конкурентам, которые отвечают быстрее.",
      solution:
        "AI-бот с RAG (Retrieval-Augmented Generation) по базе знаний компании отвечает на типовые вопросы. Сложные запросы автоматически эскалаются операторам. Интеграция с CRM для логирования диалогов и улучшения ответов.",
      expectedEffect: "В типичных проектах это может приводить к: снижению нагрузки на операторов на 40-70%, сокращению времени ответа до 30-60 секунд, увеличению обработанных запросов на 30-50%. Обычно дает эффект окупаемости 1-3 месяца при объёме 500+ обращений/день. Примерные результаты зависят от специфики процессов.",
      stack: "LLM (GPT-4/Claude) | RAG | CRM API | Helpdesk интеграция",
      tags: ["RAG по базе знаний", "Автоответы 24/7", "Эскалация к операторам"],
      deploymentTime: "6-8 недель",
      link: "/blog/ai-bot-ecommerce-support",
    },
    {
      title: "Типовой сценарий: AI SDR для B2B SaaS",
      industry: "Продажи",
      icon: Briefcase,
      gradient: "from-accent-indigo to-accent-purple",
      context: "В B2B SaaS-компаниях с высоким потоком входящих заявок эта проблема встречается часто: потеря лидов из-за медленного первого контакта.",
      task: "Отдел продаж не успевает обрабатывать входящие заявки быстро. Среднее время первого контакта — несколько часов. Лиды теряются, так как конкуренты отвечают быстрее. Это тормозит рост выручки — потеря потенциальных продаж может составлять 15-25%.",
      solution:
        "AI-агент квалифицирует входящие заявки, задаёт уточняющие вопросы, автоматически бронирует демо в календаре команды и синхронизирует данные с CRM. Сложные кейсы передаются менеджерам с контекстом.",
      expectedEffect: "В типичном сценарии это может приводить к: сокращению времени первого контакта до 30-60 секунд, увеличению количества квалифицированных лидов на 25-40%, росту конверсии в демо на 20-30%. Обычно дает эффект высвобождения времени команды для закрытия сделок. Примерные результаты окупаемости — 1-2 месяца при объёме 50+ заявок/месяц.",
      stack: "LLM-агент | Calendly/Cal.com API | CRM (HubSpot/Salesforce) | Webhooks",
      tags: ["Квалификация лидов", "Назначение встреч", "CRM-синхронизация"],
      deploymentTime: "3-5 недель",
      link: "/blog/ai-sdr-b2b-saas",
    },
    {
      title: "Типовой сценарий: Обработка документов в логистике",
      industry: "Операции",
      icon: Workflow,
      gradient: "from-accent-purple to-accent-blue",
      context: "В компаниях с большим документооборотом (накладные, акты, счета) эта проблема встречается часто: значительные затраты времени сотрудников на ручной ввод данных.",
      task: "Сотрудники тратят несколько часов в день на ручной ввод данных из документов в систему. Ошибки в данных приводят к проблемам с отчётами и дополнительным трудозатратам на исправление. Это снижает эффективность операций — при объёме 300-500+ документов в день проблема становится критической.",
      solution:
        "Система автоматического парсинга документов с использованием OCR и LLM для извлечения данных. Сверка данных с заказами в ERP, автоматическое создание задач. Валидация подозрительных кейсов перед финализацией.",
      expectedEffect: "В типичных проектах это может приводить к: сокращению времени обработки документов на 50-70%, уменьшению количества ошибок на 80-95%, освобождению 3-5 часов рабочего времени в день на сотрудника. Обычно дает эффект экономии 60-100 часов в месяц на одного сотрудника. Примерные результаты окупаемости — 1-3 месяца при объёме 200+ документов/день.",
      stack: "OCR (Tesseract/Cloud Vision) | LLM (GPT-4/Claude) | ERP API | Webhooks",
      tags: ["OCR + NLP", "Валидация данных", "Интеграция с ERP"],
      deploymentTime: "5-8 недель",
      link: "/blog/document-processing-logistics",
    },
  ];

  return (
    <section
      id="cases"
      ref={ref}
      className="py-24 sm:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 subtle-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-purple/10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Типовые сценарии автоматизации AI в бизнесе
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Обобщённые, ориентировочные примеры с оценками эффекта.
            <br />
            Не конкретные клиенты.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {caseStudies.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className="card-hover p-8 h-full flex flex-col gap-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        {item.industry}
                      </p>
                      <h3 className="text-xl font-semibold text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-500/10 border border-green-500/30 text-green-400">
                    Срок внедрения: {item.deploymentTime || "6 недель"}
                  </span>
                </div>

                {/* Контекст */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-blue mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Контекст</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.context}</p>
                    </div>
                  </div>

                  {/* Задача бизнеса */}
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Задача бизнеса</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.task}</p>
                    </div>
                  </div>

                  {/* Возможное решение */}
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-accent-indigo mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Возможное решение</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.solution}</p>
                    </div>
                  </div>

                  {/* Ожидаемый эффект */}
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-accent-purple mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Ожидаемый эффект (оценочный)</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.expectedEffect}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-md bg-accent-blue/10 text-sm text-accent-indigo border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-sm text-gray-500 mb-4">Стек: {item.stack}</div>

                {/* CTA */}
                <div className="flex flex-col gap-2 mt-auto">
                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent-blue to-accent-indigo text-sm font-semibold text-white hover:shadow-lg hover:shadow-accent-blue/25 transition-all w-full"
                  >
                    Понять, подходит ли этот сценарий для вашего бизнеса
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
