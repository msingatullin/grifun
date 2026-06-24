import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import Services from "@/components/Services";
import Cases from "@/components/Cases";
import TypicalResults from "@/components/TypicalResults";
import About from "@/components/About";
import Documents from "@/components/Documents";
import TransparentDeal from "@/components/TransparentDeal";
import TrustBlock from "@/components/TrustBlock";
import FAQ from "@/components/FAQ";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { loadDocuments } from "@/lib/docs/types";
import { loadServices } from "@/lib/services/types";

export default async function Home({
  searchParams,
}: {
  searchParams: { service?: string };
}) {
  const documents = await loadDocuments();
  const services = await loadServices();

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ValueProposition />
      <Services />
      <Cases />
      <TypicalResults />
      <TrustBlock />
      <About />
      <Documents documents={documents} />
      <TransparentDeal />
      <Process />
      <FAQ />
      <Contact services={services} initialService={searchParams.service} />
      <Footer />
    </main>
  );
}
