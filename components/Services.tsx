"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  MessageSquare,
  Users,
  TrendingUp,
  Plug,
  Search,
  FlaskConical,
  Wrench,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Search,
      title: "AI-аудит",
      problem: "Команда тратит часы на рутину, но не понятно, где автоматизация даст максимальную экономию и окупится быстрее всего",
      solution: "Анализируем ваши процессы, находим точки автоматизации и считаем реальную экономию. Без воды — только конкретные цифры и приоритеты.",
      result: "Вы получаете план с точным расчётом: какие процессы автоматизировать в первую очередь, сколько это сэкономит денег и времени, какой будет ROI.",
      tasks: [
        "Анализ текущих процессов",
        "Выявление точек автоматизации",
        "Оценка потенциального ROI",
        "Рекомендации по приоритетам",
      ],
      duration: "1-2 недели",
      price: "Бесплатно",
      gradient: "from-accent-blue to-accent-indigo",
      span: "col-span-1",
    },
    {
      icon: FlaskConical,
      title: "Proof of Concept",
      problem: "Нужно увидеть результат на своих данных, прежде чем вкладывать деньги в полную разработку",
      solution: "Создаём рабочий прототип за 3-6 недель на ваших реальных данных. Вы видите экономию времени и денег в цифрах.",
      result: "Прототип работает на ваших данных. Вы видите реальный результат и принимаете решение о полной разработке на основе фактов.",
      tasks: [
        "Разработка прототипа",
        "Тестирование на реальных данных",
        "Демонстрация результата",
        "Документация решения",
      ],
      duration: "3-6 недель",
      price: "от 500 000 ₽",
      gradient: "from-accent-indigo to-accent-purple",
      span: "col-span-1",
    },
    {
      icon: Wrench,
      title: "Интеграции под ключ",
      problem: "Команда тратит 40-60% рабочего времени на однотипные задачи. Нужна автоматизация, которая снизит нагрузку и освободит людей для важной работы",
      solution: "Разрабатываем и внедряем AI-решение под ключ — от анализа до запуска. Интегрируем с вашими системами, обучаем команду.",
      result: "Автоматизация работает. Команда экономит 40-70% времени на рутине, операционные затраты снижаются на 30-50%, клиенты получают поддержку 24/7.",
      tasks: [
        "Разработка решения",
        "Интеграция с вашими системами",
        "Развертывание и запуск",
        "Обучение команды",
      ],
      duration: "7-21 день (MVP)",
      price: "от 1 500 000 ₽",
      gradient: "from-accent-purple to-accent-blue",
      span: "col-span-1",
    },
    {
      icon: Clock,
      title: "Поддержка 24/7",
      problem: "Автоматизация работает, но нужна уверенность в стабильности и развитии под рост бизнеса",
      solution: "Мониторим систему 24/7, устраняем проблемы оперативно, обновляем и масштабируем решение. Вы не думаете о технических вопросах.",
      result: "Система работает стабильно и развивается вместе с бизнесом. Вы экономите на найме техподдержки и фокусируетесь на росте.",
      tasks: [
        "Техническая поддержка",
        "Мониторинг работы системы",
        "Обновления и улучшения",
        "Масштабирование решения",
      ],
      duration: "Ежемесячно",
      price: "от 100 000 ₽/мес",
      gradient: "from-accent-blue via-accent-indigo to-accent-purple",
      span: "col-span-1 md:col-span-2",
    },
  ];

  return (
    <section
      id="solutions"
      ref={ref}
      className="py-24 sm:py-32 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Что мы делаем
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Решаем бизнес-задачи, а не продаём технологии
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 50 }
                }
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className={`card-hover p-8 ${service.span}`}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {service.title}
                </h3>

                {/* Проблема */}
                <div className="mb-4 pb-4 border-b border-white/10">
                  <h4 className="text-xs font-semibold text-red-400 mb-2 uppercase tracking-wide">Проблема</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{service.problem}</p>
                </div>

                {/* Решение */}
                <div className="mb-4 pb-4 border-b border-white/10">
                  <h4 className="text-xs font-semibold text-accent-blue mb-2 uppercase tracking-wide">Решение</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{service.solution}</p>
                </div>

                {/* Результат */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-green-400 mb-2 uppercase tracking-wide">Результат</h4>
                  <p className="text-sm text-white leading-relaxed font-medium">{service.result}</p>
                </div>

                {/* Задачи */}
                <div className="mb-4 pt-4 border-t border-white/10">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Что входит:</h4>
                  <ul className="space-y-1">
                    {service.tasks.map((task, idx) => (
                      <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                        <span className="text-accent-blue mt-1">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Длительность и стоимость */}
                <div className="flex flex-wrap gap-3 mb-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{service.price}</span>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent-blue hover:text-accent-indigo transition-colors group"
                >
                  Узнать, подойдёт ли это моему бизнесу
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
