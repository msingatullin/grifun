'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, User, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '👋 Привет! Я консультант Грифон. Чем помочь: видеонаблюдение, СКС или СКУД?',
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('цена') || input.includes('стоимость') || input.includes('сколько')) {
      return 'Стоимость зависит от количества камер и сложности объекта. Базовый монтаж начинается от 15 000 руб. Хотите точную смету?'
    }
    
    if (input.includes('время') || input.includes('сколько дней') || input.includes('быстро')) {
      return 'Типовой монтаж занимает от 3 до 7 дней. Это включает проектирование, установку и настройку.'
    }
    
    if (input.includes('облако') || input.includes('хранение')) {
      return 'Да, доступно облачное хранение записей и просмотр со смартфона. Срок архива зависит от конфигурации системы.'
    }
    
    if (input.includes('гарантия') || input.includes('гарантийный')) {
      return 'Гарантия на оборудование и монтаж зависит от проекта. Обычно это 2 года и больше по договору.'
    }
    
    if (input.includes('контакт') || input.includes('связаться') || input.includes('позвонить')) {
      return 'Можете позвонить по телефону +7 (915) 108-89-98 или оставить заявку на сайте. Работаем в Рязани и области.'
    }
    
    return 'Интересный вопрос! Для точного ответа лучше оставить заявку или позвонить нам по телефону +7 (915) 108-89-98.'
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-accent text-background rounded-full flex items-center justify-center shadow-lg hover:bg-accent/90 transition-colors z-50 cyber-glow"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-background-secondary border border-primary/20 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-background-tertiary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-background" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Консультант Грифон</h3>
                  <p className="text-xs text-text-muted">Онлайн</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-background-secondary flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-text-muted" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isUser ? 'bg-accent' : 'bg-background-tertiary'
                    }`}>
                      {message.isUser ? (
                        <User className="w-4 h-4 text-background" />
                      ) : (
                        <Bot className="w-4 h-4 text-text-primary" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.isUser 
                        ? 'bg-accent text-background' 
                        : 'bg-background-tertiary text-text-primary'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.isUser ? 'text-background/70' : 'text-text-muted'
                      }`}>
                        {message.timestamp.toLocaleTimeString('ru-RU', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-background-tertiary flex items-center justify-center">
                      <Bot className="w-4 h-4 text-text-primary" />
                    </div>
                    <div className="bg-background-tertiary rounded-lg p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-primary/20">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Напишите ваш вопрос..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="mt-3 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    // Here you would integrate with contact form
                    console.log('Open contact form')
                  }}
                >
                  Оставить контакты
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
