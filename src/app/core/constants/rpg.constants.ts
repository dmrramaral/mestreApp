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
  { nome: 'Hacking', atributo: 'inteligencia' },
  { nome: 'Tecnologia', atributo: 'inteligencia' },
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
 * Hacks Rápidos — Cyberpunk 2080
 */
export interface HackRapido {
  id: number;
  nome: string;
  descricao: string;
  efeito: string;
  ram: number;
  recarga: string;
  alvo: string;
  valor: number;
  dica: string;
}

export const HACKS_RAPIDOS: readonly HackRapido[] = [
  {
    id: 1,
    nome: 'Aceleração Forçada',
    descricao: 'Você interfere diretamente no controle do motor de um veículo ativo.',
    efeito: 'Concentração: Escolha até o fim do próximo turno: aumentar deslocamento em +50% (veículo sofre 1d8 Elétrico à Integridade Estrutural) ou reduzir pela metade. Em perseguições, o alvo sofre Desvantagem no próximo teste de Pilotagem.',
    ram: 2, recarga: '2 turnos', alvo: 'Veículo ativo', valor: 300,
    dica: 'Ideal para perseguições urbanas e controle de ritmo em fugas.'
  },
  {
    id: 2,
    nome: 'Amigo ou Inimigo',
    descricao: 'Redefine os parâmetros de identificação de ameaça de sistemas autônomos.',
    efeito: 'Concentração: Por 1 minuto, escolha: torreta/drone ignora seus aliados, ou ataca o alvo mais próximo.',
    ram: 5, recarga: '4 turnos', alvo: 'Torreta automática ou drone armado', valor: 500,
    dica: 'Perfeito para virar defesas contra seus próprios donos.'
  },
  {
    id: 3,
    nome: 'Bloqueio Total',
    descricao: 'Você assume controle crítico dos sistemas veiculares.',
    efeito: 'Concentração: O veículo fica Imobilizado — sem aceleração, direção ou frenagem.',
    ram: 6, recarga: '8 turnos', alvo: 'Veículo ativo', valor: 800,
    dica: 'Ideal para emboscadas e capturas de alto risco.'
  },
  {
    id: 4,
    nome: 'Contágio',
    descricao: 'Libera um vírus digital autorreplicante que se espalha entre alvos próximos.',
    efeito: 'Causa 1d4 de dano Psíquico por turno a todos em raio de 3m durante 2 turnos. Cada alvo faz teste de Constituição (CD 8 + mod INT + prof). Falha: náusea e perde Ação Bônus. Dano aumenta em +1d4 nos níveis 4, 8, 12 e 16.',
    ram: 6, recarga: '5 turnos', alvo: 'Humanos', valor: 1000,
    dica: 'Excelente contra grupos compactos e corredores fechados.'
  },
  {
    id: 5,
    nome: 'Curto-Circuito',
    descricao: 'Sobrecarga circuitos elétricos e implantes ativos.',
    efeito: 'Causa 2d6 Elétrico em humanos com implantes ou 4d6 Elétrico em máquinas. Dano aumenta em +1d6 nos níveis 4, 8, 12 e 16.',
    ram: 4, recarga: '3 turnos', alvo: 'Humanos com implantes, máquinas', valor: 350,
    dica: 'Confiável, barato e eficiente contra tecnologia pesada.'
  },
  {
    id: 6,
    nome: 'Cyberpsicose',
    descricao: 'Induz um colapso violento na psique ciberneticamente modificada do alvo.',
    efeito: 'Teste de Sabedoria (CD 8 + mod INT + prof). Falha: por 3 turnos o alvo recebe +2 FOR e DES, ganha +20 PV temporários e ataca qualquer um próximo.',
    ram: 14, recarga: '10 turnos', alvo: 'Humanos com excesso de implantes', valor: 1800,
    dica: 'Caos puro em combates lotados.'
  },
  {
    id: 7,
    nome: 'Defeito na Cibernética',
    descricao: 'Provoca falhas localizadas em implantes específicos.',
    efeito: 'Concentração: Um implante fica desabilitado por 2 turnos e hacks usados contra esse alvo custam –1 RAM.',
    ram: 5, recarga: '3 turnos', alvo: 'Humanos com implantes', valor: 600,
    dica: 'Ótimo para preparar alvos para hacks mais pesados.'
  },
  {
    id: 8,
    nome: 'Ligar ou Desligar',
    descricao: 'Força uma máquina a se desligar ou a se ligar.',
    efeito: 'Concentração: O alvo fica Desativado ou Ativado. Drones e robôs fazem Teste de Inteligência (CD 8 + mod INT + prof); sucesso cancela o hack.',
    ram: 4, recarga: '3 turnos', alvo: 'Torreta, Câmera, Drone ou Robô', valor: 300,
    dica: 'Botão de pânico para situações caóticas.'
  },
  {
    id: 9,
    nome: 'Desligar Comunicações',
    descricao: 'Interrompe transmissões neurais e digitais.',
    efeito: 'Concentração: O alvo não pode se comunicar eletronicamente, incluindo rádio, rede neural e implantes.',
    ram: 1, recarga: '2 turnos', alvo: 'Humanos ou sistemas de comunicação', valor: 200,
    dica: 'Excelente contra líderes e coordenação inimiga.'
  },
  {
    id: 10,
    nome: 'Destruir Firewall',
    descricao: 'Derruba defesas digitais ativas.',
    efeito: 'Concentração: O alvo sofre –2 na CF por 3 turnos.',
    ram: 5, recarga: '4 turnos', alvo: 'Humanos com implantes ou redes', valor: 500,
    dica: 'Abre caminho para hacks mais letais.'
  },
  {
    id: 11,
    nome: 'Desvio de Direção',
    descricao: 'Interfere nos sistemas de navegação veicular.',
    efeito: 'Até o fim do próximo turno, –2 em testes de Pilotagem.',
    ram: 2, recarga: '3 turnos', alvo: 'Veículo ativo', valor: 500,
    dica: 'Perfeito para jogar inimigos no trânsito ou becos.'
  },
  {
    id: 12,
    nome: 'Detonar Granada',
    descricao: 'Força um erro fatal de ativação.',
    efeito: 'Teste de Sabedoria (CD 8 + mod INT + prof). Falha: o alvo ativa e segura uma de suas próprias granadas. Role 1d6 para o tipo: 1 explosiva, 2 concussão, 3 fumaça, 4 PEM, 5 luz, 6 nenhuma.',
    ram: 8, recarga: '6 turnos', alvo: 'Humanos', valor: 1300,
    dica: 'Brutal contra inimigos fortemente armados.'
  },
  {
    id: 13,
    nome: 'Fantasma Digital',
    descricao: 'Cria loops e atrasos nas imagens de vigilância.',
    efeito: 'Concentração: Por 1 minuto, sistemas de vigilância ficam travados, não disparando alarmes.',
    ram: 4, recarga: '4 turnos', alvo: 'Sistema de vigilância', valor: 600,
    dica: 'Essencial para infiltrações silenciosas.'
  },
  {
    id: 14,
    nome: 'Formatar Memória',
    descricao: 'Apaga registros recentes de humanos ou robôs.',
    efeito: 'Teste de Sabedoria (CD 8 + mod INT + prof). Falha: o alvo esquece os últimos 10 minutos.',
    ram: 7, recarga: '4 turnos', alvo: 'Humanos ou robôs', valor: 900,
    dica: 'Ideal para fugas limpas.'
  },
  {
    id: 15,
    nome: 'Freio Fantasma',
    descricao: 'Ativa frenagem total abrupta em um veículo.',
    efeito: 'O deslocamento cai para 0. O motorista faz Teste de Pilotagem (CD 8 + mod INT + prof). Falha: passageiros sofrem 1d8 Contundente e Desvantagem em ataques até o próximo turno; veículo sofre 2d6 Contundente.',
    ram: 5, recarga: '6 turnos', alvo: 'Veículo ativo', valor: 700,
    dica: 'Excelente para capturas rápidas.'
  },
  {
    id: 16,
    nome: 'Furtar Dados',
    descricao: 'Acessa dados recentes do sistema neural do alvo.',
    efeito: 'Obtém memórias ou informações recentes do alvo.',
    ram: 9, recarga: '8 turnos', alvo: 'Humanos com implantes, robôs ou computadores', valor: 1100,
    dica: 'Perfeito para espionagem e chantagem.'
  },
  {
    id: 17,
    nome: 'Loop de Patrulha',
    descricao: 'Prende o alvo em um padrão de movimento repetitivo.',
    efeito: 'Concentração: Teste de Inteligência (CD 8 + mod INT + prof). Falha: o alvo repete seu último trajeto por 1 minuto.',
    ram: 3, recarga: '4 turnos', alvo: 'Drones, câmeras ou torretas', valor: 600,
    dica: 'Infiltração sem disparar alarmes.'
  },
  {
    id: 18,
    nome: 'Matar Sistema Neural',
    descricao: 'Desativa violentamente o sistema neural do alvo.',
    efeito: 'Teste de Constituição (CD 8 + mod INT + prof). Falha: 6d10 dano Psíquico; alvos com até 20 PV morrem instantaneamente. Sucesso: metade do dano e o alvo localiza o usuário.',
    ram: 15, recarga: '10 turnos', alvo: 'Humanos com implantes', valor: 2000,
    dica: 'Último recurso contra alvos de alto valor.'
  },
  {
    id: 19,
    nome: 'Olhos da Rede',
    descricao: 'Assume controle total de sistemas de câmeras.',
    efeito: 'Concentração: Por 10 minutos, alterna entre todas as câmeras no sistema, marca inimigos e ignora cegueira tática. Criaturas na mesma rede podem identificar a invasão.',
    ram: 2, recarga: '3 turnos', alvo: 'Sistema de câmeras', valor: 600,
    dica: 'Informação é poder.'
  },
  {
    id: 20,
    nome: 'Paralisar Sistema Nervoso',
    descricao: 'Trava impulsos neurais ou eletrônicos do alvo.',
    efeito: 'Teste de Constituição (CD 8 + mod INT + prof). Falha: alvo fica Atordoado por 2 turnos (pode repetir o teste a cada turno). Sofrer dano encerra a condição.',
    ram: 5, recarga: '5 turnos', alvo: 'Humanos ou androides', valor: 800,
    dica: 'Neutralização limpa.'
  },
  {
    id: 21,
    nome: 'Ping',
    descricao: 'Emite um pulso de rastreamento digital.',
    efeito: 'Revela todos conectados à rede em 35m por 2 minutos ao hackear um ponto de acesso.',
    ram: 1, recarga: '2 turnos', alvo: 'Pontos de Acesso', valor: 200,
    dica: 'Nunca entre no escuro.'
  },
  {
    id: 22,
    nome: 'Reforço de Sistemas',
    descricao: 'Otimiza implantes aliados para combate.',
    efeito: 'Concentração: +2 CA e +2 CF por 3 turnos.',
    ram: 4, recarga: '4 turnos', alvo: 'Alvos com implantes no cérebro e pernas', valor: 600,
    dica: 'Buff simples e eficiente.'
  },
  {
    id: 23,
    nome: 'Reiniciar Sinapses',
    descricao: 'Provoca sobrecarga sensorial no alvo.',
    efeito: 'Teste de Constituição (CD 8 + mod INT + prof). Falha: o alvo fica cego por 2 turnos e sofre Desvantagem em ações.',
    ram: 4, recarga: '3 turnos', alvo: 'Humanos ou androides', valor: 550,
    dica: 'Excelente contra atiradores.'
  },
  {
    id: 24,
    nome: 'Reflexos Acelerados',
    descricao: 'Aumenta o tempo de resposta neural de um aliado.',
    efeito: '+2 Destreza e 1 Ação Bônus extra por 1 turno.',
    ram: 5, recarga: '6 turnos', alvo: 'Alvos com implantes no cérebro', valor: 800,
    dica: 'Perfeito para viradas de combate.'
  },
  {
    id: 25,
    nome: 'Sobrecarga de Armamento',
    descricao: 'Força falha crítica em armas automatizadas.',
    efeito: 'Causa 2d6 Elétrico e impede ataques por 1 turno.',
    ram: 4, recarga: '4 turnos', alvo: 'Torreta ou drone', valor: 600,
    dica: 'Neutralização de maquinário.'
  },
  {
    id: 26,
    nome: 'Sobrecarga do Motor',
    descricao: 'Coloca o motor de um veículo em estado crítico.',
    efeito: 'Escolha: reduzir –6m de deslocamento por 1 turno ou causar 2d8 Elétrico. Em perseguições, conta como 1 sucesso automático.',
    ram: 6, recarga: '5 turnos', alvo: 'Veículo ativo', valor: 850,
    dica: 'Decide perseguições.'
  },
  {
    id: 27,
    nome: 'Suicídio',
    descricao: 'Implanta um comando autodestrutivo no alvo.',
    efeito: 'Teste de Sabedoria (CD 8 + mod INT + prof). Falha: o alvo realiza um Ataque Crítico contra si mesmo com sua arma.',
    ram: 15, recarga: '12 turnos', alvo: 'Humanos ou androides armados', valor: 1800,
    dica: 'Devastador. Não tem o que dizer.'
  },
  {
    id: 28,
    nome: 'Superaquecer',
    descricao: 'Eleva drasticamente a temperatura dos implantes do alvo.',
    efeito: '1d4 de dano Térmico por turno durante 2 turnos. Dano aumenta em 1d4 nos níveis 4, 8, 12 e 16.',
    ram: 4, recarga: '3 turnos', alvo: 'Humanos com implantes', valor: 300,
    dica: 'Dano consistente e pressão constante.'
  },
  {
    id: 29,
    nome: 'Tomada Remota',
    descricao: 'Ativa e movimenta veículos parados.',
    efeito: 'Move o veículo até 10m para bloquear, criar cobertura ou atropelar objetos.',
    ram: 4, recarga: '3 turnos', alvo: 'Veículo parado', valor: 700,
    dica: 'Controle de cenário.'
  },
  {
    id: 30,
    nome: 'Travar Arma',
    descricao: 'Bloqueia sistemas de disparo de armas de fogo.',
    efeito: 'A arma do alvo fica inutilizada por 2 turnos.',
    ram: 4, recarga: '3 turnos', alvo: 'Armas de fogo', valor: 400,
    dica: 'Simples, rápido e extremamente útil.'
  }
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
