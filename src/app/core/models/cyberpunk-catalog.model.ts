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

export interface CyberpunkClassProficiencias {
  resistencias: string[];
  armas: string[];
  armaduras: string[];
  ferramentas: string[];
  pericias: { escolher: number; opcoes: string[] };
}

export interface CyberpunkClassProgression {
  nivel: number;
  habilidade: string;
  descricao: string;
}

export interface CyberpunkClassCatalog {
  nome: string;
  descricao: string;
  flavorText?: string[];
  hpNivel1?: string;
  hpPorNivel?: string;
  ctBase?: number;
  ctBonusNiveis?: number[];
  ramBase?: number | null;
  proficiencias?: CyberpunkClassProficiencias;
  progressao?: CyberpunkClassProgression[];
  subclasses: CyberpunkSubclassCatalog[];
}

export interface CyberpunkAntecedenteCatalog {
  nome: string;
  emoji?: string;
  descricao: string;
  atributos: string[];
  talentoOrigem: string;
  talentoDescricao: string;
  dinheiroInicial: number;
  itensIniciais: string[];
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
  grupoLoja?: string; // 'armas' | 'acessorios' | 'protecao' | 'ct'
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
