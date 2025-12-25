"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: "/#solutions", label: "Решения" },
    { href: "/#cases", label: "Кейсы" },
    { href: "/#process", label: "Процесс" },
    { href: "/#contact", label: "Контакты" },
  ];


  return (
    <footer className="relative border-t border-white/10 py-16 bg-background-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              grifun<span className="accent-text">.ru</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Внедряем искусственный интеллект в бизнес-процессы.
              Автоматизация, которая работает на результат.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/79151088998"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-400/50 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/msrzn007"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400/50 transition-all"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Навигация</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/#about"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  О компании
                </a>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-white font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+79151088998"
                  className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  <Phone className="w-4 h-4" />
                  +7 (915) 108-89-98
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@grifun.ru"
                  className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" />
                  info@grifun.ru
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>г. Москва, ул. Примерная, д. 1, офис 101</span>
              </li>
            </ul>
          </div>

          {/* Реквизиты */}
          <div>
            <h4 className="text-white font-semibold mb-4">Реквизиты</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>ООО Грифон</p>
              <p>ИНН: 1234567890</p>
              <p className="pt-2">
                <a href="/privacy" className="hover:text-white transition-colors">
                  Политика конфиденциальности
                </a>
              </p>
              <p>
                <a href="/terms" className="hover:text-white transition-colors">
                  Условия использования
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} AI Agency. Все права защищены.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="/privacy" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
