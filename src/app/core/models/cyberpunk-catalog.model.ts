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

export interface CyberpunkCatalog {
  system: 'cyberpun2080';
  version: number;
  classes: CyberpunkClassCatalog[];
  antecedentes: CyberpunkAntecedenteCatalog[];
  talentos: CyberpunkTalentCatalog[];
  updatedAt: string;
}

export interface CyberpunkTalentRow {
  talento: CyberpunkTalentCatalog;
  index: number;
}
