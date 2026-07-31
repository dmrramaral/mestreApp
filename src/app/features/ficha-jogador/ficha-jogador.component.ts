import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  RPG_SYSTEM_OPTIONS,
  RPG_SYSTEMS,
  RpgSystemType
} from '../../core/constants/rpg.constants';
import { DndApiService } from '../../core/services/dnd-api.service';
import { FichaJogadorService } from '../../core/services/ficha-jogador.service';
import { StorageService } from '../../core/services/storage.service';
import { RegistroSync } from '../../core/services/sync-backend.service';
import { calcularModificador } from '../../core/utils/rpg.utils';
import { CombateAction, CombateComponent } from './combate/combate.component';
import { DiceRollToastComponent } from './components/dice-roll-toast/dice-roll-toast.component';
import { FeatureSearchModalComponent } from './components/feature-search-modal/feature-search-modal.component';
import { FichaAnotacoesSectionComponent } from './components/ficha-anotacoes-section/ficha-anotacoes-section.component';
import { FichaCondicoesSectionComponent } from './components/ficha-condicoes-section/ficha-condicoes-section.component';
import { FichaDndModalsComponent } from './components/ficha-dnd-modals/ficha-dnd-modals.component';
import { FichaEditModalComponent } from './components/ficha-edit-modal/ficha-edit-modal.component';
import { FichaEquipamentosSectionComponent } from './components/ficha-equipamentos-section/ficha-equipamentos-section.component';
import { FichaHeaderComponent } from './components/ficha-header/ficha-header.component';
import { FichaMagiasSectionComponent } from './components/ficha-magias-section/ficha-magias-section.component';
import { FichaMochilaSectionComponent } from './components/ficha-mochila-section/ficha-mochila-section.component';
import { FichaPericiasSectionComponent } from './components/ficha-pericias-section/ficha-pericias-section.component';
import { FichaSectionNavComponent } from './components/ficha-section-nav/ficha-section-nav.component';
import { FichaSpellSearchModalComponent } from './components/ficha-spell-search-modal/ficha-spell-search-modal.component';
import { FichaTalentosSectionComponent } from './components/ficha-talentos-section/ficha-talentos-section.component';
import { FichaTracosSectionComponent } from './components/ficha-tracos-section/ficha-tracos-section.component';
import { FichaSessionFacade } from './state/ficha-session.facade';
import { FichaStateFacade } from './state/ficha-state.facade';
import { FichaContaResumo, SessaoJogador } from './state/ficha-state.models';
import { FichaSyncFacade } from './state/ficha-sync.facade';

type SpellcastingMode = 'known' | 'prepared' | 'all';

interface SpellcastingRule {
  mode: SpellcastingMode;
  ability: 'inteligencia' | 'sabedoria' | 'carisma';
  knownByLevel?: number[];
  fullCaster?: boolean;
  halfCaster?: boolean;
  isWarlock?: boolean;
  preparedFromHalfLevel?: boolean;
}

@Component({
  selector: 'app-ficha-jogador',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CombateComponent,
    FichaHeaderComponent,
    FichaSectionNavComponent,
    FichaEditModalComponent,
    FichaDndModalsComponent,
    FichaMagiasSectionComponent,
    FichaTalentosSectionComponent,
    FichaSpellSearchModalComponent,
    FichaMochilaSectionComponent,
    FichaEquipamentosSectionComponent,
    FichaPericiasSectionComponent,
    FichaCondicoesSectionComponent,
    FichaAnotacoesSectionComponent,
    FeatureSearchModalComponent,
    DiceRollToastComponent,
    FichaTracosSectionComponent,
  ],
  templateUrl: './ficha-jogador.component.html',
  styleUrl: './ficha-jogador.component.scss'
})
export class FichaJogadorComponent implements OnInit, OnDestroy {

  readonly sistemaDnd5e = RPG_SYSTEMS.DND5E;
  readonly systemOptions = RPG_SYSTEM_OPTIONS;
  private readonly fullCasterSlotsByLevel: Record<number, number[]> = {
    1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
    2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
    3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
    4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
    5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
    6: [4, 3, 3, 0, 0, 0, 0, 0, 0],
    7: [4, 3, 3, 1, 0, 0, 0, 0, 0],
    8: [4, 3, 3, 2, 0, 0, 0, 0, 0],
    9: [4, 3, 3, 3, 1, 0, 0, 0, 0],
    10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
    11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
    12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
    13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
    14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
    15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
    16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
    17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
    18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
    19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
    20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
  };

  private readonly halfCasterSlotsByLevel: Record<number, number[]> = {
    1: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    2: [2, 0, 0, 0, 0, 0, 0, 0, 0],
    3: [3, 0, 0, 0, 0, 0, 0, 0, 0],
    4: [3, 0, 0, 0, 0, 0, 0, 0, 0],
    5: [4, 2, 0, 0, 0, 0, 0, 0, 0],
    6: [4, 2, 0, 0, 0, 0, 0, 0, 0],
    7: [4, 3, 0, 0, 0, 0, 0, 0, 0],
    8: [4, 3, 0, 0, 0, 0, 0, 0, 0],
    9: [4, 3, 2, 0, 0, 0, 0, 0, 0],
    10: [4, 3, 2, 0, 0, 0, 0, 0, 0],
    11: [4, 3, 3, 0, 0, 0, 0, 0, 0],
    12: [4, 3, 3, 0, 0, 0, 0, 0, 0],
    13: [4, 3, 3, 1, 0, 0, 0, 0, 0],
    14: [4, 3, 3, 1, 0, 0, 0, 0, 0],
    15: [4, 3, 3, 2, 0, 0, 0, 0, 0],
    16: [4, 3, 3, 2, 0, 0, 0, 0, 0],
    17: [4, 3, 3, 3, 1, 0, 0, 0, 0],
    18: [4, 3, 3, 3, 1, 0, 0, 0, 0],
    19: [4, 3, 3, 3, 2, 0, 0, 0, 0],
    20: [4, 3, 3, 3, 2, 0, 0, 0, 0]
  };

  private readonly warlockSlotsByLevel: Record<number, { slots: number; slotLevel: number }> = {
    1: { slots: 1, slotLevel: 1 },
    2: { slots: 2, slotLevel: 1 },
    3: { slots: 2, slotLevel: 2 },
    4: { slots: 2, slotLevel: 2 },
    5: { slots: 2, slotLevel: 3 },
    6: { slots: 2, slotLevel: 3 },
    7: { slots: 2, slotLevel: 4 },
    8: { slots: 2, slotLevel: 4 },
    9: { slots: 2, slotLevel: 5 },
    10: { slots: 2, slotLevel: 5 },
    11: { slots: 3, slotLevel: 5 },
    12: { slots: 3, slotLevel: 5 },
    13: { slots: 3, slotLevel: 5 },
    14: { slots: 3, slotLevel: 5 },
    15: { slots: 3, slotLevel: 5 },
    16: { slots: 3, slotLevel: 5 },
    17: { slots: 4, slotLevel: 5 },
    18: { slots: 4, slotLevel: 5 },
    19: { slots: 4, slotLevel: 5 },
    20: { slots: 4, slotLevel: 5 }
  };

