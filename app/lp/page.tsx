import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { normalizeQuery, generateSlug } from "@/lib/landing/normalize";

export default function LandingPageQuery({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams.query;

  if (query && query.trim().length > 0) {
    const normalized = normalizeQuery(query);
    const slug = generateSlug(normalized);
    redirect(`/lp/${slug}?query=${encodeURIComponent(normalized)}`);
  }

  // Если нет query, показываем форму ввода
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white text-center">
              Генератор Landing Page
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Введите ваш запрос для создания персонализированного лендинга
            </p>
            
            <form action="/lp" method="get" className="space-y-4">
              <div>
                <label htmlFor="query" className="block text-sm font-medium text-gray-300 mb-2">
                  Запрос (например: автоматизация продаж в B2B, AI для склада, чат-бот для поддержки)
                </label>
                <input
                  type="text"
                  id="query"
                  name="query"
                  required
                  placeholder="Опишите вашу задачу..."
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-semibold hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300"
              >
                Создать Landing Page
              </button>
            </form>

            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-gray-400">
                <strong className="text-white">Примеры запросов:</strong>
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-400">
                <li>• Автоматизация продаж в B2B SaaS</li>
                <li>• AI-бот для поддержки клиентов 24/7</li>
                <li>• Автоматизация обработки документов на складе</li>
                <li>• AI для квалификации лидов в CRM</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

