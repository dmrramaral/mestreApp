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

/**
 * Implantes Cibernéticos — Cyberpunk 2080
 */
export type TipoImplante =
  | 'sistema-operacional'
  | 'cerebro'
  | 'olhos'
  | 'coracao'
  | 'sistema-imunologico'
  | 'pele'
  | 'maos'
  | 'bracos'
  | 'pernas'
  | 'ossos';

export type SubtipoSistemaOperacional = 'cyberdeck' | 'frenesi' | 'sandevistan';

export interface Implante {
  id: string;
  nome: string;
  tipo: TipoImplante;
  subtipo?: SubtipoSistemaOperacional;
  foco: string;
  ct: number;
  valor: number;
  habilidades: string[];
  dica: string;
}

export const GRUPOS_IMPLANTE: Readonly<Record<string, string>> = {
  'sistema-operacional': '🧠 Sistema Operacional',
  'cerebro': '🧠 Cérebro',
  'olhos': '👁️ Olhos',
  'coracao': '❤️ Coração',
  'sistema-imunologico': '🧬 Sistema Imunológico',
  'pele': '🧬 Pele',
  'maos': '✋ Mãos',
  'bracos': '🦾 Braços',
  'pernas': '🦿 Pernas',
  'ossos': '🦴 Ossos'
};

export const TIPOS_IMPLANTE: TipoImplante[] = [
  'sistema-operacional', 'cerebro', 'olhos', 'coracao',
  'sistema-imunologico', 'pele', 'maos', 'bracos', 'pernas', 'ossos'
];

