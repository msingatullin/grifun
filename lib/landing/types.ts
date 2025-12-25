export type LandingSpec = {
  query: string;
  audience: {
    industry?: string;
    department?: string;
    context?: string;
  };
  hero: {
    h1: string;
    subtitle: string;
    bullets: string[];
  };
  pains: string[];
  solutions: {
    title: string;
    items: string[];
  };
  process: string[]; // общий блок можно брать готовый
  proof: {
    trustBullets: string[];
    caseSnippets: {
      title: string;
      result: string;
    }[];
  };
  cta: {
    primary: string;
    formTitle: string;
    formHint: string;
  };
  seo: {
    title: string;
    description: string;
    h1?: string;
    canonical?: string;
  };
  compliance: {
    claimsLevel: "strict" | "normal";
    disclaimers: string[];
  };
};

export type LandingCache = {
  spec: LandingSpec;
  createdAt: string;
  expiresAt: string;
  query: string;
  slug: string;
};

