"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingDown, Clock, Scale, ArrowRight } from "lucide-react";

export default function ValueProposition() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      icon: TrendingDown,
      title: "Экономия времени и денег",
      metric: "40-70% времени освобождается от рутины",
      description: "Ваша команда перестаёт тратить часы на однотипные задачи. Автоматизация берёт на себя обработку документов, ответы клиентам и рутинные операции.",
      gradient: "from-accent-blue to-accent-indigo",
    },
    {
      icon: Clock,
      title: "Работа 24/7",
      metric: "Клиенты получают ответ за 30 секунд",
      description: "Не нужно ждать начала рабочего дня. Ваши клиенты получают поддержку и ответы на вопросы круглосуточно. Это повышает конверсию и лояльность.",
      gradient: "from-accent-indigo to-accent-purple",
    },
    {
      icon: Scale,
      title: "Масштабирование без роста затрат",
      metric: "Обрабатываем в 3-5 раз больше запросов",
      description: "Рост бизнеса больше не требует пропорционального роста операционных затрат. Система автоматически справляется с увеличением нагрузки.",
      gradient: "from-accent-purple to-accent-blue",
    },
  ];

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden">
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
            Что вы получите
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Конкретные результаты, которые влияют на прибыль
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 50 }
                }
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className="card-hover p-8"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {value.title}
                </h3>
                <p className="text-3xl font-bold mb-4 accent-text">
                  {value.metric}
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {value.description}
                </p>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent-blue hover:text-accent-indigo transition-colors group"
                >
                  Посчитать окупаемость для моего бизнеса
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-16 text-center"
        >
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-semibold text-lg hover:shadow-lg hover:shadow-accent-blue/25 transition-all"
          >
            Получить план автоматизации
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

