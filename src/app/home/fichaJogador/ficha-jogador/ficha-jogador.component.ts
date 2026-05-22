import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import {
  CYBERPUN2080_CITY_FORCES,
  CYBERPUN2080_CLASS_TRAITS,
  CYBERPUN2080_ESSENTIAL_QUESTIONS,
  CYBERPUN2080_MODULES,
  CYBERPUN2080_ORIGINS,
  CYBERPUN2080_ORIGIN_TRAITS,
  CYBERPUN2080_RULES,
  EQUIPMENT_CATEGORIES,
  RPG_SYSTEM_OPTIONS,
  RPG_SYSTEMS,
  RpgSystemType,
  STORAGE_KEYS
} from '../../../core/constants/rpg.constants';
import { ApiReference, DndClass, DndRace } from '../../../core/models/dnd-api.model';
import { DndApiService } from '../../../core/services/dnd-api.service';
import { FichaJogadorService } from '../../../core/services/ficha-jogador.service';
import { StorageService } from '../../../core/services/storage.service';
import { RegistroSync, SyncBackendService } from '../../../core/services/sync-backend.service';
import { calcularCA, calcularModificador, formatarModificador } from '../../../core/utils/rpg.utils';

// Tempo de delay para transições entre modais (em milissegundos)
const MODAL_TRANSITION_DELAY = 300;

type ModoSessao = 'convidado' | 'google';

interface SessaoJogador {
  modo: ModoSessao;
  usuarioId: string;
  email?: string;
  ultimoLogin: string;
}

interface FichaContaResumo {
  id: string;
  nome: string;
  updatedAt: string;
  payload: any;
}

@Component({
  selector: 'app-ficha-jogador',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ficha-jogador.component.html',
  styleUrl: './ficha-jogador.component.scss'
})
export class FichaJogadorComponent implements OnInit, OnDestroy {

