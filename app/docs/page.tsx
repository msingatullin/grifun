import Header from "@/components/Header";
import Documents from "@/components/Documents";
import TransparentDeal from "@/components/TransparentDeal";
import Footer from "@/components/Footer";
import { loadDocuments } from "@/lib/docs/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Документы и гарантии — AI Agency",
  description: "Шаблоны договора, SLA, политика конфиденциальности, регламент внедрения",
};

export default async function DocsPage() {
  const documents = await loadDocuments();

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Documents documents={documents} />
      <TransparentDeal />
      <Footer />
    </main>
  );
}

