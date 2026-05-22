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
  BACKEND_SYNC: 'https://mestre-app-backend-dmrramarals-projects.vercel.app',
  DND_MONSTERS: 'https://www.dnd5eapi.co/api/monsters',
  DND_EQUIPMENT: 'https://www.dnd5eapi.co/api/2024/equipment',
  DND_API_2024: 'https://www.dnd5eapi.co/api/2024',
  DND_ABILITY_SCORES: 'https://www.dnd5eapi.co/api/2024/ability-scores',
  DND_ALIGNMENTS: 'https://www.dnd5eapi.co/api/2024/alignments',
  DND_CONDITIONS: 'https://www.dnd5eapi.co/api/2024/conditions',
  DND_DAMAGE_TYPES: 'https://www.dnd5eapi.co/api/2024/damage-types',
  DND_EQUIPMENT_CATEGORIES: 'https://www.dnd5eapi.co/api/2024/equipment-categories',
  DND_LANGUAGES: 'https://www.dnd5eapi.co/api/2024/languages',
  DND_MAGIC_SCHOOLS: 'https://www.dnd5eapi.co/api/2024/magic-schools',
  DND_SKILLS: 'https://www.dnd5eapi.co/api/2024/skills',
  DND_WEAPON_MASTERY_PROPERTIES: 'https://www.dnd5eapi.co/api/2024/weapon-mastery-properties',
  DND_WEAPON_PROPERTIES: 'https://www.dnd5eapi.co/api/2024/weapon-properties'
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
  PLAYER_CHARACTER_PREFIX: 'jogador:',
  PLAYER_SELECTED_CHARACTER_PREFIX: 'jogador:selected:',
  PLAYER_LAST_SYNC_PREFIX: 'jogador:last-sync:',
  PLAYER_SESSION: 'jogador_sessao',
  INITIATIVE_LIST: 'listaIniciativa',
  MARKET_CACHE: 'mercado_cache'
} as const;

/**
 * Sistemas de RPG suportados
 */
export const RPG_SYSTEMS = {
  DND5E: 'dnd5e',
  CYBERPUN2080: 'cyberpun2080'
} as const;

export type RpgSystemType = typeof RPG_SYSTEMS[keyof typeof RPG_SYSTEMS];

export const RPG_SYSTEM_OPTIONS: Array<{ id: RpgSystemType; nome: string }> = [
  { id: RPG_SYSTEMS.DND5E, nome: 'D&D 5e' },
  { id: RPG_SYSTEMS.CYBERPUN2080, nome: 'CyberPun2080' }
];

/**
 * Configuração base de regras para CyberPun2080
 * Fonte: PDF Cyberpunk 2080 (introdução + progressão e criação de personagem)
 */
export const CYBERPUN2080_RULES = {
  dadosSuportados: ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'] as const,
  nivelMinimo: 1,
  nivelMaximo: 20,
  atribuicoesBase: [15, 14, 13, 12, 10, 8] as const,
  limiteAtributoNatural: 20,
  niveisEvolucaoAtributoOuTalento: [4, 8, 12, 16, 20] as const,
  classes: [
    'Cromado',
    'Medicânico',
    'Piloto',
    'Samurai',
    'Solo',
    'Trilha-Redes'
  ] as const,
  atributos: [
    { sigla: 'FOR', nome: 'Força' },
    { sigla: 'DES', nome: 'Destreza' },
    { sigla: 'CON', nome: 'Constituição' },
    { sigla: 'INT', nome: 'Inteligência' },
    { sigla: 'SAB', nome: 'Sabedoria' },
    { sigla: 'CAR', nome: 'Carisma' }
  ] as const
};

export const CYBERPUN2080_ESSENTIAL_QUESTIONS = [
  'Você é de Night City? Se sim, por que ainda não conseguiu sair? Se não, o que fez você vir pra cá e ficar?',
  'O que você já perdeu por causa da cidade?',
  'O que você deseja conquistar, custe o que custar?',
  'Qual é a sua maior cicatriz invisível?',
  'O que pode te destruir se alguém descobrir?'
] as const;

