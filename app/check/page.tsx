import { Metadata } from "next";
import Header from "@/components/Header";
import CheckForm from "@/components/CheckForm";

export const metadata: Metadata = {
  title: "Проверьте применимость AI для вашего бизнеса | grifun.ru",
  description: "Ответьте на 4 простых вопроса и получите оценку применимости AI и примерный ROI. Без продаж. Без обязательств.",
};

export default function CheckPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="text-lg font-semibold text-white">
              grifun<span className="text-accent-blue">.ru</span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Проверьте, где AI может сэкономить деньги
              <br className="hidden sm:block" />
              именно в вашем бизнесе
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Ответьте на 4 простых вопроса и получите
              <br className="hidden sm:block" />
              оценку применимости AI и примерный ROI.
              <br />
              Без продаж. Без обязательств.
            </p>

            {/* Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left max-w-2xl mx-auto">
              <div className="flex items-start gap-3 bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="w-6 h-6 rounded-full bg-accent-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent-blue text-sm font-bold">1</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Какие процессы можно автоматизировать</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="w-6 h-6 rounded-full bg-accent-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent-blue text-sm font-bold">2</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Где AI не имеет смысла (честно)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="w-6 h-6 rounded-full bg-accent-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent-blue text-sm font-bold">3</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Сколько времени и денег это может сэкономить</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-background-secondary/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 shadow-xl">
            <CheckForm />
            
            {/* Trust Text */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-center text-sm text-gray-500">
                Ответим в течение 24 часов. Без спама. Конфиденциально.
              </p>
            </div>
          </div>

          {/* Fear Removal Block */}
          <div className="mt-12 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Это не продажа
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
              Если AI не подходит вашему бизнесу —
              <br />
              мы скажем это сразу.
              <br />
              Мы не продаём AI ради AI.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}



