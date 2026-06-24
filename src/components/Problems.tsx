'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, DollarSign, FileCheck } from 'lucide-react'

const problems = [
  {
    icon: Shield,
    title: "Воровство со склада/дома",
    solution: "Система видеонаблюдения с детекцией движения и мгновенными уведомлениями",
    color: "text-red-400"
  },
  {
    icon: Eye,
    title: "Нельзя контролировать объект издалека",
    solution: "Удаленный доступ через мобильное приложение с просмотром в реальном времени",
    color: "text-orange-400"
  },
  {
    icon: DollarSign,
    title: "Дорого обходится передача видео",
    solution: "Облачное хранение с оптимизированным сжатием и выгодными тарифами",
    color: "text-yellow-400"
  },
  {
    icon: FileCheck,
    title: "Не соответствует нормативам",
    solution: "Полное соответствие требованиям безопасности и сертификация оборудования",
    color: "text-green-400"
  }
]

export default function Problems() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Решаем ваши <span className="gradient-text">проблемы</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Каждая проблема имеет простое и эффективное решение
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass-dark rounded-xl p-6 h-full hover:cyber-glow-hover transition-all duration-300">
                <div className="w-12 h-12 mb-4 rounded-lg bg-background-tertiary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <problem.icon className={`w-6 h-6 ${problem.color}`} />
                </div>
                
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  {problem.title}
                </h3>
                
                <p className="text-sm text-text-secondary leading-relaxed">
                  {problem.solution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
