import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { loadServices } from "@/lib/services/types";
import { Bot, ArrowRight, CheckCircle2, Target, Lightbulb, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "AI-бот для бизнеса — Автоматизация общения с клиентами | grifun.ru",
  description: "Создаём AI-ботов для автоматизации общения с клиентами. Ответы 24/7, снижение нагрузки на операторов до 70%, рост конверсии.",
};

export default async function AIBotPage() {
  const services = await loadServices();

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 subtle-grid opacity-40" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br from-accent-blue to-accent-indigo flex items-center justify-center">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
              AI-бот для вашего бизнеса
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Автоматизируем общение с клиентами. Ваши клиенты получают ответы 24/7, 
              а команда фокусируется на важных задачах.
            </p>
          </div>
        </div>
      </section>

      {/* Проблема */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-6 mb-8">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                <Target className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Проблема</h2>
                <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
                  <p>
                    Команда тратит часы на однотипные вопросы клиентов. Операторы не успевают отвечать быстро, 
                    среднее время ответа — несколько часов. Клиенты уходят к конкурентам, которые отвечают быстрее.
                  </p>
                  <p>
                    В пиковые часы нагрузка на поддержку критическая. Команда работает в режиме постоянного стресса, 
                    качество обслуживания страдает.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Решение */}
      <section className="py-24 relative bg-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-6 mb-8">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-blue/20 border border-accent-blue/30 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-accent-blue" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Решение</h2>
                <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
                  <p>
                    Создаём AI-бота с базой знаний вашей компании. Бот отвечает на типовые вопросы клиентов, 
                    использует информацию из вашей документации и прошлых диалогов.
                  </p>
                  <p>
                    Сложные вопросы автоматически передаются операторам. Бот работает 24/7, отвечает за секунды, 
                    говорит на языке вашего бренда.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Кейс */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-6 mb-8">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Результат</h2>
                <div className="bg-background-secondary border border-white/10 rounded-xl p-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">E-commerce: AI-бот поддержки</h3>
                    <p className="text-gray-400 mb-4">
                      Компания получала 800+ обращений в день. Операторы не успевали отвечать, 
                      среднее время ответа — 2 часа.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <p className="text-sm text-red-400 mb-2">До внедрения:</p>
                        <p className="text-white">800+ обращений, время ответа 2 часа, высокая нагрузка</p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <p className="text-sm text-green-400 mb-2">После внедрения:</p>
                        <p className="text-white">1200+ обращений, время ответа 30 сек, -45% нагрузка</p>
                      </div>
                    </div>
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center gap-2 text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span>Нагрузка на операторов снизилась на 45%</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span>Обрабатываем 1200+ диалогов в сутки</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span>Удовлетворённость клиентов выросла на 28%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <Contact services={services} initialService="ai-audit" />
      <Footer />
    </main>
  );
}



