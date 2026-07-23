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
import { FichaSessionFacade } from './state/ficha-session.facade';
import { FichaStateFacade } from './state/ficha-state.facade';
import { FichaContaResumo, SessaoJogador } from './state/ficha-state.models';
import { FichaSyncFacade } from './state/ficha-sync.facade';

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
    DiceRollToastComponent
  ],
  templateUrl: './ficha-jogador.component.html',
  styleUrl: './ficha-jogador.component.scss'
})
export class FichaJogadorComponent implements OnInit, OnDestroy {

  readonly sistemaDnd5e = RPG_SYSTEMS.DND5E;
  readonly systemOptions = RPG_SYSTEM_OPTIONS;
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
    return base;
  }

  selecionarSistema(systemId: RpgSystemType): void {
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
    if (!this.jogador.magias) {
      this.jogador.magias = [];
    }

    const newSpell = {
      nome: spell.name,
      level: spell.level ?? 0,
      nivel: spell.level ?? 0,
      school: spell.school?.name || '',
      escola: spell.school?.name || '',
      casting_time: spell.casting_time || '',
      range: spell.range || '',
      duration: spell.duration || '',
      components: spell.components || [],
      material: spell.material || '',
      classes: spell.classes || [],
      higher_level: spell.higher_level || [],
      descricao: spell.desc?.join('\n') || spell.description?.join('\n') || ''
    };

    this.jogador.magias.push(newSpell);
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
