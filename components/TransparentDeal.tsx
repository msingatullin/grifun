"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FileCheck,
  Target,
  GitBranch,
  History,
  Shield,
  HeadphonesIcon,
  ArrowRight,
} from "lucide-react";

export default function TransparentDeal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: FileCheck,
      title: "Фиксируем требования",
      description: "Бриф → ТЗ → согласование границ проекта",
    },
    {
      icon: Target,
      title: "Определяем KPI и критерии приёмки",
      description: "Что считается готово — фиксируем заранее",
    },
    {
      icon: GitBranch,
      title: "Работаем итерациями",
      description: "Этапы, демонстрации, согласование",
    },
    {
      icon: History,
      title: "Журналируем изменения",
      description: "Список внедрений, диффы, история версий",
    },
    {
      icon: Shield,
      title: "Безопасность и доступы",
      description: "Роли, доступы, работа с данными",
    },
    {
      icon: HeadphonesIcon,
      title: "Поддержка после запуска",
      description: "Окно стабилизации и сопровождение",
    },
  ];

  return (
    <section
      id="transparent-deal"
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
            Прозрачная сделка
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Вы заранее знаете, что будет сделано, как измеряем результат и как принимаете работу
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="card-hover p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue to-accent-indigo flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="flex flex-wrap justify-center gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
            <span className="px-3 py-1 rounded-md bg-accent-blue/10 text-sm text-accent-blue border border-accent-blue/20">
              NDA по запросу
            </span>
            <span className="px-3 py-1 rounded-md bg-accent-blue/10 text-sm text-accent-blue border border-accent-blue/20">
              Работаем по этапам
            </span>
            <span className="px-3 py-1 rounded-md bg-accent-blue/10 text-sm text-accent-blue border border-accent-blue/20">
              Аудит-лог внедрений
            </span>
            <span className="px-3 py-1 rounded-md bg-accent-blue/10 text-sm text-accent-blue border border-accent-blue/20">
              Критерии приёмки фиксируются заранее
            </span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-semibold text-lg hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300"
          >
            Запросить аудит и план внедрения
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