export const IMPLANTES: readonly Implante[] = [
  // ─────────────────── SISTEMA OPERACIONAL — Cyberdeck ───────────────────
  {
    id: 'ghostline-r3',
    nome: 'Raven Microtech Neural Interface — "Ghostline R-3"',
    tipo: 'sistema-operacional', subtipo: 'cyberdeck',
    foco: 'Hacks rápidos básicos, infiltração urbana, aprendizado.',
    ct: 4, valor: 2000,
    habilidades: [
      'RAM Total: 5 + modificador de Inteligência + bônus de proficiência',
      'Capacidade de Hacks: 4',
      'Linha Limpa: O primeiro Hack Rápido que você usar em um combate custa –1 RAM (mínimo 1).'
    ],
    dica: 'Perfeita como primeira interface para aprender Hacks e economizar RAM no início da carreira.'
  },
  {
    id: 'kt-synapse-7',
    nome: 'Arasaka Neural Driver — "K-T Synapse 7"',
    tipo: 'sistema-operacional', subtipo: 'cyberdeck',
    foco: 'Controle de drones, munição inteligente, suporte armado.',
    ct: 5, valor: 3000,
    habilidades: [
      'RAM Total: 6 + modificador de Inteligência + bônus de proficiência',
      'Capacidade de Hacks: 5',
      'Controle de Drones: Pode controlar 1 drone ou torreta adicional além do limite normal.'
    ],
    dica: 'Ótima para iniciantes e para builds focadas em drones e suporte ofensivo.'
  },
  {
    id: 'pulsemind',
    nome: 'Zetatech Neural OS 4.1 — "PulseMind"',
    tipo: 'sistema-operacional', subtipo: 'cyberdeck',
    foco: 'Multitarefa e conectividade.',
    ct: 5, valor: 3800,
    habilidades: [
      'RAM Total: 6 + modificador de Inteligência + bônus de proficiência',
      'Capacidade de Hacks: 6',
      'Pop-up: 1 vez por turno. Ao aplicar um Hack Rápido, pode aplicar outro imediatamente com custo dobrado, desde que cada um custe 8 RAM ou menos.'
    ],
    dica: 'Excelente para turnos cheios de ação e Hacks em sequência.'
  },
  {
    id: 'smartpulse',
    nome: 'Kang Tao Interface Neural A-6 — "SmartPulse"',
    tipo: 'sistema-operacional', subtipo: 'cyberdeck',
    foco: 'Precisão digital, armas inteligentes, estabilização neural.',
    ct: 6, valor: 4500,
    habilidades: [
      'RAM Total: 7 + modificador de Inteligência + bônus de proficiência',
      'Capacidade de Hacks: 7',
      'Sincronização Smart-Link: +2 em ataques à distância com armas inteligentes.',
      'Retícula Dinâmica: 1 vez por turno, 4 RAM. Pode rerrolar um ataque à distância que tenha errado.'
    ],
    dica: 'Perfeita para quem alterna entre combate armado e Hacks.'
  },
  {
    id: 'warframe-sync',
    nome: 'Militech Interface Neural 2.5 — "Warframe Sync"',
    tipo: 'sistema-operacional', subtipo: 'cyberdeck',
    foco: 'Operações militares e hacks rápidos.',
    ct: 7, valor: 5600,
    habilidades: [
      'RAM Total: 7 + modificador de Inteligência + bônus de proficiência',
      'Capacidade de Hacks: 8',
      'Médico Interno: 1 vez por combate, alcance 5m, 3 RAM, Ação. Cure um alvo com implantes no Coração, Sistema Nervoso ou Cérebro em 3d8 + modificador de Inteligência + bônus de proficiência.',
      'Sincronização Tática: 1 vez por descanso curto, 2 RAM. Escolha: Vantagem em um ataque à distância seu, ou de um aliado visível.',
      'Breach Militar: 1 vez por descanso curto, 3 RAM. Ao realizar uma invasão, pode aplicar 2 hacks rápidos, desde que a soma de ambos tenha um custo máximo de 6 RAM. Aumentando para 8 no nível 12 e 10 no nível 16.'
    ],
    dica: 'Ideal para combates diretos e esquadrões bem coordenados.'
  },
  {
    id: 'kuroi-koken',
    nome: 'Arasaka Interface Neural Mk.III — "Kuroi Kōken"',
    tipo: 'sistema-operacional', subtipo: 'cyberdeck',
    foco: 'Hacker profundo, sigilo, segurança corpo-elite.',
    ct: 8, valor: 6000,
    habilidades: [
      'RAM Total: 8 + modificador de Inteligência + bônus de proficiência',
      'Capacidade de Hacks: 9',
      'Eco Digital: Ao usar um Hack Rápido de custo 8 RAM ou menos e que impõe um teste de resistência, a CD desse Hack Rápido aumenta em +1.',
      'CAI Arasaka: 1 vez por combate, Reação. Cancela um ataque hacker inimigo contra você e causa 2d6 de dano Psíquico + modificador de Inteligência + bônus de proficiência ao invasor.',
      'Ghost Protocol: Ação Bônus, 4 RAM. Você se torna indetectável por sensores digitais, câmeras ou olhos cibernéticos por 1 minuto.'
    ],
    dica: 'Ideal para infiltração, neutralização de hackers inimigos e controle absoluto de alvos-chave.'
  },
  {
    id: 'overclock-sovereign',
    nome: 'Tetratronic Neural OS — "Overclock Sovereign"',
    tipo: 'sistema-operacional', subtipo: 'cyberdeck',
    foco: 'Velocidade absurda, hacks extremos, overclock instável.',
    ct: 10, valor: 8000,
    habilidades: [
      'RAM Total: 10 + modificador de Inteligência + bônus de proficiência',
      'Capacidade de Hacks: 10',
      'Overclock Absoluto: 1 vez por descanso curto, dura 5 turnos. Hacks custam –2 RAM (mínimo 1), concede Vantagem em Ataques Hacks e Acerto Crítico em 19–20 em Ataques Hacks.',
      'Burn-Out: Após o Overclock, teste de Constituição CD 14 — Sucesso: Recupera 10 PV. Falha: Lento por 1 rodada e perde 2 RAM máxima até o próximo descanso curto.',
      'Matriz Paralela: 1 vez por turno, Reação. Se falhar em uma invasão por até 2 pontos, pode gastar 1 RAM para transformar em sucesso.'
    ],
    dica: 'Feita para momentos decisivos — use quando precisa quebrar o sistema… antes que ele quebre você.'
  },
  // ─────────────────── SISTEMA OPERACIONAL — Frenesi ───────────────────
  {
    id: 'oni-drive',
    nome: 'Zetatech Frenzy OS A-77 — "Oni Drive"',
    tipo: 'sistema-operacional', subtipo: 'frenesi',
    foco: 'Execução rápida e dano explosivo.',
    ct: 8, valor: 4500,
    habilidades: [
      'Ativação: Ação Bônus, dura 1 minuto. Concede +2 em Força.',
      'Ataques Brutais: Seus ataques corpo a corpo rolam um dado de dano extra em Acertos Críticos.',
      'Sede de Sangue: 1 vez por turno, Ação Bônus. Ao reduzir um inimigo a 0 PV, pode realizar um ataque corpo a corpo adicional.'
    ],
    dica: 'Perfeito para eliminar alvos em sequência. Brilha contra grupos — mas exige posicionamento agressivo.'
  },
  {
    id: 'warhound-protocol',
    nome: 'Militech Frenzy OS M-01 — "Warhound Protocol"',
    tipo: 'sistema-operacional', subtipo: 'frenesi',
    foco: 'Brutalidade direta, combate corpo a corpo puro.',
    ct: 8, valor: 5000,
    habilidades: [
      'Ativação: Ação Bônus, dura 1 minuto. Concede +2 em Força.',
      'Impacto Devastador: 1 vez por turno. Ao acertar um ataque corpo a corpo, causa +1d6 de dano extra do mesmo tipo da arma.',
      'O Imparável: Não pode ser Empurrado ou Derrubado à força.'
    ],
    dica: 'Feito para quebrar linhas inimigas. Simples, violento e extremamente confiável — o Frenesi "clássico".'
  },
  {
    id: 'razorstorm',
    nome: 'Dynalar Frenzy OS KX — "Razorstorm"',
    tipo: 'sistema-operacional', subtipo: 'frenesi',
    foco: 'Combate híbrido, armas brancas e mobilidade ofensiva.',
    ct: 9, valor: 6000,
    habilidades: [
      'Ativação: Ação Bônus, dura 1 minuto. Concede +2 em Força.',
      'Corte Cinético: Seus ataques corpo a corpo com lâminas ignoram resistência a dano Cortante.',
      'Dança da Carnificina: Sempre que acertar um ataque corpo a corpo, pode se mover até 3 metros sem provocar ataques de oportunidade.'
    ],
    dica: 'Frenesi técnico e estiloso. Ideal para lâminas, builds rápidas e para quem gosta de se mover o tempo todo.'
  },
  {
    id: 'deadeye-overdrive',
    nome: 'Arasaka Frenzy OS Z-Δ — "Deadeye Overdrive"',
    tipo: 'sistema-operacional', subtipo: 'frenesi',
    foco: 'Frenesi à distância — agressão máxima com armas de fogo.',
    ct: 10, valor: 8000,
    habilidades: [
      'Ativação: Ação Bônus, dura 1 minuto. Concede +2 em Força.',
      'Supressão Total: Ataques à distância ignoram meia cobertura e três-quartos de cobertura.',
      'Ritmo de Extermínio: 1 vez por turno. Ao acertar um ataque à distância, causa +1d10 de dano extra.'
    ],
    dica: 'Frenesi para quem não entra no soco — transforma tiroteios em massacres controlados.'
  },
  // ─────────────────── SISTEMA OPERACIONAL — Sandevistan ───────────────────
  {
    id: 'falcon-drive',
    nome: 'Militech Sandevistan Mk.4 — "Falcon Drive"',
    tipo: 'sistema-operacional', subtipo: 'sandevistan',
    foco: 'Agressão direta e domínio de espaço.',
    ct: 8, valor: 4800,
    habilidades: [
      'Ativação: Ação Bônus, dura 3 turnos. Concede +2 em Destreza.',
      'Ataque Relâmpago: 2 vezes por turno. Após se mover pelo menos 6m antes de um ataque, você se energiza e causa +1d8 de dano extra no próximo ataque.',
      'Quebra de Linha: Ignora terreno difícil enquanto se move e efeitos que reduzam deslocamento.'
    ],
    dica: 'O Sandevistan mais "bruto". Ideal para entrar, matar e sair antes que alguém reaja.'
  },
  {
    id: 'kage-loop',
    nome: 'Arasaka Sandevistan Type-R — "Kage Loop"',
    tipo: 'sistema-operacional', subtipo: 'sandevistan',
    foco: 'Assassinato preciso e letalidade cirúrgica.',
    ct: 8, valor: 5400,
    habilidades: [
      'Ativação: Ação Bônus, dura 3 turnos. Concede +2 em Destreza.',
      'Execução Temporal: 1 vez por combate. Se atacar um alvo que ainda não agiu no combate, causa +2d6 de dano adicional.',
      'Fantasma Vermelho: Ataques furtivos não revelam sua posição para criaturas que não tenham visão de você.'
    ],
    dica: 'Perfeito para eliminar alvos-chave antes que o combate realmente comece.'
  },
  {
    id: 'reflex-burn',
    nome: 'Zetatech Sandevistan Z-5 — "Reflex Burn"',
    tipo: 'sistema-operacional', subtipo: 'sandevistan',
    foco: 'Tiroteios insanos e domínio à distância.',
    ct: 9, valor: 6000,
    habilidades: [
      'Ativação: Ação Bônus, dura 3 turnos. Concede +2 em Destreza.',
      'Rajada Impossível: 1 vez por turno, Ação Bônus. Pode realizar um ataque à distância adicional com Desvantagem.',
      'Mira Sobre-Humana: +1 em ataques à distância e ignora cobertura leve.'
    ],
    dica: 'Transforma armas de fogo em extensões do corpo. Ideal para builds de pistola, SMG e rifle.'
  },
  {
    id: 'chrono-breaker',
    nome: 'Dynalar Sandevistan X-Ω — "Chrono Breaker"',
    tipo: 'sistema-operacional', subtipo: 'sandevistan',
    foco: 'Controle absoluto do turno e reação extrema.',
    ct: 10, valor: 8000,
    habilidades: [
      'Ativação: Ação Bônus, dura 3 turnos. Concede +2 em Destreza.',
      'Quebra de Sequência: 1 vez por combate. Pode interromper a ação de um inimigo visível e agir imediatamente (como se fosse um turno extra curto: movimento de até 5m + 1 ação). Após encerrar sua Ação, volta ao turno do inimigo.',
      'Reflexo Absoluto: Ganha uma Reação adicional por rodada enquanto o Sandevistan estiver ativo.'
    ],
    dica: 'O mais poderoso e perigoso. Domina o ritmo do combate.'
  },
  // ─────────────────── CÉREBRO ───────────────────
  {
    id: 'ram-pocket',
    nome: 'Zetatech Neural Buffer — "RAM Pocket"',
    tipo: 'cerebro',
    foco: 'Gerenciamento de recursos.',
    ct: 2, valor: 1200,
    habilidades: [
      'Firewall Simples: Aumenta a Classe de Firewall (CF) em +1.',
      'Reserva Emergencial: 1 vez por turno, Ação Bônus. Pode acessar até 5 pontos de RAM armazenados, que podem ser usados imediatamente. A reserva é restaurada após um descanso curto.'
    ],
    dica: 'Simples, barato e extremamente eficiente para momentos decisivos.'
  },
  {
    id: 'netwatch',
    nome: 'Militech Threat Analyzer — "NetWatch"',
    tipo: 'cerebro',
    foco: 'Antecipação digital.',
    ct: 2, valor: 1500,
    habilidades: [
      'Firewall Simples: Aumenta a Classe de Firewall (CF) em +1.',
      'Previsão: 1 vez por combate, Reação. Ao ser atacado por um Ataque Hack, role 1d4 e adicione o valor à sua CF contra este Ataque Hack. Caso seu bônus de Inteligência seja negativo, o valor será reduzido neste bônus (mínimo 1).'
    ],
    dica: 'Ótimo contra trilhas iniciantes.'
  },
  {
    id: 'signal-guard',
    nome: 'Zetatech NeuroShield — "Signal Guard"',
    tipo: 'cerebro',
    foco: 'Consistência defensiva.',
    ct: 3, valor: 1600,
    habilidades: [
      'Firewall Simples: Aumenta a Classe de Firewall (CF) em +1.',
      'Estabilidade: Vantagem em testes contra efeitos causados por Hacks Rápidos que custem até 4 de RAM.'
    ],
    dica: 'Simples e eficiente — padrão ouro.'
  },
  {
    id: 'clearmind-core',
    nome: 'Biotechnica Cognitive Filter — "ClearMind Core"',
    tipo: 'cerebro',
    foco: 'Sinergia com outros implantes.',
    ct: 3, valor: 1800,
    habilidades: [
      'Firewall Simples: Aumenta a Classe de Firewall (CF) em +1.',
      'Blindagem Psíquica: Aumenta a Classe Tecnológica (CT) em 2.'
    ],
    dica: 'Excelente aumento de tolerância a implantes.'
  },
  {
    id: 'reflex-weave',
    nome: 'Raven Microtech Synapse Booster — "Reflex Weave"',
    tipo: 'cerebro',
    foco: 'Reação rápida.',
    ct: 4, valor: 2000,
    habilidades: [
      'Firewall Simples: Aumenta a Classe de Firewall (CF) em +1.',
      'Sinapses Aceleradas: Vantagem em testes de Iniciativa.'
    ],
    dica: 'Implante ofensivo para quem quer agir antes.'
  },
  {
    id: 'neural-stack-plus',
    nome: 'Zetatech RAM Expander — "Neural Stack+"',
    tipo: 'cerebro',
    foco: 'Aumento direto de capacidade de hacking enquanto se defende.',
    ct: 5, valor: 2800,
    habilidades: [
      'Firewall Avançado: Aumenta a Classe de Firewall (CF) em +2.',
      'Amplificador de RAM Neural: Aumenta sua RAM máxima em +2.'
    ],
    dica: 'Base sólida para qualquer Trilha-Redes.'
  },
  {
    id: 'black-ice-node',
    nome: 'Arasaka Firewall Core — "Black ICE Node"',
    tipo: 'cerebro',
    foco: 'Defesa absoluta contra hacking.',
    ct: 5, valor: 3200,
    habilidades: [
      'Firewall Avançado: Aumenta a Classe de Firewall (CF) em +2.',
      'Contra-Intrusão: 1 vez por combate, Reação. Ao realizar um teste de resistência contra um Hack Rápido, obtém Vantagem contra este teste.'
    ],
    dica: 'Defesa de elite contra invasões.'
  },
  {
    id: 'deadeye-loop',
    nome: 'Dynalar Precision Cortex — "DeadEye Loop"',
    tipo: 'cerebro',
    foco: 'Precisão extrema e foco contínuo.',
    ct: 6, valor: 3400,
    habilidades: [
      'Firewall Avançado: Aumenta a Classe de Firewall (CF) em +2.',
      'Córtex de Precisão: Vantagem em ataques à distância com armas de fogo e em testes de Pilotagem em combate.',
      'Foco em Alvo: Se atacar o mesmo alvo em dois turnos seguidos, recebe +1 de CA até o início do próximo turno.'
    ],
    dica: 'Ideal para atiradores e motoristas.'
  },
  {
    id: 'ram-flow',
    nome: 'Kang Tao Algorithm Optimizer — "RAM Flow"',
    tipo: 'cerebro',
    foco: 'Eficiência máxima de hacks.',
    ct: 6, valor: 3800,
    habilidades: [
      'Firewall Avançado: Aumenta a Classe de Firewall (CF) em +2.',
      'Otimização de Algoritmo: Reduz em –1 RAM o custo de hacks que custem até 5 RAM (mínimo 1).',
      'Código Fluido: Aumenta em 1 turno a duração de hacks que duram mais de 1 turno.'
    ],
    dica: 'Transforma RAM em um recurso extremamente durável ao longo do combate.'
  },
  {
    id: 'blackclock',
    nome: 'Militech Processor — "BlackClock"',
    tipo: 'cerebro',
    foco: 'Explosão de ações e hacks agressivos.',
    ct: 7, valor: 5000,
    habilidades: [
      'Firewall Superior: Aumenta a Classe de Firewall (CF) em +3.',
      'CAI: 1 vez por combate, Reação. Anula um ataque hacker contra você ou sistema em que você esteja plugado e causa 2d8 + Inteligência de dano Psíquico ao atacante.',
      'Estresse Neural: 1 vez por turno. Ao acertar um ataque hacker, cause 10 - o bônus de Inteligência do alvo de dano Psíquico extra.'
    ],
    dica: 'Brutal, poderoso e perigoso — perfeito para momentos críticos.'
  },
  {
    id: 'shinkei-mesh',
    nome: 'Arasaka Parallel Cortex — "Shinkei Mesh"',
    tipo: 'cerebro',
    foco: 'Multitarefa absoluta e domínio digital.',
    ct: 7, valor: 5800,
    habilidades: [
      'Firewall Superior: Aumenta a Classe de Firewall (CF) em +3.',
      'CAI: 1 vez por combate, Reação. Anula um ataque hacker contra você ou sistema em que você esteja plugado e causa 2d8 + Inteligência de dano Psíquico ao atacante.',
      'Estabilidade de Processo: 1 vez por turno. Pode realizar um teste de Inteligência (CD16) para anular uma falha ao hackear um alvo e rerrolar o dado.'
    ],
    dica: 'Implante de elite para hackers de alto nível — poderoso e claramente desleal.'
  },
  // ─────────────────── OLHOS ───────────────────
  {
    id: 'eaglesight-lite',
    nome: 'Kiroshi Visual Assist — "EagleSight Lite"',
    tipo: 'olhos',
    foco: 'Percepção aprimorada.',
    ct: 1, valor: 1300,
    habilidades: [
      'Olho de Águia: Vantagem em testes de Percepção (Visão).'
    ],
    dica: 'Implante básico e extremamente útil fora de combate.'
  },
  {
    id: 'nighthunter',
    nome: 'Kiroshi Dual Spectrum — "NightHunter"',
    tipo: 'olhos',
    foco: 'Utilidade de combate.',
    ct: 2, valor: 1600,
    habilidades: [
      'Visão Térmica Avançada: Permite enxergar assinaturas de calor através de fumaça e escuridão.'
    ],
    dica: 'Muito bom em locais de caos urbano.'
  },
  {
    id: 'static-lens',
    nome: 'Kiroshi Anti-Hack Optics — "Static Lens"',
    tipo: 'olhos',
    foco: 'Interferência.',
    ct: 2, valor: 1800,
    habilidades: [
      'Ruído Óptico: Inimigos que você tem contato visual recebem -1 em Ataques de Hacks contra você.'
    ],
    dica: 'Defesa indireta, stacka bem com a Classe de Firewall.'
  },
  {
    id: 'threatwatch-hud',
    nome: 'Kiroshi Tactical HUD — "ThreatWatch"',
    tipo: 'olhos',
    foco: 'Defesa e leitura de campo de batalha.',
    ct: 2, valor: 2000,
    habilidades: [
      'Ocular Tático: Recebe +1 de CA, representando microajustes automáticos de postura.'
    ],
    dica: 'Defesa passiva forte por um custo baixíssimo.'
  },
  {
    id: 'nullsight',
    nome: 'Kiroshi Ghost Optics — "NullSight"',
    tipo: 'olhos',
    foco: 'Infiltração silenciosa.',
    ct: 2, valor: 2400,
    habilidades: [
      'Filtro Fantasma: Vantagem em Furtividade contra sensores eletrônicos e Sistemas ópticos têm Desvantagem para te detectar.'
    ],
    dica: 'Funciona bem para operações de invasão em locais militares e corporativos.'
  },
  {
    id: 'thermoscan',
    nome: 'Kiroshi InfraVision — "ThermoScan"',
    tipo: 'olhos',
    foco: 'Rastreamento e combate em ambientes hostis.',
    ct: 3, valor: 2800,
    habilidades: [
      'Visão Multiespectral: Enxerga no escuro total e ignora penalidades visuais (fumaça, chuva, neblina).'
    ],
    dica: 'Absurdamente forte em emboscadas.'
  },
  {
    id: 'deadeye-optics',
    nome: 'Kiroshi Execution Optics — "DeadEye"',
    tipo: 'olhos',
    foco: 'Finalização de inimigos já feridos.',
    ct: 3, valor: 3200,
    habilidades: [
      'Execução Assistida: Causa 2d6 de dano Psíquico contra inimigos com menos de 50% PV.'
    ],
    dica: 'Feito para encerrar combates.'
  },
  {
    id: 'killsight-mk1',
    nome: 'Kiroshi Hunter Optics — "KillSight Mk.I"',
    tipo: 'olhos',
    foco: 'Combate à distância e foco em alvo.',
    ct: 4, valor: 3800,
    habilidades: [
      'Marca do Caçador: 1 vez por turno, Ação Bônus. Você pode analisar um inimigo visível e marcá-lo (apenas um alvo por vez). Todo ataque à distância contra ele causa +1d6 de dano Psíquico extra. A marca é perdida caso o alvo morra ou você fique sem contato visual com ele por 2 turnos seguidos.'
    ],
    dica: 'Excelente para pistoleiros, rifles e snipers urbanos.'
  },
  {
    id: 'omni-lens-mk4',
    nome: 'Kiroshi Omni-Lens Mk.IV',
    tipo: 'olhos',
    foco: 'Utilidade avançada.',
    ct: 4, valor: 4000,
    habilidades: [
      'Visão de Raio-X: Enxerga através de até 30cm de material não metálico com alcance de 12m.'
    ],
    dica: 'Muito útil para saber dos perigos que uma parede pode esconder.'
  },
  {
    id: 'lock-on-eye',
    nome: 'Kiroshi Smart-Target Optics — "Lock-On Eye"',
    tipo: 'olhos',
    foco: 'Consistência ofensiva.',
    ct: 5, valor: 5000,
    habilidades: [
      'Trava Inteligente: Reação. Ao errar um Ataque à Distância, recebe +2 na jogada, possivelmente acertando o alvo.',
      'Assinatura Fantasma: Dificulta identificação do usuário por sistemas de reconhecimento facial e câmeras.'
    ],
    dica: 'Reduz frustração em combates e recompensa posicionamento.'
  },
  {
    id: 'neural-paralyzer',
    nome: 'Kiroshi Medusa — "Neural Paralyzer"',
    tipo: 'olhos',
    foco: 'Controle.',
    ct: 5, valor: 5200,
    habilidades: [
      'Olhar de Pedra: Ação, 1 vez por combate. Escolha um alvo a até 9m que possa te ver: o alvo deve realizar um teste de Sabedoria (CD 8 + seu modificador de Sabedoria + Tecnologia, se aplicável). Em caso de falha, sofre 1d8 de dano Psíquico e fica Atordoado por 2 turnos.'
    ],
    dica: 'Perfeito para impedir que um alvo se mova.'
  },
  {
    id: 'cyclops-protocol',
    nome: 'Kiroshi Beam Optics — "Cyclops Protocol"',
    tipo: 'olhos',
    foco: 'Dano explosivo.',
    ct: 6, valor: 6800,
    habilidades: [
      'Disparo Óptico: Ação, 1 vez por combate. Você dispara um feixe concentrado em um alvo a até 18m. Você não pode realizar outros ataques no turno em que usar essa habilidade.',
      'Escolha o tipo de raio ao implantar: 🔥 Raio Térmico — 8d6 (térmico), teste de Destreza ou fica Em Chamas (1d6/turno, Ação para apagar). ⚡ Raio Elétrico — 6d8 (elétrico), teste de Constituição ou fica Atordoado até o início do próximo turno. ☣️ Raio Químico — 6d6 (químico), teste de Constituição ou fica Envenenado por 2 turnos.'
    ],
    dica: 'Perfeito para explodir inimigos em combate.'
  },
  // ─────────────────── CORAÇÃO ───────────────────
  {
    id: 'pulsegreen',
    nome: 'Biotechnica Bio-Core Mk.I — "PulseGreen"',
    tipo: 'coracao',
    foco: 'Resistência a fadiga, veneno e outras toxinas.',
    ct: 2, valor: 1600,
    habilidades: [
      'Coração Estimulante: Resistência a dano de Veneno e Vantagem em testes de resistência contra veneno e drogas.'
    ],
    dica: 'Excelente para longas missões, zonas contaminadas e sobrevivência urbana.'
  },
  {
    id: 'voltpulse',
    nome: 'Kang Tao Kinetic Heart — "VoltPulse"',
    tipo: 'coracao',
    foco: 'Mobilidade e integração corpo–sistema.',
    ct: 2, valor: 2500,
    habilidades: [
      'Coração Energético: Recebe +2 metros de deslocamento.',
      'Pulso Digital: Enquanto estiver em combate, recupera +1 RAM adicional no início do seu turno.'
    ],
    dica: 'Perfeito para híbridos físico + tecnológico.'
  },
  {
    id: 'zenith-pulse',
    nome: 'Arasaka Neuro-Paced Heart — "Zenith Pulse"',
    tipo: 'coracao',
    foco: 'Controle de ritmo e consistência.',
    ct: 3, valor: 3000,
    habilidades: [
      'Ritmo Controlado: No início do combate, escolha um: +1 em jogadas de ataque, ou +1 na CD de habilidades, ou +3m de deslocamento.',
      'Estabilidade Cardíaca: Você tem Vantagem contra efeitos de Atordoamento.'
    ],
    dica: 'Implante versátil — bom para quem quer consistência sem depender de burst.'
  },
  {
    id: 'overlink-heart',
    nome: 'Kang Tao Sync Core — "Overlink Heart"',
    tipo: 'coracao',
    foco: 'Integração com sistemas (RAM / tech).',
    ct: 3, valor: 3300,
    habilidades: [
      'Sincronização Neural: Reação. Quando gastar RAM realizando um Ataque Hacker: Recupera PV igual a RAM gasta (mín. 1).',
      'Pulso Estável: +1 RAM máximo.'
    ],
    dica: 'Fecha loop de sustain pra netrunners.'
  },
  {
    id: 'coreshield',
    nome: 'Zetatech Pulse Firewall — "CoreShield"',
    tipo: 'coracao',
    foco: 'Resistência contínua.',
    ct: 3, valor: 3400,
    habilidades: [
      'Pulso Defensivo: Aumenta a Classe de Firewall (CF) em +1.',
      'Ritmo Estável: Se não sofrer um Ataque Hack no turno anterior, aumenta a Classe de Firewall (CF) em +1 (máx. +2). O bônus é perdido ao ser invadido por um Ataque Hacker, ou quando o combate encerrar.'
    ],
    dica: 'Recompensa posicionamento seguro.'
  },
  {
    id: 'redline-core',
    nome: 'Zetatech Combat Circulator — "Redline Core"',
    tipo: 'coracao',
    foco: 'Desempenho físico sob pressão.',
    ct: 4, valor: 3800,
    habilidades: [
      'Coração de Combate: 1 vez por combate. Você recebe 2d8 de dano Psíquico, mas pode realizar uma Ação de Ataque adicional em seu turno.',
      'Adrenalina Crítica: Enquanto estiver com 50% ou menos de PV, recebe Vantagem em testes de resistência de Constituição.'
    ],
    dica: 'Simples, direto e extremamente eficiente para personagens agressivos.'
  },
  {
    id: 'leech-engine',
    nome: 'Biotechnica Parasite Core — "Leech Engine"',
    tipo: 'coracao',
    foco: 'Sustain agressivo.',
    ct: 4, valor: 4400,
    habilidades: [
      'Drenagem Vital: Quando causar dano corpo a corpo contra humanos: Cura 1d6 PV do usuário.'
    ],
    dica: 'Recompensa comportamento agressivo fornecendo sustain — excelente pra melee.'
  },
  {
    id: 'regen-heart-r2',
    nome: 'Biotechnica Vital Engine — "Regen-Heart R2"',
    tipo: 'coracao',
    foco: 'Recuperação controlada.',
    ct: 4, valor: 4600,
    habilidades: [
      'Regeneração Acelerada: 1 vez por combate, Ação Bônus. Você recupera 3d8 + modificador de Constituição em PV.',
      'Estabilização Orgânica: Vantagem em testes contra Sangramento.'
    ],
    dica: 'Regeneração forte e durabilidade em combate.'
  },
  {
    id: 'ironbeat',
    nome: 'Militech Shockproof Cardiac Core — "Ironbeat"',
    tipo: 'coracao',
    foco: 'Resistência extrema e sobrevivência em combate pesado.',
    ct: 5, valor: 5500,
    habilidades: [
      'Coração de Impacto: Recebe resistência a dano Contundente.',
      'Batimento de Guerra: Ao sofrer um Acerto Crítico, reduz o dano em 1d10 + modificador de Constituição.'
    ],
    dica: 'Feito para quem fica na linha de frente e apanha muito — e continua em pé.'
  },
  {
    id: 'siegebreaker',
    nome: 'Militech War Core — "Siegebreaker"',
    tipo: 'coracao',
    foco: 'Anti-boss / dano pesado.',
    ct: 5, valor: 5800,
    habilidades: [
      'Batida de Impacto: O primeiro ataque corpo a corpo que realizar no turno recebe +1d8 de dano correspondente extra.',
      'Inércia de Guerra: Se não se mover no turno recebe +1 na jogada de ataque.'
    ],
    dica: 'Feito pra builds estacionárias ou armas pesadas.'
  },
  // ─────────────────── SISTEMA IMUNOLÓGICO ───────────────────
  {
    id: 'venomshield-rx',
    nome: 'Raven Microtech — VenomShield RX',
    tipo: 'sistema-imunologico',
    foco: 'Sobrevivência urbana, toxinas, jogo sujo e ambientes hostis.',
    ct: 3, valor: 2200,
    habilidades: [
      'Ar Limpo: Você recebe resistência a dano de Veneno e Vantagem em testes de resistência contra Envenenamento.',
      'Expurgo Químico: 1 vez por combate, Ação Bônus. Remove imediatamente Envenenado. Se remover uma condição dessa forma, você recupera 1d8 PV.'
    ],
    dica: 'Confiável, barato e eficiente. Garante que veneno nunca decida o combate por você.'
  },
  {
    id: 'purity-loop',
    nome: 'Zetatech CleanCore — "Purity Loop"',
    tipo: 'sistema-imunologico',
    foco: 'Remoção contínua de debuffs.',
    ct: 3, valor: 3000,
    habilidades: [
      'Ciclo de Purificação: 1 vez por combate, Reação. Pode encerrar 1 condição que esteja te afetando (exceto Atordoado).',
      'Sobrecarga Imune: Remover uma condição dessa forma, o tornará imune a essa condição por 3 turnos.'
    ],
    dica: 'Não é explosivo — mas impede acúmulo de efeitos.'
  },
  {
    id: 'thoraxguard-mk2',
    nome: 'Militech — ThoraxGuard Mk.II',
    tipo: 'sistema-imunologico',
    foco: 'Guerra pesada, explosões, impacto direto.',
    ct: 4, valor: 3800,
    habilidades: [
      'Blindagem Torácica Militar: Você recebe resistência a dano Contundente e Explosão.',
      'Absorção de Impacto: 1 vez por combate, Reação. Quando sofrer dano de Explosão ou Contundente, reduz o dano em 1d12 + modificador de Constituição.'
    ],
    dica: 'Feito para quem entra no meio das explosões, segura o impacto e continua avançando.'
  },
  {
    id: 'nanovita-prime',
    nome: 'Biotechnica — NanoVita Prime',
    tipo: 'sistema-imunologico',
    foco: 'Adaptação biológica superior, regeneração e sobrevivência extrema.',
    ct: 5, valor: 4500,
    habilidades: [
      'Aprimoramento Vital: Aumenta sua Vida Máxima em +10.',
      'Enxame Regenerativo: 1 vez por combate, Ação Bônus. Você recupera 3d8 + modificador de Constituição em PV. Se estiver abaixo de 50% de PV, a cura recebe +1d8 adicional.',
      'Resposta Orgânica Adaptativa: Sempre que sofrer dano de Veneno ou Químico, você reduz o dano em 1d8 + modificador de Constituição.'
    ],
    dica: 'Seu corpo simplesmente se recusa a morrer por toxinas.'
  },
  // ─────────────────── PELE ───────────────────
  {
    id: 'thermoskin',
    nome: 'Militech — "ThermoSkin"',
    tipo: 'pele',
    foco: 'Infiltração e redução de dano.',
    ct: 2, valor: 1500,
    habilidades: [
      'Assinatura Térmica Reduzida: Vantagem em testes de Furtividade contra sensores térmicos e infravermelhos.',
      'Isolamento Térmico: Reduz em 1d8 o dano de Frio ou Térmico recebido.'
    ],
    dica: 'Implante silencioso e elegante — brilha fora do combate direto e em missões de terreno hostil.'
  },
  {
    id: 'regenskin',
    nome: 'Biotechnica — "RegenSkin"',
    tipo: 'pele',
    foco: 'Sobrevivência prolongada e controle de sangramento.',
    ct: 2, valor: 2000,
    habilidades: [
      'Regeneração Leve: No início do seu turno, se estiver consciente e com menos que 50% de PV, recupera 1d6 + modificador de Constituição (mín. 1) PV.',
      'Cicatrização Rápida: Vantagem em testes para resistir ou encerrar a condição Sangramento. Sempre que encerrar a condição Sangramento, recupera 1d6 PV.'
    ],
    dica: 'Regeneração lenta — perfeita para quem luta por desgaste e não depende de explosões de cura.'
  },
  {
    id: 'hazskin',
    nome: 'Raven Microtech — "HazSkin"',
    tipo: 'pele',
    foco: 'Alta defesa química e vitalidade.',
    ct: 3, valor: 2800,
    habilidades: [
      'Proteção Química: Recebe resistência a dano Químico.',
      'Revestimento: Aumenta o PV em 10.'
    ],
    dica: 'Simples, direto e temático — feito para ambientes contaminados e inimigos químicos.'
  },
  {
    id: 'bioshock-pele',
    nome: 'Zetatech — "BioShock"',
    tipo: 'pele',
    foco: 'Defesa ofensiva contra combate corpo a corpo.',
    ct: 3, valor: 3500,
    habilidades: [
      'Reação Elétrica: 1 vez por combate, Reação. Ao ser atingido por ataque corpo a corpo ou toque direto, causa 2d8 + modificador de Inteligência de dano Elétrico ao atacante.'
    ],
    dica: 'Excelente contra enxames e lutadores agressivos — pune quem chega perto demais.'
  },
  {
    id: 'signal-scrambler',
    nome: 'Arasaka DataSkin — "Signal Scrambler"',
    tipo: 'pele',
    foco: 'Camuflagem digital.',
    ct: 3, valor: 3800,
    habilidades: [
      'Tecno Camaleão: Aumenta a Classe de Firewall (CF) em +1.',
      'Interferência: Você tem Vantagem contra Hacks Rápidos que tentarem rastrear sua posição.'
    ],
    dica: 'Defesa digital invisível.'
  },
  {
    id: 'warshell',
    nome: 'Arasaka Tactical Dermis — "WarShell"',
    tipo: 'pele',
    foco: 'Combate tático.',
    ct: 4, valor: 4000,
    habilidades: [
      'Contramedidas: Reação. Após ser atingido por um inimigo, recebe +1 contra aquele inimigo (ataque, CA e CF) até o fim do próximo turno. É possível focar em apenas um alvo por vez, podendo escolher trocar quando é atacado ou se manter focado no atual.'
    ],
    dica: 'Recompensa combate focado.'
  },
  {
    id: 'impact-pulse',
    nome: 'Militech Shockwave Dermis — "Impact Pulse"',
    tipo: 'pele',
    foco: 'Controle de espaço.',
    ct: 4, valor: 4500,
    habilidades: [
      'Pulso Cinético: 1 vez por combate, Reação. Ao sofrer dano, todos em até 3m ao redor devem realizar um teste de Força (CD 8 + seu modificador de Força + Atletismo, se aplicável). Em caso de falha: são empurrados 2m e ficam Desequilibrados (-1 em ataques).'
    ],
    dica: 'Ótimo contra grupos e pressão melee.'
  },
  {
    id: 'carapace',
    nome: 'Biotechnica Chitin Mesh — "Carapace"',
    tipo: 'pele',
    foco: 'Resistência progressiva.',
    ct: 5, valor: 4900,
    habilidades: [
      'Endurecimento Orgânico: Sempre que sofrer dano recebe +1 de redução de dano (acumula até 5). Reseta ao fim do combate.'
    ],
    dica: 'Quanto mais apanha, mais difícil fica te derrubar.'
  },
  {
    id: 'ghostskin',
    nome: 'Arasaka — "GhostSkin"',
    tipo: 'pele',
    foco: 'Contramedidas digitais e guerra eletrônica.',
    ct: 6, valor: 5800,
    habilidades: [
      'Ruído Digital: Inimigos têm Desvantagem em testes para detectar você por meios tecnológicos, sensores ou análise digital.',
      'Contra-Medidas: Vantagem em testes para resistir a hacks que afetem diretamente seus implantes.'
    ],
    dica: 'Defesa invisível, mas devastadora — perfeita contra Trilha-Redes e facções high-tech.'
  },
  // ─────────────────── MÃOS ───────────────────
  {
    id: 'shockfist',
    nome: 'Zetatech — "ShockFist"',
    tipo: 'maos',
    foco: 'Combate corpo a corpo agressivo.',
    ct: 2, valor: 1500,
    habilidades: [
      'Punhos Cinéticos: Seus ataques desarmados causam 1d6 de dano extra.'
    ],
    dica: 'Transforma mãos em armas potentes.'
  },
  {
    id: 'firmhand',
    nome: 'Zetatech GripBoost — "FirmHand"',
    tipo: 'maos',
    foco: 'Controle físico e cenas de ação.',
    ct: 2, valor: 2000,
    habilidades: [
      'Pegada Reforçada: Vantagem em testes de Atletismo relacionados a agarrar, escalar ou segurar objetos.',
      'Estabilidade Manual: Vantagem em testes de resistência contra empurrões ou desarme.'
    ],
    dica: 'Implante barato e universal — quase nunca é uma escolha ruim.'
  },
  {
    id: 'deadcalm',
    nome: 'Arasaka Precision Hands — "DeadCalm"',
    tipo: 'maos',
    foco: 'Precisão absoluta.',
    ct: 3, valor: 2800,
    habilidades: [
      'Estabilização Fina: +1 em jogadas de ataque à distância.',
      'Respiração Controlada: Se não se mover no turno, aumenta em +1d4 o dano de ataques à distância.'
    ],
    dica: 'Ideal para snipers e builds pacientes.'
  },
  {
    id: 'maggrip',
    nome: 'Raven Microtech — "MagGrip"',
    tipo: 'maos',
    foco: 'Controle de objetos e anti-desarme.',
    ct: 3, valor: 3200,
    habilidades: [
      'Trava Magnética: Você não pode ser desarmado contra sua vontade.',
      'Recall Manual: 1 vez por turno, Ação Bônus. Se algum objeto metálico alvo pequeno ou médio estiver solto ou na mão de alguma criatura a até 7m, ela se moverá à sua mão. Criaturas segurando o objeto pode realizar um teste de Força (CD 8 + seu modificador de Força + Tecnologia, se aplicável) para manter o objeto em sua mão.'
    ],
    dica: 'Perfeita para manipulação de cenário — isso pode ser bem útil.'
  },
  {
    id: 'mirror-grip',
    nome: 'Arasaka CounterHands — "Mirror Grip"',
    tipo: 'maos',
    foco: 'Contra-ataque.',
    ct: 4, valor: 3500,
    habilidades: [
      'Resposta Instantânea: Reação. Ao sofrer um ataque corpo a corpo, pode realizar um ataque corpo a corpo.'
    ],
    dica: 'Excelente contra inimigos agressivos.'
  },
  {
    id: 'warhands',
    nome: 'Militech OmniCombat Hands — "WarHands"',
    tipo: 'maos',
    foco: 'Supremacia total em combate.',
    ct: 4, valor: 3800,
    habilidades: [
      'Integração Total: +1 em ataques corpo a corpo e à distância.',
      'Troca Instantânea: Pode sacar, trocar ou guardar armas sem custo de Ação.'
    ],
    dica: 'Implante de elite — para solos e operativos que nunca querem estar despreparados.'
  },
  {
    id: 'thread-control',
    nome: 'Raven Microtech WireHands — "Thread Control"',
    tipo: 'maos',
    foco: 'Manipulação avançada.',
    ct: 5, valor: 4800,
    habilidades: [
      'Cabos Integrados: Quatro cabos retráteis ficam embutidos nas palmas de suas mãos. Você pode estender até 4 cabos simultaneamente, cada um podendo se conectar a um alvo ou objeto diferente a até 5 metros de distância usando sua Ação Bônus. Enquanto conectados: Aplique habilidades de toque à distância; Interaja com objetos (abrir, puxar, manipular) à distância. Carga máxima: 8 + modificador de Força (kg) por cabo. Alcance máximo: 5 metros.',
      'Controle Preciso: Vantagem em testes de Tecnologia ou Medicina caso use Cabos Integrados para manipular algo.'
    ],
    dica: 'Extremamente versátil fora e dentro de combate.'
  },
  {
    id: 'link-inteligente',
    nome: 'Kang Tao — "Link Inteligente"',
    tipo: 'maos',
    foco: 'Domínio absoluto de armas inteligentes.',
    ct: 6, valor: 5000,
    habilidades: [
      'Link Inteligente: Enquanto usar armas inteligentes: Vantagem em ataques.',
      'Redirecionamento Balístico: 1 vez por turno, Reação. Se errar um ataque, pode redirecionar o disparo para outro alvo a até 3m do alvo original, usando o mesmo resultado de ataque.'
    ],
    dica: 'Extremamente forte — CT e custo altos existem por um motivo.'
  },
  // ─────────────────── BRAÇOS ───────────────────
  {
    id: 'monofio',
    nome: 'Monofio',
    tipo: 'bracos',
    foco: 'Controle, Inteligência, redução de mobilidade.',
    ct: 7, valor: 8000,
    habilidades: [
      '+2 em Inteligência.',
      'Chicotes de Fios: Ataques causam 2d6 + seu modificador de Destreza de dano Cortante, com alcance de até 5m.',
      'Aprisionar: Atinge um alvo que deve realizar um teste de Força (CD 8 + seu modificador de Força + Tecnologia, se aplicável). Em caso de falha: sofre 1d8 de dano Elétrico e fica incapaz de se mover por 1 turno.'
    ],
    dica: 'Controle absoluto de espaço. Não é sobre matar rápido — é sobre remover mobilidade.'
  },
  {
    id: 'disparador-projeteis',
    nome: 'Kang Tao — Disparador de Projéteis',
    tipo: 'bracos',
    foco: 'Explosão, cura, combate à distância.',
    ct: 7, valor: 8000,
    habilidades: [
      '+2 em Carisma.',
      'Lançador Integrado: 2 usos por combate, Ação. Dispara um projétil que causa 3d8 de dano de Energia em até 18m que explode em um raio de até 3m.',
      'Absorver Energia: 1 vez por combate, Ação. Gaste 1 uso do lançador para recuperar 2d8 + modificador de Constituição em PV.'
    ],
    dica: 'Controle de área e dano pesado, mas exige planejamento e posicionamento.'
  },
  {
    id: 'bracos-gorila-mk5',
    nome: 'Militech Braços de Gorila Mk.V',
    tipo: 'bracos',
    foco: 'Força bruta, demolição, combate direto.',
    ct: 8, valor: 10000,
    habilidades: [
      '+2 em Força.',
      'Punhos Hidráulicos: Ataques desarmados ou com armas improvisadas causam 2d6 + seu modificador de Força de dano Contundente. O dano aumenta em 1d6 nos níveis: 12 e 16.',
      'Demolição: Vantagem em testes para arrombar portas, quebrar estruturas e levantar objetos pesados.',
      'Soco Sônico: 1 vez por descanso curto, Ação. Todos em 5m devem fazer um teste de Constituição (CD 8 + seu modificador de Força + Briga, se aplicável). Em caso de falha: recebem 4d8 de dano Contundente e ficam Caídos. Em caso de sucesso: metade do dano e sem Cair.'
    ],
    dica: 'Implante de linha de frente. Forte, barulhento e impossível de ignorar.'
  },
  {
    id: 'bracos-louva-deus-v8',
    nome: 'Arasaka Braços de Louva-a-Deus System v8',
    tipo: 'bracos',
    foco: 'Assassinato, mobilidade, combate ágil.',
    ct: 8, valor: 10000,
    habilidades: [
      '+2 em Destreza.',
      'Lâminas Retráteis: Ataques corpo a corpo causam 2d8 + seu modificador de Destreza de dano Cortante. O dano aumenta em 1d8 nos níveis: 12 e 16.',
      'Escalada: Pode usar as lâminas para se mover nas paredes com metade seu deslocamento.',
      'Bote: Atacar enquanto você estiver Furtivo ou durante um salto de 2m ou mais, causa +1d6 de dano extra.'
    ],
    dica: 'Mortal em emboscadas. Frágil se cercado ou exposto por muito tempo.'
  },
  // ─────────────────── PERNAS ───────────────────
  {
    id: 'proteses-ageis',
    nome: 'Zetatech Agile Prosthetics — Próteses Ágeis',
    tipo: 'pernas',
    foco: 'Mobilidade tática e combate fluido.',
    ct: 2, valor: 1400,
    habilidades: [
      'Movimento Aprimorado: Deslocamento +2 metros.'
    ],
    dica: 'Implante barato e eficiente, excelente para personagens que não param quietos.'
  },
  {
    id: 'silenciadores-cineticos',
    nome: 'Arasaka Silent Step System — Silenciadores Cinéticos',
    tipo: 'pernas',
    foco: 'Furtividade, infiltração, assassinato.',
    ct: 2, valor: 2300,
    habilidades: [
      'Passos Inaudíveis: Vantagem em testes de Furtividade baseados em movimento.',
      'Confusão Sonora: Inimigos têm Desvantagem em testes de Percepção para ouvir você enquanto se move.'
    ],
    dica: 'Perfeito para jogadores que preferem nunca serem vistos ou ouvidos.'
  },
  {
    id: 'runbreaker',
    nome: 'Zetatech Momentum Legs — "RunBreaker"',
    tipo: 'pernas',
    foco: 'Mobilidade ofensiva.',
    ct: 3, valor: 2600,
    habilidades: [
      'Ataque em Movimento: Se mover pelo menos 4m antes de atacar corpo a corpo, causa +1d6 de dano extra.'
    ],
    dica: 'Incentiva combate dinâmico.'
  },
  {
    id: 'proteses-impacto-controlado',
    nome: 'Militech Impact Control Legs — Próteses de Impacto Controlado',
    tipo: 'pernas',
    foco: 'Resistência, combate vertical, sobrevivência.',
    ct: 3, valor: 3000,
    habilidades: [
      'Amortecimento Total: Pode cair de até 15 metros sem sofrer dano.',
      'Estabilidade de Combate: Vantagem em testes contra empurrões, quedas e efeitos de deslocamento forçado.'
    ],
    dica: 'Excelente para ambientes urbanos caóticos e combates em vários níveis.'
  },
  {
    id: 'pernas-neurocineticas',
    nome: 'Biotechnica Reflex Spine Sync — Pernas Neurocinéticas',
    tipo: 'pernas',
    foco: 'Combate reativo, antecipação de movimento.',
    ct: 4, valor: 3800,
    habilidades: [
      'Sincronização Neural: +2 em jogadas de Iniciativa.',
      'Zona de Controle: Inimigos provocam ataques de oportunidade mesmo ao usar Desengajar contra você.'
    ],
    dica: 'Implante técnico, excelente para controlar espaço e ritmo do combate.'
  },
  {
    id: 'blinkstep',
    nome: 'Raven Microtech Phase Dash — "BlinkStep"',
    tipo: 'pernas',
    foco: 'Mobilidade extrema.',
    ct: 5, valor: 5200,
    habilidades: [
      'Movimento Fluido: Ignora terreno difícil.',
      'Salto Fásico: 1 vez por combate, Ação Bônus. Salta em uma distância igual seu deslocamento + 3m. Este salto conta como uma movimentação e inimigos possuem Desvantagem em ataques de oportunidade contra você durante este movimento.'
    ],
    dica: 'Reposicionamento absurdo — alto impacto.'
  },
  {
    id: 'wallrunner-mk2',
    nome: 'Zetatech WallRunner Mk.II — Andarilho de Paredes',
    tipo: 'pernas',
    foco: 'Mobilidade vertical, infiltração avançada.',
    ct: 5, valor: 5000,
    habilidades: [
      'Corrida Vertical: Pode correr ou caminhar em paredes por até 9 metros em um turno, sem testes.',
      'Ataque de Ângulo Impossível: Vantagem em testes de Furtividade e Acrobacia ao atacar ou se mover a partir de superfícies verticais.'
    ],
    dica: 'Forte, chamativo e altamente cinematográfico — o cenário vira sua arma.'
  },
  // ─────────────────── OSSOS ───────────────────
  {
    id: 'featherframe',
    nome: 'Zetatech — "Featherframe"',
    tipo: 'ossos',
    foco: 'Mobilidade e leveza.',
    ct: 2, valor: 1500,
    habilidades: [
      'Agilidade Aprimorada: Vantagem em testes de Acrobacia e Atletismo.'
    ],
    dica: 'Ideal para corredores, infiltradores e builds que dependem de posicionamento sem chamar atenção.'
  },
  {
    id: 'bulwark-lite',
    nome: 'Kang-Tao — "Bulwark Lite"',
    tipo: 'ossos',
    foco: 'Defesa básica e resistência estrutural.',
    ct: 3, valor: 2600,
    habilidades: [
      'Redução de Impacto: +1 na Classe de Armadura.'
    ],
    dica: 'Proteção sólida e discreta. Excelente primeiro implante defensivo sem elevar demais o consumo de CT.'
  },
  {
    id: 'bonebreaker',
    nome: 'Arasaka Execution Frame — "BoneBreaker"',
    tipo: 'ossos',
    foco: 'Dano crítico.',
    ct: 4, valor: 3500,
    habilidades: [
      'Impacto Crítico: Ao acertar um acerto crítico causa +1d10 de dano extra.'
    ],
    dica: 'Transforma críticos em eventos realmente perigosos.'
  },
  {
    id: 'kiba-frame',
    nome: 'Arasaka — "Kiba Frame"',
    tipo: 'ossos',
    foco: 'Contra-ataque corporal e intimidação.',
    ct: 5, valor: 4000,
    habilidades: [
      'Retaliação Cortante: Ataques corpo a corpo recebidos causam 1d8 + seu modificador de Destreza de dano Cortante ao atacante. O dano aumenta em 1d8 no nível 16.',
      'Hemorragia: Sempre que causar dano por este efeito, o atacante deve realizar um teste de Constituição (CD 8 + modificador de Destreza + bônus de proficiência). Em caso de falha: recebe a condição Sangramento.'
    ],
    dica: 'Ideal para personagens que vivem cercados — você apanha, mas o inimigo paga o preço.'
  },
  {
    id: 'seismocore',
    nome: 'Militech — "SeismoCore"',
    tipo: 'ossos',
    foco: 'Impacto bruto e controle de campo.',
    ct: 6, valor: 5000,
    habilidades: [
      'Descarga Sismodinâmica: 1 vez por turno. Ao acertar um ataque desarmado ou com uma arma Contundente, causa +1d8 de dano extra.',
      'Desequilíbrio: Se o alvo for do mesmo tamanho ou menor, deve realizar um teste de Força (CD 8 + modificador de Força + bônus de proficiência). Em caso de falha: recebe a condição Caído.'
    ],
    dica: 'Dano consistente com controle — forte sem substituir armas pesadas ou implantes de combate extremo.'
  }
];

