'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-background-secondary py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              <span className="gradient-text">ЛОтос</span>
            </h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Профессиональные системы видеонаблюдения и СКС ЛВС в Рязани. 
              Монтаж за неделю, облачное хранение, контроль 24/7.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <a 
                  href="tel:+79101234567" 
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  +7 (910) 123-45-67
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <a 
                  href="mailto:info@lotos-ryazan.ru" 
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  info@lotos-ryazan.ru
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="text-text-secondary">
                  г. Рязань, ул. Примерная, д. 123
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-text-secondary">
                  Пн-Пт: 9:00-18:00, Сб: 10:00-16:00
                </span>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-text-primary mb-4">
              Услуги
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-secondary hover:text-accent transition-colors">
                  Видеонаблюдение
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent transition-colors">
                  СКС ЛВС
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent transition-colors">
                  Облачное хранение
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent transition-colors">
                  Техническая поддержка
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-accent transition-colors">
                  Монтаж и настройка
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-text-primary mb-4">
              Информация
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#pricing" className="text-text-secondary hover:text-accent transition-colors">
                  Тарифы
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-text-secondary hover:text-accent transition-colors">
                  Портфолио
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-text-secondary hover:text-accent transition-colors">
                  Отзывы
                </a>
              </li>
              <li>
                <a href="#faq" className="text-text-secondary hover:text-accent transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="text-text-secondary hover:text-accent transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-primary/20 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-text-muted text-sm">
              © 2024 ЛОтос. Все права защищены.
            </div>
            
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-text-muted hover:text-accent transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-text-muted hover:text-accent transition-colors">
                Пользовательское соглашение
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
