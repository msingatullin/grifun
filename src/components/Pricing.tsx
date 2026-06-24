'use client'

import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: "Базовый",
    price: "25 000",
    period: "руб",
    description: "Для небольших объектов",
    popular: false,
    features: [
      "3-4 камеры видеонаблюдения",
      "Локальное хранилище 1TB",
      "Мобильное приложение",
      "Техническая поддержка 6 месяцев",
      "Гарантия 2 года"
    ],
    color: "border-primary/20"
  },
  {
    name: "Стандарт",
    price: "45 000", 
    period: "руб",
    description: "Самый популярный выбор",
    popular: true,
    features: [
      "5-8 камер видеонаблюдения",
      "Облачное хранилище 90 дней",
      "Детекция движения",
      "Мобильное приложение",
      "Техническая поддержка 12 месяцев",
      "Гарантия 3 года",
      "Установка за 7 дней"
    ],
    color: "border-accent"
  },
  {
    name: "Премиум",
    price: "60 000+",
    period: "руб",
    description: "Для крупных объектов",
    popular: false,
    features: [
      "8-15 камер видеонаблюдения",
      "Облачное хранилище 180 дней",
      "Аналитика видео (детекция лиц)",
      "Мониторинг 24/7",
      "Интеграция с 1С/Битрикс",
      "Техническая поддержка 24/7",
      "Гарантия 5 лет",
      "Персональный менеджер"
    ],
    color: "border-primary/20"
  }
]

export default function Pricing() {
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
            Тарифные <span className="gradient-text">планы</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Выберите подходящий тариф для вашего объекта
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative ${plan.popular ? 'md:-mt-8' : ''}`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-accent text-background px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Популярный
                  </div>
                </div>
              )}

              <div className={`glass rounded-2xl p-8 h-full border-2 ${plan.color} ${plan.popular ? 'cyber-glow' : ''} hover:cyber-glow-hover transition-all duration-300`}>
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-text-secondary mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-text-primary">
                      {plan.price}
                    </span>
                    <span className="text-text-muted ml-2">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full ${plan.popular ? 'bg-accent hover:bg-accent/90' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  size="lg"
                >
                  Выбрать план
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass rounded-xl p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              Все тарифы включают
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span>Бесплатный выезд на объект</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span>Проектирование системы</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span>Обучение персонала</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
