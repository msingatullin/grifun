"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, CheckCircle2, XCircle, ArrowRight, FileCheck, Users, Target } from "lucide-react";

export default function TrustBlock() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const trustPoints = [
    {
      icon: XCircle,
      title: "Честность превыше всего",
      description: "Если AI не даст эффекта для вашей задачи — мы скажем это сразу. Не продаём AI ради AI.",
      gradient: "from-red-500/20 to-orange-500/20",
      borderColor: "border-red-500/30",
    },
    {
      icon: Target,
      title: "Фокус на результат",
      description: "Наша цель — решить вашу бизнес-задачу, а не внедрить технологию. Измеряем успех вашими метриками.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      icon: FileCheck,
      title: "Прозрачные условия",
      description: "Фиксируем требования, KPI и критерии приёмки до старта. Работаем итерациями с демонстрациями.",
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
    },
    {
      icon: Shield,
      title: "Безопасность данных",
      description: "Соблюдаем NDA, работаем с ролями и доступами. Ваши данные остаются конфиденциальными.",
      gradient: "from-purple-500/20 to-indigo-500/20",
      borderColor: "border-purple-500/30",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Аудит и анализ",
      description: "Изучаем ваши процессы, выявляем точки автоматизации, считаем ROI",
    },
    {
      step: "2",
      title: "Прототип (опционально)",
      description: "Если нужна проверка — делаем MVP за 2-4 недели с реальными данными",
    },
    {
      step: "3",
      title: "Разработка и внедрение",
      description: "Создаём решение, интегрируем с вашими системами, обучаем команду",
    },
    {
      step: "4",
      title: "Запуск и поддержка",
      description: "Запускаем в продакшен, мониторим работу, развиваем решение",
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
        {/* Почему нам доверяют */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Почему нам доверяют
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Мы работаем честно и прозрачно. Результат важнее технологий.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-24">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className={`p-6 rounded-xl bg-gradient-to-br ${point.gradient} border ${point.borderColor}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {point.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Как мы работаем */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Как мы работаем
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Прозрачный процесс от первого контакта до запуска
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.8,
                delay: 0.5 + index * 0.1,
                ease: "easeOut",
              }}
              className="card-hover p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-accent-indigo flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                {step.step}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          className="text-center"
        >
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-semibold text-lg hover:shadow-lg hover:shadow-accent-blue/25 transition-all"
          >
            Начать с бесплатного аудита
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}



