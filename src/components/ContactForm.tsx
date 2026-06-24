'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { validateEmail, validatePhone } from '@/lib/utils'

const objectTypes = [
  'Частный дом',
  'Квартира',
  'Офис',
  'Склад',
  'Магазин',
  'Производство',
  'Другое'
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    objectType: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите номер телефона'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введите email'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Введите корректный email'
    }

    if (!formData.objectType) {
      newErrors.objectType = 'Выберите тип объекта'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would send data to your API
      console.log('Form submitted:', formData)
      
      setIsSubmitted(true)
      setFormData({
        name: '',
        phone: '',
        email: '',
        objectType: '',
        message: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-text-primary mb-2">
          Спасибо за заявку!
        </h3>
        <p className="text-text-secondary mb-6">
          Мы свяжемся с вами в течение 30 минут для уточнения деталей
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline">
          Отправить еще одну заявку
        </Button>
      </motion.div>
    )
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
            Получить <span className="gradient-text">бесплатную смету</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Оставьте заявку, и мы рассчитаем стоимость для вашего объекта
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                  Ваше имя *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Введите ваше имя"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                  Телефон *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (999) 123-45-67"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="objectType" className="block text-sm font-medium text-text-primary mb-2">
                  Тип объекта *
                </label>
                <Select
                  id="objectType"
                  name="objectType"
                  value={formData.objectType}
                  onChange={handleChange}
                  className={errors.objectType ? 'border-red-500' : ''}
                >
                  <option value="">Выберите тип объекта</option>
                  {objectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
                {errors.objectType && (
                  <p className="text-red-400 text-sm mt-1">{errors.objectType}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                Дополнительная информация
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Расскажите о ваших требованиях к системе видеонаблюдения..."
                rows={4}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full cyber-glow"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправляем...' : 'Получить бесплатную смету'}
            </Button>

            <p className="text-xs text-text-muted text-center">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
