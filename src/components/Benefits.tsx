'use client'

import { motion } from 'framer-motion'
import { Clock, Smartphone, Cloud } from 'lucide-react'

const benefits = [
  {
    icon: Clock,
    title: "Монтаж за 7 дней",
    description: "Быстрая установка и настройка системы видеонаблюдения с минимальными неудобствами",
    color: "text-green-400"
  },
  {
    icon: Smartphone,
    title: "Смотреть со смартфона 24/7",
    description: "Удаленный доступ к камерам через мобильное приложение в любое время",
    color: "text-blue-400"
  },
  {
    icon: Cloud,
    title: "Облачное хранение видео",
    description: "Безопасное хранение записей в облаке с возможностью доступа из любой точки мира",
    color: "text-purple-400"
  }
]

export default function Benefits() {
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
            Почему выбирают <span className="gradient-text">ЛОтос</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Мы обеспечиваем полный цикл услуг от проектирования до технической поддержки
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="glass rounded-2xl p-8 h-full text-center hover:cyber-glow-hover transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-background-tertiary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  {benefit.title}
                </h3>
                
                <p className="text-text-secondary leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
