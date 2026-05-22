export interface CyberpunkSubclassLevel {
  nivel: number;
  habilidade: string;
  descricao: string;
}

export interface CyberpunkSubclassCatalog {
  nome: string;
  descricao: string;
  progressao: CyberpunkSubclassLevel[];
}

export interface CyberpunkClassCatalog {
  nome: string;
  descricao: string;
  subclasses: CyberpunkSubclassCatalog[];
}

export interface CyberpunkAntecedenteCatalog {
  nome: string;
  descricao: string;
  talentoOrigem: string;
}

export interface CyberpunkTalentCatalog {
  nome: string;
  descricao: string;
  classes: string[];
}

export interface CyberpunkStoreItem {
  nome: string;
  descricao: string;
  precoEdinhos: number | null;
  categoria: string;
  paginaPdf: string;
  ca?: number | null;
  cf?: number | null;
  ct?: number | null;
  restrito?: boolean;
}

export interface CyberpunkStoreCatalog {
  armas: CyberpunkStoreItem[];
  acessoriosMunicoes: CyberpunkStoreItem[];
  protecaoCorporal: CyberpunkStoreItem[];
  classeTecnologica: CyberpunkStoreItem[];
  hacksRapidos: CyberpunkStoreItem[];
}

export interface CyberpunkCatalog {
  system: 'cyberpun2080';
  version: number;
  classes: CyberpunkClassCatalog[];
  antecedentes: CyberpunkAntecedenteCatalog[];
  talentos: CyberpunkTalentCatalog[];
  loja: CyberpunkStoreCatalog;
  updatedAt: string;
}

export interface CyberpunkTalentRow {
  talento: CyberpunkTalentCatalog;
  index: number;
}
