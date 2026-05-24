import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom, timeout } from 'rxjs';
import {
  AcessorioArma,
  ACESSORIOS_ARMAS,
  CYBERPUN2080_ANTECEDENTES,
  CYBERPUN2080_CITY_FORCES,
  CYBERPUN2080_CLASSES_FULL_DATA,
  CYBERPUN2080_ESSENTIAL_QUESTIONS,
  CYBERPUN2080_MODULES,
  CYBERPUN2080_ORIGINS,
  CYBERPUN2080_RULES,
  CYBERPUN2080_SUBCLASSES_BY_CLASS,
  EQUIPMENT_CATEGORIES,
  GRUPOS_IMPLANTE,
  HACKS_RAPIDOS,
  IMPLANTES,
  RPG_SYSTEM_OPTIONS,
  RPG_SYSTEMS,
  RpgSystemType,
  SKILLS,
  STORAGE_KEYS,
  TipoImplante,
  TIPOS_IMPLANTE
} from '../../core/constants/rpg.constants';
import { CyberpunkAntecedenteCatalog, CyberpunkCatalog, CyberpunkClassCatalog, CyberpunkStoreItem, CyberpunkSubclassCatalog, CyberpunkTalentCatalog } from '../../core/models/cyberpunk-catalog.model';
import { ApiReference, DndClass, DndRace } from '../../core/models/dnd-api.model';
import { CyberpunkCatalogService } from '../../core/services/cyberpunk-catalog.service';
import { DndApiService } from '../../core/services/dnd-api.service';
import { FichaJogadorService } from '../../core/services/ficha-jogador.service';
import { StorageService } from '../../core/services/storage.service';
import { RegistroSync, SyncBackendService } from '../../core/services/sync-backend.service';
import { calcularModificador, formatarModificador } from '../../core/utils/rpg.utils';

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
  cyberpunClasses: string[] = [...CYBERPUN2080_RULES.classes];
  cyberpunSubclassesPorPapel: Record<string, readonly string[]> = { ...CYBERPUN2080_SUBCLASSES_BY_CLASS };
  readonly cyberpunOrigins = CYBERPUN2080_ORIGINS;
  cyberpunAntecedentes: CyberpunkAntecedenteCatalog[] = [...CYBERPUN2080_ANTECEDENTES];
  cyberpunClassesFullData: CyberpunkClassCatalog[] = [...CYBERPUN2080_CLASSES_FULL_DATA];
  cyberpunTalentosCatalogo: CyberpunkTalentCatalog[] = [];
  cyberpunHacksCatalogo: CyberpunkStoreItem[] = [];
  cyberpunEquipamentosCatalogo: CyberpunkStoreItem[] = [];
  itemLojaCyberSelecionado = '';
  categoriaEquipamentoLoja = 'armadura';
  lojaEquipAberta = false;
  filtroLojaEquip = 'todos';

  get itensFiltradosLoja(): CyberpunkStoreItem[] {
    if (this.filtroLojaEquip === 'todos') return this.cyberpunEquipamentosCatalogo;
    return this.cyberpunEquipamentosCatalogo.filter(i => i.grupoLoja === this.filtroLojaEquip);
  }

  get itemLojaPreview(): CyberpunkStoreItem | null {
    if (!this.itemLojaCyberSelecionado) return null;
    return this.cyberpunEquipamentosCatalogo.find(
      i => `${i.nome}|${i.categoria}|${i.precoEdinhos ?? ''}` === this.itemLojaCyberSelecionado
    ) ?? null;
  }

  readonly cyberpunCityForces = CYBERPUN2080_CITY_FORCES;
  readonly cyberpunModulos = CYBERPUN2080_MODULES;
  carregandoCatalogoCyberpunk = false;
  erroCatalogoCyberpunk = '';

  // Rolagem de dados interativa
  resultadoRolagem: { campo: string; d20: number; mod: number; total: number } | null = null;
  private rolagemTimer: ReturnType<typeof setTimeout> | null = null;

  get detalhesClasseCyberpunkAtual(): string {
    const classe = String(this.jogador?.cyberpun2080?.papel || '').trim();
    if (!classe) {
      return '';
    }

    const fallback: Record<string, string> = {
      'Cromado': 'Especialista em aprimoramento corporal e resistencia.',
      'Medicânico': 'Suporte medico-tatico e manutencao em combate.',
      'Piloto': 'Mobilidade extrema, perseguicoes e controle de rota.',
      'Samurai': 'Execucao cirurgica com foco em precisao e ritmo.',
      'Solo': 'Veterano de guerra urbana e confronto direto.',
      'Trilha-Redes': 'Infiltracao digital, sabotagem e dominio da rede.'
    };

    const catalogDescription = (this.catalogoCyberpunk?.classes || []).find((item) => item.nome === classe)?.descricao;
    return String(catalogDescription || fallback[classe] || '').trim();
  }

  get detalhesAntecedenteCyberpunkAtual(): string {
    const antecedenteNome = String(this.jogador?.cyberpun2080?.antecedente || '').trim();
    if (!antecedenteNome) {
      return '';
    }

    const antecedente = this.cyberpunAntecedentes.find((item) => item.nome === antecedenteNome);
    if (!antecedente) {
      return '';
    }

    const detalhes: string[] = [];
    if (antecedente.descricao) {
      detalhes.push(antecedente.descricao);
    }
    if (antecedente.talentoOrigem) {
      detalhes.push(`Talento de Origem: ${antecedente.talentoOrigem}`);
    }
    return detalhes.join(' | ');
  }

  get detalhesSubclasseCyberpunkAtual(): string {
    const classeNome = String(this.jogador?.cyberpun2080?.papel || '').trim();
    const subclasseNome = String(this.jogador?.cyberpun2080?.subclasse || '').trim();
    if (!classeNome || !subclasseNome) {
      return '';
    }

    const classe = (this.catalogoCyberpunk?.classes || []).find((item) => item.nome === classeNome);
    if (!classe) {
      return '';
    }

    const subclasse = (classe.subclasses || []).find((item: any) => {
      if (typeof item === 'string') {
        return item === subclasseNome;
      }
      return String(item?.nome || '').trim() === subclasseNome;
    }) as any;

    if (!subclasse || typeof subclasse === 'string') {
      return '';
    }

    const partes: string[] = [];
    if (subclasse.descricao) {
      partes.push(String(subclasse.descricao).trim());
    }

    const progressao = Array.isArray(subclasse.progressao) ? subclasse.progressao : [];
    if (progressao.length > 0) {
      const resumo = progressao
        .slice(0, 3)
        .map((item: any) => `Nv ${item.nivel}: ${item.habilidade}`)
        .join(' | ');
      partes.push(resumo);
    }

    return partes.join(' | ');
  }

  get talentosCyberpunkFiltradosPorClasse(): CyberpunkTalentCatalog[] {
    const classe = String(this.jogador?.cyberpun2080?.papel || '').trim();
    if (!classe) {
      return this.cyberpunTalentosCatalogo;
    }

    return this.cyberpunTalentosCatalogo.filter((talento) => {
      return !talento.classes || talento.classes.length === 0 || talento.classes.includes(classe);
    });
  }

  private catalogoCyberpunk?: CyberpunkCatalog;

  get cyberpunSubclassesDisponiveis(): readonly string[] {
    const papel = String(this.jogador?.cyberpun2080?.papel || '').trim();
    return this.cyberpunSubclassesPorPapel[papel] || [];
  }

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

  adicionandoAtaque: boolean = false;
  novoAtaque: any = { nome: '', bonus: '', dano: '', tipoDano: '', notas: '', ca: null, equipado: false, acessorios: [] };
  editandoAtaque: { [key: number]: boolean } = {};
  mostrarDetalheCA = false;
  mostrarInfoAntecedente = false;       // toggle no painel de Traços (view)
  mostrarInfoAntecedentModal = false;   // toggle no painel de edição (modal)
  gerenciarAcessoriosAtaque: number | null = null;
  readonly catalogoAcessorios = ACESSORIOS_ARMAS;
  hacksRapidosCatalogo = HACKS_RAPIDOS;
  verCatalogoHacks = false;

  // Implantes cibernéticos
  readonly catalogoImplantes = IMPLANTES;
  readonly tiposImplante = TIPOS_IMPLANTE;
  readonly gruposImplante = GRUPOS_IMPLANTE;
  verCatalogoImplantes = false;
  filtroTipoImplante: TipoImplante | '' = '';

  get ctMax(): number {
    const papel = this.jogador?.cyberpun2080?.papel || '';
    const classeData = CYBERPUN2080_CLASSES_FULL_DATA.find(c => c.nome === papel);
    const ctBase = classeData?.ctBase ?? 10;
    const bonusNiveis = classeData?.ctBonusNiveis ?? [];
    const nivel = Number(this.jogador?.nivel) || 1;
    const ctLevelBonus = bonusNiveis.filter(n => nivel >= n).length * 3;
    const modCon = calcularModificador(this.jogador?.atributos?.constituicao) ?? 0;
    const modSab = calcularModificador(this.jogador?.atributos?.sabedoria) ?? 0;
    const prof = Number(this.jogador?.proficiencia) || 0;
    return ctBase + ctLevelBonus + modCon + modSab + prof;
  }

  get classeCatalogCompleto(): CyberpunkClassCatalog | null {
    const papel = this.jogador?.cyberpun2080?.papel || '';
    return CYBERPUN2080_CLASSES_FULL_DATA.find(c => c.nome === papel) ?? null;
  }

  get subclasseCatalogCompleto(): CyberpunkSubclassCatalog | null {
    const sub = this.jogador?.cyberpun2080?.subclasse || '';
    return this.classeCatalogCompleto?.subclasses.find(s => s.nome === sub) ?? null;
  }

  get antecedenteCatalogCompleto(): CyberpunkAntecedenteCatalog | null {
    const ant = this.jogador?.cyberpun2080?.antecedente || '';
    return this.cyberpunAntecedentes.find(a => a.nome === ant) ?? null;
  }

  get ctFormulaLabel(): string {
    const classe = this.classeCatalogCompleto;
    if (!classe?.ctBase) return 'CT: 10 + CON + SAB + Prof';
    const bonusNiveis = classe.ctBonusNiveis ?? [];
    const bonusStr = bonusNiveis.length ? ` (+3 nos níveis ${bonusNiveis.join(', ')})` : '';
    return `CT: ${classe.ctBase} + CON + SAB + Prof${bonusStr}`;
  }

  get ctConsumida(): number {
    const lista = this.jogador?.cyberpun2080?.implantesCiberneticos;
    if (!Array.isArray(lista)) return 0;
    return lista.reduce((sum: number, i: any) => sum + (Number(i.ct) || 0), 0);
  }

  get ctExcesso(): number {
    return Math.max(0, this.ctConsumida - this.ctMax);
  }

  get estagioCyberpsicose(): { estagio: number; label: string; cor: string; penalidades: string } {
    const e = this.ctExcesso;
    if (e === 0) return { estagio: 0, label: 'Estável', cor: 'success', penalidades: '' };
    if (e <= 3) return {
      estagio: 1, label: 'Estágio 1 — Instabilidade Inicial', cor: 'warning',
      penalidades: '−1 em testes de SAB, INT e CAR. 1×/descanso longo: Mestre pode impor Desvantagem em um teste social ou mental.'
    };
    if (e <= 6) return {
      estagio: 2, label: 'Estágio 2 — Descontrole Progressivo', cor: 'orange',
      penalidades: '−2 em testes de SAB, INT e CAR. Desvantagem em resistências mentais/emocionais. Ao sofrer Dano Crítico ou Falha Crítica: teste de SAB (CD 14) ou o Mestre assume controle até o fim do próximo turno.'
    };
    return {
      estagio: 3, label: 'Estágio 3 — Cyberpsicose Avançada', cor: 'danger',
      penalidades: '−4 em testes de SAB, INT e CAR. Sem bônus de ajuda em testes sociais. Em situações de estresse: teste de SAB (CD 18) ou o Mestre assume controle até o fim do combate/situação.'
    };
  }

  isImplanteInstalado(id: string): boolean {
    const lista = this.jogador?.cyberpun2080?.implantesCiberneticos;
    if (!Array.isArray(lista)) return false;
    return lista.some((i: any) => i.id === id);
  }

  adicionarImplante(implante: any): void {
    if (!Array.isArray(this.jogador.cyberpun2080.implantesCiberneticos)) {
      this.jogador.cyberpun2080.implantesCiberneticos = [];
    }
    if (this.isImplanteInstalado(implante.id)) return;
    this.jogador.cyberpun2080.implantesCiberneticos.push({
      id: implante.id,
      nome: implante.nome,
      ct: implante.ct,
      tipo: implante.tipo,
      subtipo: implante.subtipo
    });
    this.saveToCache();
  }

  removerImplante(id: string): void {
    if (!Array.isArray(this.jogador?.cyberpun2080?.implantesCiberneticos)) return;
    this.jogador.cyberpun2080.implantesCiberneticos =
      this.jogador.cyberpun2080.implantesCiberneticos.filter((i: any) => i.id !== id);
    this.saveToCache();
  }

  getImplantesInstaladosPorTipo(tipo: string): any[] {
    const lista = this.jogador?.cyberpun2080?.implantesCiberneticos;
    if (!Array.isArray(lista)) return [];
    return lista.filter((i: any) => i.tipo === tipo);
  }

  getDetalhesImplante(id: string): any {
    return this.catalogoImplantes.find(i => i.id === id) || null;
  }

  getImplantesCatalogoPorTipo(tipo: string): any[] {
    const filtro = this.filtroTipoImplante;
    if (filtro && filtro !== tipo) return [];
    return this.catalogoImplantes.filter(i => i.tipo === tipo);
  }

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
    private syncBackendService: SyncBackendService,
    private cyberpunkCatalogService: CyberpunkCatalogService,
    private router: Router
  ) {

  }

  private aplicarFallbackCatalogoCyberpunk(): void {
    this.cyberpunClasses = [...CYBERPUN2080_RULES.classes];
    this.cyberpunSubclassesPorPapel = { ...CYBERPUN2080_SUBCLASSES_BY_CLASS };
    this.cyberpunAntecedentes = [...CYBERPUN2080_ANTECEDENTES];
    this.cyberpunClassesFullData = [...CYBERPUN2080_CLASSES_FULL_DATA];
    this.cyberpunTalentosCatalogo = [];
    this.cyberpunHacksCatalogo = [];
    this.cyberpunEquipamentosCatalogo = [];
  }

  private limparCatalogoCyberpunkCarregado(): void {
    this.cyberpunClasses = [];
    this.cyberpunSubclassesPorPapel = {};
    this.cyberpunAntecedentes = [];
    this.cyberpunClassesFullData = [];
    this.cyberpunTalentosCatalogo = [];
    this.cyberpunHacksCatalogo = [];
    this.cyberpunEquipamentosCatalogo = [];
  }

  private erroIndisponibilidadeCatalogo(error: unknown): boolean {
    if (!(error instanceof HttpErrorResponse)) {
      return false;
    }

    return error.status === 0 || error.status >= 500;
  }

  private validarCatalogoRemoto(catalog: CyberpunkCatalog): void {
    if (!catalog || catalog.system !== RPG_SYSTEMS.CYBERPUN2080) {
      throw new Error('invalid_remote_catalog_system');
    }

    if (!Array.isArray(catalog.classes) || !Array.isArray(catalog.antecedentes) || !Array.isArray(catalog.talentos)) {
      throw new Error('invalid_remote_catalog_shape');
    }

    if (!catalog.loja || typeof catalog.loja !== 'object') {
      throw new Error('invalid_remote_catalog_store');
    }
  }

  private normalizarChaveCatalogo(value: string | undefined | null): string {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  private ehMesmoRegistroCatalogo(
    local: { id?: string; slug?: string; nome?: string },
    backend: { id?: string; slug?: string; nome?: string }
  ): boolean {
    const localId = this.normalizarChaveCatalogo(local.id);
    const backendId = this.normalizarChaveCatalogo(backend.id);
    if (localId && backendId && localId === backendId) {
      return true;
    }

    const localSlug = this.normalizarChaveCatalogo(local.slug);
    const backendSlug = this.normalizarChaveCatalogo(backend.slug);
    if (localSlug && backendSlug && localSlug === backendSlug) {
      return true;
    }

    const localNome = this.normalizarChaveCatalogo(local.nome);
    const backendNome = this.normalizarChaveCatalogo(backend.nome);
    return Boolean(localNome && backendNome && localNome === backendNome);
  }

  private aplicarCatalogoCyberpunk(catalog: CyberpunkCatalog): void {
    this.catalogoCyberpunk = catalog;
    this.cyberpunClasses = (catalog.classes || []).map((item) => String(item.nome || '').trim()).filter(Boolean);

    const subclassesPorClasse: Record<string, readonly string[]> = {};
    for (const classe of catalog.classes || []) {
      const nomeClasse = String(classe.nome || '').trim();
      if (!nomeClasse) {
        continue;
      }

      subclassesPorClasse[nomeClasse] = (classe.subclasses || [])
        .map((subclasse: any) => {
          if (typeof subclasse === 'string') {
            return String(subclasse || '').trim();
          }
          return String(subclasse?.nome || '').trim();
        })
        .filter(Boolean);
    }

    this.cyberpunSubclassesPorPapel = Object.keys(subclassesPorClasse).length > 0
      ? subclassesPorClasse
      : { ...CYBERPUN2080_SUBCLASSES_BY_CLASS };

    this.cyberpunClassesFullData = (catalog.classes || [])
      .map((item) => ({
        ...item,
        nome: String(item.nome || '').trim(),
        descricao: String(item.descricao || '').trim(),
        subclasses: Array.isArray(item.subclasses)
          ? item.subclasses
              .map((subclasse) => ({
                ...subclasse,
                nome: String(subclasse.nome || '').trim(),
                descricao: String(subclasse.descricao || '').trim(),
                progressao: Array.isArray(subclasse.progressao)
                  ? subclasse.progressao
                      .map((progressao) => ({
                        ...progressao,
                        nivel: Number.isFinite(Number(progressao.nivel)) ? Number(progressao.nivel) : 1,
                        habilidade: String(progressao.habilidade || '').trim(),
                        descricao: String(progressao.descricao || '').trim()
                      }))
                      .filter((progressao) => progressao.habilidade)
                  : []
              }))
              .filter((subclasse) => subclasse.nome)
          : []
      }))
      .filter((item) => item.nome);

    this.cyberpunAntecedentes = (catalog.antecedentes || [])
      .map((item) => ({
        ...item,
        nome: String(item.nome || '').trim(),
        descricao: String(item.descricao || '').trim(),
        atributos: Array.isArray(item.atributos)
          ? item.atributos.map((atributo) => String(atributo || '').trim()).filter(Boolean)
          : [],
        talentoOrigem: String(item.talentoOrigem || '').trim(),
        talentoDescricao: String(item.talentoDescricao || '').trim(),
        dinheiroInicial: Number.isFinite(Number(item.dinheiroInicial)) ? Number(item.dinheiroInicial) : 0,
        itensIniciais: Array.isArray(item.itensIniciais)
          ? item.itensIniciais.map((valor) => String(valor || '').trim()).filter(Boolean)
          : []
      }))
      .filter((item) => item.nome);

    this.cyberpunTalentosCatalogo = (catalog.talentos || [])
      .map((item) => ({
        nome: String(item.nome || '').trim(),
        descricao: String(item.descricao || '').trim(),
        classes: Array.isArray(item.classes)
          ? item.classes.map((classe) => String(classe || '').trim()).filter(Boolean)
          : []
      }))
      .filter((item) => item.nome);

    this.cyberpunHacksCatalogo = (catalog.loja?.hacksRapidos || [])
      .map((item) => ({
        ...item,
        nome: String(item.nome || '').trim(),
        descricao: String(item.descricao || '').trim(),
        categoria: String(item.categoria || '').trim(),
        paginaPdf: String(item.paginaPdf || '').trim()
      }))
      .filter((item) => item.nome);

    this.cyberpunEquipamentosCatalogo = [
      ...(catalog.loja?.armas || []).map((i) => ({ ...i, grupoLoja: 'armas' })),
      ...(catalog.loja?.acessoriosMunicoes || []).map((i) => ({ ...i, grupoLoja: 'acessorios' })),
      ...(catalog.loja?.protecaoCorporal || []).map((i) => ({ ...i, grupoLoja: 'protecao' }))
    ]
      .map((item) => ({
        ...item,
        nome: String(item.nome || '').trim(),
        descricao: String(item.descricao || '').trim(),
        categoria: String(item.categoria || '').trim(),
        paginaPdf: String(item.paginaPdf || '').trim()
      }))
      .filter((item) => item.nome);

    this.normalizarSubclasseCyberpunk();
  }

  private carregarCatalogoCyberpunk(): void {
    this.carregandoCatalogoCyberpunk = true;
    this.erroCatalogoCyberpunk = '';

    this.cyberpunkCatalogService.getCatalog().pipe(
      timeout(12000)
    ).subscribe({
      next: (catalog) => {
        try {
          this.validarCatalogoRemoto(catalog);
          this.aplicarCatalogoCyberpunk(catalog);
          this.carregandoCatalogoCyberpunk = false;
        } catch {
          this.limparCatalogoCyberpunkCarregado();
          this.erroCatalogoCyberpunk = 'Catalogo remoto invalido. Verifique a integridade no backend.';
          this.carregandoCatalogoCyberpunk = false;
        }
      },
      error: (error) => {
        if (this.erroIndisponibilidadeCatalogo(error)) {
          this.aplicarFallbackCatalogoCyberpunk();
          this.erroCatalogoCyberpunk = 'Catalogo CyberPunk indisponivel no momento. Usando dados locais.';
        } else {
          this.limparCatalogoCyberpunkCarregado();
          this.erroCatalogoCyberpunk = 'Falha ao carregar catalogo remoto por erro de integridade/validacao.';
        }
        this.carregandoCatalogoCyberpunk = false;
      }
    });
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
    this.jogador = this.garantirEstruturaSistema({
      ...this.jogador,
      sistema: systemId
    });

    if (systemId === RPG_SYSTEMS.CYBERPUN2080) {
      this.spellClassFilter = '';
      this.normalizarSubclasseCyberpunk();
      this.aplicarTracosCyberpunk();
    } else {
      this.loadClassesAndRaces();
    }

    this.saveToCache();
  }

  private normalizarSubclasseCyberpunk(): void {
    const subclasses = this.cyberpunSubclassesDisponiveis;
    const subclasseAtual = String(this.jogador?.cyberpun2080?.subclasse || '').trim();

    if (!subclasseAtual || subclasses.includes(subclasseAtual)) {
      return;
    }

    this.jogador.cyberpun2080.subclasse = '';
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
    const subclasseSelecionada = String(this.jogador?.cyberpun2080?.subclasse || '').trim();
    const antecedenteSelecionado = String(this.jogador?.cyberpun2080?.antecedente || '').trim();

    const classe = (this.catalogoCyberpunk?.classes || []).find((item) => item.nome === papel);
    if (classe) {
      if (classe.descricao) {
        this.jogador.tracos.push({
          nome: '[Cyber] Traco de Classe',
          descricao: classe.descricao,
          origem: 'classe'
        });
      }

      const subclasse = (classe.subclasses || []).find((item: any) => {
        if (typeof item === 'string') {
          return item === subclasseSelecionada;
        }
        return String(item?.nome || '').trim() === subclasseSelecionada;
      }) as any;

      if (subclasse && typeof subclasse !== 'string') {
        if (subclasse.descricao) {
          this.jogador.tracos.push({
            nome: `[Cyber] Subclasse: ${subclasse.nome || subclasseSelecionada}`,
            descricao: String(subclasse.descricao).trim(),
            origem: 'classe'
          });
        }

        const progressao = Array.isArray(subclasse.progressao) ? subclasse.progressao : [];
        for (const etapa of progressao) {
          const habilidade = String(etapa?.habilidade || '').trim();
          const descricao = String(etapa?.descricao || '').trim();
          if (!habilidade) {
            continue;
          }

          this.jogador.tracos.push({
            nome: `[Cyber] Nv ${etapa?.nivel ?? '?'} - ${habilidade}`,
            descricao,
            origem: 'classe'
          });
        }
      }
    }

    const antecedente = this.cyberpunAntecedentes.find((item) => item.nome === antecedenteSelecionado);
    if (antecedente) {
      const partes: string[] = [];
      if (antecedente.descricao) {
        partes.push(antecedente.descricao);
      }
      if (antecedente.talentoOrigem) {
        partes.push(`Talento de Origem: ${antecedente.talentoOrigem}`);
      }

      this.jogador.tracos.push({
        nome: `[Cyber] Traço de Origem: ${antecedente.nome}`,
        descricao: partes.join(' | '),
        origem: 'raca'
      });
    }
  }

  onCyberPapelChange(): void {
    this.normalizarSubclasseCyberpunk();
    this.aplicarTracosCyberpunk();
    this.saveToCache();
  }

  adicionarTalentoCatalogoCyberpunk(talento: CyberpunkTalentCatalog): void {
    if (!talento?.nome) {
      return;
    }

    if (!Array.isArray(this.jogador.talentos)) {
      this.jogador.talentos = [];
    }

    const jaExiste = this.jogador.talentos.some((item: any) => String(item?.nome || '').trim() === talento.nome);
    if (jaExiste) {
      return;
    }

    this.jogador.talentos.push({
      nome: talento.nome,
      descricao: talento.descricao || '',
      origem: '[CyberCatalog]'
    });
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

  async sairDaConta(): Promise<void> {
    await this.forcarSincronizacaoPendente();

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
    this.carregarCatalogoCyberpunk();
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
    this.storageService.setObject(this.chaveFichaAtual, this.jogador);
    void this.sincronizarParaServidor();
  }

  abrirLoja(): void {
    const destino = this.isCyberPun2080 ? '/cyberpunk-loja' : '/mercado';
    void this.router.navigate([destino]);
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

  rolarDado(campo: string, mod: number): void {
    const d20 = Math.floor(Math.random() * 20) + 1;
    this.resultadoRolagem = { campo, d20, mod, total: d20 + mod };
    if (this.rolagemTimer) clearTimeout(this.rolagemTimer);
    this.rolagemTimer = setTimeout(() => { this.resultadoRolagem = null; }, 4000);
  }

  /**
   * Formata modificador com sinal apropriado
   */
  formatarModificador(modificador: number | null): string {
    return formatarModificador(modificador);
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

  /**
   * Detalhamento das fontes de CA para exibição ao clicar no ícone
   */
  get caDetalhes(): Array<{fonte: string, valor: number}> {
    const det: Array<{fonte: string, valor: number}> = [];
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

  adicionarAtaque() {
    this.adicionandoAtaque = true;
  }

  confirmarAdicionarAtaque() {
    if (this.novoAtaque.nome && this.novoAtaque.dano) {
      if (!Array.isArray(this.jogador.ataques)) {
        this.jogador.ataques = [];
      }
      this.jogador.ataques.push({ ...this.novoAtaque });
      this.novoAtaque = { nome: '', bonus: '', dano: '', tipoDano: '', notas: '', ca: null, equipado: false, acessorios: [] };
      this.adicionandoAtaque = false;
      this.saveToCache();
    }
  }

  cancelarAdicionarAtaque() {
    this.novoAtaque = { nome: '', bonus: '', dano: '', tipoDano: '', notas: '', ca: null, equipado: false, acessorios: [] };
    this.adicionandoAtaque = false;
  }

  removerAtaque(index: number) {
    if (Array.isArray(this.jogador.ataques)) {
      this.jogador.ataques.splice(index, 1);
      this.saveToCache();
    }
  }

  toggleEditarAtaque(index: number) {
    this.editandoAtaque[index] = !this.editandoAtaque[index];
    if (!this.editandoAtaque[index]) {
      this.gerenciarAcessoriosAtaque = null;
      this.saveToCache();
    }
  }

  abrirGerenciarAcessorios(index: number) {
    this.gerenciarAcessoriosAtaque = this.gerenciarAcessoriosAtaque === index ? null : index;
  }

  temAcessorioCategoria(ataque: any, categoria: string): boolean {
    return Array.isArray(ataque?.acessorios) &&
      ataque.acessorios.some((a: any) => a.categoria === categoria);
  }

  acessorioJaInstalado(ataque: any, id: string): boolean {
    return Array.isArray(ataque?.acessorios) &&
      ataque.acessorios.some((a: any) => a.id === id);
  }

  adicionarAcessorioArma(ataqueIndex: number, acessorio: AcessorioArma) {
    const ataque = this.jogador.ataques?.[ataqueIndex];
    if (!ataque) return;
    if (!Array.isArray(ataque.acessorios)) ataque.acessorios = [];
    if (this.temAcessorioCategoria(ataque, acessorio.categoria)) return; // regra: 1 por tipo
    ataque.acessorios.push({ id: acessorio.id, nome: acessorio.nome, categoria: acessorio.categoria });
    this.saveToCache();
  }

  removerAcessorioArma(ataqueIndex: number, acessorioId: string) {
    const ataque = this.jogador.ataques?.[ataqueIndex];
    if (!Array.isArray(ataque?.acessorios)) return;
    ataque.acessorios = ataque.acessorios.filter((a: any) => a.id !== acessorioId);
    this.saveToCache();
  }

  categoriaAcessorioLabel(categoria: string): string {
    const labels: Record<string, string> = {
      mira: 'Mira', carregador: 'Carregador', supressor: 'Supressor'
    };
    return labels[categoria] ?? categoria;
  }

  categoriaAcessorioIcon(categoria: string): string {
    const icons: Record<string, string> = {
      mira: 'fas fa-crosshairs', carregador: 'fas fa-battery-full', supressor: 'fas fa-volume-mute'
    };
    return icons[categoria] ?? 'fas fa-cog';
  }

  acessoriosPorCategoria(categoria: string): AcessorioArma[] {
    return this.catalogoAcessorios.filter(a => a.categoria === categoria) as AcessorioArma[];
  }

  togglePericiaProf(pericia: any) {
    pericia.valor = pericia.valor === 'sim' ? 'nao' : 'sim';
    this.saveToCache();
  }

  getPericiasByAtributo(atributo: string): any[] {
    if (!Array.isArray(this.jogador?.pericias)) return [];
    return this.jogador.pericias.filter((p: any) => {
      if (p.atributo) return p.atributo === atributo;
      const skill = SKILLS.find(s => s.nome === p.nome);
      return skill?.atributo === atributo;
    });
  }

  adicionarHackDoCatalogo(hack: any) {
    if (!Array.isArray(this.jogador.ataques)) {
      this.jogador.ataques = [];
    }
    console.log(hack);
    this.jogador.ataques.push({
      nome: hack.nome,
      bonus: `RAM: ${hack.ram}`,
      dano: hack.recarga,
      tipoDano: hack.alvo,
      notas: hack.efeito,
      dica: hack.dica,
      descricao: hack.descricao,


    });
    console.log(this.jogador.ataques);
    this.saveToCache();
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

  adicionarEquipamentoDaLoja(): void {
    if (!this.isCyberPun2080 || !this.itemLojaCyberSelecionado || !this.categoriaEquipamentoLoja) {
      return;
    }

    const item = this.cyberpunEquipamentosCatalogo.find((entry) => {
      const chave = `${entry.nome}|${entry.categoria}|${entry.precoEdinhos ?? ''}`;
      return chave === this.itemLojaCyberSelecionado;
    });

    if (!item) {
      return;
    }

    const descricaoPartes: string[] = [];
    if (item.descricao) {
      descricaoPartes.push(item.descricao);
    }
    if (item.precoEdinhos !== null && Number.isFinite(Number(item.precoEdinhos))) {
      descricaoPartes.push(`Valor: ${item.precoEdinhos} edinhos`);
    }
    if (item.paginaPdf) {
      descricaoPartes.push(`Fonte: ${item.paginaPdf}`);
    }

    this.fichaService.adicionarEquipamento(this.jogador, this.categoriaEquipamentoLoja, {
      nome: item.nome,
      descricao: descricaoPartes.join('\n\n'),
      ca: item.ca ?? undefined
    });

    this.itemLojaCyberSelecionado = '';
    this.saveToCache();
  }

  updatePericiaValor(event: Event, pericia: any) {
    const input = event.target as HTMLInputElement;
    pericia.valor = input.checked ? 'sim' : 'nao';
  }

  getCategoryIcon(categoria: string): string {
    const icons: { [key: string]: string } = {
      'cabeca': 'fa-hat-wizard',
      'arma': 'fa-gun',
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
      'arma': 'Arma',
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
    console.log('Traços de classe:', this.getTracosClasse());
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
