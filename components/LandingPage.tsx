"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, ArrowRight, Shield, AlertCircle } from "lucide-react";
import type { LandingSpec } from "@/lib/landing/types";
import type { Service } from "@/lib/services/types";
import Contact from "./Contact";

interface LandingPageProps {
  spec: LandingSpec;
  slug?: string;
  adminKey?: string;
  services?: Service[];
  initialService?: string;
}

export default function LandingPage({ spec, slug, adminKey, services = [], initialService }: LandingPageProps) {
  const heroRef = useRef(null);
  const painsRef = useRef(null);
  const solutionsRef = useRef(null);
  const proofRef = useRef(null);
  const ctaRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const isPainsInView = useInView(painsRef, { once: true, margin: "-100px" });
  const isSolutionsInView = useInView(solutionsRef, { once: true, margin: "-100px" });
  const isProofInView = useInView(proofRef, { once: true, margin: "-100px" });
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        <div className="absolute inset-0 subtle-grid opacity-40" />
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
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
            >
              {spec.hero.h1}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              {spec.hero.subtitle}
            </motion.p>

            {spec.hero.bullets.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="space-y-3 mb-10 text-left max-w-2xl mx-auto"
              >
                {spec.hero.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </motion.ul>
            )}

            <motion.a
              href="/#contact"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-semibold text-lg hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300"
            >
              {spec.cta.primary}
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Pains Section */}
      {spec.pains.length > 0 && (
        <section
          ref={painsRef}
          id="pains"
          className="py-24 sm:py-32 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-background-secondary" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isPainsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
                Типичные проблемы
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {spec.pains.map((pain, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isPainsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  className="card p-6"
                >
                  <AlertCircle className="w-8 h-8 text-red-400 mb-4" />
                  <p className="text-gray-300 leading-relaxed">{pain}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Solutions Section */}
      {spec.solutions.items.length > 0 && (
        <section
          ref={solutionsRef}
          id="solutions"
          className="py-24 sm:py-32 relative"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isSolutionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
                {spec.solutions.title}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
              {spec.solutions.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isSolutionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  className="card-hover p-6"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent-blue mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {spec.process.length > 0 && (
        <section className="py-24 sm:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-background-secondary" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
                Как мы работаем
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-6">
              {spec.process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue to-accent-indigo flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 card p-6">
                    <p className="text-gray-300 leading-relaxed">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Proof Section */}
      {(spec.proof.trustBullets.length > 0 || spec.proof.caseSnippets.length > 0) && (
        <section
          ref={proofRef}
          id="proof"
          className="py-24 sm:py-32 relative"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isProofInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
                Почему нам доверяют
              </h2>
            </motion.div>

            {spec.proof.trustBullets.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-7xl mx-auto">
                {spec.proof.trustBullets.map((bullet, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isProofInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    className="card p-6 text-center"
                  >
                    <Shield className="w-8 h-8 text-accent-blue mx-auto mb-4" />
                    <p className="text-gray-300">{bullet}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {spec.proof.caseSnippets.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {spec.proof.caseSnippets.map((snippet, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isProofInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                    className="card p-6"
                  >
                    <h3 className="text-xl font-semibold text-white mb-3">{snippet.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{snippet.result}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section
        ref={ctaRef}
        id="contact"
        className="py-24 sm:py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-background-secondary" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
              {spec.cta.formTitle}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {spec.cta.formHint}
            </p>
          </motion.div>

          <Contact services={services} initialService={initialService} />
        </div>
      </section>

      {/* Admin Regenerate Button */}
      {adminKey && slug && (
        <section className="py-8 relative border-t border-white/10 bg-red-500/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <p className="text-sm text-gray-400">Админ-панель</p>
              <a
                href={`/lp/${slug}?regenerate=${adminKey}&query=${encodeURIComponent(spec.query)}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20 transition-all font-medium"
              >
                🔄 Regenerate Landing Page
              </a>
              <p className="text-xs text-gray-500">
                Внимание: это пересоздаст лендинг с нуля через AI
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Compliance Disclaimers */}
      {spec.compliance.disclaimers.length > 0 && (
        <section className="py-12 relative border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  {spec.compliance.disclaimers.map((disclaimer, index) => (
                    <p key={index} className="text-sm text-gray-400">
                      {disclaimer}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

