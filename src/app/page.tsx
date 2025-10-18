import Hero from '@/components/Hero'
import Benefits from '@/components/Benefits'
import Problems from '@/components/Problems'
import HowItWorks from '@/components/HowItWorks'
import Portfolio from '@/components/Portfolio'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import AIChat from '@/components/AIChat'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Benefits />
      <Problems />
      <HowItWorks />
      <Portfolio />
      <Pricing />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
      <AIChat />
    </main>
  )
}