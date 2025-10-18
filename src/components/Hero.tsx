'use client'

import { Button } from '@/components/ui/button'
import { Camera, Shield, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
            >
              Видеонаблюдение{' '}
              <span className="gradient-text">за неделю</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-text-secondary mb-8 leading-relaxed"
            >
              Профессиональный монтаж + облачное хранение
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Button size="xl" className="cyber-glow">
                Получить бесплатную смету
              </Button>
              <Button variant="outline" size="xl">
                Смотреть портфолио
              </Button>
            </motion.div>

            {/* Quick benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div className="flex items-center gap-3 glass rounded-lg p-4">
                <Zap className="w-6 h-6 text-accent" />
                <span className="text-sm font-medium">Монтаж за 7 дней</span>
              </div>
              <div className="flex items-center gap-3 glass rounded-lg p-4">
                <Camera className="w-6 h-6 text-accent" />
                <span className="text-sm font-medium">Контроль 24/7</span>
              </div>
              <div className="flex items-center gap-3 glass rounded-lg p-4">
                <Shield className="w-6 h-6 text-accent" />
                <span className="text-sm font-medium">Облачное хранение</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative w-full h-[500px] lg:h-[600px]">
              {/* Main camera mockup */}
              <div className="absolute inset-0 glass rounded-2xl p-8 flex items-center justify-center">
                <div className="relative">
                  {/* Camera icon with glow effect */}
                  <div className="w-32 h-32 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center cyber-glow">
                    <Camera className="w-16 h-16 text-background" />
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-float"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
                  
                  {/* Connection lines */}
                  <div className="absolute top-1/2 -left-20 w-16 h-0.5 bg-accent/50"></div>
                  <div className="absolute top-1/2 -right-20 w-16 h-0.5 bg-accent/50"></div>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -top-6 -left-6 glass rounded-lg p-4 w-48"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Система активна</span>
                </div>
                <p className="text-xs text-text-muted mt-1">8 камер онлайн</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute -bottom-6 -right-6 glass rounded-lg p-4 w-48"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-sm font-medium">Облачное хранилище</span>
                </div>
                <p className="text-xs text-text-muted mt-1">90 дней записи</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-accent rounded-full mt-2"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  )
}
