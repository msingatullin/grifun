"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Lightbulb, Code, Headphones } from "lucide-react";

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const auditSteps = [
    {
      number: "01",
      icon: Search,
      title: "Анализ процесса",
      description:
        "Изучаем ваши бизнес-процессы, выявляем узкие места и точки, где ручная работа замедляет рост.",
      gradient: "from-accent-blue to-accent-indigo",
    },
    {
      number: "02",
      icon: Lightbulb,
      title: "Оценка эффективности",
      description:
        "Считаем, сколько времени и денег тратится на рутину. Оцениваем потенциал экономии от автоматизации.",
      gradient: "from-accent-indigo to-accent-purple",
    },
    {
      number: "03",
      icon: Code,
      title: "Архитектура решения",
      description:
        "Проектируем, как AI может решить вашу задачу. Показываем конкретную схему работы и технологии.",
      gradient: "from-accent-purple to-accent-blue",
    },
    {
      number: "04",
      icon: Headphones,
      title: "Честная рекомендация",
      description:
        "Говорим прямо: где AI имеет смысл, а где нет. Если не окупится — скажем сразу. Без продаж ради продаж.",
      gradient: "from-accent-blue via-accent-indigo to-accent-purple",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Анализ процессов",
      description:
        "Проводим аудит ваших бизнес-процессов, выявляем точки автоматизации и оцениваем потенциал ROI.",
      gradient: "from-accent-blue to-accent-indigo",
    },
    {
      number: "02",
      icon: Lightbulb,
      title: "Проектирование решения",
      description:
        "Разрабатываем архитектуру системы, определяем технологии и создаем детальный план внедрения.",
      gradient: "from-accent-indigo to-accent-purple",
    },
    {
      number: "03",
      icon: Code,
      title: "Разработка и внедрение",
      description:
        "Создаем и тестируем решение, интегрируем с вашими системами и обучаем команду работе с новыми инструментами.",
      gradient: "from-accent-purple to-accent-blue",
    },
    {
      number: "04",
      icon: Headphones,
      title: "Поддержка и обучение",
      description:
        "Обеспечиваем техническую поддержку, мониторинг работы системы и непрерывное развитие решения.",
      gradient: "from-accent-blue via-accent-indigo to-accent-purple",
    },
  ];

  return (
    <section
      id="process"
      ref={ref}
      className="py-24 sm:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background-secondary" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Как происходит аудит
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Четыре шага, чтобы понять, где AI может сэкономить деньги вашему бизнесу
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto mb-20">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10 hidden md:block" />

            <div className="space-y-12">
              {auditSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -50 }}
                    animate={
                      isInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -50 }
                    }
                    transition={{
                      duration: 0.8,
                      delay: index * 0.2,
                      ease: "easeOut",
                    }}
                    className="relative flex items-start gap-8"
                  >
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 text-xs font-bold text-gray-500">
                        {step.number}
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 card p-8">
                      <h3 className="text-2xl font-bold mb-3 text-white">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Наш процесс работы
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Структурированный подход к внедрению автоматизации
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10 hidden md:block" />

            <div className="space-y-12">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -50 }}
                    animate={
                      isInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -50 }
                    }
                    transition={{
                      duration: 0.8,
                      delay: index * 0.2,
                      ease: "easeOut",
                    }}
                    className="relative flex items-start gap-8"
                  >
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 text-xs font-bold text-gray-500">
                        {step.number}
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 card p-8">
                      <h3 className="text-2xl font-bold mb-3 text-white">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

