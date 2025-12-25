"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, TrendingDown, TrendingUp, Users, ArrowRight } from "lucide-react";

export default function TypicalResults() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const results = [
    {
      icon: Clock,
      metric: "40-70%",
      label: "экономия времени на рутине",
      description: "Освобождается время команды для стратегических задач",
      gradient: "from-accent-blue to-accent-indigo",
    },
    {
      icon: TrendingDown,
      metric: "30-50%",
      label: "снижение операционных затрат",
      description: "Меньше ручной работы = меньше расходов на обработку",
      gradient: "from-accent-indigo to-accent-purple",
    },
    {
      icon: TrendingUp,
      metric: "+25-40%",
      label: "рост конверсии лидов",
      description: "Быстрый ответ клиентам увеличивает вероятность сделки",
      gradient: "from-accent-purple to-accent-blue",
    },
    {
      icon: Users,
      metric: "<30 сек",
      label: "среднее время ответа",
      description: "Клиенты получают ответ практически мгновенно, 24/7",
      gradient: "from-accent-blue via-accent-indigo to-accent-purple",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-24 sm:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-background-secondary" />
      <div className="absolute inset-0 subtle-grid opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Типовые результаты наших клиентов
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Средние показатели после внедрения автоматизации. Результаты зависят от ваших процессов и исходных данных.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {results.map((result, index) => {
            const Icon = result.icon;
            return (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="card-hover p-8 text-center"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${result.gradient} flex items-center justify-center mb-6 mx-auto`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 accent-text">
                  {result.metric}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-white">
                  {result.label}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {result.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-12 text-center space-y-6"
        >
          <div>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-semibold text-lg hover:shadow-lg hover:shadow-accent-blue/25 transition-all"
            >
              Узнать, что можно автоматизировать за 14 дней
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            * Показатели основаны на данных наших проектов. Точные результаты зависят от специфики вашего бизнеса и будут рассчитаны в рамках бесплатного AI-аудита.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

