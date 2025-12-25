"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 subtle-grid opacity-40" />

      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-indigo/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
          >
            Проверка, где AI может сэкономить вашему бизнесу:
            <br className="hidden sm:block" />
            быстрый аудит
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Ответьте на 3–4 простых вопроса и получите оценку
            <br className="hidden sm:block" />
            применимости AI и ожидаемый эффект.
            <br />
            Без обязательств и продаж.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-semibold text-lg hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Проверить мой бизнес
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white/5 border border-white/20 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Узнать потенциал AI
            </motion.a>
          </motion.div>

          {/* Visual Element - Abstract Nodes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="mt-20 flex justify-center items-center"
          >
            <div className="relative w-full max-w-2xl h-64">
              {/* Node Connections Visualization */}
              <svg
                className="w-full h-full"
                viewBox="0 0 400 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Connections */}
                <motion.path
                  d="M 50 100 L 150 60 L 250 100 L 350 80"
                  stroke="rgba(59, 130, 246, 0.3)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                />
                {/* Nodes */}
                {[
                  { x: 50, y: 100 },
                  { x: 150, y: 60 },
                  { x: 250, y: 100 },
                  { x: 350, y: 80 },
                ].map((node, i) => (
                  <motion.circle
                    key={i}
                    cx={node.x}
                    cy={node.y}
                    r="8"
                    fill="url(#nodeGradient)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 1 + i * 0.2,
                      ease: "easeOut",
                    }}
                  />
                ))}
                <defs>
                  <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
