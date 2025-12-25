import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Блог / AI для бизнеса — Экспертные статьи | grifun.ru",
  description: "Честные статьи об AI-автоматизации для бизнеса. Где AI реально экономит деньги, почему не окупаются проекты, как считать ROI.",
};

const articles = [
  {
    slug: "gde-ai-realno-ekonomit",
    title: "Где AI реально экономит деньги бизнесу, а где это маркетинг",
    excerpt: "Разбираем, в каких задачах AI даёт измеримый экономический эффект, а где это просто красивая обёртка вокруг старых подходов.",
    readTime: "8 мин",
    category: "Экономика AI",
  },
  {
    slug: "pochemu-ai-ne-okupaetsya",
    title: "Почему 70–80% AI-внедрений не окупаются",
    excerpt: "Реальные причины провалов AI-проектов и что делать, чтобы ваш проект попал в 20-30% успешных.",
    readTime: "10 мин",
    category: "Аналитика",
  },
  {
    slug: "kak-schitat-roi-ot-ai",
    title: "Как считать ROI от AI до начала проекта",
    excerpt: "Практический подход к оценке окупаемости AI-автоматизации на основе реальных метрик бизнеса.",
    readTime: "7 мин",
    category: "Методология",
  },
  {
    slug: "tipovye-arhitektury-ai",
    title: "Типовые архитектуры AI-автоматизации: от ботов до RAG",
    excerpt: "Разбор архитектурных паттернов AI-решений для бизнеса: чат-боты, агенты, RAG-системы, обработка документов. Технические детали и примеры реализации.",
    readTime: "12 мин",
    category: "Архитектура",
  },
  {
    slug: "kak-podgotovit-biznes-k-vnedreniyu-ai",
    title: "Как подготовить бизнес к внедрению AI: чек-лист руководителя",
    excerpt: "Практический чек-лист для подготовки бизнеса к внедрению AI: процессы, данные, команда, инфраструктура. Что проверить до старта проекта.",
    readTime: "11 мин",
    category: "Методология",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="relative pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
                Блог / AI для бизнеса
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Честные статьи об AI-автоматизации. Без инфоцыганства, с фокусом на реальную экономику и архитектуру решений.
              </p>
            </div>

            {/* Articles List */}
            <div className="space-y-8">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="block group"
                >
                  <article className="card-hover p-8 border border-white/10 rounded-xl hover:border-accent-blue/50 transition-all">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <span className="px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-xs font-semibold">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-accent-blue transition-colors">
                      {article.title}
                    </h2>
                    
                    <p className="text-gray-400 leading-relaxed mb-6">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-2 text-accent-blue font-semibold group-hover:gap-3 transition-all">
                      <span>Читать статью</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 p-8 rounded-xl bg-gradient-to-r from-accent-blue/10 to-accent-indigo/10 border border-accent-blue/20 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Хотите разобрать ваш случай?
              </h3>
              <p className="text-gray-400 mb-6">
                Мы можем провести бесплатный AI-аудит ваших процессов и показать, где автоматизация даст реальную экономию.
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-semibold text-lg hover:shadow-lg hover:shadow-accent-blue/25 transition-all"
              >
                Получить бесплатный AI-аудит
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

