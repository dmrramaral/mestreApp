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
  BACKEND_SYNC: 'https://mestre-app-backend.vercel.app',
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

export const CYBERPUN2080_SUBCLASSES_BY_CLASS: Record<string, readonly string[]> = {
  'Cromado': [
    'Adaptativo',
    'Brutal',
    'Juggernaut'
  ],
  'Medicânico': [
    'Cirurgião de Guerra',
    'Operador de Choque',
    'Biohacker'
  ],
  'Piloto': [
    'Fúria',
    'Líder',
    'Corredor Fantasma'
  ],
  'Samurai': [
    'Lâmina Viva',
    'Executor',
    'Duelista Neural'
  ],
  'Solo': [
    'Especialista em Rifles',
    'Especialista em Armas Pesadas',
    'Especialista em Corpo a Corpo'
  ],
  'Trilha-Redes': [
    'Arquiteto',
    'Fantasma Neural',
    'Operador de Combate'
  ]
};

export const CYBERPUN2080_CLASS_TRAITS: Record<string, Array<{ nome: string; descricao: string }>> = {
  'Cromado': [
    { nome: 'Aprimoramento Corpóreo', descricao: 'O corpo é um protótipo em evolução constante. Especialista em aprimoramento cibernético e resistência extrema.' }
  ],
  'Medicânico': [
    { nome: 'Suporte Médico-Tático', descricao: 'Especialista em manter aliados vivos em cenários extremos. Suporte médico-tático com biotecnologia avançada.' }
  ],
  'Piloto': [
    { nome: 'Domínio Veicular', descricao: 'Velocidade, mobilidade e controle de território urbano. Domina perseguições, fugas e combate veicular.' }
  ],
  'Samurai': [
    { nome: 'Eliminação Cirúrgica', descricao: 'Precisão, leitura de combate e eliminação cirúrgica. Executa alvos com foco e ritmo implacável.' }
  ],
  'Solo': [
    { nome: 'Guerra Urbana', descricao: 'Especialista em guerra urbana e confronto direto. Veterano de combate pesado em ruas e zonas de conflito.' }
  ],
  'Trilha-Redes': [
    { nome: 'Domínio Digital', descricao: 'Domina sistemas digitais, implantes e guerra de dados. Infiltração, sabotagem e controle da rede.' }
  ]
};

export const CYBERPUN2080_ORIGIN_TRAITS: Record<string, Array<{ nome: string; descricao: string }>> = {
  'Ex-Corporativo': [
    { nome: 'Rede Interna', descricao: 'Carrega contatos, vícios de poder e inimigos de megacorps. Conhece os bastidores corporativos por dentro.' }
  ],
  'Nômade': [
    { nome: 'Instinto de Estrada', descricao: 'Sobrevivente de estradas, comboios e zonas de fronteira. Adaptado à vida fora das cidades controladas.' }
  ],
  'Ex-Militar': [
    { nome: 'Treinamento de Guerra', descricao: 'Treinado para combate de alta pressão e disciplina tática. Formado em conflitos de alta intensidade.' }
  ],
  'Técnico': [
    { nome: 'Mão na Máquina', descricao: 'Especialista em reparos, improviso e leitura de falhas. Resolve problemas com tecnologia e criatividade.' }
  ],
  'Cria da Rua': [
    { nome: 'Código da Rua', descricao: 'Aprendeu a sobreviver nos becos, facções e mercados paralelos. Conhece as regras não escritas da cidade.' }
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
