'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "Сколько стоит монтаж видеонаблюдения?",
    answer: "Стоимость зависит от количества камер и сложности объекта. Базовый тариф начинается от 25 000 рублей за 3-4 камеры. Мы предоставляем бесплатную смету после выезда на объект."
  },
  {
    question: "Какой гарантийный срок на оборудование?",
    answer: "Мы предоставляем гарантию от 2 до 5 лет в зависимости от выбранного тарифа. На работы - гарантия 1 год. В случае поломки оборудования в гарантийный период - бесплатная замена."
  },
  {
    question: "Можно ли подключить к существующей системе?",
    answer: "Да, мы можем интегрировать новые камеры с существующей системой видеонаблюдения. Проводим аудит текущей системы и предлагаем оптимальное решение для расширения."
  },
  {
    question: "Совместимо ли с 1С/Битриксом?",
    answer: "Да, наши системы поддерживают интеграцию с 1С и Битрикс24. Это позволяет автоматизировать учет рабочего времени, контроль доступа и другие бизнес-процессы."
  },
  {
    question: "Как быстро можно начать работы?",
    answer: "После подписания договора и получения предоплаты мы начинаем работы в течение 1-2 дней. Полный монтаж системы занимает 7 дней, как указано в договоре."
  },
  {
    question: "Что входит в техническое обслуживание?",
    answer: "Техническое обслуживание включает: мониторинг работы системы, обновление ПО, очистку камер, проверку соединений, резервное копирование настроек. Стоимость - от 3000 руб/месяц."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

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
            Часто задаваемые <span className="gradient-text">вопросы</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Ответы на популярные вопросы о наших услугах
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-background-secondary/50 transition-colors"
                >
                  <span className="font-semibold text-text-primary pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-accent transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <p className="text-text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Не нашли ответ на свой вопрос?
            </h3>
            <p className="text-text-secondary mb-6">
              Свяжитесь с нами, и мы ответим на все ваши вопросы
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-accent text-background rounded-lg font-semibold hover:bg-accent/90 transition-colors cyber-glow-hover">
                Задать вопрос
              </button>
              <button className="px-8 py-3 border border-primary/20 text-text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                Позвонить нам
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
