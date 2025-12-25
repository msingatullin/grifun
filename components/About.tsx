"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Target, Users, Award, Quote, MapPin, Phone, Mail } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const team = [
    {
      name: "Михаил Сингатуллин",
      role: "CEO & AI Lead",
      expertise: "Стратегия внедрения ИИ, архитектура AI-систем",
    },
    {
      name: "Екатерина Петрова",
      role: "Head of Integration",
      expertise: "Интеграции, автоматизация бизнес-процессов",
    },
    {
      name: "Алексей Иванов",
      role: "Senior AI Engineer",
      expertise: "LLM-агенты, RAG-системы, NLP",
    },
  ];

  const clients = [
    { name: "TechCorp", logo: "TC" },
    { name: "LogiStream", logo: "LS" },
    { name: "CloudService", logo: "CS" },
    { name: "DataFlow", logo: "DF" },
  ];

  const testimonials = [
    {
      text: "Автоматизация поддержки снизила нагрузку на команду на 45%, при этом качество обслуживания только выросло.",
      author: "Иван Смирнов",
      company: "TechCorp",
    },
    {
      text: "AI-агент для квалификации лидов работает лучше, чем наш предыдущий процесс. +37% конверсии в демо.",
      author: "Мария Козлова",
      company: "CloudService",
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 sm:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-background-secondary" />
      <div className="absolute inset-0 subtle-grid opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            О компании
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Мы помогаем бизнесу использовать возможности ИИ для роста и автоматизации
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto space-y-20">
          {/* История и миссия */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="card p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue to-accent-indigo flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Наша история</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Основана в 2023 году командой экспертов по искусственному интеллекту и автоматизации.
                Мы начали с внедрения простых чат-ботов и выросли до комплексных AI-решений для
                крупного бизнеса.
              </p>
              <p className="text-gray-400 leading-relaxed">
                За время работы мы реализовали более 50 проектов автоматизации, помогли компаниям
                сократить операционные расходы на 30-60% и повысить эффективность бизнес-процессов.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="card p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-indigo to-accent-purple flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Миссия</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Делать искусственный интеллект доступным для любого бизнеса. Мы верим, что
                автоматизация должна быть простой, понятной и приносить измеримый результат.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Наш подход — не просто внедрить технологию, а решить конкретную бизнес-задачу,
                показать ROI и обеспечить долгосрочную поддержку решения.
              </p>
            </motion.div>
          </div>

          {/* Команда */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Ключевые специалисты</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                  className="card p-6"
                >
                  <h4 className="text-xl font-semibold mb-2 text-white">{member.name}</h4>
                  <p className="text-accent-blue mb-3 text-sm font-medium">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.expertise}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Реквизиты */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="card p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Реквизиты</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-accent-blue mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Юридическое лицо</p>
                    <p className="text-white">ООО Грифон</p>
                    <p className="text-gray-400 text-sm mt-1">ИНН: 1234567890</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent-blue mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Адрес офиса</p>
                    <p className="text-white">г. Москва, ул. Примерная, д. 1, офис 101</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-accent-blue mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Телефон</p>
                    <a href="tel:+79151088998" className="text-white hover:text-accent-blue transition-colors">
                      +7 (915) 108-89-98
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent-blue mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <a href="mailto:info@grifun.ru" className="text-white hover:text-accent-blue transition-colors">
                      info@grifun.ru
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Клиенты */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue to-accent-indigo flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Нам доверяют</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {clients.map((client, index) => (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1, ease: "easeOut" }}
                  className="card p-6 flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-indigo/20 flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold text-white">{client.logo}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{client.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Отзывы */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1, ease: "easeOut" }}
                className="card p-6"
              >
                <Quote className="w-8 h-8 text-accent-blue/50 mb-4" />
                <p className="text-gray-300 leading-relaxed mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

