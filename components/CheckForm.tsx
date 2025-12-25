"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function CheckForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    niche: "",
    teamSize: "",
    manualWork: [] as string[],
    contactType: "",
    contact: "",
  });

  const niches = [
    "E-commerce",
    "B2B SaaS",
    "Логистика",
    "Производство",
    "Финансы / Финтех",
    "Недвижимость",
    "Образование",
    "Медицина / Здравоохранение",
    "Другое",
  ];

  const teamSizes = [
    "1-10 человек",
    "11-50 человек",
    "51-200 человек",
    "201-500 человек",
    "500+ человек",
  ];

  const manualWorkOptions = [
    "Поддержка",
    "Продажи / лиды",
    "Документы",
    "Отчёты / аналитика",
  ];

  const contactTypes = [
    { value: "telegram", label: "Telegram" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "email", label: "Email" },
  ];

  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      manualWork: prev.manualWork.includes(value)
        ? prev.manualWork.filter((item) => item !== value)
        : [...prev.manualWork, value],
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const payload = {
        name: "Проверка применимости AI",
        email: formData.contactType === "email" ? formData.contact : undefined,
        telegram: formData.contactType === "telegram" ? formData.contact : undefined,
        phone: formData.contactType === "whatsapp" ? formData.contact : undefined,
        niche: formData.niche,
        teamSize: formData.teamSize,
        manualWork: formData.manualWork.join(", "),
        type: "ai-check",
        task: `Проверка применимости AI. Ниша: ${formData.niche}, Команда: ${formData.teamSize}, Ручная работа: ${formData.manualWork.join(", ")}`,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Не удалось отправить заявку. Попробуйте ещё раз.");
      }

      setStatus("success");
      // Redirect to thank-you page after 2 seconds
      setTimeout(() => {
        window.location.href = "/thank-you?type=check";
      }, 2000);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Произошла ошибка. Попробуйте позже.";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <p className="text-white text-lg font-semibold mb-2">Спасибо!</p>
        <p className="text-gray-400">Ваша заявка отправлена. Мы ответим в течение 24 часов.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Ниша */}
      <div>
        <label htmlFor="niche" className="block text-sm font-medium text-white mb-2">
          Ниша вашего бизнеса *
        </label>
        <select
          id="niche"
          required
          value={formData.niche}
          onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
        >
          <option value="" disabled>
            Выберите нишу
          </option>
          {niches.map((niche) => (
            <option key={niche} value={niche} className="bg-background">
              {niche}
            </option>
          ))}
        </select>
      </div>

      {/* Размер команды */}
      <div>
        <label htmlFor="teamSize" className="block text-sm font-medium text-white mb-2">
          Размер команды *
        </label>
        <select
          id="teamSize"
          required
          value={formData.teamSize}
          onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
        >
          <option value="" disabled>
            Выберите размер команды
          </option>
          {teamSizes.map((size) => (
            <option key={size} value={size} className="bg-background">
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Где больше всего ручной работы */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Где больше всего ручной работы? *
        </label>
        <div className="space-y-2">
          {manualWorkOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={formData.manualWork.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="w-5 h-5 rounded border-white/20 bg-white/5 text-accent-blue focus:ring-accent-blue/50"
              />
              <span className="text-white text-sm">{option}</span>
            </label>
          ))}
        </div>
        {formData.manualWork.length === 0 && (
          <p className="text-red-400 text-xs mt-2">Выберите хотя бы один вариант</p>
        )}
      </div>

      {/* Тип контакта */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Как с вами связаться? *
        </label>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {contactTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setFormData({ ...formData, contactType: type.value, contact: "" })}
              className={`py-2.5 px-4 rounded-lg border text-sm font-medium transition-all ${
                formData.contactType === type.value
                  ? "bg-accent-blue/20 border-accent-blue text-white"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Поле контакта */}
        {formData.contactType && (
          <input
            type="text"
            required
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            placeholder={
              formData.contactType === "telegram"
                ? "@username или номер телефона"
                : formData.contactType === "whatsapp"
                ? "Номер телефона"
                : "your@email.com"
            }
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
          />
        )}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading" || formData.manualWork.length === 0}
        className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-semibold text-lg hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Отправляем...
          </span>
        ) : (
          "Получить оценку"
        )}
      </button>

      <p className="text-center text-xs text-gray-500">
        Займёт не больше 1 минуты
      </p>
    </form>
  );
}



