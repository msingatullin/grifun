import Hero from "../src/components/Hero";
import Benefits from "../src/components/Benefits";
import Problems from "../src/components/Problems";
import HowItWorks from "../src/components/HowItWorks";
import Portfolio from "../src/components/Portfolio";
import Pricing from "../src/components/Pricing";
import Testimonials from "../src/components/Testimonials";
import FAQ from "../src/components/FAQ";
import ContactForm from "../src/components/ContactForm";
import Footer from "../src/components/Footer";
import AIChat from "../src/components/AIChat";

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
  );
}
