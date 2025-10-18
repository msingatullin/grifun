'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, ExternalLink } from 'lucide-react'

const portfolioItems = [
  {
    id: 1,
    title: "Складской комплекс",
    description: "Установка системы видеонаблюдения на складе площадью 2000 м². 12 камер с детекцией движения и облачным хранением.",
    image: "/api/placeholder/400/300",
    category: "Склад",
    cameras: 12,
    area: "2000 м²"
  },
  {
    id: 2,
    title: "Офисный центр",
    description: "Комплексная система безопасности для офисного здания. Интеграция с системой контроля доступа.",
    image: "/api/placeholder/400/300",
    category: "Офис",
    cameras: 8,
    area: "1500 м²"
  },
  {
    id: 3,
    title: "Частный дом",
    description: "Система видеонаблюдения для частного дома с периметральным контролем и мобильным доступом.",
    image: "/api/placeholder/400/300",
    category: "Частный дом",
    cameras: 6,
    area: "800 м²"
  },
  {
    id: 4,
    title: "Производство",
    description: "Промышленная система видеонаблюдения с защитой от пыли и влаги. Мониторинг производственных процессов.",
    image: "/api/placeholder/400/300",
    category: "Производство",
    cameras: 15,
    area: "3000 м²"
  },
  {
    id: 5,
    title: "Торговый центр",
    description: "Система безопасности для торгового центра с аналитикой посетителей и детекцией краж.",
    image: "/api/placeholder/400/300",
    category: "Торговля",
    cameras: 20,
    area: "5000 м²"
  },
  {
    id: 6,
    title: "Автосервис",
    description: "Видеонаблюдение для автосервиса с контролем качества работ и защитой от вандализма.",
    image: "/api/placeholder/400/300",
    category: "Автосервис",
    cameras: 10,
    area: "1200 м²"
  }
]

export default function Portfolio() {
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null)

  return (
    <section id="portfolio" className="py-20 bg-background-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Наше <span className="gradient-text">портфолио</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Примеры реализованных проектов систем видеонаблюдения
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer"
            >
              <div className="glass rounded-xl overflow-hidden hover:cyber-glow-hover transition-all duration-300">
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ExternalLink className="w-8 h-8 text-accent" />
                    </div>
                    <p className="text-sm text-text-muted">Изображение проекта</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-xs text-text-muted">
                      {item.cameras} камер
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
                    <span>Площадь: {item.area}</span>
                    <span className="text-accent group-hover:underline">
                      Подробнее →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
              Хотите такой же результат?
            </h3>
            <p className="text-text-secondary mb-6">
              Получите бесплатную консультацию и смету для вашего объекта
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-accent text-background rounded-lg font-semibold hover:bg-accent/90 transition-colors cyber-glow-hover">
                Получить смету
              </button>
              <button className="px-8 py-3 border border-primary/20 text-text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                Смотреть все проекты
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-primary/20 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-text-primary">
                    {selectedItem.title}
                  </h3>
                  <p className="text-text-muted">
                    {selectedItem.category}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-full hover:bg-background-secondary flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-text-muted" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Image placeholder */}
                <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ExternalLink className="w-10 h-10 text-accent" />
                    </div>
                    <p className="text-text-muted">Изображение проекта</p>
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2">Описание проекта</h4>
                    <p className="text-text-secondary leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Количество камер:</span>
                      <span className="text-text-primary font-semibold">{selectedItem.cameras}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Площадь объекта:</span>
                      <span className="text-text-primary font-semibold">{selectedItem.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Категория:</span>
                      <span className="text-accent font-semibold">{selectedItem.category}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-text-primary mb-3">Реализованные функции</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Облачное хранение</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Мобильное приложение</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Детекция движения</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Уведомления в реальном времени</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 px-6 py-3 bg-accent text-background rounded-lg font-semibold hover:bg-accent/90 transition-colors">
                    Получить похожий проект
                  </button>
                  <button className="flex-1 px-6 py-3 border border-primary/20 text-text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                    Задать вопрос
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