  readonly sistemaDnd5e = RPG_SYSTEMS.DND5E;
  readonly sistemaCyberPun2080 = RPG_SYSTEMS.CYBERPUN2080;
  readonly systemOptions = RPG_SYSTEM_OPTIONS;
  readonly cyberpunPerguntasEssenciais = CYBERPUN2080_ESSENTIAL_QUESTIONS;
  readonly cyberpunClasses = CYBERPUN2080_RULES.classes;
  readonly cyberpunOrigins = CYBERPUN2080_ORIGINS;
  readonly cyberpunCityForces = CYBERPUN2080_CITY_FORCES;
  readonly cyberpunModulos = CYBERPUN2080_MODULES;

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
            valor: "nao"
          },
          {
            nome: "Engenharia",
            valor: "nao"
          },
          {
            nome: "Investigação",
            valor: "nao"
          },
          {
            nome: "Natureza",
            valor: "nao"
          },
          {
            nome: "Religião",
            valor: "nao"
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
        magias: [],
        mochila: [],
        cyberpun2080: {
          papel: '',
          origem: '',
          antecedente: '',
          historia: '',
          perguntasEssenciais: ['', '', '', '', ''],
          implantes: [],
          nivelAmeacaRede: null,
          creditoEurodolar: null,
          estresseNeural: null,
          equipamentosTecnologiaNotas: '',
          implantesNotas: '',
          hackingNotas: '',
          veiculosNotas: '',
          consumiveisViciosNotas: '',
          forcasCidadeNotas: ''
        }

  };

  novaCategoria: string = '';
  novoEquipamento: any = { nome: '', descricao: '', ca: null };
  adicionandoEquipamento: boolean = false;


  adicionandoMagia: boolean = false;
  novaMagia: any = {
    nome: '',
    descricao: '',
    level: undefined,
    school: '',
    casting_time: '',
    range: '',
    components: [],
    material: '',
    duration: '',
    classes: []
  };

  adicionandoItem: boolean = false;
  novoItem: any = { nome: '', descricao: '' };

  adicionandoTalento: boolean = false;
  novoTalento: any = { nome: '', descricao: '' };

  editandoAtributos: boolean = false;
  editandoPericias: boolean = false;
  editandoCombate: boolean = false;

  editandoMagia: { [key: number]: boolean } = {};
  editandoTalento: { [key: number]: boolean } = {};
  editandoItem: { [key: number]: boolean } = {};
  editandoEquipamento: { [categoria: string]: { [key: number]: boolean } } = {};

  // Spell and Feat search functionality
  buscarMagiaAberto: boolean = false;
  buscarTalentoAberto: boolean = false;
  availableSpells: ApiReference[] = [];
  availableFeats: ApiReference[] = [];
  filteredSpells: ApiReference[] = [];
  filteredFeats: ApiReference[] = [];
  spellSearchTerm: string = '';
  featSearchTerm: string = '';
  loadingSpells: boolean = false;
  loadingFeats: boolean = false;
  selectedSpellDetails: any = null;
  selectedFeatDetails: any = null;

  // Spell filters
  spellLevelFilter: string = '';
  spellClassFilter: string = '';
  availableSpellLevels: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Cache de detalhes de magias para filtros
  spellDetailsCache: { [key: string]: any } = {};

  // Spell details in player's spell list
  expandedSpellDetails: { [key: number]: any } = {};
  loadingSpellDetails: { [key: number]: boolean } = {};

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

  readonly equipmentCategories = EQUIPMENT_CATEGORIES;

  // DND API data
  availableClasses: ApiReference[] = [];
  availableRaces: ApiReference[] = [];
  selectedClassDetails?: DndClass;
  selectedRaceDetails?: DndRace;
  loadingClassDetails = false;
  loadingRaceDetails = false;

  constructor(
    private storageService: StorageService,
    private fichaService: FichaJogadorService,
    private dndApiService: DndApiService,
    private syncBackendService: SyncBackendService
  ) {

  }

  get chaveFichaAtual(): string {
    if (this.sessao.usuarioId === 'guest') {
      return STORAGE_KEYS.PLAYER_CHARACTER;
    }
    return `${STORAGE_KEYS.PLAYER_CHARACTER_PREFIX}${this.sessao.usuarioId}`;
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

  get descricaoSessao(): string {
    if (this.estaAutenticado) {
      return this.sessao.email || this.sessao.usuarioId;
    }
    return 'Modo convidado';
  }

  private get chaveUltimoSync(): string {
    return `${STORAGE_KEYS.PLAYER_LAST_SYNC_PREFIX}${this.sessao.usuarioId}`;
  }

  private get chaveFichaSelecionada(): string {
    return `${STORAGE_KEYS.PLAYER_SELECTED_CHARACTER_PREFIX}${this.sessao.usuarioId}`;
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
    this.storageService.setItem(this.chaveUltimoSync, timestamp);
  }

  private obterCheckpointSincronizacao(): string | undefined {
    return this.storageService.getItem(this.chaveUltimoSync) || undefined;
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

      const lista = await firstValueFrom(this.syncBackendService.listarFichas(this.sessao.usuarioId));
      const fichas = (lista.records || [])
        .filter((change) => !change.deleted)
        .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
        .map((change) => ({
          id: change.id,
          nome: String(change.payload?.nome || 'Sem Nome').trim() || 'Sem Nome',
          updatedAt: change.updatedAt,
          payload: change.payload
        }));

      this.fichasConta = fichas;

      if (fichas.length === 0) {
        this.fichaSelecionadaId = this.storageService.getItem(this.chaveFichaSelecionada) || 'main-character';
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
      this.storageService.setObject(this.chaveFichaAtual, this.jogador);
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

      const push = await firstValueFrom(
        this.syncBackendService.pushMudancas(this.sessao.usuarioId, [this.montarRegistroSync()])
      );

      this.salvarCheckpointSincronizacao(push.serverTimestamp);
    } catch {
      this.erroSincronizacao = 'Falha ao sincronizar com o servidor. Seus dados locais foram preservados.';
    } finally {
      this.sincronizandoComServidor = false;
    }
  }

  private carregarSessao(): void {
    const sessaoSalva = this.storageService.getObject<SessaoJogador>(STORAGE_KEYS.PLAYER_SESSION);
    if (sessaoSalva?.usuarioId) {
      this.sessao = sessaoSalva;
    }
    this.carregarFichaSelecionada();
  }

  private carregarFichaSelecionada(): void {
    if (this.sessao.usuarioId === 'guest') {
      this.fichaSelecionadaId = 'main-character';
      return;
    }

    this.fichaSelecionadaId = this.storageService.getItem(this.chaveFichaSelecionada) || 'main-character';
  }

  private salvarFichaSelecionada(): void {
    if (this.sessao.usuarioId === 'guest') {
      return;
    }

    this.storageService.setItem(this.chaveFichaSelecionada, this.fichaSelecionadaId);
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
    this.storageService.setObject(STORAGE_KEYS.PLAYER_SESSION, {
      ...this.sessao,
      ultimoLogin: new Date().toISOString()
    });
  }

  private carregarFichaDaSessao(): void {
    const jogador = this.storageService.getObject<any>(this.chaveFichaAtual);
    if (jogador) {
      this.jogador = this.garantirEstruturaSistema(jogador);
      return;
    }
    this.jogador = this.garantirEstruturaSistema(this.fichaService.criarFichaVazia());
  }

  private criarDadosCyberPunPadrao() {
    return {
      papel: '',
      origem: '',
      antecedente: '',
      historia: '',
      perguntasEssenciais: ['', '', '', '', ''],
      implantes: [],
      nivelAmeacaRede: null,
      creditoEurodolar: null,
      estresseNeural: null,
      equipamentosTecnologiaNotas: '',
      implantesNotas: '',
      hackingNotas: '',
      veiculosNotas: '',
      consumiveisViciosNotas: '',
      forcasCidadeNotas: ''
    };
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
    while (base.cyberpun2080.perguntasEssenciais.length < 5) {
      base.cyberpun2080.perguntasEssenciais.push('');
    }
    base.cyberpun2080.perguntasEssenciais = base.cyberpun2080.perguntasEssenciais.slice(0, 5);
    return base;
  }

  selecionarSistema(systemId: RpgSystemType): void {
    this.jogador = this.garantirEstruturaSistema({
      ...this.jogador,
      sistema: systemId
    });

    if (systemId === RPG_SYSTEMS.CYBERPUN2080) {
      this.spellClassFilter = '';
      this.aplicarTracosCyberpunk();
    } else {
      this.loadClassesAndRaces();
    }

    this.saveToCache();
  }

  private aplicarTracosCyberpunk(): void {
    if (!this.isCyberPun2080) {
      return;
    }

    if (!this.jogador.tracos) {
      this.jogador.tracos = [];
    }

    this.jogador.tracos = this.jogador.tracos.filter((t: any) => !String(t.nome || '').startsWith('[Cyber]'));

    const papel = String(this.jogador?.cyberpun2080?.papel || '').trim();
    const origem = String(this.jogador?.cyberpun2080?.origem || '').trim();

    const classTraits = CYBERPUN2080_CLASS_TRAITS[papel] || [];
    for (const trait of classTraits) {
      this.jogador.tracos.push({
        nome: `[Cyber] ${trait.nome}`,
        descricao: trait.descricao,
        origem: 'classe'
      });
    }

    const originTraits = CYBERPUN2080_ORIGIN_TRAITS[origem] || [];
    for (const trait of originTraits) {
      this.jogador.tracos.push({
        nome: `[Cyber] ${trait.nome}`,
        descricao: trait.descricao,
        origem: 'raca'
      });
    }
  }

  onCyberPapelChange(): void {
    this.aplicarTracosCyberpunk();
    this.saveToCache();
  }

  onCyberOrigemChange(): void {
    this.aplicarTracosCyberpunk();
    this.saveToCache();
  }

  private normalizarUsuarioGoogle(email: string): string {
    return email.trim().toLowerCase().replaceAll(/[^a-z0-9]/g, '_').replaceAll(/_+/g, '_');
  }

  private migrarFichaConvidadoParaConta(usuarioId: string): void {
    const chaveConvidado = STORAGE_KEYS.PLAYER_CHARACTER;
    const chaveConta = `${STORAGE_KEYS.PLAYER_CHARACTER_PREFIX}${usuarioId}`;
    const fichaConta = this.storageService.getObject<any>(chaveConta);

    if (fichaConta) {
      return;
    }

    const fichaConvidado = this.storageService.getObject<any>(chaveConvidado);
    if (!fichaConvidado) {
      return;
    }

    this.storageService.setObject(chaveConta, fichaConvidado);
    this.mensagemSessao = 'Ficha de convidado migrada automaticamente para sua conta.';
  }

  entrarComGoogle(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const email = window.prompt('Informe seu e-mail Google para vincular sua ficha:');
    if (!email) {
      return;
    }

    const usuarioId = this.normalizarUsuarioGoogle(email);
    if (!usuarioId) {
      this.mensagemSessao = 'Não foi possível validar o e-mail informado.';
      return;
    }

    this.migrarFichaConvidadoParaConta(usuarioId);
    this.sessao = {
      modo: 'google',
      usuarioId,
      email: email.trim(),
      ultimoLogin: new Date().toISOString()
    };
    this.salvarSessao();
    this.carregarFichaSelecionada();
    this.carregarFichaDaSessao();
    void this.sincronizarDoServidor(true);

    if (!this.mensagemSessao) {
      this.mensagemSessao = 'Conta vinculada com sucesso. Seus dados agora estão separados por usuário.';
    }
  }

  sairDaConta(): void {
    this.sessao = {
      modo: 'convidado',
      usuarioId: 'guest',
      ultimoLogin: new Date().toISOString()
    };
    this.salvarSessao();
    this.carregarFichaDaSessao();
    this.mensagemSessao = 'Você voltou para o modo convidado.';
    this.erroSincronizacao = '';
    this.fichasConta = [];
    this.fichaSelecionadaId = 'main-character';
  }

  trocarFichaDaConta(): void {
    if (!this.estaAutenticado) {
      return;
    }
    void this.sincronizarDoServidor(true);
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
    this.storageService.setObject(this.chaveFichaAtual, this.jogador);
    this.salvarFichaSelecionada();
    this.agendarPushServidor();
  }

  ngOnInit(): void {
    this.carregarSessao();
    this.carregarFichaDaSessao();
    if (this.estaAutenticado) {
      void this.sincronizarDoServidor();
    }

    if (typeof window !== 'undefined') {
      this.beforeUnloadHandler = () => {
        this.storageService.setObject(this.chaveFichaAtual, this.jogador);
      };
      window.addEventListener('beforeunload', this.beforeUnloadHandler);
    }

    // Carrega dados D&D apenas quando o sistema atual exigir
    if (this.isDnd5e) {
      this.loadClassesAndRaces();
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined' && this.beforeUnloadHandler) {
      window.removeEventListener('beforeunload', this.beforeUnloadHandler);
    }
    if (this.pushTimeout) {
      clearTimeout(this.pushTimeout);
    }
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

  baixarJogador() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.jogador));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "jogador.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  carregarJogador(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const content = e.target.result;
        this.jogador = this.garantirEstruturaSistema(JSON.parse(content));
        this.saveToCache();
      };
      reader.readAsText(file);
    }
  }


  adicionarMagia() {
    this.adicionandoMagia = true;
  }

  confirmarAdicionarMagia() {
    if (this.novaMagia.nome && this.novaMagia.descricao) {
      if (!this.jogador.magias) {
        this.jogador.magias = [];
      }
      // Remove campos vazios antes de adicionar
      const magiaParaAdicionar = { ...this.novaMagia };
      if (!magiaParaAdicionar.level && magiaParaAdicionar.level !== 0) delete magiaParaAdicionar.level;
      if (!magiaParaAdicionar.school) delete magiaParaAdicionar.school;
      if (!magiaParaAdicionar.casting_time) delete magiaParaAdicionar.casting_time;
      if (!magiaParaAdicionar.range) delete magiaParaAdicionar.range;
      if (!magiaParaAdicionar.components || magiaParaAdicionar.components.length === 0) delete magiaParaAdicionar.components;
      if (!magiaParaAdicionar.material) delete magiaParaAdicionar.material;
      if (!magiaParaAdicionar.duration) delete magiaParaAdicionar.duration;
      if (!magiaParaAdicionar.classes || magiaParaAdicionar.classes.length === 0) delete magiaParaAdicionar.classes;

      this.jogador.magias.push(magiaParaAdicionar);
      this.novaMagia = {
        nome: '',
        descricao: '',
        level: undefined,
        school: '',
        casting_time: '',
        range: '',
        components: [],
        material: '',
        duration: '',
        classes: []
      };
      this.adicionandoMagia = false;
      this.saveToCache();
    }

  }


  cancelarAdicionarMagia() {
    this.novaMagia = {
      nome: '',
      descricao: '',
      level: undefined,
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

  /**
   * Formata modificador com sinal apropriado
   */
  formatarModificador(modificador: number | null): string {
    return formatarModificador(modificador);
  }

  /**
   * Obtém a CA calculada baseada nos equipamentos e modificador de destreza
   */
  get caCalculada(): number {
    const modificadorDestreza = this.calcularModificador(this.jogador.atributos.destreza);
    return calcularCA(this.jogador.equipamentos, modificadorDestreza);
  }



  adicionarItem() {
    this.adicionandoItem = true;
  }

  removerItem(item: { nome: string, descricao: string }) {
    this.fichaService.removerItemMochila(this.jogador, item);
    this.saveToCache();
  }

  confirmarAdicionarItem() {
    if (this.novoItem.nome && this.novoItem.descricao) {
      this.fichaService.adicionarItemMochila(this.jogador, this.novoItem);
      this.novoItem = { nome: '', descricao: '' };
      this.adicionandoItem = false;
      this.saveToCache();
    }
  }

  cancelarAdicionarItem() {
    this.novoItem = { nome: '', descricao: '' };
    this.adicionandoItem = false;
  }




  adicionarTalento() {
    this.adicionandoTalento = true;
  }

  removerTalento(talento: { nome: string, descricao: string }) {
    this.fichaService.removerTalento(this.jogador, talento);
    this.saveToCache();
  }

  confirmarAdicionarTalento() {
    if (this.novoTalento.nome && this.novoTalento.descricao) {
      this.fichaService.adicionarTalento(this.jogador, this.novoTalento);
      this.novoTalento = { nome: '', descricao: '' };
      this.adicionandoTalento = false;
      this.saveToCache();
    }
  }

  cancelarAdicionarTalento() {
    this.novoTalento = { nome: '', descricao: '' };
    this.adicionandoTalento = false;
  }


  adicionarEquipamento() {
    this.adicionandoEquipamento = true;
  }

  confirmarAdicionarEquipamento() {
    if (this.novaCategoria && this.novoEquipamento.nome && this.novoEquipamento.descricao) {
      this.fichaService.adicionarEquipamento(this.jogador, this.novaCategoria, this.novoEquipamento);
      this.novoEquipamento = { nome: '', descricao: '', ca: null };
      this.novaCategoria = '';
      this.adicionandoEquipamento = false;
      this.saveToCache();
    }
  }

  cancelarAdicionarEquipamento() {
    this.novoEquipamento = { nome: '', descricao: '', ca: null };
    this.novaCategoria = '';
    this.adicionandoEquipamento = false;
  }

  removerEquipamento(categoria: string, equipamento: { nome: string, descricao: string }) {
    this.fichaService.removerEquipamento(this.jogador, categoria, equipamento);
    this.saveToCache();
  }

  updatePericiaValor(event: Event, pericia: any) {
    const input = event.target as HTMLInputElement;
    pericia.valor = input.checked ? 'sim' : 'nao';
  }

  getCategoryIcon(categoria: string): string {
    const icons: { [key: string]: string } = {
      'cabeca': 'fa-hat-wizard',
      'armadura': 'fa-vest',
      'pes': 'fa-socks',
      'escudo': 'fa-shield-alt',
      'amuleto': 'fa-gem',
      'anel': 'fa-ring'
    };
    return icons[categoria] || 'fa-shield';
  }

  getCategoryName(categoria: string): string {
    const names: { [key: string]: string } = {
      'cabeca': 'Cabeça',
      'armadura': 'Armadura',
      'pes': 'Pés',
      'escudo': 'Escudo',
      'amuleto': 'Amuleto',
      'anel': 'Anel'
    };
    return names[categoria] || categoria;
  }

  hasEquipment(): boolean {
    return Object.values(this.jogador.equipamentos).some((arr: any) => arr && arr.length > 0);
  }

  hasProficiencies(): boolean {
    return this.jogador.pericias.some((p: any) => p.valor === 'sim');
  }

  toggleEditarAtributos() {
    this.editandoAtributos = !this.editandoAtributos;
  }

  toggleEditarPericias() {
    this.editandoPericias = !this.editandoPericias;
  }

  toggleEditarCombate() {
    this.editandoCombate = !this.editandoCombate;
  }

  toggleEditarMagia(index: number) {
    this.editandoMagia[index] = !this.editandoMagia[index];
  }

  removerMagia(index: number) {
    this.jogador.magias.splice(index, 1);
    this.saveToCache();
  }

  toggleEditarTalento(index: number) {
    this.editandoTalento[index] = !this.editandoTalento[index];
  }

  toggleEditarItem(index: number) {
    this.editandoItem[index] = !this.editandoItem[index];
  }

  toggleEditarEquipamento(categoria: string, index: number) {
    if (!this.editandoEquipamento[categoria]) {
      this.editandoEquipamento[categoria] = {};
    }
    this.editandoEquipamento[categoria][index] = !this.editandoEquipamento[categoria][index];
  }

  /**
   * Carrega classes e raças da API DND
   */
  loadClassesAndRaces(): void {
    if (!this.isDnd5e) {
      return;
    }

    this.dndApiService.getClasses().subscribe({
      next: (data) => {
        this.availableClasses = data.results || [];
      },
      error: (error) => {
        console.error('Erro ao carregar classes:', error);
      }
    });

    this.dndApiService.getRaces().subscribe({
      next: (data) => {
        this.availableRaces = data.results || [];
      },
      error: (error) => {
        console.error('Erro ao carregar raças:', error);
      }
    });
  }

  /**
   * Visualiza detalhes de uma classe
   */
  viewClassDetails(classIndex: string): void {
    if (!classIndex) return;

    this.loadingClassDetails = true;
    this.dndApiService.getClassDetails(classIndex).subscribe({
      next: (data) => {
        this.selectedClassDetails = data;
        this.loadingClassDetails = false;

        // Fecha o modal de seleção e abre o modal de detalhes
        if (typeof window !== 'undefined') {
          const bootstrap = (window as any).bootstrap;
          if (bootstrap) {
            const selectionModal = bootstrap.Modal.getInstance(document.getElementById('classSelectionModal'));
            if (selectionModal) {
              selectionModal.hide();
            }

            // Abre o modal de detalhes após um pequeno delay
            setTimeout(() => {
              const detailsModal = new bootstrap.Modal(document.getElementById('classDetailsModal'));
              detailsModal.show();
            }, MODAL_TRANSITION_DELAY);
          }
        }
      },
      error: (error) => {
        console.error('Erro ao carregar detalhes da classe:', error);
        this.loadingClassDetails = false;
      }
    });
  }

  /**
   * Visualiza detalhes de uma raça
   */
  viewRaceDetails(raceIndex: string): void {
    if (!raceIndex) return;

    this.loadingRaceDetails = true;
    this.dndApiService.getRaceDetails(raceIndex).subscribe({
      next: (data) => {
        this.selectedRaceDetails = data;
        this.loadingRaceDetails = false;

        // Fecha o modal de seleção e abre o modal de detalhes
        if (typeof window !== 'undefined') {
          const bootstrap = (window as any).bootstrap;
          if (bootstrap) {
            const selectionModal = bootstrap.Modal.getInstance(document.getElementById('raceSelectionModal'));
            if (selectionModal) {
              selectionModal.hide();
            }

            // Abre o modal de detalhes após um pequeno delay
            setTimeout(() => {
              const detailsModal = new bootstrap.Modal(document.getElementById('raceDetailsModal'));
              detailsModal.show();
            }, MODAL_TRANSITION_DELAY);
          }
        }
      },
      error: (error) => {
        console.error('Erro ao carregar detalhes da raça:', error);
        this.loadingRaceDetails = false;
      }
    });
  }

  /**
   * Abre modal de seleção de classe, fechando o modal de edição
   */
  openClassSelection(): void {
    if (typeof window !== 'undefined') {
      const bootstrap = (window as any).bootstrap;
      if (bootstrap) {
        // Fecha o modal de edição
        const editModal = bootstrap.Modal.getInstance(document.getElementById('editarFichaModal'));
        if (editModal) {
          editModal.hide();
        }

        // Abre o modal de seleção após um pequeno delay
        setTimeout(() => {
          const selectionModal = new bootstrap.Modal(document.getElementById('classSelectionModal'));
          selectionModal.show();
        }, MODAL_TRANSITION_DELAY);
      }
    }
  }

  /**
   * Fecha modal de detalhes da classe e volta para o modal de seleção
   */
  closeClassDetails(): void {
    this.selectedClassDetails = undefined;

    // Fecha o modal de detalhes e reabre o modal de seleção
    if (typeof window !== 'undefined') {
      const bootstrap = (window as any).bootstrap;
      if (bootstrap) {
        const detailsModal = bootstrap.Modal.getInstance(document.getElementById('classDetailsModal'));
        if (detailsModal) {
          detailsModal.hide();
        }

        // Reabre o modal de seleção após um pequeno delay
        setTimeout(() => {
          const selectionModal = new bootstrap.Modal(document.getElementById('classSelectionModal'));
          selectionModal.show();
        }, MODAL_TRANSITION_DELAY);
      }
    }
  }

  /**
   * Abre modal de seleção de raça, fechando o modal de edição
   */
  openRaceSelection(): void {
    if (typeof window !== 'undefined') {
      const bootstrap = (window as any).bootstrap;
      if (bootstrap) {
        // Fecha o modal de edição
        const editModal = bootstrap.Modal.getInstance(document.getElementById('editarFichaModal'));
        if (editModal) {
          editModal.hide();
        }

        // Abre o modal de seleção após um pequeno delay
        setTimeout(() => {
          const selectionModal = new bootstrap.Modal(document.getElementById('raceSelectionModal'));
          selectionModal.show();
        }, MODAL_TRANSITION_DELAY);
      }
    }
  }

  /**
   * Fecha modal de detalhes da raça e volta para o modal de seleção
   */
  closeRaceDetails(): void {
    this.selectedRaceDetails = undefined;

    // Fecha o modal de detalhes e reabre o modal de seleção
    if (typeof window !== 'undefined') {
      const bootstrap = (window as any).bootstrap;
      if (bootstrap) {
        const detailsModal = bootstrap.Modal.getInstance(document.getElementById('raceDetailsModal'));
        if (detailsModal) {
          detailsModal.hide();
        }

        // Reabre o modal de seleção após um pequeno delay
        setTimeout(() => {
          const selectionModal = new bootstrap.Modal(document.getElementById('raceSelectionModal'));
          selectionModal.show();
        }, MODAL_TRANSITION_DELAY);
      }
    }
  }

  /**
   * Encontra o index da classe pelo nome
   */
  getClassIndexByName(className: string): string {
    const foundClass = this.availableClasses.find(c => c.name.toLowerCase() === className.toLowerCase());
    return foundClass?.index || '';
  }

  /**
   * Encontra o index da raça pelo nome
   */
  getRaceIndexByName(raceName: string): string {
    const foundRace = this.availableRaces.find(r => r.name.toLowerCase() === raceName.toLowerCase());
    return foundRace?.index || '';
  }

  /**
   * Seleciona uma classe e carrega seus traços
   */
  selectClass(classRef: ApiReference): void {
    if (!this.isDnd5e) {
      return;
    }

    this.jogador.classe = classRef.name;
    this.spellClassFilter = classRef.index;

    // Carrega detalhes da classe para obter traços
    this.dndApiService.getClassDetails(classRef.index).subscribe({
      next: (classDetails: DndClass) => {
        // Remove traços antigos da classe
        if (!this.jogador.tracos) {
          this.jogador.tracos = [];
        }
        this.jogador.tracos = this.jogador.tracos.filter((t: any) => t.origem !== 'classe');

        // Adiciona proficiências como traços
        if (classDetails.proficiencies && classDetails.proficiencies.length > 0) {
          const profNames = classDetails.proficiencies.map(p => p.name).join(', ');
          this.jogador.tracos.push({
            nome: 'Proficiências da Classe',
            descricao: profNames,
            origem: 'classe'
          });
        }

        // Adiciona testes de resistência como traços
        if (classDetails.saving_throws && classDetails.saving_throws.length > 0) {
          const saveNames = classDetails.saving_throws.map(s => s.name).join(', ');
          this.jogador.tracos.push({
            nome: 'Testes de Resistência',
            descricao: saveNames,
            origem: 'classe'
          });
        }

        // Adiciona dado de vida como traço
        if (classDetails.hit_die) {
          this.jogador.tracos.push({
            nome: 'Dado de Vida',
            descricao: `d${classDetails.hit_die}`,
            origem: 'classe'
          });
        }

        // Adiciona informação sobre conjuração se disponível
        if (classDetails.spellcasting) {
          this.jogador.tracos.push({
            nome: 'Conjuração',
            descricao: 'Esta classe possui habilidades de conjuração',
            origem: 'classe'
          });
        }

        this.saveToCache();
      },
      error: (error) => {
        console.error('Erro ao carregar detalhes da classe:', error);
      }
    });
  }

  private getClasseFiltroApi(): string | undefined {
    if (!this.spellClassFilter) {
      return undefined;
    }

    const classeByNome = this.availableClasses.find((classe) =>
      classe.name.toLowerCase() === this.spellClassFilter.toLowerCase()
    );

    return (classeByNome?.index || this.spellClassFilter).toLowerCase();
  }

  /**
   * Seleciona uma raça e carrega seus traços
   */
  selectRace(raceRef: ApiReference): void {
    if (!this.isDnd5e) {
      return;
    }

    this.jogador.raca = raceRef.name;

    // Carrega detalhes da raça para obter traços
    this.dndApiService.getRaceDetails(raceRef.index).subscribe({
      next: (raceDetails: DndRace) => {
        // Remove traços antigos da raça
        if (!this.jogador.tracos) {
          this.jogador.tracos = [];
        }
        this.jogador.tracos = this.jogador.tracos.filter((t: any) => t.origem !== 'raca');

        // Adiciona velocidade como traço
        if (raceDetails.speed) {
          this.jogador.tracos.push({
            nome: 'Velocidade',
            descricao: `${raceDetails.speed} pés`,
            origem: 'raca'
          });
        }

        // Adiciona bônus de atributos como traço
        if (raceDetails.ability_bonuses && raceDetails.ability_bonuses.length > 0) {
          const bonuses = raceDetails.ability_bonuses.map(b =>
            `${b.ability_score.name}: +${b.bonus}`
          ).join(', ');
          this.jogador.tracos.push({
            nome: 'Bônus de Atributos',
            descricao: bonuses,
            origem: 'raca'
          });
        }

        // Adiciona tamanho como traço
        if (raceDetails.size) {
          this.jogador.tracos.push({
            nome: 'Tamanho',
            descricao: raceDetails.size + (raceDetails.size_description ? ` - ${raceDetails.size_description}` : ''),
            origem: 'raca'
          });
        }

        // Adiciona idiomas como traço
        if (raceDetails.languages && raceDetails.languages.length > 0) {
          const langs = raceDetails.languages.map(l => l.name).join(', ');
          this.jogador.tracos.push({
            nome: 'Idiomas',
            descricao: langs + (raceDetails.language_desc ? ` - ${raceDetails.language_desc}` : ''),
            origem: 'raca'
          });
        }

        // Adiciona traços raciais
        if (raceDetails.traits && raceDetails.traits.length > 0) {
          const traits = raceDetails.traits.map(t => t.name).join(', ');
          this.jogador.tracos.push({
            nome: 'Traços Raciais',
            descricao: traits,
            origem: 'raca'
          });
        }

        this.saveToCache();
      },
      error: (error) => {
        console.error('Erro ao carregar detalhes da raça:', error);
      }
    });
  }

  /**
   * Remove um traço
   */
  removerTraco(traco: any): void {
    if (!this.jogador.tracos) return;
    const index = this.jogador.tracos.indexOf(traco);
    if (index > -1) {
      this.jogador.tracos.splice(index, 1);
      this.saveToCache();
    }
  }

  /**
   * Retorna traços de classe
   */
  getTracosClasse(): any[] {
    if (!this.jogador.tracos) return [];
    return this.jogador.tracos.filter((t: any) => t.origem === 'classe');
  }

  /**
   * Retorna traços de raça
   */
  getTracosRaca(): any[] {
    if (!this.jogador.tracos) return [];
    return this.jogador.tracos.filter((t: any) => t.origem === 'raca');
  }

  /**
   * Verifica se existem traços de classe
   */
  hasTracosClasse(): boolean {
    return this.getTracosClasse().length > 0;
  }

  /**
   * Verifica se existem traços de raça
   */
  hasTracosRaca(): boolean {
    return this.getTracosRaca().length > 0;
  }

  /**
   * Abre modal de busca de magias
   */
  abrirBuscarMagia(): void {
    if (!this.isDnd5e) {
      return;
    }

    this.buscarMagiaAberto = true;

    if (!this.spellClassFilter && this.jogador.classe) {
      const classeSelecionada = this.availableClasses.find((classe) =>
        classe.name.toLowerCase() === this.jogador.classe.toLowerCase()
      );
      if (classeSelecionada) {
        this.spellClassFilter = classeSelecionada.index;
      }
    }

    if (this.availableSpells.length === 0) {
      this.loadSpells();
    }
  }

  /**
   * Fecha modal de busca de magias
   */
  fecharBuscarMagia(): void {
    this.buscarMagiaAberto = false;
    this.spellSearchTerm = '';
    this.selectedSpellDetails = null;
    this.filteredSpells = this.availableSpells;
  }

  /**
   * Carrega lista de magias da API
   */
  loadSpells(): void {
    this.loadingSpells = true;
    this.dndApiService.getSpells().subscribe({
      next: (data) => {
        this.availableSpells = data.results || [];
        this.filteredSpells = this.availableSpells;
        this.loadingSpells = false;
      },
      error: (error) => {
        console.error('Erro ao carregar magias:', error);
        this.loadingSpells = false;
      }
    });
  }

  /**
   * Filtra magias baseado no termo de busca
   */
  filtrarMagias(): void {
    let filtered = this.availableSpells;

    // Filter by search term
    if (this.spellSearchTerm) {
      const term = this.spellSearchTerm.toLowerCase();
      filtered = filtered.filter(spell =>
        spell.name.toLowerCase().includes(term)
      );
    }

    this.filteredSpells = filtered;
  }

  /**
   * Aplica filtros de nível e classe nas magias
   * Tenta usar a API com filtros, se falhar usa filtragem local
   */
  aplicarFiltrosMagias(): void {
    this.loadingSpells = true;

    // Se não há filtros, apenas recarrega a lista completa
    if (!this.spellLevelFilter && !this.spellClassFilter) {
      this.loadSpells();
      return;
    }

    // Tentar usar o método com filtros da API
    this.dndApiService.getSpellsWithFilters(
      this.spellLevelFilter || undefined,
      this.getClasseFiltroApi()
    ).subscribe({
      next: (data: any) => {
        this.availableSpells = data.results || [];
        this.filtrarMagias();
        this.loadingSpells = false;
      },
      error: (error) => {
        console.warn('API não suporta filtros, usando filtragem local:', error);
        // Se a API não suportar filtros, faz filtragem local
        this.aplicarFiltrosLocalmente();
      }
    });
  }

  /**
   * Aplica filtros localmente carregando detalhes das magias
   */
  private aplicarFiltrosLocalmente(): void {
    // Carrega todas as magias primeiro
    this.dndApiService.getSpells().subscribe({
      next: (data: any) => {
        const allSpells = data.results || [];

        // Se não há filtros, retorna tudo
        if (!this.spellLevelFilter && !this.spellClassFilter) {
          this.availableSpells = allSpells;
          this.filtrarMagias();
          this.loadingSpells = false;
          return;
        }

        // Filtragem precisa carregar detalhes - limitando a 100 magias
        const spellsToCheck = allSpells.slice(0, 100);
        let checkedCount = 0;
        const filteredResults: any[] = [];

        for (const spell of spellsToCheck) {
          this.checkSpellMatchesFilters(spell, filteredResults, () => {
            checkedCount++;
            if (checkedCount === spellsToCheck.length) {
              this.availableSpells = filteredResults;
              this.filtrarMagias();
              this.loadingSpells = false;
            }
          });
        }
      },
      error: (error) => {
        console.error('Erro ao carregar magias para filtro local:', error);
        this.loadingSpells = false;
      }
    });
  }

  /**
   * Verifica se uma magia atende aos filtros
   */
  private checkSpellMatchesFilters(spell: any, results: any[], callback: () => void): void {
    this.dndApiService.getSpellDetails(spell.index).subscribe({
      next: (details) => {
        let matches = true;

        // Filtro de nível
        if (this.spellLevelFilter) {
          const filterLevel = Number.parseInt(this.spellLevelFilter, 10);
          if (details.level !== filterLevel) {
            matches = false;
          }
        }

        // Filtro de classe
        if (this.spellClassFilter && matches) {
          const classFilter = this.spellClassFilter.toLowerCase();
          const hasClass = details.classes?.some((c: any) =>
            c.name.toLowerCase() === classFilter
          );
          if (!hasClass) {
            matches = false;
          }
        }

        if (matches) {
          results.push(spell);
        }

        callback();
      },
      error: () => {
        callback();
      }
    });
  }

  /**
   * Limpa filtros de magias
   */
  limparFiltrosMagias(): void {
    this.spellLevelFilter = '';
    this.spellClassFilter = '';
    this.spellSearchTerm = '';
    this.loadSpells();
  }

  /**
   * Visualiza detalhes de uma magia
   */
  viewSpellDetails(spellIndex: string): void {
    if (!spellIndex) return;

    this.dndApiService.getSpellDetails(spellIndex).subscribe({
      next: (data) => {
        this.selectedSpellDetails = data;
      },
      error: (error) => {
        console.error('Erro ao carregar detalhes da magia:', error);
      }
    });
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
        // Se falhar, tenta buscar na lista de magias disponíveis
        this.tryFindSpellInAvailableList(index, spellName);
      }
    });
  }

  /**
   * Tenta encontrar magia na lista disponível caso a busca direta falhe
   */
  private tryFindSpellInAvailableList(index: number, spellName: string): void {
    // Se a lista de magias ainda não foi carregada, carrega primeiro
    if (this.availableSpells.length === 0) {
      this.dndApiService.getSpells().subscribe({
        next: (data) => {
          this.availableSpells = data.results || [];
          this.findAndLoadSpellDetails(index, spellName);
        },
        error: () => {
          this.loadingSpellDetails[index] = false;
        }
      });
    } else {
      this.findAndLoadSpellDetails(index, spellName);
    }
  }

  /**
   * Encontra e carrega detalhes da magia da lista disponível
   */
  private findAndLoadSpellDetails(index: number, spellName: string): void {
    const spell = this.availableSpells.find(s =>
      s.name.toLowerCase() === spellName.toLowerCase()
    );

    if (spell) {
      this.dndApiService.getSpellDetails(spell.index).subscribe({
        next: (data) => {
          this.expandedSpellDetails[index] = data;
          this.loadingSpellDetails[index] = false;
        },
        error: () => {
          this.loadingSpellDetails[index] = false;
        }
      });
    } else {
      this.loadingSpellDetails[index] = false;
    }
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
    if (!this.jogador.magias) {
      this.jogador.magias = [];
    }

    const newSpell = {
      nome: spell.name,
      nivel: spell.level || 0,
      escola: spell.school?.name || '',
      descricao: spell.desc?.join('\n') || spell.description?.join('\n') || ''
    };

    this.jogador.magias.push(newSpell);
    this.saveToCache();
    this.fecharBuscarMagia();
  }

  /**
   * Volta da visualização de detalhes da magia para lista
   */
  voltarListaMagias(): void {
    this.selectedSpellDetails = null;
  }

  /**
   * Abre modal de busca de talentos
   */
  abrirBuscarTalento(): void {
    if (!this.isDnd5e) {
      return;
    }

    this.buscarTalentoAberto = true;
    if (this.availableFeats.length === 0) {
      this.loadFeatsFromOpen5e();
    }
  }

  /**
   * Fecha modal de busca de talentos
   */
  fecharBuscarTalento(): void {
    this.buscarTalentoAberto = false;
    this.featSearchTerm = '';
    this.selectedFeatDetails = null;
    this.filteredFeats = this.availableFeats;
  }

  /**
   * Carrega lista de talentos da API Open5e
   */
  loadFeatsFromOpen5e(page: number = 1): void {
    this.loadingFeats = true;
    this.dndApiService.getFeatsOpen5e(page).subscribe({
      next: (data) => {
        this.availableFeats = data.results || [];
        this.filteredFeats = this.availableFeats;
        this.loadingFeats = false;
      },
      error: (error) => {
        console.error('Erro ao carregar talentos da Open5e:', error);
        // Fallback para API dnd5eapi se Open5e falhar
        this.loadFeats();
      }
    });
  }

  /**
   * Carrega lista de talentos da API dnd5eapi (fallback)
   */
  loadFeats(): void {
    this.loadingFeats = true;
    this.dndApiService.getFeats().subscribe({
      next: (data) => {
        this.availableFeats = data.results || [];
        this.filteredFeats = this.availableFeats;
        this.loadingFeats = false;
      },
      error: (error) => {
        console.error('Erro ao carregar talentos:', error);
        this.loadingFeats = false;
      }
    });
  }

  /**
   * Filtra talentos baseado no termo de busca usando Open5e API
   */
  filtrarTalentos(): void {
    if (!this.featSearchTerm || this.featSearchTerm.trim().length < 2) {
      this.loadFeatsFromOpen5e();
      return;
    }

    this.loadingFeats = true;
    this.dndApiService.searchFeatsOpen5e(this.featSearchTerm).subscribe({
      next: (data) => {
        this.availableFeats = data.results || [];
        this.filteredFeats = this.availableFeats;
        this.loadingFeats = false;
      },
      error: (error) => {
        console.error('Erro ao buscar talentos:', error);
        // Fallback para filtro local
        const term = this.featSearchTerm.toLowerCase();
        this.filteredFeats = this.availableFeats.filter(feat =>
          feat.name?.toLowerCase().includes(term) || (feat as any).slug?.toLowerCase().includes(term)
        );
        this.loadingFeats = false;
      }
    });
  }

  /**
   * Visualiza detalhes de um talento
   * Tenta primeiro Open5e, depois fallback para dnd5eapi
   */
  viewFeatDetails(featIndexOrSlug: string): void {
    if (!featIndexOrSlug) return;

    // Tenta primeiro com Open5e (usa slug)
    this.dndApiService.getFeatDetailsOpen5e(featIndexOrSlug).subscribe({
      next: (data) => {
        this.selectedFeatDetails = data;
      },
      error: () => {
        // Fallback para dnd5eapi
        this.dndApiService.getFeatDetails(featIndexOrSlug).subscribe({
          next: (data) => {
            this.selectedFeatDetails = data;
          },
          error: (error) => {
            console.error('Erro ao carregar detalhes do talento:', error);
          }
        });
      }
    });
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

  /**
   * Volta da visualização de detalhes do talento para lista
   */
  voltarListaTalentos(): void {
    this.selectedFeatDetails = null;
  }

  /**
   * Verifica se a descrição do feat é uma string
   */
  isString(value: any): boolean {
    return typeof value === 'string';
  }

  /**
   * Obtém prévia da descrição do feat
   */
  getFeatDescPreview(feat: any): string {
    const desc = feat.desc;
    if (!desc) return '';
    if (typeof desc === 'string') {
      return desc.length > 100 ? desc.substring(0, 100) + '...' : desc;
    }
    return '';
  }

  /**
   * Obtém o identificador do feat (slug ou index)
   */
  getFeatId(feat: any): string {
    return feat.index || feat.slug || '';
  }
}
