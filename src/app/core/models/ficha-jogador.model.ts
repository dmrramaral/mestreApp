/**
 * Interfaces para o sistema de personagens de RPG
 */

/**
 * Atributos básicos de um personagem
 */
export interface Atributos {
  forca: number | null;
  destreza: number | null;
  constituicao: number | null;
  inteligencia: number | null;
  sabedoria: number | null;
  carisma: number | null;
  sorte: number | null;
}

/**
 * Tipo de proficiência em uma perícia
 */
export type TipoProficiencia = 'nao' | 'sim' | 'expertise';

/**
 * Perícia com seu valor de proficiência
 */
export interface Pericia {
  nome: string;
  valor: TipoProficiencia;
  atributo?: keyof Omit<Atributos, 'sorte'>;
}

/**
 * Item no inventário
 */
export interface ItemInventario {
  nome: string;
  descricao: string;
  quantidade?: number;
}

/**
 * Equipamento de uma categoria específica
 */
export interface Equipamento {
  nome: string;
  descricao?: string;
  categoria?: string;
}

/**
 * Magia conhecida pelo personagem
 */
export interface Magia {
  nome: string;
  nivel: number;
  escola?: string;
  descricao?: string;
}

/**
 * Talento do personagem
 */
export interface Talento {
  nome: string;
  descricao: string;
}

/**
 * Status de condição do personagem
 */
export interface StatusCondicao {
  fome: number | null;
  sede: number | null;
  cansaco: number | null;
  calor: number | null;
  frio: number | null;
  sono: number | null;
}

/**
 * Ficha completa do jogador
 */
export interface FichaJogador {
  avatar: string;
  nome: string;
  idade: number | null;
  classe: string;
  raca: string;
  nivel: number | null;
  pv: number | null;
  pontosVidaAtuais: number | null; // renomeado de pva
  ca: number | null;
  iniciativa: number | null;
  inspiracao: number | null;
  
  // Status de condição
  fome: number | null;
  sede: number | null;
  cansaco: number | null;
  calor: number | null;
  frio: number | null;
  sono: number | null;
  
  proficiencia: number | null;
  deslocamento: number | null;
  
  // Dados de jogo
  talentos: Talento[];
  atributos: Atributos;
  pericias: Pericia[];
  
  // Equipamentos por categoria
  armasCorpoACorpo?: Equipamento[];
  armasDistancia?: Equipamento[];
  armadurasLeves?: Equipamento[];
  armadurasMedias?: Equipamento[];
  armadurasPesadas?: Equipamento[];
  escudos?: Equipamento[];
  itensGerais?: Equipamento[];
  ferramentas?: Equipamento[];
  kits?: Equipamento[];
  
  // Inventário
  mochila?: ItemInventario[];
  
  // Magias
  magias?: Magia[];
}

/**
 * Versão legada da ficha (para compatibilidade com código existente)
 * @deprecated Use FichaJogador ao invés
 */
export interface FichaJogadorLegacy {
  avatar: string;
  nome: string;
  idade: number | null;
  classe: string;
  raca: string;
  nivel: number | null;
  pv: number | null;
  pva: number | null;
  ca: number | null;
  iniciativa: number | null;
  inspiracao: number | null;
  fome: number | null;
  sede: number | null;
  cansaco: number | null;
  calor: number | null;
  frio: number | null;
  sono: number | null;
  proficiencia: number | null;
  deslocamento: number | null;
  talentos: any[];
  atributos: any;
  pericias: any[];
  [key: string]: any;
}
