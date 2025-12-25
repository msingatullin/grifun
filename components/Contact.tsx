"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Loader2, Phone, CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { Service } from "@/lib/services/types";

type FormStatus = "idle" | "loading" | "success" | "error";
type FormType = "consultation" | "callback";

interface ContactProps {
  services?: Service[];
  initialService?: string;
}

export default function Contact({ services = [], initialService }: ContactProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formType, setFormType] = useState<FormType>("consultation");
  const [selectedService, setSelectedService] = useState(initialService || "");

  // Автоподстановка из query параметра
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get("service");
      if (serviceParam && services.length > 0) {
        const service = services.find((s) => s.id === serviceParam);
        if (service) {
          setSelectedService(service.id);
        }
      }
    }
  }, [services]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name")?.toString().trim(),
      email: formData.get("email")?.toString().trim() || formData.get("phone")?.toString().trim(),
      phone: formData.get("phone")?.toString().trim(),
      service: selectedService || formData.get("service")?.toString().trim() || "",
      task: formData.get("task")?.toString().trim(),
      type: formType,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Не удалось отправить заявку. Попробуйте ещё раз.");
      }

      // Редирект на страницу благодарности
      window.location.href = `/thank-you?type=${formType}`;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Произошла ошибка. Попробуйте позже.";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-background-secondary" />
      <div className="absolute inset-0 subtle-grid opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <p className="text-sm font-semibold text-accent-blue">Проверьте применимость AI</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Проверьте, где AI может помочь вашему бизнесу
            </h2>
            <div className="bg-gradient-to-r from-accent-blue/10 to-accent-indigo/10 border border-accent-blue/20 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold mb-2">Что вы получите:</p>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Бесплатный аудит ваших бизнес-процессов</li>
                    <li>• Расчет потенциального ROI от автоматизации</li>
                    <li>• Персональные рекомендации по внедрению AI</li>
                    <li>• План реализации с оценкой сроков и стоимости</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Ответим в течение 24 часов. Без спама и обязательств.</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Работаем с <strong className="text-white">B2B, e-commerce и сервисными компаниями</strong></span>
              </div>
            </div>
            
            <div className="bg-background-secondary/50 border border-accent-blue/20 rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold text-white mb-2">Что вы получите:</p>
              <ul className="space-y-1.5 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-accent-blue mt-1">✓</span>
                  <span>Список процессов для автоматизации с приоритетами</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-blue mt-1">✓</span>
                  <span>Расчёт потенциальной экономии времени и денег (ROI)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-blue mt-1">✓</span>
                  <span>План внедрения с оценкой сроков и стоимости</span>
                </li>
              </ul>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="card p-8 border border-white/10 bg-background/80 backdrop-blur-md"
          >
            {/* Переключатель типа формы */}
            <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-lg border border-white/10">
              <button
                type="button"
                onClick={() => setFormType("consultation")}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  formType === "consultation"
                    ? "bg-accent-blue text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Консультация
              </button>
              <button
                type="button"
                onClick={() => setFormType("callback")}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  formType === "callback"
                    ? "bg-accent-blue text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Phone className="w-4 h-4 inline mr-2" />
                Обратный звонок
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm text-gray-300" htmlFor="name">
                  Имя *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                  placeholder="Ваше имя"
                />
              </div>

              {formType === "consultation" ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300" htmlFor="email">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-300" htmlFor="service">
                      Интересующая услуга
                    </label>
                    {services.length === 0 ? (
                      <div className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-gray-400 text-sm">
                        Список услуг загружается...
                      </div>
                    ) : (
                      <Select
                        value={selectedService}
                        onValueChange={setSelectedService}
                      >
                        <SelectTrigger id="service" name="service">
                          <SelectValue placeholder="Выберите услугу" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">
                            <span className="text-gray-400">Не выбрано</span>
                          </SelectItem>
                          {services.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {/* Скрытое поле для формы */}
                    <input type="hidden" name="service" value={selectedService} />
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm text-gray-300" htmlFor="phone">
                    Телефон *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                    placeholder="+7 (915) 108-89-98"
                  />
                </div>
              )}

              {formType === "consultation" && (
                <div className="space-y-2">
                  <label className="text-sm text-gray-300" htmlFor="task">
                    Опишите вашу задачу (опционально)
                  </label>
                  <textarea
                    id="task"
                    name="task"
                    rows={3}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                    placeholder="Кратко опишите процессы или сценарии, которые хотите автоматизировать"
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-semibold hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Отправляем...
                    </>
                          ) : formType === "callback" ? (
                            "Заказать звонок"
                          ) : (
                            "Получить оценку AI-аудита"
                          )}
                </button>
                <div className="text-sm">
                  {status === "success" ? (
                    <span className="text-green-400" role="status">
                      Заявка отправлена. Свяжемся в ближайшее время.
                    </span>
                  ) : status === "error" ? (
                    <span className="text-red-400" role="status">
                      {errorMessage}
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      Нажимая кнопку, вы соглашаетесь с обработкой данных.
                    </span>
                  )}
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
