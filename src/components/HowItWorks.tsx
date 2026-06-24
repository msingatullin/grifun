'use client'

import { motion } from 'framer-motion'
import { MessageCircle, DraftingCompass, Wrench, Play } from 'lucide-react'

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Консультация",
    description: "Звонок или AI-чат для определения ваших потребностей",
    color: "bg-blue-500"
  },
  {
    number: "02", 
    icon: DraftingCompass,
    title: "Проектирование",
    description: "Создание плана расстановки камер и технического решения",
    color: "bg-green-500"
  },
  {
    number: "03",
    icon: Wrench,
    title: "Монтаж",
    description: "Установка оборудования и настройка системы за 7 дней",
    color: "bg-purple-500"
  },
  {
    number: "04",
    icon: Play,
    title: "Запуск и обучение",
    description: "Активация системы и обучение персонала работе с ней",
    color: "bg-orange-500"
  }
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-background-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Как это <span className="gradient-text">работает</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Простой процесс от заявки до запуска системы
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-primary to-accent transform -translate-y-1/2"></div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full z-10"></div>
                
                <div className="glass rounded-2xl p-6 text-center hover:cyber-glow-hover transition-all duration-300">
                  {/* Step number */}
                  <div className="text-6xl font-bold text-accent/20 mb-4">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${step.color} flex items-center justify-center`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Готовы начать?
            </h3>
            <p className="text-text-secondary mb-6">
              Получите бесплатную консультацию и смету уже сегодня
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-accent text-background rounded-lg font-semibold hover:bg-accent/90 transition-colors cyber-glow-hover">
                Получить смету
              </button>
              <button className="px-8 py-3 border border-primary/20 text-text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                Задать вопрос
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
