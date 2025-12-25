import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Clock, ArrowRight, Calendar, FileText } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Спасибо за заявку | grifun.ru",
  description: "Ваша заявка получена. Мы свяжемся с вами в ближайшее время.",
};

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const type = searchParams.type || "consultation";
  const isAudit = type === "audit";

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 subtle-grid opacity-40" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-400" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
              Спасибо за заявку!
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              {isAudit ? (
                <>
                  Мы получили вашу заявку на <strong className="text-white">бесплатный AI-аудит</strong>.
                  <br />
                  Наш эксперт проанализирует ваши данные и подготовит персональные рекомендации.
                </>
              ) : (
                <>
                  Ваша заявка получена.
                  <br />
                  Мы свяжемся с вами в ближайшее время.
                </>
              )}
            </p>

            {/* What happens next */}
            <div className="bg-background-secondary/50 border border-white/10 rounded-xl p-8 mb-12 text-left">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-accent-blue" />
                Что будет дальше?
              </h2>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-blue/20 border border-accent-blue/30 flex items-center justify-center text-accent-blue font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Ответим в течение 2 часов (в рабочее время)
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Менеджер свяжется с вами по указанным контактам
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-blue/20 border border-accent-blue/30 flex items-center justify-center text-accent-blue font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Проведём короткий разговор (15-20 минут)
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Уточним детали вашей задачи и текущие процессы
                    </p>
                  </div>
                </div>

                {isAudit && (
                  <>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-blue/20 border border-accent-blue/30 flex items-center justify-center text-accent-blue font-semibold">
                        3
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">
                          Подготовим персональный AI-аудит
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Вы получите анализ процессов, рекомендации по автоматизации и расчёт потенциального ROI
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-blue/20 border border-accent-blue/30 flex items-center justify-center text-accent-blue font-semibold">
                        4
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">
                          Предложим план действий
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Если автоматизация подходит — предложим варианты реализации с оценкой сроков и стоимости
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Next steps CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              <Link
                href="/#cases"
                className="p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent-blue/50 transition-all text-left group"
              >
                <FileText className="w-6 h-6 text-accent-blue mb-3" />
                <h3 className="text-white font-semibold mb-2 group-hover:text-accent-blue transition-colors">
                  Посмотреть кейсы
                </h3>
                <p className="text-gray-400 text-sm">
                  Узнайте, как мы помогли другим компаниям
                </p>
              </Link>

              <Link
                href="/docs"
                className="p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent-blue/50 transition-all text-left group"
              >
                <FileText className="w-6 h-6 text-accent-blue mb-3" />
                <h3 className="text-white font-semibold mb-2 group-hover:text-accent-blue transition-colors">
                  Документы и гарантии
                </h3>
                <p className="text-gray-400 text-sm">
                  Узнайте, как мы работаем и что гарантируем
                </p>
              </Link>
            </div>

            {/* Back to home */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/20 text-white hover:bg-white/10 transition-all"
            >
              Вернуться на главную
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Trust message */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-sm text-gray-500">
                <strong className="text-gray-400">Без спама.</strong> Мы свяжемся только по вашему запросу.
                <br />
                Ваши данные конфиденциальны и не передаются третьим лицам.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}



