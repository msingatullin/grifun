"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#solutions", label: "Услуги" },
    { href: "/#cases", label: "Сценарии" },
    { href: "/blog", label: "Блог" },
    { href: "/#about", label: "О компании" },
    { href: "/docs", label: "Документы" },
    { href: "/#process", label: "Процесс" },
    { href: "/#contact", label: "Контакты" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="/"
            className="text-xl font-semibold text-white"
            whileHover={{ opacity: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            grifun<span className="accent-text">.ru</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <motion.a
              href="/#contact"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-semibold text-sm hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Получить AI-аудит
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 border-t border-white/10 mt-4"
          >
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/#contact"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-semibold text-sm text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Получить AI-аудит
              </a>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