export const CYBERPUN2080_MODULES = [
  'Equipamentos e Tecnologia',
  'Implantes Cibernéticos',
  'Hacking',
  'Veículos',
  'Consumíveis, Drogas e Vícios',
  'Forças da Cidade'
] as const;

export const CYBERPUN2080_CITY_FORCES = [
  'Corporações',
  'Canais de informação',
  'Gangues',
  'Polícia de Night City / Max-Tac',
  'Trauma Team'
] as const;

export const CYBERPUN2080_ORIGINS = [
  'Megacorp',
  'Rua',
  'Nômade',
  'Favela Vertical',
  'Zona de Combate',
  'Subúrbio Industrial'
] as const;

export const CYBERPUN2080_CLASS_TRAITS: Record<string, Array<{ nome: string; descricao: string }>> = {
  'Cromado': [
    { nome: 'Corpo Aprimorado', descricao: 'Você recebe vantagem narrativa em ações que dependem de resistência física e força mecânica.' },
    { nome: 'Sobrecarga de Implantes', descricao: 'Pode forçar implantes por curto período para ganho tático, assumindo risco de estresse neural.' }
  ],
  'Medicânico': [
    { nome: 'Protocolos de Emergência', descricao: 'Consegue estabilizar aliados em combate e reduzir impacto de ferimentos críticos.' },
    { nome: 'Manutenção de Campo', descricao: 'Repara implantes e equipamentos sob pressão com eficiência superior.' }
  ],
  'Piloto': [
    { nome: 'Manobra Defensiva', descricao: 'Recebe vantagem em perseguições e evasão com veículos.' },
    { nome: 'Leitura de Rota', descricao: 'Identifica rotas de fuga e pontos de risco com rapidez.' }
  ],
  'Samurai': [
    { nome: 'Ataque Cirúrgico', descricao: 'Especialista em eliminar alvos rapidamente com precisão e discrição.' },
    { nome: 'Foco Letal', descricao: 'Ganha bônus tático ao iniciar combate em vantagem posicional.' }
  ],
  'Solo': [
    { nome: 'Doutrina de Guerra Urbana', descricao: 'Desempenho aprimorado em confrontos diretos e fogo pesado.' },
    { nome: 'Sangue Frio', descricao: 'Resiste melhor a intimidação e pressão em cenários extremos.' }
  ],
  'Trilha-Redes': [
    { nome: 'Invasão Tática', descricao: 'Consegue manipular sistemas e implantes inimigos durante operações.' },
    { nome: 'Fantasma da Rede', descricao: 'Reduz rastros digitais e melhora infiltração em ambientes conectados.' }
  ]
};

export const CYBERPUN2080_ORIGIN_TRAITS: Record<string, Array<{ nome: string; descricao: string }>> = {
  'Megacorp': [
    { nome: 'Etiqueta Corporativa', descricao: 'Facilidade para negociar com executivos, seguranças e burocracias corporativas.' }
  ],
  'Rua': [
    { nome: 'Rede de Rua', descricao: 'Acesso facilitado a contatos locais, boatos e mercado paralelo.' }
  ],
  'Nômade': [
    { nome: 'Sobrevivência Itinerante', descricao: 'Maior adaptação a deslocamentos longos e territórios hostis.' }
  ],
  'Favela Vertical': [
    { nome: 'Guerra de Território', descricao: 'Experiência em combate de proximidade e navegação em áreas densas.' }
  ],
  'Zona de Combate': [
    { nome: 'Instinto de Conflito', descricao: 'Percepção apurada para emboscadas e ameaças imediatas.' }
  ],
  'Subúrbio Industrial': [
    { nome: 'Engenharia de Sucata', descricao: 'Consegue improvisar ferramentas e soluções com recursos limitados.' }
  ]
};

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
  { nome: 'Persuasão', atributo: 'carisma' },
  { nome: 'Adivinhação', atributo: 'sabedoria' },
  { nome: 'Jogos de Azar', atributo: 'carisma' },
  { nome: 'Sincronicidade', atributo: 'sabedoria' }
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
