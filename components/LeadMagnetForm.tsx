"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, Building2, Users, Target, TrendingUp } from "lucide-react";

interface LeadMagnetFormProps {
  onSuccess?: () => void;
}

export default function LeadMagnetForm({ onSuccess }: LeadMagnetFormProps) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    niche: "",
    teamSize: "",
    manualWork: "",
    goal: "",
    task: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1 && (!formData.name || (!formData.email && !formData.phone))) {
      setErrorMessage("Заполните обязательные поля");
      return;
    }
    if (step === 2 && !formData.niche) {
      setErrorMessage("Укажите нишу вашего бизнеса");
      return;
    }
    setErrorMessage("");
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          task: `AI-аудит: Ниша: ${formData.niche}, Команда: ${formData.teamSize}, Ручная работа: ${formData.manualWork}, Цель: ${formData.goal}${formData.task ? `, Задача: ${formData.task}` : ""}`,
          type: "consultation",
          service: "ai-audit",
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Не удалось отправить заявку");
      }

      setStatus("success");
      
      // Редирект на страницу благодарности
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.href = "/thank-you?type=audit";
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Произошла ошибка");
      setStatus("error");
    }
  };

  return (
    <div className="w-full">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex gap-2 mb-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded ${
                s <= step ? "bg-accent-blue" : "bg-white/10"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-400">
          Шаг {step} из 3
        </p>
      </div>

      {status === "success" ? (
        <div className="text-center py-8">
          <div className="text-green-400 text-2xl mb-4">✓</div>
          <p className="text-white">Заявка отправлена!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Step 1: Контакты */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Имя *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required={!formData.phone}
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Телефон (если нет email)
                </label>
                <input
                  type="tel"
                  required={!formData.email}
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                  placeholder="+7 (915) 108-89-98"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Компания (опционально)
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                  placeholder="Название компании"
                />
              </div>
            </motion.div>
          )}

          {/* Step 2: О бизнесе */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm text-gray-300 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  В какой нише работает ваш бизнес? *
                </label>
                <select
                  required
                  value={formData.niche}
                  onChange={(e) => handleChange("niche", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                >
                  <option value="">Выберите нишу</option>
                  <option value="ecommerce">E-commerce / Интернет-магазины</option>
                  <option value="saas">SaaS / B2B-сервисы</option>
                  <option value="services">Сервисные компании</option>
                  <option value="logistics">Логистика и доставка</option>
                  <option value="finance">Финансы и банкинг</option>
                  <option value="healthcare">Здравоохранение</option>
                  <option value="education">Образование</option>
                  <option value="real-estate">Недвижимость</option>
                  <option value="other">Другое</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Размер команды
                </label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => handleChange("teamSize", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                >
                  <option value="">Выберите размер команды</option>
                  <option value="1-5">1-5 человек</option>
                  <option value="6-20">6-20 человек</option>
                  <option value="21-50">21-50 человек</option>
                  <option value="51-100">51-100 человек</option>
                  <option value="100+">100+ человек</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Где больше всего ручной работы? (что забирает время команды)
                </label>
                <textarea
                  value={formData.manualWork}
                  onChange={(e) => handleChange("manualWork", e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                  placeholder="Например: обработка заявок, ответы клиентам, ввод данных, документооборот..."
                />
              </div>
            </motion.div>
          )}

          {/* Step 3: Цель */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm text-gray-300 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Главная цель автоматизации
                </label>
                <select
                  value={formData.goal}
                  onChange={(e) => handleChange("goal", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                >
                  <option value="">Выберите цель</option>
                  <option value="save-time">Сэкономить время команды</option>
                  <option value="save-money">Снизить операционные затраты</option>
                  <option value="scale">Масштабировать без роста затрат</option>
                  <option value="improve-quality">Повысить качество обслуживания</option>
                  <option value="grow-revenue">Увеличить выручку</option>
                  <option value="other">Другое</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Опишите задачу подробнее (опционально)
                </label>
                <textarea
                  value={formData.task}
                  onChange={(e) => handleChange("task", e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                  placeholder="Что именно вы хотите автоматизировать? Какие процессы вызывают проблемы?"
                />
              </div>
            </motion.div>
          )}

          {errorMessage && (
            <div className="text-red-400 text-sm">{errorMessage}</div>
          )}

          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 rounded-lg bg-white/5 border border-white/20 text-white hover:bg-white/10 transition-all"
              >
                Назад
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-semibold hover:shadow-lg hover:shadow-accent-blue/25 transition-all inline-flex items-center justify-center gap-2"
              >
                Далее
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-semibold hover:shadow-lg hover:shadow-accent-blue/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Отправляем...
                  </>
                ) : (
                  <>
                    Получить бесплатный AI-аудит
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}



