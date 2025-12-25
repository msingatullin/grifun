"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Download, Eye, X, AlertCircle } from "lucide-react";
import type { Document } from "@/lib/docs/types";

interface DocumentsProps {
  documents: Document[];
}

export default function Documents({ documents }: DocumentsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <section
        id="documents"
        ref={ref}
        className="py-24 sm:py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-background-secondary" />
        <div className="absolute inset-0 subtle-grid opacity-30" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
              Документы и гарантии
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Шаблоны документов и правила работы — чтобы вы понимали условия до старта
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
            {documents.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="card p-6 flex flex-col h-full"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-blue to-accent-indigo flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-white">{doc.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{doc.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-xs text-gray-400">PDF</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-accent-blue">v{doc.version}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-400">актуально с {formatDate(doc.effective_from)}</span>
                </div>

                <div className="flex gap-3 mt-auto">
                  <a
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent-blue to-accent-indigo text-white text-sm font-medium hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    Скачать PDF
                  </a>
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                    Кратко
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Глобальный дисклеймер */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2 text-sm text-gray-400">
                <p>
                  <strong className="text-white">Важно:</strong> Документы размещены для ознакомления. 
                  Финальные условия, сроки и состав работ фиксируются в подписанной версии договора и приложений (ТЗ/спецификаций).
                </p>
                <p>
                  Примеры не являются публичной офертой.
                </p>
                <p>
                  Показатели эффективности зависят от исходных данных и процессов заказчика; метрики фиксируются по итогам аудита и пилота.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Модальное окно "Кратко" */}
      {selectedDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedDoc(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedDoc.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>PDF • v{selectedDoc.version} • актуально с {formatDate(selectedDoc.effective_from)}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <h4 className="text-lg font-semibold text-white">Основные пункты:</h4>
              <ul className="space-y-2">
                {selectedDoc.summary_bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <span className="text-accent-blue mt-1">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedDoc.disclaimer && (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-6">
                <p className="text-sm text-gray-400">{selectedDoc.disclaimer}</p>
              </div>
            )}

            <a
              href={selectedDoc.file}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-medium hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300 w-full"
            >
              <Download className="w-5 h-5" />
              Скачать PDF
            </a>
          </motion.div>
        </div>
      )}
    </>
  );
}

