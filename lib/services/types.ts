export type Service = {
  id: string;
  label: string;
  public: boolean;
};

export async function loadServices(): Promise<Service[]> {
  const { readFile } = await import("fs/promises");
  const { join } = await import("path");
  
  try {
    const filePath = join(process.cwd(), "data", "services.json");
    const content = await readFile(filePath, "utf-8");
    const services: Service[] = JSON.parse(content);
    
    // Фильтруем только публичные услуги
    return services.filter(service => service.public === true);
  } catch (error) {
    console.error("[SERVICES] Failed to load services:", error);
    return [];
  }
}

