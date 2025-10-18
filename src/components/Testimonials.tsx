'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const testimonials = [
  {
    id: 1,
    name: "Александр Петров",
    company: "ООО 'Склад-Рязань'",
    rating: 5,
    text: "Отличная работа! Установили систему видеонаблюдения за неделю, как и обещали. Теперь могу контролировать склад из любой точки мира. Очень доволен качеством и сервисом.",
    avatar: "AP"
  },
  {
    id: 2,
    name: "Мария Сидорова",
    company: "Частный дом",
    rating: 5,
    text: "Профессиональный подход и качественное оборудование. Система работает стабильно уже полгода. Особенно радует мобильное приложение - очень удобное.",
    avatar: "МС"
  },
  {
    id: 3,
    name: "Дмитрий Козлов",
    company: "ИП 'Автосервис'",
    rating: 5,
    text: "Установили камеры в автосервисе. Теперь все процессы под контролем. Облачное хранение очень удобно - не нужно думать о серверах. Рекомендую!",
    avatar: "ДК"
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

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
            Отзывы <span className="gradient-text">клиентов</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Что говорят о нас наши клиенты
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Testimonial content */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="glass rounded-2xl p-8 md:p-12">
                    {/* Stars */}
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 italic">
                      &ldquo;{testimonials[currentIndex].text}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-background font-semibold">
                        {testimonials[currentIndex].avatar}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-text-primary">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-sm text-text-muted">
                          {testimonials[currentIndex].company}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background-secondary/80 hover:bg-background-secondary rounded-full flex items-center justify-center text-text-primary hover:text-accent transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background-secondary/80 hover:bg-background-secondary rounded-full flex items-center justify-center text-text-primary hover:text-accent transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-accent' : 'bg-text-muted/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
