'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "Сколько стоит монтаж видеонаблюдения?",
    answer: "Стоимость зависит от количества камер, длины кабельных трасс и сложности объекта. Базовый монтаж начинается от 15 000 рублей. Точную смету считаем после выезда на объект."
  },
  {
    question: "Какой гарантийный срок на оборудование?",
    answer: "Гарантия зависит от выбранного оборудования и условий договора. Обычно на работы даём 2 года, на оборудование — по гарантии производителя."
  },
  {
    question: "Можно ли подключить к существующей системе?",
    answer: "Да, можем подключить новые камеры к существующей системе, если оборудование совместимо. Сначала смотрим текущую схему и предлагаем вариант расширения."
  },
  {
    question: "Можно смотреть камеры с телефона?",
    answer: "Да. Настраиваем просмотр через смартфон, чтобы вы могли видеть объект из любой точки, где есть интернет."
  },
  {
    question: "Как быстро можно начать работы?",
    answer: "После согласования сметы и даты выезда начинаем работы обычно в течение 1-2 дней. Типовой монтаж занимает от 3 до 7 дней."
  },
  {
    question: "Что входит в техническое обслуживание?",
    answer: "Техническое обслуживание включает проверку камер, замену вышедших из строя элементов, обновление прошивок и контроль записи. Стоимость — от 3 500 руб/мес."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-background">
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
            Ответы на популярные вопросы о монтаже видеонаблюдения
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
