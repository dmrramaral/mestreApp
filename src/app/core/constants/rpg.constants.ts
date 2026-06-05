/**
 * Constantes para o sistema de RPG
 * Centraliza valores fixos usados em toda a aplicação
 */
import type { CyberpunkAntecedenteCatalog, CyberpunkClassCatalog } from '../models/cyberpunk-catalog.model';

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
  INITIATIVE_SHEETS: 'fichasIniciativa',
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
  'Zona de Combate'
] as const;

export const CYBERPUN2080_CLASS_TRAITS: Record<string, Array<{ nome: string; descricao: string }>> = {
  'Cromado': [
    { nome: 'Aprimoramento Corpóreo', descricao: 'Os Cromados são indivíduos que podem modificar o corpo além do limite aceitável. Onde outros veem mutilação, eles veem evolução. Eles suportam mais dor, mais impacto e mais sobrecarga neural do que qualquer outro, mas toda essa adaptação cobra um preço: humanidade corroída.' }
  ],
  'Medicânico': [
    { nome: 'Suporte Médico-Tático', descricao: 'Os Medicânicos são os responsáveis por manter corpos e implantes funcionando quando tudo já deveria ter parado. Misturam conhecimento médico, engenharia cibernética e protocolos de emergência para sustentar aliados no meio do caos. Não fazem milagres — fazem manutenção de guerra.' }
  ],
  'Piloto': [
    { nome: 'Domínio Veicular', descricao: 'Os Pilotos são os donos das ruas abertas, rodovias esquecidas e das Terras Baldias. Onde não há mapas confiáveis, onde o terreno mata tanto quanto as balas, eles prosperam. Mestres da pilotagem, leitura de ambiente e sobrevivência extrema, Pilotos sabem quando acelerar, quando se esconder e quando transformar a estrada em uma arma.' }
  ],
  'Samurai': [
    { nome: 'Eliminação Cirúrgica', descricao: 'Os Samurais são assassinos urbanos, duelistas modernos e executores frios. Alguns seguem um próprio código pessoal, outros só seguem o contrato, mas todos entendem uma verdade simples: o combate acaba antes do inimigo perceber que começou. Eles dominam o posicionamento, o tempo exato do golpe e a arte do ataque decisivo.' }
  ],
  'Solo': [
    { nome: 'Guerra Urbana', descricao: 'Solos são combatentes de elite, mercenários, soldados e assassinos profissionais. Eles vivem do confronto direto, dominam qualquer arma e sabem usar o terreno e a cobertura a seu favor. Um Solo bem treinado faz do campo de batalha uma extensão de si mesmo: onde há tiro, há Solo.' }
  ],
  'Trilha-Redes': [
    { nome: 'Domínio Digital', descricao: 'Os Trilha-Redes são feiticeiros da era digital. Onde outros puxam o gatilho, eles puxam linhas de código. Onde há silêncio eletrônico, eles escutam sussurros de dados. Eles não vencem pela força, nem pela velocidade — vencem porque o inimigo não lutou em um campo justo.' }
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
 * Catálogo completo de classes CyberPun2080
 * Fonte: PDF CyberPun2080 — descrições transcritas literalmente
 */
export const CYBERPUN2080_CLASSES_FULL_DATA: CyberpunkClassCatalog[] = [
  {
    nome: 'Cromado',
    descricao: 'Os Cromados são indivíduos que podem modificar o corpo além do limite aceitável. Onde outros veem mutilação, eles veem evolução. Eles suportam mais dor, mais impacto e mais sobrecarga neural do que qualquer outro. Mas toda essa adaptação cobra um preço: humanidade corroída.',
    flavorText: [
      'Os Cromados são indivíduos que podem modificar o corpo além do limite aceitável.',
      'Onde outros veem mutilação, eles veem evolução.',
      'Eles suportam mais dor, mais impacto e mais sobrecarga neural do que qualquer outro.',
      'Mas toda essa adaptação cobra um preço: humanidade corroída.'
    ],
    hpNivel1: '20 + modificador de Constituição',
    hpPorNivel: '1d10 + modificador de Constituição',
    ctBase: 14,
    ctBonusNiveis: [4, 8, 12, 16, 20],
    ramBase: null,
    proficiencias: {
      resistencias: ['Constituição', 'Força'],
      armas: ['Pistolas', 'Revólveres', 'Escopetas', 'Rifles de Assalto', 'Metralhadoras Leves', 'Armas Improvisadas Leves', 'Armas Improvisadas Pesadas'],
      armaduras: ['Médias', 'Pesadas', 'Escudos'],
      ferramentas: ['Kits de Manutenção de armas'],
      pericias: { escolher: 4, opcoes: ['Atletismo', 'Briga', 'Intimidação', 'Tolerância', 'Tecnologia', 'Acrobacia', 'Medicina', 'Pilotagem'] }
    },
    progressao: [
      { nivel: 1, habilidade: 'Corpo Adaptável', descricao: 'Seus PV máximos aumentam em +3 para cada implante que esteja instalado em seu corpo. Você possui Desvantagem em testes de Persuasão, mas Vantagem em testes de Intimidação.' },
      { nivel: 2, habilidade: 'Estrutura Reforçada', descricao: 'Enquanto estiver usando uma armadura média ou pesada, concede Vantagem em testes de resistência contra Atordoamento.' },
      { nivel: 5, habilidade: 'Ataque Extra', descricao: 'Você pode atacar duas vezes sempre que realizar a Ação de Ataque ou realizar uma Ação de Ataque e uma Ação de recarregar (em qualquer ordem).' },
      { nivel: 6, habilidade: 'Força Opressora', descricao: 'Concede Vantagem em testes de Força e você passa a contar como uma categoria de tamanho maior para empurrar, agarrar e carregar peso.' },
      { nivel: 9, habilidade: 'Corpo que Aguenta', descricao: 'Concede Vantagem em testes de Constituição contra efeitos contínuos, como Sangramento e Envenenamento.' },
      { nivel: 11, habilidade: 'Sobrecarga Controlada', descricao: 'Ao acertar um ataque corpo a corpo, adicione seu modificador de Constituição ao dano.' },
      { nivel: 13, habilidade: 'Blindagem Interna', descricao: 'Reduz todo dano Cortante, Perfurante ou Contundente recebido em -1 (mínimo 1). Esse valor aumenta para -3 no nível 20.' },
      { nivel: 17, habilidade: 'Corpo Antinatural', descricao: 'Não pode ser Derrubado, Empurrado ou Agarrado contra sua vontade e ignora terreno difícil causado por destruição ou destroços.' },
      { nivel: 20, habilidade: 'Aberração Funcional', descricao: '1 vez por combate, Reação. Ao sofrer dano proveniente de um ataque ou explosão, pode reduzi-lo pela metade.' }
    ],
    subclasses: [
      {
        nome: 'Adaptativo',
        descricao: 'O Cromado Adaptativo é o ápice da sobrevivência aprimorada. Seu corpo cromado não é apenas resistente — ele aprende, se ajusta e responde à ameaça em tempo real. Cada placa, fibra e circuito orgânico reage ao ambiente e ao inimigo, transformando o portador em um combatente extremamente difícil de derrubar.',
        progressao: [
          { nivel: 3, habilidade: 'Ajustes Avançados', descricao: '1 vez por turno, Ação Bônus. Escolha uma opção de adaptação ou use sua Ação Bônus para trocar de adaptação em seu turno: Aumentar sua Classe de Armadura (CA) em +1. Aumentar sua Classe de Firewall (CF) em +1. Reduza o primeiro dano Cortante, Perfurante ou Contundente que receber no turno em valor igual ao seu Bônus de Proficiência. Você obtém essa característica até o final do combate ou decidir trocar usando sua Ação Bônus.' },
          { nivel: 7, habilidade: 'Redistribuição de Impacto', descricao: '1 vez por turno, Reação, usos iguais ao Bônus de Proficiência antes de um descanso longo. Quando sofrer dano, você pode reduzir o dano em 1d10 + seu modificador de Constituição.' },
          { nivel: 10, habilidade: 'Corpo Autônomo Evolutivo', descricao: 'Sempre que iniciar seu turno com menos da metade dos PV: recupere PV iguais seu modificador de Constituição + bônus de proficiência. Não funciona caso esteja inconsciente.' },
          { nivel: 15, habilidade: 'Duro de Matar', descricao: '1 vez por combate, reação. A primeira vez que cair a 0 PV em um combate, você cai para 1 PV em vez disso e até o fim do seu próximo turno, você tem resistência a todos os danos.' }
        ]
      },
      {
        nome: 'Brutal',
        descricao: 'O Cromado Brutal é a personificação da força levada ao limite da engenharia. Servo-músculos reforçados, placas metálicas cravadas ao corpo e um desprezo absoluto por sutileza fazem dessa subclasse um aríete vivo no campo de batalha. Onde ele avança, formações se quebram, ossos estalam e o inimigo é esmagado pela pressão incessante de golpes pesados e implacáveis.',
        progressao: [
          {
            nivel: 3,
            habilidade: 'Mr. Músculos',
            descricao: 'Seus ataques corpo a corpo causam +1d4 de dano extra. O dano aumenta em +1d4 nos níveis 8, 12, 16 e 20.'
          },
          {
            nivel: 7,
            habilidade: 'Quebra-Linha',
            descricao: 'Quando você acerta um ataque corpo a corpo, pode Empurrar o alvo 3m. Se o alvo for de tamanho Grande ou maior, ele pode realizar um teste de Força (CD 8 + modificador de Força + bônus de proficiência) para resistir. Se o alvo colidir com algo sólido, ele sofre +1d6 de dano contundente.'
          },
          {
            nivel: 10,
            habilidade: 'Pressão Constante',
            descricao: 'Sempre que você acertar dois ataques corpo a corpo no mesmo alvo no turno, ele sofre Desvantagem em todos os ataques contra você até o fim do seu próximo turno.'
          },
          {
            nivel: 15,
            habilidade: 'Massa de Impacto',
            descricao: '1 vez por turno. Quando reduzir um inimigo a 0 PV com um ataque corpo a corpo, você pode realizar um ataque corpo a corpo adicional contra outro alvo ao alcance. Acertos Críticos em Ataques corpo a corpo em criaturas Médias ou menores com menos que 20 PV executam o alvo instantaneamente.'
          }
        ]
      },
      {
        nome: 'Juggernaut',
        descricao: 'O Juggernaut é uma muralha de metal em movimento, criado para avançar onde qualquer outro cairia. Seu corpo foi transformado em uma máquina de impacto contínuo, com blindagens densas, estruturas hidráulicas e estabilizadores internos capazes de absorver violência absurda sem desacelerar. Cada golpe recebido alimenta sua própria brutalidade, convertendo dor em força cinética e transformando o Cromado em um colosso imparável no centro do combate.',
        progressao: [
          {
            nivel: 3,
            habilidade: 'Massa Cinética',
            descricao: 'Sempre que você sofre dano: Ganha 1 Carga de Massa Cinética. Ao realizar um ataque corpo a corpo, pode gastar Cargas de Massa Cinética para aumentar o dano correspondente em +1d6 de dano por carga. O número de Carga de Massa Cinética é igual seu modificador de Constituição.'
          },
          {
            nivel: 7,
            habilidade: 'Inércia Brutal',
            descricao: 'Se mover pelo menos 3m em linha reta antes de realizar um ataque corpo a corpo, empurra o alvo mediano ou menor 3m para trás, o forçando a realizar um Teste de Destreza (CD 8 + modificador de Força + bônus de proficiência) e em caso de falha, ele fica Caído. Se colidir com algo sólido, causa +1d8 de dano Contundente.'
          },
          {
            nivel: 10,
            habilidade: 'Absorção Pesada',
            descricao: 'Reduz todo o dano sofrido em 1 ponto para cada Carga de Massa Cinética que você possui.'
          },
          {
            nivel: 15,
            habilidade: 'Colosso Imparável',
            descricao: 'Enquanto tiver ao menos uma Carga de Massa Cinética, você se torna vantagem em testes contra o dano e efeito de explosões, e aumenta sua Classe de armadura (CA) em 1. Você pode gastar 3 Cargas de Massa Cinética ao realizar um ataque corpo a corpo, o alvo deve realizar Teste de Força (CD 8 + modificador de Força + bônus de proficiência) e em caso de falha, ele fica Atordoado até o fim do seu próximo turno.'
          }
        ]
      }
    ]
  },
  {
    nome: 'Medicânico',
    descricao: 'Os Medicânicos são os responsáveis por manter corpos e implantes funcionando quando tudo já deveria ter parado. Misturam conhecimento médico, engenharia cibernética e protocolos de emergência para sustentar aliados no meio do caos. Não fazem milagres — fazem manutenção de guerra.',
    flavorText: [
      'Os Medicânicos são os responsáveis por manter corpos e implantes funcionando quando tudo já deveria ter parado.',
      'Misturam conhecimento médico, engenharia cibernética e protocolos de emergência para sustentar aliados no meio do caos.',
      'Não fazem milagres — fazem manutenção de guerra.'
    ],
    hpNivel1: '18 + modificador de Constituição',
    hpPorNivel: '1d8 + modificador de Constituição',
    ctBase: 12,
    ctBonusNiveis: [4, 8, 12, 16, 20],
    proficiencias: {
      resistencias: ['Constituição', 'Sabedoria'],
      armas: ['Pistolas', 'Revólveres', 'Submetralhadoras', 'Escopetas', 'Rifle de Assalto', 'Rifle de Precisão', 'Facas', 'Armas improvisadas leves'],
      armaduras: ['Leves', 'Médias', 'Pesadas', 'Escudo'],
      ferramentas: ['Kit Médico', 'Kits de Manutenção de armas e implantes'],
      pericias: { escolher: 4, opcoes: ['Medicina', 'Tecnologia', 'Intuição', 'Percepção', 'Tolerância', 'Investigação', 'Pilotagem', 'Persuasão'] }
    },
    progressao: [
      { nivel: 1, habilidade: 'Protocolo de Emergência', descricao: 'Algumas habilidades podem ser aprimoradas ou exigem o uso desse recurso. Você recupera todos os usos ao final de um descanso longo.' },
      { nivel: 1, habilidade: 'Atendimento de Combate', descricao: 'Ação, Toque, Usos iguais ao seu Modificador de Sabedoria + Bônus de Proficiência por combate. Você pode restaurar 2d8 + Sabedoria + bônus de proficiência de PV de uma criatura ao seu alcance corpo a corpo. A cura aumenta em +1d8 nos níveis 4, 8, 12 e 16. Se gastar um uso de Protocolo de Emergência, a cura também remove Sangramento, Veneno ou Atordoamento.' },
      { nivel: 2, habilidade: 'Drogas de Combate', descricao: '1 vez por combate, Ação Bônus, Toque. Você injeta uma droga criada por você mesmo em um alvo que Cura em 10 + Sabedoria de PV e causa um efeito: Líquido Vermelho: +2 em ataques por 2 turnos. Líquido Azul: Resistência a Contundente, Cortante e Perfurante até o final de seu próximo turno. Depois que o efeito termina, o alvo sofre 1d6 de dano Psíquico.' },
      { nivel: 5, habilidade: 'Ataque Extra', descricao: 'Você pode atacar duas vezes sempre que realizar a Ação de Ataque ou realizar uma Ação de Ataque e uma Ação de recarregar (em qualquer ordem).' },
      { nivel: 6, habilidade: 'Blindagem Biotécnica', descricao: '1 vez por turno, Reação. Quando um aliado a até 5m sofre dano, você pode usar sua Reação para conceder resistência a esse dano.' },
      { nivel: 9, habilidade: 'Metabolismo Ajustado', descricao: 'Sempre que curar um alvo, ele recebe Vantagem no próximo ataque que fizer, até o fim do seu próximo turno. Se o ataque acertar, ele causa +1d6 de dano. Se gastar um uso de Protocolo de Emergência, o dado de dano aumenta para 1d8. Se gastar Protocolo de Emergência, o aliado recebe PV igual metade do dano que causou por essa habilidade.' },
      { nivel: 11, habilidade: 'Sobrecarga Adrenal', descricao: '1 vez por combate, Ação Bônus, Toque. Um aliado recebe +1d6 de aumento de todo dano que causar e +2 na CA até o fim de seu próximo turno. Se gastar Protocolo de Emergência, ele também ganha um ataque extra nesse período.' },
      { nivel: 13, habilidade: 'Cirurgia de Campo', descricao: 'Você pode realizar Atendimento de Combate como Ação Bônus. Se mover para usar Atendimento de Combate não provoca ataques de oportunidade e lhe concede 10 PV ao usar após se mover.' },
      { nivel: 17, habilidade: 'Manutenção Total', descricao: 'Ação. Ao curar um alvo, aumente a cura em 1d8 e ele recebe +1d6 em testes de resistência até o fim do próximo turno. Se gastar Protocolo de Emergência, o dado extra em testes aumenta para 1d8.' },
      { nivel: 20, habilidade: 'Milagre Mecânico', descricao: '1 vez por descanso longo, Reação. Quando um aliado a até 9m cair a 0 PV, você fazê-lo permanecer com 1 PV em vez disso e ele ganha PV temporários iguais ao seu nível de Medicânico. Além disso, até o fim do próximo turno, ele não pode cair abaixo de 1 PV.' }
    ],
    subclasses: [
      {
        nome: 'Cirurgião de Guerra',
        descricao: 'O Cirurgião de Guerra é o último recurso quando tudo deu errado. Treinado para operar sob fogo cruzado, ele mantém aliados vivos através de transfusões improvisadas, estabilizações brutais e intervenções rápidas que ignoram dor, medo e limites biológicos. Onde outros veriam um corpo perdido, ele enxerga apenas mais um paciente que ainda pode voltar para a luta.',
        progressao: [
          { nivel: 3, habilidade: 'Mãos Firmes', descricao: 'Sua cura sempre usa o valor máximo do dado base quando o alvo estiver abaixo de metade dos PV.' },
          { nivel: 7, habilidade: 'Transfusão de Emergência', descricao: '1 vez por turno, 1 Protocolo de Emergência, Reação. Quando um aliado a até 5m sofre dano, ele recebe apenas metade deste dano, e você recebe o mesmo valor em dano Psíquico.' },
          { nivel: 10, habilidade: 'Malha de Estabilização', descricao: 'Aliados curados por você recebem +2 CA (até um máximo de 26) até o final de seu próximo turno.' },
          { nivel: 15, habilidade: 'Pulso Restaurador', descricao: '1 vez por combate, 1 Protocolo de Emergência, Ação. Até 4 alvos em até 9m recuperam 2d8 + Sabedoria + bônus de proficiência de PV e recuperam seus usos de Reação desta rodada.' }
        ]
      },
      {
        nome: 'Operador de Choque',
        descricao: 'O Operador de Choque não está no campo de batalha para apenas manter aliados vivos — ele está lá para garantir que o inimigo caia primeiro. Especialista em estimulantes militares, sobrecargas neurais e protocolos de agressividade induzida, ele transforma dor em combustível e medo em impulso de ataque. Seus tratamentos não priorizam conforto nem segurança a longo prazo; priorizam vencer a luta agora, custe o que custar depois.',
        progressao: [
          { nivel: 3, habilidade: 'Estimulantes de Combate', descricao: 'Quando você cura um aliado, o próximo ataque dele causa +1d8 de dano extra. O aliado ganha +3m de deslocamento até o fim do seu próximo turno.' },
          { nivel: 7, habilidade: 'Treinamento Tático Pesado', descricao: 'Acrescente o modificador de Sabedoria no dano dos seus ataques com armas ou desarmado e de qualquer aliado afetado por habilidades suas até o fim do seu próximo turno.' },
          { nivel: 10, habilidade: 'Arsenal Pesado', descricao: '1 vez por turno, Protocolo de Emergência. Ao atingir um alvo, você pode marcá-lo. O próximo ataque de um aliado contra ele causa +1d8 de dano extra. Se gastar Protocolo de Emergência: o aliado recebe Vantagem nesse ataque.' },
          { nivel: 15, habilidade: 'Cadeia de Adrenalina', descricao: '1 vez por turno. Quando um aliado sob efeito de alguma habilidade sua reduz um inimigo a 0 PV, ele escolhe entre recuperar 3d8 + Sabedoria + bônus de proficiência PV ou aumentar seu deslocamento em 3m até o fim de seu próximo turno.' }
        ]
      },
      {
        nome: 'Biohacker',
        descricao: 'O Biohacker não cura corpos. Você reescreve sistemas biológicos. Nanotecnologia médica, vírus sintéticos e sabotagem neural permitem que você transforme inimigos em organismos falhos enquanto fortalece aliados através de mutações temporárias.',
        progressao: [
          { nivel: 3, habilidade: 'Vírus Adaptativo', descricao: '1 vez por turno. Quando causar dano a uma criatura humanoide ou curar um aliado, você pode aplicar um Vírus Adaptativo até o fim do seu próximo turno. Escolha um efeito: Colapso Motor: A criatura perde 3m de deslocamento. Sobrecarga Neural: A criatura sofre Desvantagem no próximo teste de resistência ou ataque que realizar. Estímulo Sintético: Um aliado recebe +1d4 no próximo teste de resistência ou ataque que realizar.' },
          { nivel: 7, habilidade: 'Nanorreparos', descricao: 'Quando um aliado sob um de seus efeitos sofrer dano, reduza o dano em valor igual à sua Sabedoria. Se o alvo estiver abaixo da metade dos PV, ele também ganha PV temporários iguais ao bônus de proficiência.' },
          { nivel: 10, habilidade: 'Contaminação Viral', descricao: 'Inimigos afetados por efeitos de suas habilidades tem a Classe de Armadura (CA) reduzida em -1, e toda a cura é reduzida pela metade.' },
          { nivel: 15, habilidade: 'Reescrita Biológica', descricao: '1 vez por combate, Ação. Escolha até 4 criaturas em 9m que estejam afetadas por suas habilidades e aplique um dos efeitos. Aliados: Revitalização: Recuperam 2d8 PV; Reflexos: Recebem Vantagem no próximo teste de resistência. Inimigos: Punição: Sofrem 4d8 dano Psíquico; e realizam teste de Constituição (CD 8 + modificador de Sabedoria + bônus de proficiência) e em caso de falha, ele fica Atordoado até o fim do seu próximo turno.' }
        ]
      }
    ]
  },
  {
    nome: 'Piloto',
    descricao: 'Os Pilotos são os donos das ruas abertas, rodovias esquecidas e das Terras Baldias. Onde não há mapas confiáveis, onde o terreno mata tanto quanto as balas, eles prosperam. Mestres da pilotagem, leitura de ambiente e sobrevivência extrema, Pilotos sabem quando acelerar, quando se esconder e quando transformar a estrada em uma arma.',
    flavorText: [
      'Os Pilotos são os donos das ruas abertas, rodovias esquecidas e das Terras Baldias.',
      'Mestres da pilotagem, leitura de ambiente e sobrevivência extrema.',
      'Pilotos sabem quando acelerar, quando se esconder e quando transformar a estrada em uma arma.'
    ],
    hpNivel1: '20 + modificador de Constituição',
    hpPorNivel: '1d10 + modificador de Constituição',
    ctBase: 10,
    ctBonusNiveis: [4, 8, 12, 16, 20],
    proficiencias: {
      resistencias: ['Destreza', 'Sabedoria'],
      armas: ['Pistolas', 'Revólveres', 'Submetralhadoras', 'Rifles de Assalto', 'Rifles de Precisão', 'Escopetas', 'Facas', 'Armas Improvisadas Leves'],
      armaduras: ['Leves', 'Médias'],
      ferramentas: ['Ferramentas de Veículos', 'Kits de Sobrevivência'],
      pericias: { escolher: 4, opcoes: ['Pilotagem', 'Sobrevivência', 'Percepção', 'Furtividade', 'Atletismo', 'Intuição', 'Tecnologia', 'Tolerância'] }
    },
    progressao: [
      { nivel: 1, habilidade: 'Motorizado', descricao: 'Você começa com -1.500 edinhos. Escolha entre o carro Archer Hella EC-D I360 ou a moto Arch Nazaré. Você já inicia com o veículo selecionado. Você possui proficiência em Pilotagem; e pode realizar manutenção básica em veículos sem testes.' },
      { nivel: 1, habilidade: 'Instinto de Estrada', descricao: 'Vantagem em testes de Percepção e Sobrevivência em ruas, áreas abertas, rodovias, becos externos e nas Terras Baldias. Além disso, você sempre sabe qual direção oferece melhor rota de fuga.' },
      { nivel: 2, habilidade: 'Mãos no Volante', descricao: 'O veículo pilotado por você ganha +2 na CA e recebe Vantagem em testes de Pilotagem para Manobras Evasivas.' },
      { nivel: 5, habilidade: 'Ataque Extra', descricao: 'Você pode atacar duas vezes sempre que realizar a Ação de Ataque ou realizar uma Ação de Ataque e uma Ação de recarregar (em qualquer ordem).' },
      { nivel: 6, habilidade: 'Posicionamento Estratégico', descricao: 'Você recebe Vantagem no teste de iniciativa em ruas, áreas abertas, rodovias, becos externos e nas Terras Baldias. Caso esteja em uma dessas áreas, após a rolagem de iniciativa, e antes de qualquer um agir, você pode se mover até 3m sem gastar deslocamento e esse movimento não provoca ataques de oportunidade.' },
      { nivel: 9, habilidade: 'Sobrevivente Cascudo', descricao: 'Você recebe resistência a dano Químico e de Veneno, e recebe Vantagem em testes contra climas e ambientes adversos.' },
      { nivel: 11, habilidade: 'Escapista', descricao: '1 vez por turno, Reação. Quando um inimigo errar um ataque contra você, pode se mover até 5m e esse movimento não provoca ataques de oportunidade.' },
      { nivel: 13, habilidade: 'Mobilidade Predatória', descricao: 'Você pode marcar um alvo, e caso esse alvo se mova, você pode mover até metade do seu deslocamento em direção a ela sem gastar movimento.' },
      { nivel: 17, habilidade: 'Reflexos de Alta Velocidade', descricao: 'Adiciona seu modificador de Sabedoria à sua CA enquanto estiver em um veículo e recebe Vantagem em testes contra efeitos de explosões.' },
      { nivel: 20, habilidade: 'Lenda da Estrada', descricao: 'Se mover pelo menos 6m antes de atacar, recebe Vantagem no ataque e adiciona +1d8 de dano adicional. Enquanto estiver em veículo: ataques contra você possuem Desvantagem até o início do próximo turno.' }
    ],
    subclasses: [
      {
        nome: 'Fúria',
        descricao: 'A Fúria transforma o piloto em um predador da estrada. Para ele, velocidade não é apenas locomoção — é arma, vantagem e sentença de morte. Cada perseguição é uma caçada, cada curva é calculada, e cada disparo é feito no momento exato em que o inimigo está mais vulnerável. Onde outros veem caos, o Piloto da Fúria enxerga oportunidades.',
        progressao: [
          { nivel: 3, habilidade: 'Predador da Estrada', descricao: 'Atacar enquanto pilota não impõe Desvantagem e seu primeiro ataque em combate veicular causa +1d8 de dano extra.' },
          { nivel: 7, habilidade: 'Emboscador', descricao: '1 vez por turno. O primeiro ataque que realizar tem Vantagem em ataques contra inimigos que ainda não agiram neste turno. Além disso, Acertos Críticos com armas à distância causam +1d8 extra.' },
          { nivel: 10, habilidade: 'Caça Implacável', descricao: '1 vez por turno, Ação Bônus. Você pode marcar um alvo e você tem Vantagem em Ataques contra ele. Caso o atinja, você consome a marca e causa 2d8 de dano extra.' },
          { nivel: 15, habilidade: 'Estrada da Fúria', descricao: 'Enquanto estiver abordo de um veículo ou lutando em ruas, áreas abertas, becos externos ou nas Terras Baldias, seus ataques com armas à distância têm crítico em 19–20.' }
        ]
      },
      {
        nome: 'Líder',
        descricao: 'A especialização Líder representa aquele que mantém o grupo vivo quando tudo dá errado. Não é o mais rápido nem o mais forte, mas é quem enxerga o campo de batalha como um todo, antecipa perigos e mantém os aliados de pé através de comando, presença e decisões firmes. Onde o caos ameaça dominar, o Líder impõe ordem.',
        progressao: [
          { nivel: 3, habilidade: 'Guia', descricao: 'Pode adicionar o bônus de Sabedoria em sua Iniciativa. Além disso, seu grupo nunca fica Surpreso enquanto estiver em ruas, áreas abertas, rodovias, becos externos, nas Terras Baldias ou abordo de um veículo, a menos que você esteja inconsciente.' },
          { nivel: 7, habilidade: 'Palavra de Liderança', descricao: '1 vez por combate, Reação, usos iguais ao Bônus de Proficiência antes de um descanso longo. Quando um aliado for atingido, reduza o dano em 3d8 + Sabedoria.' },
          { nivel: 10, habilidade: 'Ordem de Marcha', descricao: '1 vez por combate, Ação Bônus. Todos os aliados a até 9m ganham Vantagem no próximo ataque e 1 PV temporário por nível.' },
          { nivel: 15, habilidade: 'Protetor', descricao: '1 vez por combate, Reação. Quando um inimigo ataca um aliado adjacente, o aliado recebe +2 CA contra aquele ataque e você pode fazer um ataque com uma arma à distância contra ele; se acertar, o inimigo tem Desvantagem no próximo ataque que realizar.' }
        ]
      },
      {
        nome: 'Corredor Fantasma',
        descricao: 'O Corredor Fantasma vive em velocidade extrema. Reflexos acelerados, movimentação imprevisível e técnicas de evasão fazem dele quase impossível de acompanhar em combate.',
        progressao: [
          { nivel: 3, habilidade: 'Pós-Imagem', descricao: 'Se mover pelo menos 6m no turno, ataques contra você têm Desvantagem até o fim de seu próximo turno.' },
          { nivel: 7, habilidade: 'Trajetória Impossível', descricao: 'Você pode atravessar espaços ocupados por criaturas hostis e atravessar brechas estreitas suficientes para sua passagem ignorando punições de terreno difícil durante seu movimento. Ao realizar a ação Disparada, você não provoca ataques de oportunidade.' },
          { nivel: 10, habilidade: 'Reflexo Aumentado', descricao: '1 vez por turno, Reação. Reduza o dano recebido em 2d8 + Destreza e imediatamente mova-se 3m. Caso haja um inimigo a até 9m de distância, você pode realizar um ataque contra ele usando uma arma à distância.' },
          { nivel: 15, habilidade: 'Ás do Movimento', descricao: 'Após se mover ao menos 6m, reduz o valor de Acerto Crítico em seu próximo ataque em 1 e caso realize um Acerto Crítico neste ataque, você recupera 2d8 de PV.' }
        ]
      }
    ]
  },
  {
    nome: 'Samurai',
    descricao: 'Os Samurais são assassinos urbanos, duelistas modernos e executores frios. Alguns seguem um próprio código pessoal, outros só seguem o contrato, mas todos entendem uma verdade simples: o combate acaba antes do inimigo perceber que começou. Eles dominam o posicionamento, o tempo exato do golpe e a arte do ataque decisivo. Seja com uma lâmina vibrando no ar ou uma pistola disparando no momento perfeito, o Samurai vence pela precisão, não pela resistência.',
    flavorText: [
      'Os Samurais são assassinos urbanos, duelistas modernos e executores frios.',
      'Dominam o posicionamento, o tempo exato do golpe e a arte do ataque decisivo.',
      'O Samurai vence pela precisão, não pela resistência.'
    ],
    hpNivel1: '18 + modificador de Constituição',
    hpPorNivel: '1d8 + modificador de Constituição',
    ctBase: 8,
    ctBonusNiveis: [4, 8, 12, 16, 20],
    proficiencias: {
      resistencias: ['Destreza', 'Constituição'],
      armas: ['Pistolas', 'Submetralhadoras', 'Rifles de Precisão', 'Katanas', 'Facas', 'Armas Improvisadas Leves'],
      armaduras: ['Leves'],
      ferramentas: ['Ferramentas de Ladrão'],
      pericias: { escolher: 4, opcoes: ['Furtividade', 'Acrobacia', 'Percepção', 'Intuição', 'Enganação', 'Intimidação', 'Prestidigitação', 'Pilotagem'] }
    },
    progressao: [
      { nivel: 1, habilidade: 'Golpe Decisivo', descricao: '1 vez por turno. Quando atacar usando uma lâmina ou arma de fogo leve com Vantagem ou atacar um inimigo que ainda não tenha detectado ameaças, você causa +1d6 de dano extra. Você não precisa ter Vantagem na jogada de ataque se pelo menos um de seus aliados estiver a até 1,5m do alvo, e o aliado não esteja Incapacitado e você não tem Desvantagem na jogada de ataque. O dano aumenta em +1d6 nos níveis 4, 8, 12 e 16.' },
      { nivel: 2, habilidade: 'Movimento Rápido e Silencioso', descricao: 'Vantagem em testes de Furtividade. Você pode usar as ações Disparada e Desengajar com Ação Bônus e levantar-se do chão custa apenas 2m de movimento.' },
      { nivel: 5, habilidade: 'Ataque Extra', descricao: 'Você pode atacar duas vezes sempre que realizar a Ação de Ataque ou realizar uma Ação de Ataque e uma Ação de recarregar (em qualquer ordem).' },
      { nivel: 6, habilidade: 'Desaparecer no Caos', descricao: 'Reação. Após derrubar um inimigo a 0 PV você pode se mover até 3m sem provocar ataques de oportunidade e realizar um teste de Furtividade para se esconder como parte do movimento.' },
      { nivel: 9, habilidade: 'Contra-Ataque Instintivo', descricao: '1 vez por combate, Reação. Quando um inimigo errar um ataque contra você, realize um ataque contra ele, caso esteja em seu alcance e se acertar, adicione Golpe Decisivo ao dano.' },
      { nivel: 11, habilidade: 'Execução Precisa', descricao: '1 vez por combate. Quando atacar um inimigo Surpreso, você pode causar o dano máximo nos dados.' },
      { nivel: 13, habilidade: 'Passo Fantasma', descricao: 'Você ignora terreno difícil enquanto Furtivo, além disso, movimentar-se não quebra Furtividade fora de combate.' },
      { nivel: 17, habilidade: 'Momento Perfeito', descricao: 'Seus Ataques Críticos causam 10 de dano extra e ignoram Resistência a dano da arma utilizada.' },
      { nivel: 20, habilidade: 'Samurai Urbano', descricao: '1 vez por combate, usos iguais ao Bônus de Proficiência antes de um descanso longo. A quando reduzir um inimigo a 0 PV com um ataque corpo a corpo ou com arma, você pode realizar um ataque adicional contra outro alvo ao alcance.' }
    ],
    subclasses: [
      {
        nome: 'Lâmina Viva',
        descricao: 'Discípulo do duelo puro, o Samurai da Lâmina transforma velocidade e precisão em morte certa. Seus movimentos são rápidos como um relâmpago, sempre buscando abrir brechas antes que o inimigo possa reagir. À medida que a luta se prolonga, seus golpes se tornam cada vez mais devastadores.',
        progressao: [
          { nivel: 3, habilidade: 'Corte Relâmpago', descricao: 'Após acertar um ataque com uma lâmina, você pode usar sua Ação Bônus para realizar um ataque corpo a corpo adicional. Caso acerte um alvo que esteja Sangrando, cause 1d4 de dano extra.' },
          { nivel: 7, habilidade: 'Dança do Aço', descricao: 'O alcance de seus ataques de oportunidade é dobrado. Caso você precise se mover para atingir seu alvo em ataques de oportunidade, este deslocamento não provoca ataques de oportunidade em você e criaturas atingidas por eles perdem 3m de deslocamento.' },
          { nivel: 10, habilidade: 'Corte Perfeito', descricao: 'Seus ataques com lâmina têm Acerto Crítico em 19–20.' },
          { nivel: 15, habilidade: 'Lâmina Frenética', descricao: 'Ataques com lâmina causam +1d4 de dano extra. Sempre que você tiver um Acerto Crítico em ataques com lâmina, esse dano aumenta em 1d4 (Max 3d4). Este bônus acumulativo dura até o próximo descanso longo.' }
        ]
      },
      {
        nome: 'Executor',
        descricao: 'Especialista em execução à distância, o Executor domina o campo de batalha com frieza e cálculo. Cada disparo é pensado para pressionar o inimigo, abrindo espaço e quebrando defesas. Em constante movimento, ele transforma deslocamento em vantagem tática. Explosões e caos não o distraem, seus reflexos são afiados como sua mira.',
        progressao: [
          { nivel: 3, habilidade: 'Tiro Preciso', descricao: '1 vez por turno. Ao realizar um ataque à distância, adicione +1d4 a este ataque. Caso acerte, causa 1d6 de dano extra.' },
          { nivel: 7, habilidade: 'Movimento Letal', descricao: '1 vez por turno. Se você se mover pelo menos 3m neste turno antes de atirar, ganha +2 na jogada de ataque e se acertar, o alvo sofre –2 na CA até o fim de seu próximo turno.' },
          { nivel: 10, habilidade: 'Tiro Perfeito', descricao: 'Seus ataques com armas de fogo têm Acerto Crítico em 19–20.' },
          { nivel: 15, habilidade: 'Reflexo Explosivo', descricao: 'Quando você estiver dentro do raio de uma explosão e for forçado a realizar um teste de resistência contra seu efeito, você possui Vantagem neste teste para evitar a explosão. Em caso de sucesso, você ignora completamente o dano da explosão, se possível.' }
        ]
      },
      {
        nome: 'Duelista Neural',
        descricao: 'O Duelista Neural transforma combate em um duelo técnico e cerebral. Implantes preditivos analisam movimentos, antecipam padrões e exploram falhas microscópicas na postura do alvo. Funciona muito bem no um contra um.',
        progressao: [
          { nivel: 3, habilidade: 'Marca de Duelo', descricao: 'Ação Bônus. Marque uma criatura que você possa ver a até 18m com a Marca do Duelo. Você recebe +2 nas jogadas de ataque contra ele e +1 CA contra ataques dele. A marca é perdida caso você ataque outro alvo, o alvo morrer ou você marcar outro alvo.' },
          { nivel: 7, habilidade: 'Leitura de Combate', descricao: 'Reação, usos iguais ao seu Modificador de Sabedoria. Quando o alvo marcado com a Marca do Duelo realizar um ataque, imponha Desvantagem no ataque dele.' },
          { nivel: 10, habilidade: 'Golpe Perfeito', descricao: 'Reduz o valor de Acerto Crítico em 1 contra o alvo marcado com a Marca do Duelo.' },
          { nivel: 15, habilidade: 'Execução', descricao: 'Ataques causam +2d6 de dano extra contra o alvo marcado com a Marca do Duelo, caso ele esteja abaixo de 50% da vida.' }
        ]
      }
    ]
  },
  {
    nome: 'Solo',
    descricao: 'Solos são combatentes de elite, mercenários, soldados e assassinos profissionais. Eles vivem do confronto direto, dominam qualquer arma e sabem usar o terreno e a cobertura a seu favor. Um Solo bem treinado faz do campo de batalha uma extensão de si mesmo: onde há tiro, há Solo.',
    flavorText: [
      'Solos são combatentes de elite, mercenários, soldados e assassinos profissionais.',
      'Dominam qualquer arma e sabem usar o terreno e a cobertura a seu favor.',
      'Onde há tiro, há Solo.'
    ],
    hpNivel1: '22 + modificador de Constituição',
    hpPorNivel: '1d12 + modificador de Constituição',
    ctBase: 10,
    ctBonusNiveis: [4, 8, 12, 16, 20],
    proficiencias: {
      resistencias: ['Força', 'Constituição'],
      armas: ['Pistolas', 'Revólveres', 'Submetralhadoras', 'Escopetas', 'Rifles de Assalto', 'Metralhadoras Leves', 'Lança Foguetes', 'Facas', 'Armas Improvisadas Leves e Pesadas'],
      armaduras: ['Leves', 'Médias', 'Pesadas', 'Escudos'],
      ferramentas: ['Kits de Manutenção de armas'],
      pericias: { escolher: 4, opcoes: ['Atletismo', 'Intimidação', 'Percepção', 'Pilotagem', 'Briga', 'Tolerância', 'Enganação', 'Investigação'] }
    },
    progressao: [
      { nivel: 1, habilidade: 'Instinto de Combate', descricao: '1 vez por combate. Você recebe +3 na Iniciativa. No primeiro turno do combate, recebe +3m de deslocamento e +1 na sua primeira jogada de ataque após se mover.' },
      { nivel: 2, habilidade: 'Mira Avançada', descricao: '1 vez por turno. Ao usar a Ação Mirar, aumente o dano em +1d4 extra. O dano aumenta em +1d4 nos níveis 8, 12 e 16.' },
      { nivel: 5, habilidade: 'Ataque Extra', descricao: 'Você pode atacar duas vezes sempre que realizar a Ação de Ataque ou realizar uma Ação de Ataque e uma Ação de recarregar (em qualquer ordem).' },
      { nivel: 6, habilidade: 'Reação Rápida', descricao: '1 vez por combate, Reação. Ao receber um ataque à distância, aumente sua CA em +3 contra esse ataque.' },
      { nivel: 9, habilidade: 'Especialista em Explosivos', descricao: 'Granadas podem ser usados como Ação Bônus.' },
      { nivel: 13, habilidade: 'Provocação', descricao: '1 vez por combate. Escolha até 2 inimigos que possam ouvi-lo em até 18m e os desafie. Os forçando a realizar um teste de resistência de Carisma (CD 8 + modificador de Força + bônus de proficiência), e em caso de falha; se moverão até 5m imediatamente em sua direção sem provocar ataques de oportunidade e recebem Desvantagem em ataques contra outros alvos até o início do próximo turno. Os alvos afetados podem se posicionar atrás de coberturas durante este movimento.' },
      { nivel: 17, habilidade: 'Maestria em Combate', descricao: '1 vez por combate. Caso erre um Ataque com arma, pode rerrolar o dado e caso acerte, aumente o dano em +2d6.' },
      { nivel: 20, habilidade: 'Perfeição do Solo', descricao: '1 vez por combate, Ação Bônus. Seus ataques têm crítico em 19–20 e você ganha resistência a dano Perfurante, Cortante e Contundente por 3 turnos.' }
    ],
    subclasses: [
      {
        nome: 'Especialista em Rifles',
        descricao: 'Focados em precisão, mobilidade e ataques rápidos, os Especialistas em Rifles são mestres em eliminar múltiplos alvos com agilidade e precisão. Eles preferem armas automáticas e de precisão para manter um fluxo constante de dano.',
        progressao: [
          { nivel: 3, habilidade: 'Mira Tática', descricao: '1 vez por combate, 1 Ataque. Escolha um alvo dentro do alcance máximo do seu Rifle de Assalto ou Rifle de Precisão e realize um ataque preciso. O alvo deve realizar um teste de Destreza (CD 8 + seu modificador de Destreza ou Força + seu bônus de proficiência) e em caso de falha, o inimigo sofre o dano total desse ataque e fica marcado até o fim do seu próximo turno. Atacantes possuem Vantagem ao atacar o alvo marcado. Em caso de sucesso, o alvo sofre o dano mínimo, e não é marcado.' },
          { nivel: 7, habilidade: 'Dano Concentrado', descricao: 'Quando você acertar dois ataques consecutivos com um Rifle de Assalto ou Rifle de Precisão no mesmo alvo em um turno, você causa 1d6 de dano adicional no segundo ataque. Este dano aumenta em 1d6 nos níveis: 12, 16 e 20.' },
          { nivel: 10, habilidade: 'Instinto', descricao: 'Reação. Quando um inimigo realizar um ataque à distância contra você e errar, você pode usar uma reação para mover-se até 3m sem provocar ataques de oportunidade. Se você se mover dessa forma, pode realizar um ataque corpo a corpo como parte da mesma reação. Você pode escolher a ordem dessas ações.' },
          { nivel: 15, habilidade: 'Finalizador', descricao: '1 vez por turno. Ao usar a Ação Mirar com um Rifle de Assalto ou Rifle de Precisão, seu próximo ataque Ignora cobertura parcial. Além disso, o efeito de Mira Avançada aumenta de d4 para d8.' }
        ]
      },
      {
        nome: 'Especialista em Armas Pesadas',
        descricao: 'Mestres no uso de armamento pesado, esses Solos preferem armas devastadoras como lança-foguetes e metralhadoras. Seu estilo é menos sobre agilidade e mais sobre destruição em massa, com ataques poderosos capazes de devastar vários inimigos ao mesmo tempo.',
        progressao: [
          { nivel: 3, habilidade: 'Helios', descricao: 'Você tem acesso a uma arma especial chamada Helios. Vá a algum vendedor de armas de Night City e diga a frase: O Sol sangra. Qualquer vendedor de respeito saberá do que se trata. BFG-9000 Helios (Lança-Foguetes). Descrição Física: Arma massiva e imponente, com um acabamento metálico escuro. Sendo projetada para causar destruição em larga escala em combates decisivos. Dano Base: 4d10 de Energia (área de 6m). Capacidade: 1 disparo antes de precisar recarregar (Ação). Distância de Ação: 10m a 80m. Efeito Especial: A Helios só pode ser disparada uma vez por turno. O disparo atinge uma ampla área de impacto; criaturas na área devem realizar um Teste de Destreza (CD 8 + modificador de Força ou Destreza + bônus de proficiência). Em caso de sucesso, sofrem metade do dano. A Helios consome toda a sua Ação para ser usada. O dano da Helios aumenta em +1d10 nos níveis 8, 12, 16 e 20.' },
          { nivel: 7, habilidade: 'Robustez de Combate', descricao: '1 vez por turno, Ação Bônus. Quando estiver usando uma Metralhadora Leve ou Escopeta, ganhe Robustez, aumentando em +1 sua Classe de Armadura (CA), ganhando resistência a dano de Energia e aumentando em 1d6 a cura recebida de todas as fontes até o final do próximo turno. O valor da cura aumenta em 1d6 nos níveis 12, 16 e 20.' },
          { nivel: 10, habilidade: 'Tiros Penetrantes', descricao: 'Seus ataques com Metralhadoras Leves e Escopetas ignoram resistência a dano Perfurante. Seu dano com essas armas aumenta em 1d6. Esse dano aumenta em 1d6 nos níveis 16 e 20.' },
          { nivel: 15, habilidade: 'Reação em Cadeia', descricao: '1 vez por combate. Se você acertar um inimigo com sua Metralhadora Leve ou Escopeta, você pode imediatamente realizar um segundo ataque contra um segundo inimigo próximo (até 3 metros de distância do alvo) como parte da mesma Ação.' }
        ]
      },
      {
        nome: 'Especialista em Corpo a Corpo',
        descricao: 'Focados em combate corpo a corpo, esses Solos são mestres em ataques rápidos e letais, usando armas como facas, socos e outras ferramentas de combate próximo. Eles priorizam a força e a destreza para superar seus oponentes.',
        progressao: [
          { nivel: 3, habilidade: 'Lutador', descricao: 'Sua Vida Máxima aumenta em 10 pontos. Adicionalmente, quando você acerta um ataque corpo a corpo, aumente o dano em 1d4. Esse dano aumenta em 1d4 nos níveis 8, 12, 16 e 20.' },
          { nivel: 7, habilidade: 'Ataque Veloz', descricao: '1 vez por turno, Ação Bônus. Permite realizar 1 Ataque corpo a corpo extra. Se mover ao menos 3m antes do ataque, aumente o dano em 1d8 extra.' },
          { nivel: 10, habilidade: 'Golpe Brutal', descricao: '1 vez por combate, usos iguais ao Bônus de Proficiência antes de um descanso longo. Quando você acerta um ataque corpo a corpo, você pode escolher dobrar os dados de dano base desse ataque. Não funciona com Acertos Críticos.' },
          { nivel: 15, habilidade: 'Sombra do Combatente', descricao: 'Quando acerta um alvo com um ataque corpo a corpo, você se torna tão evasivo que os inimigos têm Desvantagem no primeiro ataque contra você até o seu próximo turno.' }
        ]
      }
    ]
  },
  {
    nome: 'Trilha-Redes',
    descricao: 'Os Trilha-Redes são feiticeiros da era digital. Onde outros puxam o gatilho, eles puxam linhas de código. Onde há silêncio eletrônico, eles escutam sussurros de dados. Eles não vencem pela força, nem pela velocidade — vencem porque o inimigo não lutou em um campo justo. O Cyberdeck não é uma ferramenta, é uma extensão do seu cérebro.',
    flavorText: [
      'Os Trilha-Redes são feiticeiros da era digital.',
      'Onde outros puxam o gatilho, eles puxam linhas de código.',
      'O Cyberdeck não é uma ferramenta, é uma extensão do seu cérebro.'
    ],
    hpNivel1: '16 + modificador de Constituição',
    hpPorNivel: '1d6 + modificador de Constituição',
    ctBase: 8,
    ramBase: null,
    ctBonusNiveis: [4, 8, 12, 16, 20],
    proficiencias: {
      resistencias: ['Inteligência', 'Destreza'],
      armas: ['Pistolas', 'Submetralhadoras', 'Rifles de Precisão', 'Facas'],
      armaduras: ['Leves'],
      ferramentas: ['Kit de manutenção de equipamentos'],
      pericias: { escolher: 4, opcoes: ['Investigação', 'Hacking', 'Tecnologia', 'Percepção', 'Furtividade', 'Persuasão', 'Prestidigitação', 'Enganação'] }
    },
    progressao: [
      { nivel: 1, habilidade: 'Cyberdeck Neural', descricao: 'Você começa com -1.500 edinhos. Você começa com um Cyberdeck padrão implantado e os seguintes Hacks Rápidos: Aceleração Forçada, Curto-Circuito, Ping, Superaquecer e Travar Arma. RAM Total: 4 + modificador de Inteligência + bônus de proficiência. Capacidade de Hacks: 3. CT: 3. Valor: 300 edinhos.' },
      { nivel: 1, habilidade: 'Recarga de RAM', descricao: 'Você recupera 1 ponto de RAM no início de cada um de seus turnos, até o máximo. Aumentando em +1 nos níveis: 4, 8, 12 e 16.' },
      { nivel: 2, habilidade: 'Hack Mais Rápido', descricao: '1 vez por turno, Ação Bônus. Você pode executar um Hack Rápido que não cause danos em um alvo que você já tenha Invadido ou afetado por um Hack Rápido neste turno.' },
      { nivel: 5, habilidade: 'Execução Paralela', descricao: '1 vez por turno. Quando você acertar um ataque com arma leve, você pode executar um Ataque Hack logo em sequência, mas o Hack Rápido usado deve ter um custo máximo de 4 RAM. Aumentando a RAM máxima em +2 nos níveis: 12, 16 e 20.' },
      { nivel: 6, habilidade: 'Conexão Prolongada', descricao: '1 vez por combate, custa 6 de RAM. Ao hackear um alvo com sucesso você pode manter acesso até o fim do seu próximo turno, sem necessidade de realizar outro Ataque Hacker. Hacks Rápidos subsequentes contra o mesmo alvo custam –1 RAM (mínimo 1) e ele possui Desvantagem em testes contra esses Hacks Rápidos.' },
      { nivel: 9, habilidade: 'Controle Visual', descricao: 'Ao hackear uma câmera conectada a uma rede, você pode afetar até 3 outras câmeras ligadas a ela sem testes. Você pode usar Ping através delas.' },
      { nivel: 11, habilidade: 'Mente Concentrada', descricao: 'Enquanto estiver Concentrado em Hacks Rápidos, você tem Vantagem em testes contra Medo e Intimidação e possui resistência à dano Psíquico.' },
      { nivel: 13, habilidade: 'Supremacia Digital', descricao: 'Você pode manter até 2 dispositivos sob seu controle ao mesmo tempo.' },
      { nivel: 17, habilidade: 'Senhor da Matriz', descricao: 'Você pode manter a Concentração em 2 Hacks Rápidos ao mesmo tempo. Em cada turno que estiver manter mantendo a Concentração em 2 Hacks Rápidos, você deve realizar um teste de Inteligência (CD 16), e caso falhe, você perde a Concentração em ambos e ficará Atordoado por 1 turno.' },
      { nivel: 20, habilidade: 'Overclock', descricao: '1 vez por combate, custa 8 de RAM. Você entra em Overclock por 3 turnos. Durante o Overclock: Você pode executar dois Ataques Hacks no mesmo turno usando sua Ação, Hacks Rápidos custam –1 RAM e você recebe +2 de Classe de Firewall (CF). Você deve realizar um teste de Constituição (CD 16) em cada turno para manter o Overclock ativo, em caso de falha, você ficará Atordoado por 1 turno. Ao final do Overclock, você sofre 1 nível de exaustão.' }
    ],
    subclasses: [
      {
        nome: 'Arquiteto',
        descricao: 'O Arquiteto não invade sistemas apenas para abrir caminhos, ele reescreve o campo de batalha. Para esse Trilha-redes, estruturas, dispositivos e redes fixas não são obstáculos, mas peças de um tabuleiro que pode ser rearranjado em tempo real. Portas viram escudos, torretas se tornam aliados e o caos é mantido sob controle por pura engenharia digital.',
        progressao: [
          { nivel: 3, habilidade: 'Domínio Estrutural', descricao: 'Você tem Vantagem para manter a Concentração do controle de portas, torretas, câmeras ou sistemas e esses dispositivos sob seu controle recebem +2 de Classe de Firewall (CF).' },
          { nivel: 7, habilidade: 'Explosão de Dados', descricao: '1 vez por combate, custa 4 de RAM. Ao encerrar antecipadamente um Hack Rápido de efeito contínuo ainda ativo em um alvo, você pode causar 3d8 de dano Elétrico nele e todos a até 3m devem realizar um Teste de Destreza (CD 8 + seu modificador de Inteligência + seu bônus de proficiência) em caso de falha, também recebem o dano, e em caso sucesso, recebem apenas metade do dano.' },
          { nivel: 10, habilidade: 'Firewall Vivo', descricao: 'Enquanto controla ao menos um dispositivo você ganha +2 na CF.' },
          { nivel: 15, habilidade: 'Proteção Digital', descricao: '1 vez por combate, custa 5 de RAM. Ao ser hackeado, pode mudar o alvo do Hack Rápido para um dispositivo que você esteja controlando. Se o dispositivo for destruído ao receber um Hack Rápido desviado, você recupera 2 RAM.' }
        ]
      },
      {
        nome: 'Fantasma Neural',
        descricao: 'O Fantasma Neural não precisa controlar máquinas, portas ou torretas. Seu campo de batalha é a mente humana. Implantes, interfaces neurais e conexões sinápticas são apenas mais um ponto de acesso, e cada pensamento pode se tornar uma brecha explorável. Onde outros veem vontade própria, o Fantasma Neural enxerga código imperfeito.',
        progressao: [
          { nivel: 3, habilidade: 'Invasão Cognitiva', descricao: '1 vez por combate, custa 3 de RAM. Ao hackear um inimigo com implantes, ele faz teste de Sabedoria (CD 8 + seu modificador de Inteligência + seu bônus de proficiência) se falhar, sofre Desvantagem em ataques até o final do seu próximo turno.' },
          { nivel: 7, habilidade: 'Vozes na Cabeça', descricao: '1 vez por combate, custa 1 de RAM. Você pode se comunicar mentalmente com alvos com implantes no Cérebro, Olhos ou com Sistema Operacional a até 20m e transmitir imagens, vídeos, sons ou palavras. Os alvos verão ou ouvirão o que você mostrar a eles, mas isso não os atrapalha em combate. Os alvos precisam aceitar que você se conecte a eles para ativar essa habilidade ou você pode gastar 5 de RAM para invadir contra a vontade do alvo, causando Desvantagem em Percepção e testes para manter a Concentração até o próximo turno.' },
          { nivel: 10, habilidade: 'Comando Forçado', descricao: '1 vez por combate, custa 4 de RAM. Ao hackear um alvo, force-o a realizar um teste de Sabedoria (CD 8 + seu modificador de Inteligência + seu bônus de proficiência), e em caso de falha, obrigue-o a realizar uma ação simples, como mover-se, soltar arma, ajoelhar, se afastar etc.' },
          { nivel: 15, habilidade: 'Predador Psíquico', descricao: 'Reação, custa 4 de RAM. Quando um inimigo falhar em um teste de resistência contra um Hack Rápido seu, cause 2d8 + Inteligência de dano Psíquico neste alvo e recupere PV igual ao dano causado por este efeito.' }
        ]
      },
      {
        nome: 'Operador de Combate',
        descricao: 'O Operador de Combate sincroniza armas e hacking em um único fluxo ofensivo. Disparos abrem brechas digitais enquanto invasões tornam alvos vulneráveis à execução imediata.',
        progressao: [
          { nivel: 3, habilidade: 'Interface de Combate', descricao: 'Quando atingir um alvo sob efeito de Hack ou Invadido usando uma arma à distância, pode acrescentar o modificador de Inteligência no ataque. Caso acerte, causa +1d6 dano extra.' },
          { nivel: 7, habilidade: 'Execução Sincronizada', descricao: '1 vez por turno. Após realizar um ataque com arma, pode aplicar um Hack Rápido de até 5 RAM com custo de Ação Bônus como parte do ataque. Se o ataque for um Crítico, o Hack custará 0 RAM.' },
          { nivel: 10, habilidade: 'Vulnerabilidade Explorada', descricao: 'Alvos sob efeitos de Hacks Rápidos ou Invadidos por você: Sofrem -2 de Classe de Armadura (CA).' },
          { nivel: 15, habilidade: 'Combate Neural Integrado', descricao: 'Durante Overclock ou ao manter Concentração em Hacks Rápidos, pode realizar 1 ataque com arma como Ação Bônus. Seus ataques com armas à distância causam +1d8 dano Psíquico extra durante o Overclock.' }
        ]
      }
    ]
  }
];

/**
 * Antecedentes — CyberPun2080
 * Fonte: PDF CyberPun2080 — dados transcritos literalmente
 */
export const CYBERPUN2080_ANTECEDENTES: CyberpunkAntecedenteCatalog[] = [
  {
    nome: 'Canal',
    emoji: '🕸️',
    descricao: 'Você sempre soube quem procurar, quanto pagar e qual dívida cobrar depois. Atuou como intermediário, facilitador ou cérebro por trás de operações ilegais e acordos perigosos. Seu poder nunca esteve na força bruta, mas nas conexões certas — e nas consequências de quebrá-las. Hoje, como mercenário, você ainda joga o jogo dos favores, só que agora dentro dele.',
    atributos: ['Carisma', 'Destreza', 'Sabedoria'],
    talentoOrigem: 'Rede de Favores',
    talentoDescricao: 'Você mantém contatos ativos no submundo criminal, corporativo ou mercenário. Uma vez por arco de história, você pode escolher um dos efeitos: conseguir um serviço avançado viável (transporte ilegal, acesso a mercado restrito) ou melhorar os termos iniciais de um contrato (pagamento, prazo ou condições). Cada uso mexe na sua reputação — positiva ou negativa — e pode gerar cobranças futuras.',
    dinheiroInicial: 2800,
    itensIniciais: ['1× Unity (Pistola Tecnológica)', '1× Supressor Tático Básico', '1× Casaco de Nano-Fibra Reforçada']
  },
  {
    nome: 'Corpe',
    emoji: '🏢',
    descricao: 'Você fez parte da máquina. Relatórios, metas, reuniões e jogos de poder moldaram sua visão de mundo. Mesmo sendo apenas mais um número no sistema, você aprendeu como as corporações pensam, reagem e escondem seus erros. Agora fora da jaula dourada, você usa esse conhecimento para sobreviver — e lucrar.',
    atributos: ['Carisma', 'Inteligência', 'Destreza'],
    talentoOrigem: 'Contato Corporativo',
    talentoDescricao: 'Escolha uma corporação. Você mantém um contato ativo dentro dela. Uma vez por arco de história, você pode obter: informação interna não confidencial mas relevante, ou acesso temporário e supervisionado a uma área restrita. Esse contato não arrisca a própria carreira por você e pode cortar relações se pressionado demais.',
    dinheiroInicial: 3000,
    itensIniciais: ['1× DS1 Pulsar (Submetralhadora Tecnológica)', '1× Supressor Tático Básico', '1× Jaqueta Balística Urbana']
  },
  {
    nome: 'Marginal',
    emoji: '🔪',
    descricao: 'Você cresceu aonde a lei não chega — becos, prédios abandonados e territórios disputados. Gangues, crime e violência sempre fizeram parte do cotidiano, moldando seus instintos e sua forma de sobreviver. Hoje, como mercenário, você saiu das ruas, mas as ruas nunca saíram de você.',
    atributos: ['Carisma', 'Destreza', 'Força'],
    talentoOrigem: 'Sobrevivente das Ruas',
    talentoDescricao: 'Escolha uma gangue com a qual você tenha ligação passada ou atual. Você automaticamente reconhece símbolos, territórios e hierarquias dessa gangue e sinais comuns de emboscadas ou zonas urbanas perigosas. Uma vez por arco de história, você pode solicitar um favor à gangue: informação local, esconderijo temporário ou intermediação rápida. Favores nunca são gratuitos — a conta sempre chega.',
    dinheiroInicial: 2800,
    itensIniciais: ['1× Unity (Pistola Tecnológica)', '1× Jaqueta de Gangue']
  },
  {
    nome: 'Mídia',
    emoji: '📡',
    descricao: 'Você viveu de dados, versões e exposição. Seja revelando verdades, distorcendo fatos ou vendendo silêncio, aprendeu que informação é a arma mais difícil de combater. No presente, atua como mercenário da narrativa da verdade ou da mentira mais bem paga. Cuidado com os inimigos que criará.',
    atributos: ['Sabedoria', 'Carisma', 'Inteligência'],
    talentoOrigem: 'Contato Misterioso',
    talentoDescricao: 'A cada arco de história, você receberá uma ligação de um contato misterioso que deixa anotações sobre algum trabalho ou local onde você conseguirá muito edinho. O local secreto fica a critério do mestre. Você apenas recebe uma ligação de alguém misterioso que te indica o lugar.',
    dinheiroInicial: 2800,
    itensIniciais: ['1× Unity (Pistola Tecnológica)', '1× Casaco de Nano-Fibra Reforçada']
  },
  {
    nome: 'Militar',
    emoji: '🎖️',
    descricao: 'Você foi treinado para a guerra antes de virar mercenário. Serviu em conflitos, guerras ou operações clandestinas onde disciplina e execução eram tudo. Hoje, você vende técnica, frieza e experiência — não bandeiras ou juramentos.',
    atributos: ['Constituição', 'Força', 'Inteligência'],
    talentoOrigem: 'Treinamento Avançado',
    talentoDescricao: 'Escolha um tipo de treinamento nos níveis 1, 8 e 16: Combate Urbano (ignora terreno difícil ao se mover entre destroços de combate), Armas Pesadas (recarrega Rifles de Assalto, Escopetas ou Metralhadoras Leves usando Ação Bônus após abater um alvo) ou Tática e Comando (uma vez por combate, concede a um aliado que possa te ouvir +1d4 em um teste de resistência ou ataque até o início do seu próximo turno).',
    dinheiroInicial: 2300,
    itensIniciais: ['1× D5 Copperhead (Rifle de Assalto Tecnológico)', '1× Colete Tático Urbano', '2× Granada Explosiva']
  },
  {
    nome: 'Nômade',
    emoji: '🚙',
    descricao: 'Você cresceu na estrada, entre motores, poeira e lealdade tribal. Viver fora da cidade ensinou valores diferentes: palavra vale mais que contrato, e dívida se paga com ação. Mesmo em Night City, você nunca está totalmente sozinho.',
    atributos: ['Constituição', 'Destreza', 'Sabedoria'],
    talentoOrigem: 'Família',
    talentoDescricao: 'Você mantém laços com um clã nômade ativo nos arredores da cidade. Uma vez por arco de história, você pode solicitar: abrigo seguro temporário, transporte terrestre simples, informações sobre estradas, comboios ou zonas externas. Caso você seja da classe Piloto, pode começar com o carro Thorton Colby "Little Mule" (Carro Off-road) sem alterar seu dinheiro inicial.',
    dinheiroInicial: 3000,
    itensIniciais: ['1× DR5 Nova (Revólver Tecnológico)', '1× Roupa Urbana Reforçada', '1× Granada de Concussão']
  },
  {
    nome: 'Policial',
    emoji: '🚓',
    descricao: 'Você já acreditou na lei — ou aprendeu rápido demais como ela falha. Seja por expulsão, corrupção ou desilusão, seu tempo na força deixou marcas e conhecimento valioso. Hoje, usa o sistema que um dia serviu para sobreviver fora dele.',
    atributos: ['Destreza', 'Força', 'Constituição'],
    talentoOrigem: 'Distintivo',
    talentoDescricao: 'Você possui um distintivo antigo e inválido. Enquanto sua identidade não estiver comprometida, você pode: intimidar criminosos, solicitar informações em delegacias ou priorizar atendimento policial em situações justificáveis. Uso excessivo gera desconfiança, investigação interna e pode resultar na perda definitiva do benefício.',
    dinheiroInicial: 3000,
    itensIniciais: ['1× Unity (Pistola Tecnológica)', '1× Uniforme Policial Padrão', '1× Bastão Retrátil']
  },
  {
    nome: 'Técnico',
    emoji: '🔧',
    descricao: 'Enquanto outros atiram, você garante que tudo funcione. Sistemas, armas e máquinas sempre foram mais confiáveis que pessoas — e você aprendeu a lidar com ambos. Como mercenário, sua utilidade é tão valiosa quanto perigosa.',
    atributos: ['Destreza', 'Inteligência', 'Sabedoria'],
    talentoOrigem: 'Mão na Máquina',
    talentoDescricao: 'Você pode consertar ou improvisar equipamentos comuns sem custo (desde que tenha ferramentas básicas) e identificar automaticamente falhas técnicas simples ou riscos iminentes em máquinas. O Mestre pode limitar o efeito conforme tempo, pressão ou a complexidade do sistema.',
    dinheiroInicial: 2800,
    itensIniciais: ['1× Carnage (Escopeta Tecnológica)', '1× Jaqueta Balística Urbana', '2× Granada Explosiva', '1× Granada PEM (Pulso Eletromagnético)']
  }
];

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
  { nome: 'Atordoamento', atributo: 'constituicao' },
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
    efeito: 'Concentração: Escolha um efeito até o fim do próximo turno: aumentar o deslocamento do veículo em +50% (se escolher aumentar, o veículo sofre 1d8 Inteligência de dano Elétrico à Integridade Estrutural) ou reduzir o deslocamento do veículo pela metade. Em perseguições, o alvo sofre Desvantagem no próximo teste de Pilotagem.',
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
    descricao: 'Cria loops e atrasos nas imagens.',
    efeito: 'Concentração: Por 1 minuto, sistemas de vigilância ficam travados, não disparando alarmes.',
    ram: 4, recarga: '4 turnos', alvo: 'Sistema de vigilância', valor: 600,
    dica: 'Essencial para infiltrações silenciosas.'
  },
  {
    id: 14,
    nome: 'Formatar Memória',
    descricao: 'Apaga registros recentes.',
    efeito: 'Teste de Sabedoria (CD 8 + mod INT + prof). Falha: o alvo esquece os últimos 10 minutos.',
    ram: 7, recarga: '4 turnos', alvo: 'Humanos ou robôs', valor: 900,
    dica: 'Ideal para fugas limpas.'
  },
  {
    id: 15,
    nome: 'Freio Fantasma',
    descricao: 'Ativa frenagem total abrupta.',
    efeito: 'O deslocamento cai para 0. O motorista faz Teste de Pilotagem (CD 8 + mod INT + prof). Falha: passageiros sofrem 1d8 Contundente e Desvantagem em ataques até o próximo turno; veículo sofre 2d6 Contundente.',
    ram: 5, recarga: '6 turnos', alvo: 'Veículo ativo', valor: 700,
    dica: 'Excelente para capturas rápidas.'
  },
  {
    id: 16,
    nome: 'Furtar Dados',
    descricao: 'Acessa dados recentes do sistema neural.',
    efeito: 'Obtém memórias ou informações recentes.',
    ram: 9, recarga: '8 turnos', alvo: 'Humanos com implantes, robôs ou computadores', valor: 1100,
    dica: 'Perfeito para espionagem e chantagem.'
  },
  {
    id: 17,
    nome: 'Loop de Patrulha',
    descricao: 'Prende o alvo em um padrão repetitivo.',
    efeito: 'Concentração: Teste de Inteligência (CD 8 + mod INT + prof). Falha: o alvo repete seu último trajeto por 1 minuto.',
    ram: 3, recarga: '4 turnos', alvo: 'Drones, câmeras ou torretas', valor: 600,
    dica: 'Infiltração sem disparar alarmes.'
  },
  {
    id: 18,
    nome: 'Matar Sistema Neural',
    descricao: 'Desativa violentamente o sistema neural.',
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
    descricao: 'Trava impulsos neurais ou eletrônicos.',
    efeito: 'Teste de Constituição (CD 8 + mod INT + prof). Falha: alvo fica Atordoado por 2 turnos (pode repetir o teste a cada turno). Sofrer dano encerra a condição.',
    ram: 5, recarga: '5 turnos', alvo: 'Humanos ou androides', valor: 800,
    dica: 'Neutralização limpa.'
  },
  {
    id: 21,
    nome: 'Ping',
    descricao: 'Emite um pulso de rastreamento.',
    efeito: 'Revela todos conectados à rede em 35m por 2 minutos ao hackear um ponto de acesso.',
    ram: 1, recarga: '2 turnos', alvo: 'Pontos de Acesso', valor: 200,
    dica: 'Nunca entre no escuro.'
  },
  {
    id: 22,
    nome: 'Reforço de Sistemas',
    descricao: 'Otimiza implantes aliados.',
    efeito: 'Concentração: +2 CA e +2 CF por 3 turnos.',
    ram: 4, recarga: '4 turnos', alvo: 'Alvos com implantes no cérebro e pernas', valor: 600,
    dica: 'Buff simples e eficiente.'
  },
  {
    id: 23,
    nome: 'Reiniciar Sinapses',
    descricao: 'Sobrecarga sensorial.',
    efeito: 'Teste de Constituição (CD 8 + mod INT + prof). Falha: o alvo fica cego por 2 turnos e sofre Desvantagem em ações.',
    ram: 4, recarga: '3 turnos', alvo: 'Humanos ou androides', valor: 550,
    dica: 'Excelente contra atiradores.'
  },
  {
    id: 24,
    nome: 'Reflexos Acelerados',
    descricao: 'Aumenta tempo de resposta neural.',
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
    descricao: 'Coloca o motor em estado crítico.',
    efeito: 'Escolha: reduzir –6m de deslocamento por 1 turno ou causar 2d8 Elétrico. Em perseguições, conta como 1 sucesso automático.',
    ram: 6, recarga: '5 turnos', alvo: 'Veículo ativo', valor: 850,
    dica: 'Decide perseguições.'
  },
  {
    id: 27,
    nome: 'Suicídio',
    descricao: 'Implanta um comando autodestrutivo.',
    efeito: 'Teste de Sabedoria (CD 8 + mod INT + prof). Falha: o alvo realiza um Ataque Crítico contra si mesmo com sua arma.',
    ram: 15, recarga: '12 turnos', alvo: 'Humanos ou androides armados', valor: 1800,
    dica: 'Devastador. Não tem o que dizer.'
  },
  {
    id: 28,
    nome: 'Superaquecer',
    descricao: 'Eleva drasticamente a temperatura dos implantes.',
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
    descricao: 'HUD simples com cálculo de distância.',
    efeito: '+1 nas jogadas de ataque',
    valor: 1200
  },
  {
    id: 'mira-balistica-semi',
    nome: 'Mira Balística Semi-Inteligente',
    categoria: 'mira',
    descricao: 'Compensa movimento do alvo e vibração da arma.',
    efeito: '+2 nas jogadas de ataque',
    valor: 2400
  },
  {
    id: 'mira-hawkeye',
    nome: 'Mira Neuro-Assistida "Hawkeye"',
    categoria: 'mira',
    descricao: 'Sincroniza microajustes com impulsos neurais do usuário.',
    efeito: '+3 nas jogadas de ataque',
    valor: 3200
  },
  // ─────────────── 🔋 Módulos de Carregador ───────────────
  {
    id: 'capacidade-i',
    nome: 'Módulo de Capacidade Expandida I',
    categoria: 'carregador',
    descricao: 'Aumenta a capacidade de munição da arma.',
    efeito: '+2 disparos antes de uma recarga',
    valor: 800
  },
  {
    id: 'capacidade-ii',
    nome: 'Módulo de Capacidade Expandida II',
    categoria: 'carregador',
    descricao: 'Aumenta a capacidade de munição da arma.',
    efeito: '+4 disparos antes de uma recarga',
    valor: 1600
  },
  {
    id: 'capacidade-iii',
    nome: 'Módulo de Capacidade Expandida III',
    categoria: 'carregador',
    descricao: 'Aumenta a capacidade de munição da arma.',
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
