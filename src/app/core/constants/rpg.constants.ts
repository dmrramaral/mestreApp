/**
 * Constantes para o sistema de RPG
 * Centraliza valores fixos usados em toda a aplicação
 */

/**
 * Faixas de raridade para loot/itens
 */
export const LOOT_RARITY_RANGES = {
  BAIXA: { min: 2, max: 9, nome: 'Baixa' },
  MEDIA: { min: 10, max: 15, nome: 'Média' },
  ALTA: { min: 16, max: 22, nome: 'Alta' },
  LENDARIA: { min: 23, max: 30, nome: 'Lendária' }
} as const;

/**
 * Faixas para cálculo de modificadores de atributos
 */
export const ATTRIBUTE_MODIFIER_RANGES = [
  { min: 8, max: 9, modifier: -1 },
  { min: 10, max: 11, modifier: 0 },
  { min: 12, max: 13, modifier: 1 },
  { min: 14, max: 15, modifier: 2 },
  { min: 16, max: 17, modifier: 3 },
  { min: 18, max: 19, modifier: 4 },
  { min: 20, max: 21, modifier: 5 },
  { min: 22, max: 23, modifier: 6 },
  { min: 24, max: 25, modifier: 7 },
  { min: 26, max: 27, modifier: 8 },
  { min: 28, max: 29, modifier: 9 },
  { min: 30, max: 30, modifier: 10 }
] as const;

/**
 * URLs das APIs externas
 */
export const API_URLS = {
  DND_MONSTERS: 'https://www.dnd5eapi.co/api/monsters',
  DND_EQUIPMENT: 'https://www.dnd5eapi.co/api/equipment'
} as const;

/**
 * Caminhos dos arquivos JSON locais
 */
export const JSON_PATHS = {
  MONSTERS: '/assets/dnd.json',
  MARKET: '/assets/mercado.json',
  ITEMS: '/assets/loot.json'
} as const;

/**
 * Chaves para localStorage
 */
export const STORAGE_KEYS = {
  PLAYER_CHARACTER: 'jogador',
  INITIATIVE_LIST: 'listaIniciativa',
  MARKET_CACHE: 'mercado_cache'
} as const;

/**
 * Avatar padrão
 */
export const DEFAULT_AVATAR = 'https://www.w3schools.com/howto/img_avatar.png';

/**
 * Tipos de proficiência em perícias
 */
export const SKILL_PROFICIENCY_TYPES = {
  NONE: 'nao',
  PROFICIENT: 'sim',
  EXPERTISE: 'expertise'
} as const;

/**
 * Lista de perícias do sistema D&D 5e adaptado
 */
export const SKILLS = [
  { nome: 'Atletismo', atributo: 'forca' },
  { nome: 'Briga', atributo: 'forca' },
  { nome: 'Acrobacia', atributo: 'destreza' },
  { nome: 'Furtividade', atributo: 'destreza' },
  { nome: 'Prestidigitação', atributo: 'destreza' },
  { nome: 'Resistência', atributo: 'constituicao' },
  { nome: 'Tolerância', atributo: 'constituicao' },
  { nome: 'Arcanismo', atributo: 'inteligencia' },
  { nome: 'Engenharia', atributo: 'inteligencia' },
  { nome: 'Investigação', atributo: 'inteligencia' },
  { nome: 'Natureza', atributo: 'inteligencia' },
  { nome: 'Religião', atributo: 'inteligencia' },
  { nome: 'Adestrar Animais', atributo: 'sabedoria' },
  { nome: 'Intuição', atributo: 'sabedoria' },
  { nome: 'Medicina', atributo: 'sabedoria' },
  { nome: 'Percepção', atributo: 'sabedoria' },
  { nome: 'Sobrevivência', atributo: 'sabedoria' },
  { nome: 'Atuação', atributo: 'carisma' },
  { nome: 'Enganação', atributo: 'carisma' },
  { nome: 'Intimidação', atributo: 'carisma' },
  { nome: 'Persuasão', atributo: 'carisma' }
] as const;

/**
 * Categorias de equipamento
 */
export const EQUIPMENT_CATEGORIES = [
  'Armas Corpo a Corpo',
  'Armas à Distância',
  'Armaduras Leves',
  'Armaduras Médias',
  'Armaduras Pesadas',
  'Escudos',
  'Itens Gerais',
  'Ferramentas',
  'Kits'
] as const;
