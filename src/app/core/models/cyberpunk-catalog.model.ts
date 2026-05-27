export interface CyberpunkCatalogMeta {
  id?: string;
  slug?: string;
  source?: 'constants' | 'backend' | 'manual';
  sourceRef?: string;
  updatedAt?: string;
}

export interface CyberpunkSubclassLevel extends CyberpunkCatalogMeta {
  nivel: number;
  habilidade: string;
  descricao: string;
}

export interface CyberpunkSubclassCatalog extends CyberpunkCatalogMeta {
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

export interface CyberpunkClassProgression extends CyberpunkCatalogMeta {
  nivel: number;
  habilidade: string;
  descricao: string;
}

export interface CyberpunkClassCatalog extends CyberpunkCatalogMeta {
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

export interface CyberpunkAntecedenteCatalog extends CyberpunkCatalogMeta {
  nome: string;
  emoji?: string;
  descricao: string;
  atributos: string[];
  talentoOrigem: string;
  talentoDescricao: string;
  dinheiroInicial: number;
  itensIniciais: string[];
}

export interface CyberpunkTalentCatalog extends CyberpunkCatalogMeta {
  nome: string;
  descricao: string;
  classes: string[];
}

export interface CyberpunkStoreItem extends CyberpunkCatalogMeta {
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

export type CategoriaAcessorioArmaCatalog = 'mira' | 'carregador' | 'supressor';

export interface AcessorioArmaCatalog extends CyberpunkCatalogMeta {
  nome: string;
  categoria: CategoriaAcessorioArmaCatalog;
  descricao: string;
  efeito: string;
  valor: number;
  paginaPdf?: string;
}

export interface CyberpunkCatalog {
  system: 'cyberpun2080';
  version: number;
  seedVersion?: string;
  classes: CyberpunkClassCatalog[];
  antecedentes: CyberpunkAntecedenteCatalog[];
  talentos: CyberpunkTalentCatalog[];
  loja: CyberpunkStoreCatalog;
  acessoriosArmas?: AcessorioArmaCatalog[];
  updatedAt: string;
}

export interface CyberpunkTalentRow {
  talento: CyberpunkTalentCatalog;
  index: number;
}
