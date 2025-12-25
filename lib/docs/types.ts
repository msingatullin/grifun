export type Document = {
  id: string;
  title: string;
  description: string;
  file: string;
  version: string;
  effective_from: string;
  summary_bullets: string[];
  disclaimer: string;
  public: boolean;
};

export async function loadDocuments(): Promise<Document[]> {
  const { readFile } = await import("fs/promises");
  const { join } = await import("path");
  
  try {
    const filePath = join(process.cwd(), "data", "docs.json");
    const content = await readFile(filePath, "utf-8");
    const docs: Document[] = JSON.parse(content);
    
    // Фильтруем только публичные документы
    return docs.filter(doc => doc.public === true);
  } catch (error) {
    console.error("[DOCS] Failed to load documents:", error);
    return [];
  }
}