  private readonly spellcastingRules: Record<string, SpellcastingRule> = {
    wizard: { mode: 'prepared', ability: 'inteligencia', fullCaster: true },
    cleric: { mode: 'all', ability: 'sabedoria', fullCaster: true },
    druid: { mode: 'all', ability: 'sabedoria', fullCaster: true },
    paladin: { mode: 'all', ability: 'carisma', halfCaster: true, preparedFromHalfLevel: true },
    ranger: {
      mode: 'known',
      ability: 'sabedoria',
      halfCaster: true,
      knownByLevel: [0, 0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11]
    },
    bard: {
      mode: 'known',
      ability: 'carisma',
      fullCaster: true,
      knownByLevel: [0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22]
    },
    sorcerer: {
      mode: 'known',
      ability: 'carisma',
      fullCaster: true,
      knownByLevel: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15]
    },
    warlock: {
      mode: 'known',
      ability: 'carisma',
      isWarlock: true,
      knownByLevel: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15]
    }
  };
  private readonly classAliases: Record<string, string> = {
    mago: 'wizard',
    wizard: 'wizard',
    clerigo: 'cleric',
    cleric: 'cleric',
    druida: 'druid',
    druid: 'druid',
    feiticeiro: 'sorcerer',
    sorcerer: 'sorcerer',
    bruxo: 'warlock',
    warlock: 'warlock',
    bardo: 'bard',
    bard: 'bard',
    paladino: 'paladin',
    paladin: 'paladin',
    patrulheiro: 'ranger',
    ranger: 'ranger'
  };
  categoriaEquipamentoLoja = 'armadura';
  lojaEquipAberta = false;
  filtroLojaEquip = 'todos';

  vantagemIniciativa = false;
  // Rolagem de dados interativa
  resultadoRolagem: { campo: string; d20: number; mod: number; total: number, detalhe?: string } | null = null;
  private rolagemTimer: ReturnType<typeof setTimeout> | null = null;

  jogador: any =
    {
      sistema: RPG_SYSTEMS.DND5E,
      avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      nome: '',
      idade: null,
      classe: '',
      raca: '',
      nivel: null,
      pv: null,
      pva: null,
      ca: null,
      iniciativa: null,
      inspiracao: null,
      fome: null,
      sede: null,
      cansaco: null,
      calor: null,
      frio: null,
      sono: null,

      proficiencia: null,
      deslocamento: null,
      talentos: [],
      tracos: [],
      atributos: {
        forca: null,
        destreza: null,
        constituicao: null,
        inteligencia: null,
        sabedoria: null,
        carisma: null,
        sorte: null
      },
      pericias: [
        {
          nome: "Atletismo",
          valor: "nao"
        },
        {
          nome: "Briga",
          valor: "nao"
        },
        {
          nome: "Acrobacia",
          valor: "nao"
        },
        {
          nome: "Furtividade",
          valor: "nao"
        },
        {
          nome: "Prestidigitação",
          valor: "nao"
        },
        {
          nome: "Resistência",
          valor: "nao"
        },
        {
          nome: "Tolerância",
          valor: "nao"
        },
        {
          nome: "Arcanismo",
          valor: "nao",
          atributo: "inteligencia"
        },
        {
          nome: "Engenharia",
          valor: "nao",
          atributo: "inteligencia"
        },
        {
          nome: "Investigação",
          valor: "nao",
          atributo: "inteligencia"
        },
        {
          nome: "Natureza",
          valor: "nao",
          atributo: "inteligencia"
        },
        {
          nome: "Religião",
          valor: "nao",
          atributo: "inteligencia"
        },
        {
          nome: "Hacking",
          valor: "nao",
          atributo: "inteligencia"
        },
        {
          nome: "Tecnologia",
          valor: "nao",
          atributo: "inteligencia"
        },
        {
          nome: "Adestrar Animais",
          valor: "nao"
        },
        {
          nome: "Intuição",
          valor: "nao"
        },
        {
          nome: "Medicina",
          valor: "nao"
        },
        {
          nome: "Percepção",
          valor: "nao"
        },
        {
          nome: "Sobrevivência",
          valor: "nao"
        },
        {
          nome: "Atuação",
          valor: "nao"
        },
        {
          nome: "Enganação",
          valor: "nao"
        },
        {
          nome: "Intimidação",
          valor: "nao"
        },
        {
          nome: "Persuasão",
          valor: "nao"
        },
        {
          nome: "Adivinhação",
          valor: "nao"
        },
        {
          nome: "Jogos de Azar",
          valor: "nao"
        },
        {
          nome: "Sincronicidade",
          valor: "nao"
        },
        {
          nome: "Atordoamento",
          valor: "nao"
        }
      ],
      equipamentos: {
        cabeca: [],
        armadura: [],
        pes: [],
        escudo: [],
        amuleto: [],
        anel: []
      },
      ouro: 0,
      ataques: [],
      magias: [],
      spellSlots: {
        1: { total: 0, used: 0 },
        2: { total: 0, used: 0 },
        3: { total: 0, used: 0 },
        4: { total: 0, used: 0 },
        5: { total: 0, used: 0 },
        6: { total: 0, used: 0 },
        7: { total: 0, used: 0 },
        8: { total: 0, used: 0 },
        9: { total: 0, used: 0 }
      },
      spellcasting: {
        classKey: '',
        mode: 'known',
        knownLimit: null,
        preparedLimit: null,
        preparedBonusCustom: 0,
        preparedBonus: 0,
        maxSpellLevel: 0
      },
      mochila: [],
      cyberpun2080: {
        papel: '',
        subclasse: '',
        origem: '',
        antecedente: '',
        historia: '',
        perguntasEssenciais: ['', '', '', '', ''],
        implantesCiberneticos: [],
        nivelAmeacaRede: null,
        creditoEurodolar: null,
        estresseNeural: null,
        equipamentosTecnologiaNotas: '',
        veiculosNotas: '',
        consumiveisViciosNotas: '',
        forcasCidadeNotas: ''
      }

    };

  adicionandoMagia: boolean = false;
  novaMagia: any = {
    nome: '',
    descricao: '',
    level: undefined,
    damage_formula: '',
    school: '',
    casting_time: '',
    range: '',
    components: [],
    material: '',
    duration: '',
    classes: []
  };

  editandoMagia: { [key: number]: boolean } = {};
  // Spell and Feat search functionality
  buscarMagiaAberto: boolean = false;
  buscarTalentoAberto: boolean = false;
  buscarTracosAberto: boolean = false;

  // Spell details in player's spell list
  expandedSpellDetails: { [key: number]: any } = {};
  loadingSpellDetails: { [key: number]: boolean } = {};
  spellFeedback = '';

  sessao: SessaoJogador = {
    modo: 'convidado',
    usuarioId: 'guest',
    ultimoLogin: new Date().toISOString()
  };
  mensagemSessao = '';
  private beforeUnloadHandler?: () => void;
  sincronizandoComServidor = false;
  erroSincronizacao = '';
  private pushTimeout?: ReturnType<typeof setTimeout>;
  fichasConta: FichaContaResumo[] = [];
  fichaSelecionadaId = 'main-character';

  readonly spellComponentsFormatter = (magia: any, expandedDetails: any): string =>
    this.getSpellComponents(magia, expandedDetails);

  readonly spellClassesFormatter = (magia: any, expandedDetails: any): string =>
    this.getSpellClassesFormatted(magia, expandedDetails);

  constructor(
    private storageService: StorageService,
    private fichaService: FichaJogadorService,
    private dndApiService: DndApiService,
    private fichaSessionFacade: FichaSessionFacade,
    private fichaStateFacade: FichaStateFacade,
    private fichaSyncFacade: FichaSyncFacade,
    private router: Router
  ) {

  }

  get chaveFichaAtual(): string {
    return this.fichaSessionFacade.obterChaveFichaAtual(this.sessao.usuarioId);
  }

  get estaAutenticado(): boolean {
    return this.sessao.modo === 'google';
  }

  get isCyberPun2080(): boolean {
    return this.jogador?.sistema === RPG_SYSTEMS.CYBERPUN2080;
  }

  get isDnd5e(): boolean {
    return !this.jogador?.sistema || this.jogador.sistema === RPG_SYSTEMS.DND5E;
  }

  get spellcastingSummary(): any {
    return this.jogador?.spellcasting || {
      classKey: '',
      mode: 'known',
      knownLimit: null,
      preparedLimit: null,
      preparedBonusCustom: 0,
      preparedBonus: 0,
      maxSpellLevel: 0
    };
  }

  get preparedSpellCount(): number {
    return this.contarMagiasPreparadas();
  }

  get descricaoSessao(): string {
    if (this.estaAutenticado) {
      return this.sessao.email || this.sessao.usuarioId;
    }
    return 'Modo convidado';
  }

  private get chaveUltimoSync(): string {
    return this.fichaSessionFacade.obterChaveUltimoSync(this.sessao.usuarioId);
  }

  private get chaveFichaSelecionada(): string {
    return this.fichaSessionFacade.obterChaveFichaSelecionada(this.sessao.usuarioId);
  }

  private montarRegistroSync(): RegistroSync {
    return {
      id: this.fichaSelecionadaId,
      payload: this.jogador,
      updatedAt: new Date().toISOString(),
      deleted: false
    };
  }

  private salvarCheckpointSincronizacao(timestamp: string): void {
    this.fichaStateFacade.salvarItem(this.chaveUltimoSync, timestamp);
  }

  private obterCheckpointSincronizacao(): string | undefined {
    return this.fichaStateFacade.obterItem(this.chaveUltimoSync) || undefined;
  }

  private agendarPushServidor(): void {
    if (!this.estaAutenticado) {
      return;
    }

    if (this.pushTimeout) {
      clearTimeout(this.pushTimeout);
    }

    this.pushTimeout = setTimeout(() => {
      void this.sincronizarParaServidor();
    }, 900);
  }

  private async sincronizarDoServidor(forcarSelecao = false): Promise<void> {
    if (!this.estaAutenticado) {
      return;
    }

    try {
      this.sincronizandoComServidor = true;
      this.erroSincronizacao = '';

      const fichas = await this.fichaSyncFacade.listarFichasConta();

      this.fichasConta = fichas;

      if (fichas.length === 0) {
        this.fichaSelecionadaId = this.fichaStateFacade.obterItem(this.chaveFichaSelecionada) || 'main-character';
        this.salvarFichaSelecionada();
        this.mensagemSessao = 'Nenhuma ficha remota encontrada. Você pode criar uma nova e ela será salva na conta.';
        return;
      }

      let fichaSelecionada = fichas.find((ficha) => ficha.id === this.fichaSelecionadaId);

      if (forcarSelecao || !fichaSelecionada) {
        fichaSelecionada = this.selecionarFichaComPrompt(fichas);
      }

      if (!fichaSelecionada) {
        fichaSelecionada = fichas[0];
      }

      this.fichaSelecionadaId = fichaSelecionada.id;
      this.salvarFichaSelecionada();
      this.jogador = this.garantirEstruturaSistema(fichaSelecionada.payload || this.fichaService.criarFichaVazia());
      this.fichaStateFacade.salvarObjeto(this.chaveFichaAtual, this.jogador);
      this.salvarCheckpointSincronizacao(new Date().toISOString());
      this.mensagemSessao = `Ficha ativa: ${fichaSelecionada.nome}.`;
    } catch {
      this.erroSincronizacao = 'Não foi possível atualizar dados do servidor agora.';
    } finally {
      this.sincronizandoComServidor = false;
    }
  }

  private async sincronizarParaServidor(): Promise<void> {
    if (!this.estaAutenticado) {
      return;
    }

    try {
      this.sincronizandoComServidor = true;
      this.erroSincronizacao = '';

      const serverTimestamp = await this.fichaSyncFacade.pushMudancas([this.montarRegistroSync()]);
      this.salvarCheckpointSincronizacao(serverTimestamp);
    } catch {
      this.erroSincronizacao = 'Falha ao sincronizar com o servidor. Seus dados locais foram preservados.';
    } finally {
      this.sincronizandoComServidor = false;
    }
  }

  private async forcarSincronizacaoPendente(): Promise<void> {
    if (!this.estaAutenticado) {
      return;
    }

    if (this.pushTimeout) {
      clearTimeout(this.pushTimeout);
      this.pushTimeout = undefined;
    }

    await this.sincronizarParaServidor();
  }

  private carregarSessao(): void {
    this.sessao = this.fichaSessionFacade.carregarSessao();
    this.carregarFichaSelecionada();
  }

  private carregarFichaSelecionada(): void {
    this.fichaSelecionadaId = this.fichaSessionFacade.carregarFichaSelecionada(this.sessao.usuarioId);
  }

  private salvarFichaSelecionada(): void {
    this.fichaSessionFacade.salvarFichaSelecionada(this.sessao.usuarioId, this.fichaSelecionadaId);
  }

  private selecionarFichaComPrompt(fichas: FichaContaResumo[]): FichaContaResumo | undefined {
    if (typeof window === 'undefined' || fichas.length === 0) {
      return fichas[0];
    }

    const opcoes = fichas
      .map((ficha, index) => {
        const dataAtualizacao = new Date(ficha.updatedAt).toLocaleString('pt-BR');
        return `${index + 1}. ${ficha.nome} (${dataAtualizacao})`;
      })
      .join('\n');

    const resposta = window.prompt(
      `Selecione a ficha da conta:\n\n${opcoes}\n\nDigite o número da ficha desejada:`,
      '1'
    );

    const indice = Number.parseInt(String(resposta || ''), 10) - 1;
    if (!Number.isFinite(indice) || indice < 0 || indice >= fichas.length) {
      return fichas[0];
    }

    return fichas[indice];
  }

  private salvarSessao(): void {
    this.fichaSessionFacade.salvarSessao(this.sessao);
  }

  private carregarFichaDaSessao(): void {
    const jogador = this.fichaStateFacade.obterObjeto<any>(this.chaveFichaAtual);
    if (jogador) {
      this.jogador = this.garantirEstruturaSistema(jogador);
      return;
    }
    this.jogador = this.garantirEstruturaSistema(this.fichaService.criarFichaVazia());
  }

  private criarDadosCyberPunPadrao() {
    return {
      papel: '',
      subclasse: '',
      origem: '',
      antecedente: '',
      historia: '',
      perguntasEssenciais: ['', '', '', '', ''],
      implantesCiberneticos: [],
      nivelAmeacaRede: null,
      creditoEurodolar: null,
      estresseNeural: null,
      equipamentosTecnologiaNotas: '',
      veiculosNotas: '',
      consumiveisViciosNotas: '',
      forcasCidadeNotas: ''
    };
  }

  private criarSpellSlotsVazios(): Record<number, { total: number; used: number }> {
    return {
      1: { total: 0, used: 0 },
      2: { total: 0, used: 0 },
      3: { total: 0, used: 0 },
      4: { total: 0, used: 0 },
      5: { total: 0, used: 0 },
      6: { total: 0, used: 0 },
      7: { total: 0, used: 0 },
      8: { total: 0, used: 0 },
      9: { total: 0, used: 0 }
    };
  }

  private normalizarTexto(valor: string): string {
    return (valor || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  private obterClasseConjuradoraKey(): string {
    const classe = this.normalizarTexto(this.jogador?.classe || '');
    if (!classe) {
      return '';
    }

    if (this.classAliases[classe]) {
      return this.classAliases[classe];
    }

    for (const [alias, key] of Object.entries(this.classAliases)) {
      if (classe.includes(alias)) {
        return key;
      }
    }

    return '';
  }

  private obterRegraConjuracao(): SpellcastingRule | undefined {
    const classKey = this.obterClasseConjuradoraKey();
    return this.spellcastingRules[classKey];
  }

  private obterNivelPersonagem(): number {
    const nivel = Number(this.jogador?.nivel || 1);
    return Number.isFinite(nivel) ? Math.min(Math.max(nivel, 1), 20) : 1;
  }

  private obterModificadorConjuracao(regra: SpellcastingRule | undefined): number {
    if (!regra) {
      return 0;
    }

    const valor = this.jogador?.atributos?.[regra.ability];
    return this.calcularModificador(valor) ?? 0;
  }

  private obterSlotsPorClasseNivel(regra: SpellcastingRule | undefined, nivel: number): Record<number, { total: number; used: number }> {
    const slots = this.criarSpellSlotsVazios();
    if (!regra) {
      return slots;
    }

    if (regra.isWarlock) {
      const pacto = this.warlockSlotsByLevel[nivel];
      if (!pacto) {
        return slots;
      }
      slots[pacto.slotLevel] = { total: pacto.slots, used: 0 };
      return slots;
    }

    const tabela = regra.fullCaster ? this.fullCasterSlotsByLevel : this.halfCasterSlotsByLevel;
    const row = tabela[nivel] || this.criarSpellSlotsVazios();
    for (let index = 0; index < 9; index++) {
      slots[index + 1] = { total: row[index] || 0, used: 0 };
    }
    return slots;
  }

  private obterKnownLimit(regra: SpellcastingRule | undefined, nivel: number): number | null {
    if (!regra) {
      return null;
    }
    if (regra.mode !== 'known') {
      return null;
    }
    if (!regra.knownByLevel || regra.knownByLevel.length === 0) {
      return null;
    }
    return regra.knownByLevel[Math.max(nivel - 1, 0)] ?? null;
  }

  private obterPreparedLimit(regra: SpellcastingRule | undefined, nivel: number): number | null {
    if (!regra || (regra.mode === 'known')) {
      return null;
    }

    const mod = this.obterModificadorConjuracao(regra);
    const baseLevel = regra.preparedFromHalfLevel ? Math.floor(nivel / 2) : nivel;
    return Math.max(1, baseLevel + mod + this.obterBonusPreparedPorExcecao());
  }

  private obterBonusPreparedPorExcecao(): number {
    const bonusCustom = Number(this.jogador?.spellcasting?.preparedBonusCustom || 0);
    const classe = this.normalizarTexto(this.jogador?.classe || '');
    const bonusEvocador = classe.includes('evocador') || classe.includes('evocation') ? 2 : 0;
    return Math.max(0, bonusCustom + bonusEvocador);
  }

  private extrairEscalaUpcast(magia: any, slotLevel: number): string {
    const nivelBase = this.obterNivelMagia(magia);
    if (slotLevel <= nivelBase || nivelBase <= 0) {
      return '';
    }

    const fonte = [
      ...(Array.isArray(magia?.higher_level) ? magia.higher_level : []),
      ...(Array.isArray(magia?.desc) ? magia.desc : []),
      ...(Array.isArray(magia?.description) ? magia.description : [])
    ].join(' ');

    if (!fonte) {
      return '';
    }

    const texto = this.normalizarTexto(fonte);
    const padraoPorNivel = /(for each slot level above|for each level above|para cada nivel de magia acima|para cada nivel acima|acima do \d+o nivel)/;
    if (!padraoPorNivel.test(texto)) {
      return '';
    }

    const matchDado = texto.match(/(\d+)d(\d+)/);
    if (!matchDado) {
      return '';
    }

    const qtd = Number(matchDado[1] || 1);
    const faces = Number(matchDado[2] || 0);
    if (!qtd || !faces) {
      return '';
    }

    const acrescimos = slotLevel - nivelBase;
    if (acrescimos <= 0) {
      return '';
    }

    if (qtd === 1) {
      return ` +${acrescimos}d${faces}`;
    }

    return ` +${acrescimos}x(${qtd}d${faces})`;
  }

  private obterNomesMagiaPorExcecao(): Set<string> {
    const nomes = new Set<string>();

    const custom = this.jogador?.spellcasting?.allowedSpellNames;
    if (Array.isArray(custom)) {
      for (const item of custom) {
        const nome = this.normalizarTexto(String(item || ''));
        if (nome) {
          nomes.add(nome);
        }
      }
    }

    const raca = this.normalizarTexto(this.jogador?.raca || '');
    const tracos = Array.isArray(this.jogador?.tracos)
      ? this.jogador.tracos.map((t: any) => `${t?.nome || ''} ${t?.descricao || ''}`).join(' ')
      : '';
    const contexto = this.normalizarTexto(`${raca} ${tracos}`);

    if (contexto.includes('elfo da floresta') || contexto.includes('wood elf')) {
      nomes.add('druidcraft');
    }

    return nomes;
  }

  private contarMagiasPreparadas(): number {
    if (!Array.isArray(this.jogador?.magias)) {
      return 0;
    }
    return this.jogador.magias.filter((magia: any) => {
      const level = Number(magia?.level ?? magia?.nivel ?? 0);
      return level > 0 && magia?.preparada === true;
    }).length;
  }

  private classePermiteMagia(spell: any): boolean {
    const classKey = this.obterClasseConjuradoraKey();
    if (!classKey) {
      return true;
    }

    const classes = spell?.classes;
    if (!Array.isArray(classes) || classes.length === 0) {
      return true;
    }

    return classes.some((item: any) => {
      const nome = typeof item === 'string' ? item : (item?.name || item?.index || '');
      const alias = this.classAliases[this.normalizarTexto(nome)];
      return alias === classKey;
    });
  }

  private obterNivelMagia(spell: any): number {
    const valor = Number(spell?.level ?? spell?.nivel ?? 0);
    return Number.isFinite(valor) ? Math.max(valor, 0) : 0;
  }

  private podeAprenderMagia(spell: any): { ok: boolean; reason?: string } {
    if (!this.isDnd5e) {
      return { ok: false, reason: 'Magias sao disponiveis apenas no sistema DND5E.' };
    }

    const regra = this.obterRegraConjuracao();
    const classKey = this.obterClasseConjuradoraKey();
    if (!regra || !classKey) {
      return { ok: true };
    }

    const nomeMagia = this.normalizarTexto(spell?.name || spell?.nome || '');
    if (this.obterNomesMagiaPorExcecao().has(nomeMagia)) {
      return { ok: true };
    }

    if (!this.classePermiteMagia(spell)) {
      return { ok: false, reason: 'Essa classe nao tem acesso a esta magia.' };
    }

    const magicLevel = this.obterNivelMagia(spell);
    const maxSpellLevel = Number(this.jogador?.spellcasting?.maxSpellLevel || 0);
    if (magicLevel > maxSpellLevel) {
      return { ok: false, reason: `Nivel da magia acima do permitido para o nivel atual (${maxSpellLevel}).` };
    }

    const knownLimit = this.jogador?.spellcasting?.knownLimit;
    if (typeof knownLimit === 'number' && Array.isArray(this.jogador?.magias) && this.jogador.magias.length >= knownLimit) {
      return { ok: false, reason: `Limite de magias conhecidas atingido (${knownLimit}).` };
    }

    return { ok: true };
  }

  private recalcularEstadoMagias(): void {
    if (!this.jogador || !this.isDnd5e) {
      return;
    }

    if (!Array.isArray(this.jogador.magias)) {
      this.jogador.magias = [];
    }

    const nivel = this.obterNivelPersonagem();
    const regra = this.obterRegraConjuracao();
    const classKey = this.obterClasseConjuradoraKey();
    const slotsCalculados = this.obterSlotsPorClasseNivel(regra, nivel);
    const knownLimit = this.obterKnownLimit(regra, nivel);
    const preparedLimit = this.obterPreparedLimit(regra, nivel);
    const allowedSpellNames = Array.isArray(this.jogador?.spellcasting?.allowedSpellNames)
      ? [...this.jogador.spellcasting.allowedSpellNames]
      : [];
    const preparedBonusCustom = Number(this.jogador?.spellcasting?.preparedBonusCustom || 0);

    const slotsAnteriores = this.jogador?.spellSlots || {};
    Object.keys(slotsCalculados).forEach((key) => {
      const slotLevel = Number(key);
      const total = slotsCalculados[slotLevel].total;
      const usedAtual = Number(slotsAnteriores?.[slotLevel]?.used || 0);
      slotsCalculados[slotLevel].used = Math.min(Math.max(usedAtual, 0), total);
    });

    this.jogador.spellSlots = slotsCalculados;
    this.jogador.spellcasting = {
      classKey,
      mode: regra?.mode || 'known',
      knownLimit,
      preparedLimit,
      preparedBonusCustom,
      preparedBonus: this.obterBonusPreparedPorExcecao(),
      allowedSpellNames,
      maxSpellLevel: Object.keys(slotsCalculados)
        .map((key) => Number(key))
        .filter((slotLevel) => (slotsCalculados[slotLevel]?.total || 0) > 0)
        .reduce((max, slotLevel) => Math.max(max, slotLevel), 0)
    };

    if ((regra?.mode === 'prepared' || regra?.mode === 'all') && typeof preparedLimit === 'number') {
      for (const magia of this.jogador.magias) {
        if (this.obterNivelMagia(magia) === 0) {
          magia.preparada = true;
        } else if (magia.preparada === undefined) {
          magia.preparada = true;
        }
      }

      let preparadas = this.contarMagiasPreparadas();
      if (preparadas > preparedLimit) {
        for (const magia of this.jogador.magias) {
          if (preparadas <= preparedLimit) {
            break;
          }
          if (this.obterNivelMagia(magia) > 0 && magia.preparada) {
            magia.preparada = false;
            preparadas--;
          }
        }
      }
    }
  }

  private obterDanoBaseMagia(magia: any, slotLevel: number): string {
    if (magia?.damage_formula) {
      return magia.damage_formula;
    }

    const mapaCantrip = magia?.damage_at_character_level || magia?.damage?.damage_at_character_level;
    if (mapaCantrip && typeof mapaCantrip === 'object') {
      const nivelPersonagem = this.obterNivelPersonagem();
      const niveis = Object.keys(mapaCantrip)
        .map((item) => Number(item))
        .filter((item) => Number.isFinite(item))
        .sort((a, b) => a - b);

      if (niveis.length > 0) {
        const nivelAplicado = niveis.filter((n) => n <= nivelPersonagem).pop() ?? niveis[0];
        const danoCantrip = mapaCantrip[String(nivelAplicado)];
        if (danoCantrip) {
          return danoCantrip;
        }
      }
    }

    const mapaDano = magia?.damage_at_slot_level || magia?.damage?.damage_at_slot_level;
    if (mapaDano && typeof mapaDano === 'object') {
      const exato = mapaDano[String(slotLevel)];
      if (exato) {
        return exato;
      }

      const fallbackLevel = this.obterNivelMagia(magia);
      const niveis = Object.keys(mapaDano)
        .map((item) => Number(item))
        .filter((item) => Number.isFinite(item))
        .sort((a, b) => a - b);

      const nivelAplicado = niveis.filter((n) => n <= slotLevel).pop() ?? fallbackLevel;
      if (mapaDano[String(nivelAplicado)]) {
        const base = mapaDano[String(nivelAplicado)];
        const escala = this.extrairEscalaUpcast(magia, slotLevel);
        return escala ? `${base}${escala}` : base;
      }
    }

    if (Array.isArray(magia?.higher_level) && magia.higher_level.length > 0) {
      const escala = this.extrairEscalaUpcast(magia, slotLevel);
      if (escala) {
        return `Escala por upcast:${escala}`;
      }
      return 'Escala com slot superior (consulte descricao).';
    }

    return 'Sem dado de dano na fonte da magia.';
  }

  private garantirEstruturaSistema(ficha: any): any {
    const base = { ...ficha };
    base.sistema = base.sistema || RPG_SYSTEMS.DND5E;
    base.cyberpun2080 = {
      ...this.criarDadosCyberPunPadrao(),
      ...(base.cyberpun2080 || {})
    };
    if (!Array.isArray(base.cyberpun2080.perguntasEssenciais)) {
      base.cyberpun2080.perguntasEssenciais = ['', '', '', '', ''];
    }
    if (!Array.isArray(base.cyberpun2080.implantesCiberneticos)) {
      base.cyberpun2080.implantesCiberneticos = [];
    }
    if (!Array.isArray(base.ataques)) {
      base.ataques = [];
    }
    if (!Array.isArray(base.magias)) {
      base.magias = [];
    }
    if (!base.spellSlots || typeof base.spellSlots !== 'object') {
      base.spellSlots = this.criarSpellSlotsVazios();
    }
    if (!base.spellcasting || typeof base.spellcasting !== 'object') {
      base.spellcasting = {
        classKey: '',
        mode: 'known',
        knownLimit: null,
        preparedLimit: null,
        preparedBonusCustom: 0,
        preparedBonus: 0,
        maxSpellLevel: 0
      };
    }
    if (base.spellcasting.preparedBonusCustom === undefined || base.spellcasting.preparedBonusCustom === null) {
      base.spellcasting.preparedBonusCustom = Number(base.spellcasting.preparedBonus || 0);
    }
    if (base.spellcasting.preparedBonus === undefined || base.spellcasting.preparedBonus === null) {
      base.spellcasting.preparedBonus = 0;
    }
    if (base.spellcasting.allowedSpellNames !== undefined && !Array.isArray(base.spellcasting.allowedSpellNames)) {
      base.spellcasting.allowedSpellNames = [];
    }
    // Migra campos RAM e CT para fichas antigas
    if (base.ram === undefined) base.ram = null;
    if (base.ramAtual === undefined) base.ramAtual = null;
    if (base.ct === undefined) base.ct = null;
    if (base.ctAtual === undefined) base.ctAtual = null;
    // Garante que pericias novas (adicionadas após criação da ficha) existam
    if (Array.isArray(base.pericias)) {
      const periciasNovas = [
        { nome: 'Hacking', atributo: 'inteligencia' },
        { nome: 'Tecnologia', atributo: 'inteligencia' },
        { nome: 'Investigação', atributo: 'inteligencia' },
      ];
      for (const p of periciasNovas) {
        if (!base.pericias.some((existing: any) => existing.nome === p.nome)) {
          base.pericias.push({ nome: p.nome, valor: 'nao', atributo: p.atributo });
        }
      }
    }
    while (base.cyberpun2080.perguntasEssenciais.length < 5) {
      base.cyberpun2080.perguntasEssenciais.push('');
    }
    base.cyberpun2080.perguntasEssenciais = base.cyberpun2080.perguntasEssenciais.slice(0, 5);

    if (base.sistema === RPG_SYSTEMS.DND5E || !base.sistema) {
      for (const magia of base.magias) {
        if (magia.preparada === undefined) {
          magia.preparada = true;
        }
      }
    }

    return base;
  }

  selecionarSistema(systemId: RpgSystemType): void {
    if (systemId !== RPG_SYSTEMS.DND5E) {
      this.spellFeedback = '';
    }
    this.saveToCache();
  }




  onCyberOrigemChange(): void {
    this.saveToCache();
  }

  async trocarFichaDaConta(): Promise<void> {
    if (!this.estaAutenticado) {
      return;
    }

    await this.forcarSincronizacaoPendente();
    await this.sincronizarDoServidor(true);
  }

  criarNovaFichaNaConta(): void {
    if (!this.estaAutenticado || typeof window === 'undefined') {
      return;
    }

    const nomeFicha = (window.prompt('Nome da nova ficha:') || '').trim();
    if (!nomeFicha) {
      return;
    }

    this.fichaSelecionadaId = `ficha-${Date.now()}`;
    this.jogador = this.garantirEstruturaSistema(this.fichaService.criarFichaVazia());
    this.jogador.nome = nomeFicha;
    this.salvarFichaSelecionada();
    this.saveToCache();
    this.mensagemSessao = `Nova ficha criada: ${nomeFicha}.`;
  }

  saveToCache() {
    this.recalcularEstadoMagias();
    this.storageService.setObject(this.chaveFichaAtual, this.jogador);
    this.salvarFichaSelecionada();
    this.agendarPushServidor();
  }

  ngOnInit(): void {
    this.carregarSessao();
    this.carregarFichaDaSessao();
    this.recalcularEstadoMagias();
    if (this.estaAutenticado) {
      void this.sincronizarDoServidor();
    }

    if (typeof window !== 'undefined') {
      this.beforeUnloadHandler = () => {
        this.storageService.setObject(this.chaveFichaAtual, this.jogador);
      };
      window.addEventListener('beforeunload', this.beforeUnloadHandler);
    }

  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined' && this.beforeUnloadHandler) {
      window.removeEventListener('beforeunload', this.beforeUnloadHandler);
    }
    if (this.pushTimeout) {
      clearTimeout(this.pushTimeout);
    }
    this.storageService.setObject(this.chaveFichaAtual, this.jogador);
    void this.sincronizarParaServidor();
  }

  abrirLoja(): void {
    void this.router.navigate(['/mercado']);
  }

  limparCache() {
    if (confirm('Tem certeza que deseja limpar o cache?')) {
      this.storageService.removeItem(this.chaveFichaAtual);
      this.jogador = this.fichaService.criarFichaVazia();
      this.saveToCache();
      this.mensagemSessao = 'Ficha atual removida do armazenamento local.';
    }
  }
  confirmandoLimparCache: boolean = false;

  confirmarLimparCache() {
    this.confirmandoLimparCache = true;
  }

  cancelarLimparCache() {
    this.confirmandoLimparCache = false;
  }

  abrirModalEditarFicha(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const bootstrap = (window as any).bootstrap;
    if (!bootstrap) {
      return;
    }

    const modalElement = document.getElementById('editarFichaModal');
    if (!modalElement) {
      return;
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
  }

  baixarJogador() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.jogador));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "jogador.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  onJogadorImportado(payload: unknown): void {
    if (!payload || typeof payload !== 'object') {
      return;
    }

    this.jogador = this.garantirEstruturaSistema(payload);
    this.saveToCache();
  }

  onVantagemIniciativaChange(value: boolean): void {
    this.vantagemIniciativa = value;
    this.saveToCache();
  }

  onCombateAction(action: CombateAction): void {
    if (action.type === 'dirty') {
      this.saveToCache();
      return;
    }

    this.resultadoRolagem = action.payload;
    if (this.rolagemTimer) clearTimeout(this.rolagemTimer);
    this.rolagemTimer = setTimeout(() => {
      this.resultadoRolagem = null;
    }, 30000);
  }


  adicionarMagia() {
    this.spellFeedback = '';
    this.adicionandoMagia = true;
  }

  confirmarAdicionarMagia() {
    if (this.novaMagia.nome && this.novaMagia.descricao) {
      const validacao = this.podeAprenderMagia(this.novaMagia);
      if (!validacao.ok) {
        this.spellFeedback = validacao.reason || 'Nao foi possivel adicionar a magia.';
        return;
      }

      if (!this.jogador.magias) {
        this.jogador.magias = [];
      }
      // Remove campos vazios antes de adicionar
      const magiaParaAdicionar = { ...this.novaMagia };
      if (!magiaParaAdicionar.level && magiaParaAdicionar.level !== 0) delete magiaParaAdicionar.level;
      if (!magiaParaAdicionar.damage_formula) delete magiaParaAdicionar.damage_formula;
      if (!magiaParaAdicionar.school) delete magiaParaAdicionar.school;
      if (!magiaParaAdicionar.casting_time) delete magiaParaAdicionar.casting_time;
      if (!magiaParaAdicionar.range) delete magiaParaAdicionar.range;
      if (!magiaParaAdicionar.components || magiaParaAdicionar.components.length === 0) delete magiaParaAdicionar.components;
      if (!magiaParaAdicionar.material) delete magiaParaAdicionar.material;
      if (!magiaParaAdicionar.duration) delete magiaParaAdicionar.duration;
      if (!magiaParaAdicionar.classes || magiaParaAdicionar.classes.length === 0) delete magiaParaAdicionar.classes;
      magiaParaAdicionar.preparada = true;

      this.jogador.magias.push(magiaParaAdicionar);
      this.novaMagia = {
        nome: '',
        descricao: '',
        level: undefined,
        damage_formula: '',
        school: '',
        casting_time: '',
        range: '',
        components: [],
        material: '',
        duration: '',
        classes: []
      };
      this.spellFeedback = 'Magia adicionada com sucesso.';
      this.adicionandoMagia = false;
      this.saveToCache();
    }

  }


  cancelarAdicionarMagia() {
    this.spellFeedback = '';
    this.novaMagia = {
      nome: '',
      descricao: '',
      level: undefined,
      damage_formula: '',
      school: '',
      casting_time: '',
      range: '',
      components: [],
      material: '',
      duration: '',
      classes: []
    };
    this.adicionandoMagia = false;
  }

  /**
   * Calcula modificador de um atributo
   * Usa função utilitária centralizada
   */
  calcularModificador(valor: any): number | null {
    return calcularModificador(valor);
  }

  rolarDado(campo: string, mod: number): void {
    const d20 = Math.floor(Math.random() * 20) + 1;
    this.resultadoRolagem = { campo, d20, mod, total: d20 + mod };
    if (this.rolagemTimer) clearTimeout(this.rolagemTimer);
    this.rolagemTimer = setTimeout(() => { this.resultadoRolagem = null; }, 30000);
  }

  rolarD20(campo: string, mod: number, vantagem: boolean = false): void {
    const d20 = Math.floor(Math.random() * 20) + 1;
    if (vantagem) {

      const d20_2 = Math.floor(Math.random() * 20) + 1;
      const melhor = Math.max(d20, d20_2);
      this.resultadoRolagem = { campo, d20: melhor, mod, total: melhor + mod, detalhe: `Rolou ${d20} e ${d20_2} com vantagem` };
    } else {
      this.resultadoRolagem = { campo, d20, mod, total: d20 + mod };
    }
    if (this.rolagemTimer) clearTimeout(this.rolagemTimer);
    this.rolagemTimer = setTimeout(() => { this.resultadoRolagem = null; }, 30000);
  }

  rolarPericia(pericia: any, modAtributo: number): void {
    const prof = pericia.valor === 'sim' ? (this.jogador?.proficiencia ?? 0) : 0;
    this.rolarDado(pericia.nome, modAtributo + prof);
  }

  /**
   * Será destinado pra rodar os dados de ataques, considerando modificadores de ataque, bônus de armas, etc.
   * A ideia é ter um local centralizado para isso, onde seja possível exibir detalhes da rolagem (como o que compõe o modificador total) e futuramente permitir customizações (como rolar com vantagem/desvantagem, ou aplicar condições específicas)
   *
   */
  rolarDadosAtaques(equipamento: any): void {
    const modAtributo = this.calcularModificador(this.jogador?.atributos?.forca) ?? 0;
    const listaDadosAtaque = equipamento.dadosAtaque || [];
    for (const dado of listaDadosAtaque) {
      const bonus = Number(equipamento.bonusAtaque) || 0;
      this.rolarDado(`Ataque com ${equipamento.nome} (${dado})`, modAtributo + bonus);
    }
  }

  /**
   * Obtém a CA calculada somando: base (10+DEX ou armadura), equipamentos, armas equipadas, implantes e bônus manual
   */
  get caCalculada(): number {
    const modDex = this.calcularModificador(this.jogador?.atributos?.destreza) ?? 0;
    const equip = this.jogador?.equipamentos;

    // Base: armadura ou 10 + DEX
    const armadura = equip?.['armadura']?.[0];
    let ca = armadura?.ca ? armadura.ca + modDex : 10 + modDex;

    // Escudo
    const escudo = equip?.['escudo']?.[0];
    if (escudo?.ca) ca += escudo.ca;

    // Demais categorias
    for (const cat of ['cabeca', 'pes', 'amuleto', 'anel']) {
      const e = equip?.[cat]?.[0];
      if (e?.ca) ca += e.ca;
    }

    // Armas equipadas com bônus de CA
    if (Array.isArray(this.jogador?.ataques)) {
      for (const ataque of this.jogador.ataques) {
        if (ataque.equipado && Number(ataque.ca) > 0) {
          ca += Number(ataque.ca);
        }
      }
    }

    // Implantes cibernéticos com bônus de CA
    if (Array.isArray(this.jogador?.cyberpun2080?.implantesCiberneticos)) {
      for (const imp of this.jogador.cyberpun2080.implantesCiberneticos) {
        if (Number(imp.ca) > 0) ca += Number(imp.ca);
      }
    }

    // Bônus manual (itens não identificados)
    ca += Number(this.jogador?.caManual) || 0;

    return ca;
  }

  get cfCalculado(): number {
    const modInt = this.calcularModificador(this.jogador?.atributos?.inteligencia) ?? 0;
    const prof = this.jogador?.proficiencia ?? 0;

    const equip = this.jogador?.equipamentos;

    // Base: armadura ou 10 + DEX
    let cf = 10 + modInt + prof;;
    const armadura = equip?.['armadura']?.[0];
    cf += armadura?.cf ? armadura.cf : 0;

    // Escudo
    const escudo = equip?.['escudo']?.[0];
    if (escudo?.cf) cf += escudo.cf;

    // Demais categorias
    for (const cat of ['cabeca', 'pes', 'amuleto', 'anel']) {
      const e = equip?.[cat]?.[0];
      if (e?.cf) cf += e.cf;
    }

    // Armas equipadas com bônus de CA
    if (Array.isArray(this.jogador?.ataques)) {
      for (const ataque of this.jogador.ataques) {
        if (ataque.equipado && Number(ataque.cf) > 0) {
          cf += Number(ataque.cf);
        }
      }
    }

    // Implantes cibernéticos com bônus de CA
    if (Array.isArray(this.jogador?.cyberpun2080?.implantesCiberneticos)) {
      for (const imp of this.jogador.cyberpun2080.implantesCiberneticos) {
        if (Number(imp.cf) > 0) cf += Number(imp.cf);
      }
    }
    console.log('CF calculado:', cf);
    return cf;


  }


  /**
   * Detalhamento das fontes de CA para exibição ao clicar no ícone
   */
  get caDetalhes(): Array<{ fonte: string, valor: number }> {
    const det: Array<{ fonte: string, valor: number }> = [];
    const modDex = this.calcularModificador(this.jogador?.atributos?.destreza) ?? 0;
    const equip = this.jogador?.equipamentos;

    const armadura = equip?.['armadura']?.[0];
    if (armadura?.ca) {
      det.push({ fonte: `Armadura: ${armadura.nome || 'Armadura'}`, valor: armadura.ca });
    } else {
      det.push({ fonte: 'Base', valor: 10 });
    }
    if (modDex !== 0) det.push({ fonte: 'Mod. Destreza', valor: modDex });

    const escudo = equip?.['escudo']?.[0];
    if (escudo?.ca) det.push({ fonte: `Escudo: ${escudo.nome || 'Escudo'}`, valor: escudo.ca });

    for (const cat of ['cabeca', 'pes', 'amuleto', 'anel']) {
      const e = equip?.[cat]?.[0];
      if (e?.ca) det.push({ fonte: e.nome || cat, valor: e.ca });
    }

    if (Array.isArray(this.jogador?.ataques)) {
      for (const ataque of this.jogador.ataques) {
        if (ataque.equipado && Number(ataque.ca) > 0) {
          det.push({ fonte: `Arma: ${ataque.nome}`, valor: Number(ataque.ca) });
        }
      }
    }

    if (Array.isArray(this.jogador?.cyberpun2080?.implantesCiberneticos)) {
      for (const imp of this.jogador.cyberpun2080.implantesCiberneticos) {
        if (Number(imp.ca) > 0) det.push({ fonte: `Implante: ${imp.nome}`, valor: Number(imp.ca) });
      }
    }

    const manual = Number(this.jogador?.caManual) || 0;
    if (manual !== 0) det.push({ fonte: 'Bônus manual', valor: manual });

    return det;
  }

  /**
   * Detalhamento das fontes de CF para exibição ao clicar no ícone
   */
  get cfDetalhes(): Array<{ fonte: string, valor: number }> {
    const det: Array<{ fonte: string, valor: number }> = [];
    const modInt = this.calcularModificador(this.jogador?.atributos?.inteligencia) ?? 0;
    const prof = this.jogador?.proficiencia ?? 0;
    const equip = this.jogador?.equipamentos;

    det.push({ fonte: 'Base', valor: 10 });
    if (modInt !== 0) det.push({ fonte: 'Mod. Inteligência', valor: modInt });
    if (prof !== 0) det.push({ fonte: 'Proficiência', valor: prof });

    const armadura = equip?.['armadura']?.[0];
    if (armadura?.cf) det.push({ fonte: `Armadura: ${armadura.nome || 'Armadura'}`, valor: armadura.cf });
    const escudo = equip?.['escudo']?.[0];
    if (escudo?.cf) det.push({ fonte: `Escudo: ${escudo.nome || 'Escudo'}`, valor: escudo.cf });
    for (const cat of ['cabeca', 'pes', 'amuleto', 'anel']) {
      const e = equip?.[cat]?.[0];
      if (e?.cf) det.push({ fonte: e.nome || cat, valor: e.cf });
    }
    if (Array.isArray(this.jogador?.ataques)) {
      for (const ataque of this.jogador.ataques) {
        if (ataque.equipado && Number(ataque.cf) > 0) {
          det.push({ fonte: `Arma: ${ataque.nome}`, valor: Number(ataque.cf) });
        }
      }
    }
    if (Array.isArray(this.jogador?.cyberpun2080?.implantesCiberneticos)) {
      for (const imp of this.jogador.cyberpun2080.implantesCiberneticos) {
        if (Number(imp.cf) > 0) det.push({ fonte: `Implante: ${imp.nome}`, valor: Number(imp.cf) });
      }
    }

    const manual = Number(this.jogador?.cfManual) || 0;
    if (manual !== 0) det.push({ fonte: 'Bônus manual', valor: manual });
    return det;
  }

  toggleEditarMagia(index: number) {
    this.editandoMagia[index] = !this.editandoMagia[index];
  }

  removerMagia(index: number) {
    this.jogador.magias.splice(index, 1);
    this.spellFeedback = 'Magia removida da ficha.';
    this.saveToCache();
  }

  togglePrepararMagia(index: number): void {
    const magia = this.jogador?.magias?.[index];
    if (!magia) {
      return;
    }

    const mode = this.jogador?.spellcasting?.mode;
    if (mode === 'known') {
      this.spellFeedback = 'Essa classe nao usa preparo diario de magias.';
      return;
    }

    const nivelMagia = this.obterNivelMagia(magia);
    if (nivelMagia === 0) {
      magia.preparada = true;
      this.spellFeedback = 'Truques estao sempre disponiveis.';
      this.saveToCache();
      return;
    }

    const proximoValor = !magia.preparada;
    if (proximoValor) {
      const limite = this.jogador?.spellcasting?.preparedLimit;
      const preparadas = this.contarMagiasPreparadas();
      if (typeof limite === 'number' && preparadas >= limite) {
        this.spellFeedback = `Limite de magias preparadas atingido (${limite}).`;
        return;
      }
    }

    magia.preparada = proximoValor;
    this.spellFeedback = proximoValor ? 'Magia preparada.' : 'Magia removida do preparo.';
    this.saveToCache();
  }

  conjurarMagia(payload: { index: number; slotLevel: number }): void {
    const magia = this.jogador?.magias?.[payload.index];
    if (!magia) {
      return;
    }

    const spellLevel = this.obterNivelMagia(magia);
    const slotLevel = Number(payload.slotLevel || 0);

    if (spellLevel > 0 && slotLevel < spellLevel) {
      this.spellFeedback = 'Selecione um slot compativel com o nivel minimo da magia.';
      return;
    }

    const mode = this.jogador?.spellcasting?.mode;
    if ((mode === 'prepared' || mode === 'all') && spellLevel > 0 && magia.preparada !== true) {
      this.spellFeedback = 'A magia precisa estar preparada antes de ser conjurada.';
      return;
    }

    if (spellLevel === 0) {
      this.spellFeedback = `Truque ${magia.nome} conjurado. ${this.obterDanoBaseMagia(magia, 0)}`;
      return;
    }

    const slot = this.jogador?.spellSlots?.[slotLevel];
    if (!slot || slot.total <= 0 || slot.used >= slot.total) {
      this.spellFeedback = `Sem slots disponiveis no nivel ${slotLevel}.`;
      return;
    }

    slot.used += 1;
    const dano = this.obterDanoBaseMagia(magia, slotLevel);
    this.spellFeedback = `${magia.nome} conjurada com slot ${slotLevel}. Dano base: ${dano}`;
    this.saveToCache();
  }

  /**
   * Abre modal de busca de magias
   */
  abrirBuscarMagia(): void {
    if (!this.isDnd5e) {
      return;
    }
    this.buscarMagiaAberto = true;
  }

  /**
   * Fecha modal de busca de magias
   */
  fecharBuscarMagia(): void {
    this.buscarMagiaAberto = false;
  }

  /**
   * Carrega e exibe detalhes de uma magia na lista do jogador
   */
  toggleSpellDetailsInList(index: number, spellName: string): void {
    if (this.expandedSpellDetails[index]) {
      // Se já está expandido, recolhe
      delete this.expandedSpellDetails[index];
      return;
    }

    // Busca detalhes da magia pelo nome
    this.loadingSpellDetails[index] = true;
    const spellIndex = spellName.toLowerCase().replaceAll(/[^a-z0-9]/g, '-').replaceAll(/-+/g, '-');

    this.dndApiService.getSpellDetails(spellIndex).subscribe({
      next: (data) => {
        this.expandedSpellDetails[index] = data;
        this.loadingSpellDetails[index] = false;
      },
      error: (error) => {
        console.error('Erro ao carregar detalhes da magia:', error);
        this.loadingSpellDetails[index] = false;
      }
    });
  }

  /**
   * Retorna os nomes das classes de uma magia formatados
   */
  getSpellClassNames(classes: any[]): string {
    if (!classes || classes.length === 0) {
      return '';
    }
    return classes.map(c => c.name).join(', ');
  }

  /**
   * Obtém os componentes da magia formatados (combina dados locais e da API)
   */
  getSpellComponents(magia: any, expandedDetails: any): string {
    if (magia.components && magia.components.length > 0) {
      return typeof magia.components === 'string' ? magia.components : magia.components.join(', ');
    }
    if (expandedDetails?.components && expandedDetails.components.length > 0) {
      return expandedDetails.components.join(', ');
    }
    return '';
  }

  /**
   * Obtém as classes da magia formatadas (combina dados locais e da API)
   */
  getSpellClassesFormatted(magia: any, expandedDetails: any): string {
    if (magia.classes && magia.classes.length > 0) {
      return typeof magia.classes === 'string' ? magia.classes : this.getSpellClassNames(magia.classes);
    }
    if (expandedDetails?.classes && expandedDetails.classes.length > 0) {
      return this.getSpellClassNames(expandedDetails.classes);
    }
    return '';
  }

  /**
   * Adiciona magia selecionada da API à ficha
   */
  adicionarMagiaApi(spell: any): void {
    const validacao = this.podeAprenderMagia(spell);
    if (!validacao.ok) {
      this.spellFeedback = validacao.reason || 'Nao foi possivel adicionar a magia da API.';
      return;
    }

    if (!this.jogador.magias) {
      this.jogador.magias = [];
    }

    const newSpell = {
      nome: spell.name,
      level: spell.level ?? 0,
      nivel: spell.level ?? 0,
      damage_formula: '',
      school: spell.school?.name || '',
      escola: spell.school?.name || '',
      casting_time: spell.casting_time || '',
      range: spell.range || '',
      duration: spell.duration || '',
      components: spell.components || [],
      material: spell.material || '',
      classes: spell.classes || [],
      higher_level: spell.higher_level || [],
      damage_at_slot_level: spell.damage?.damage_at_slot_level || undefined,
      damage_at_character_level: spell.damage?.damage_at_character_level || undefined,
      damage_type: spell.damage?.damage_type?.name || '',
      preparada: true,
      descricao: spell.desc?.join('\n') || spell.description?.join('\n') || ''
    };

    this.jogador.magias.push(newSpell);
    this.spellFeedback = 'Magia adicionada da API com sucesso.';
    this.saveToCache();
    this.fecharBuscarMagia();
  }

  /**
   * Abre modal de busca de talentos
   */
  abrirBuscarTalento(): void {
    if (!this.isDnd5e) {
      return;
    }
    this.buscarTalentoAberto = true;
  }

  abrirBuscarTracos(): void {
    if (!this.isDnd5e) {
      return;
    }
    this.buscarTracosAberto = true;
  }

  /**
   * Fecha modal de busca de talentos
   */
  fecharBuscarTalento(): void {
    this.buscarTalentoAberto = false;
  }

  /**
   * Adiciona talento selecionado da API à ficha
   */
  adicionarTalentoApi(feat: any): void {
    if (!this.jogador.talentos) {
      this.jogador.talentos = [];
    }

    const newFeat = {
      nome: feat.name,
      descricao: feat.desc?.join('\n') || feat.description?.join('\n') || feat.desc || ''
    };

    this.jogador.talentos.push(newFeat);
    this.saveToCache();
    this.fecharBuscarTalento();
  }
}