// ═══════════════════════════════════════════════════════════
//   ACESSÓRIOS PARA ARMAS TECNOLÓGICAS — Cyberpunk 2080
// ═══════════════════════════════════════════════════════════
// Regras:
//  • Cada acessório ocupa 1 Slot de Modificação da arma.
//  • Uma arma não pode ter dois acessórios do mesmo tipo.
//  • Remover ou instalar exige 10 minutos + ferramentas.
//  • Não funciona em armas Convencionais, de Energia ou Inteligentes.

export type CategoriaAcessorioArma = 'mira' | 'carregador' | 'supressor';

export interface AcessorioArma {
  id: string;
  nome: string;
  categoria: CategoriaAcessorioArma;
  descricao: string;
  efeito: string;
  valor: number;
}

export const ACESSORIOS_ARMAS: readonly AcessorioArma[] = [
  // ─────────────── 🎯 Módulos de Mira ───────────────
  {
    id: 'mira-digital-basica',
    nome: 'Mira Digital Básica',
    categoria: 'mira',
    descricao: 'HUD simples com cálculo automático de distância e ponto de mira digital.',
    efeito: '+1 nas jogadas de ataque',
    valor: 1200
  },
  {
    id: 'mira-balistica-semi',
    nome: 'Mira Balística Semi-Inteligente',
    categoria: 'mira',
    descricao: 'Compensa automaticamente o movimento do alvo e a vibração da arma durante o disparo.',
    efeito: '+2 nas jogadas de ataque',
    valor: 2400
  },
  {
    id: 'mira-hawkeye',
    nome: 'Mira Neuro-Assistida "Hawkeye"',
    categoria: 'mira',
    descricao: 'Sincroniza microajustes de pontaria com os impulsos neurais do usuário em tempo real.',
    efeito: '+3 nas jogadas de ataque',
    valor: 3200
  },
  // ─────────────── 🔋 Módulos de Carregador ───────────────
  {
    id: 'capacidade-i',
    nome: 'Capacidade Expandida I',
    categoria: 'carregador',
    descricao: 'Carregador estendido de baixo perfil que aumenta a capacidade de munição da arma.',
    efeito: '+2 disparos antes de uma recarga',
    valor: 800
  },
  {
    id: 'capacidade-ii',
    nome: 'Capacidade Expandida II',
    categoria: 'carregador',
    descricao: 'Carregador duplo empilhado que dobra a reserva de munição sem aumentar muito o peso.',
    efeito: '+4 disparos antes de uma recarga',
    valor: 1600
  },
  {
    id: 'capacidade-iii',
    nome: 'Capacidade Expandida III',
    categoria: 'carregador',
    descricao: 'Sistema de alimentação contínua com reservatório de alta densidade — o máximo em capacidade.',
    efeito: '+6 disparos antes de uma recarga',
    valor: 2200
  },
  // ─────────────── 🔇 Módulos de Supressão Acústica ───────────────
  {
    id: 'supressor-basico',
    nome: 'Supressor Tático Básico',
    categoria: 'supressor',
    descricao: 'Abafa parte do disparo, mas causa uma redução considerável no alcance efetivo.',
    efeito: 'Alcance –8m (armas leves) / –10m (armas pesadas); Vantagem em Furtividade após disparar',
    valor: 1000
  },
  {
    id: 'supressor-baixa-assinatura',
    nome: 'Supressor de Assinatura Baixa',
    categoria: 'supressor',
    descricao: 'Reduz a assinatura sonora e térmica do disparo com menor impacto no alcance.',
    efeito: 'Alcance –6m (armas leves) / –8m (armas pesadas); Vantagem em Furtividade após disparar',
    valor: 1800
  },
  {
    id: 'supressor-ghostline',
    nome: 'Supressor Fantasma "Ghostline"',
    categoria: 'supressor',
    descricao: 'Supressor de alta performance com tecnologia de câmara adaptativa — mínima perda de alcance.',
    efeito: 'Alcance –2m (armas leves) / –6m (armas pesadas); Vantagem em Furtividade após disparar',
    valor: 2500
  }
] as const;
