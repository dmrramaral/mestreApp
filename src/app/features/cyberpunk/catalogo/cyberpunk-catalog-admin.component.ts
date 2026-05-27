import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { finalize, timeout } from 'rxjs';
import { CYBERPUN2080_ANTECEDENTES, CYBERPUN2080_CLASSES_FULL_DATA, HACKS_RAPIDOS } from '../../../core/constants/rpg.constants';
import {
    AcessorioArmaCatalog,
    CyberpunkAntecedenteCatalog,
    CyberpunkCatalog,
    CyberpunkClassCatalog,
    CyberpunkClassProgression,
    CyberpunkStoreCatalog,
    CyberpunkStoreItem,
    CyberpunkSubclassCatalog,
    CyberpunkTalentCatalog,
    CyberpunkTalentRow
} from '../../../core/models/cyberpunk-catalog.model';
import { CyberpunkCatalogService, CyberpunkSubclassEntity } from '../../../core/services/cyberpunk-catalog.service';

type StoreCategoryKey = keyof CyberpunkStoreCatalog;
type CatalogPage = 'dashboard' | 'classes' | 'conteudo' | 'loja' | 'acessorios';
type LojaAba = 'todas' | StoreCategoryKey;

interface ClassRow {
  classe: CyberpunkClassCatalog;
  index: number;
}

interface AntecedenteRow {
  antecedente: CyberpunkAntecedenteCatalog;
  index: number;
}

interface StoreItemRow {
  item: CyberpunkStoreItem;
  index: number;
}

type ConteudoTab = 'antecedentes' | 'talentos';

@Component({
  selector: 'app-cyberpunk-catalog-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cyberpunk-catalog-admin.component.html',
  styleUrl: './cyberpunk-catalog-admin.component.scss'
})
export class CyberpunkCatalogAdminComponent implements OnInit {
  catalog: CyberpunkCatalog | null = null;
  loading = false;
  saving = false;
  erro = '';
  sucesso = '';
  paginaAtiva: CatalogPage = 'dashboard';

  classFilter = '';
  classNameFilter = '';
  subclassNameFilter = '';
  antecedenteFilter = '';
  talentoNomeFilter = '';
  lojaNomeFilter = '';
  lojaCategoriaFilter = '';
  lojaAbaAtiva: LojaAba = 'todas';
  lojaItensFiltrados: Partial<Record<StoreCategoryKey, StoreItemRow[]>> = {};
  conteudoTabAtiva: ConteudoTab = 'antecedentes';
  classesDisponiveis: string[] = [];
  classesFiltradas: ClassRow[] = [];
  antecedentesFiltrados: AntecedenteRow[] = [];
  talentosFiltrados: CyberpunkTalentRow[] = [];
  mostrarClasses = true;
  mostrarAntecedentes = false;
  mostrarTalentos = false;
  mostrarLoja = false;
  confirmandoPopular = false;

  // ─── Acessórios para Armas ───
  acessoriosArmas: AcessorioArmaCatalog[] = [];
  acessoriosFiltrados: AcessorioArmaCatalog[] = [];
  acessorioNomeFilter = '';
  salvandoAcessorios = false;
  novoAcessorio: Partial<AcessorioArmaCatalog> = {};
  mostrarFormNovoAcessorio = false;

  readonly categoriasLoja: Array<{ key: StoreCategoryKey; label: string }> = [
    { key: 'armas', label: 'Armas' },
    { key: 'acessoriosMunicoes', label: 'Acessorios e Municoes' },
    { key: 'protecaoCorporal', label: 'Protecao Corporal' },
    { key: 'classeTecnologica', label: 'Classe Tecnologica (CT)' },
    { key: 'hacksRapidos', label: 'Hacks Rapidos' }
  ];

  constructor(
    private catalogService: CyberpunkCatalogService,
    private route: ActivatedRoute
  ) {}

  private slugify(value: string): string {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .trim();
  }

  private garantirIdentificadoresCatalogo(): void {
    if (!this.catalog) {
      return;
    }

    const now = new Date().toISOString();
    this.catalog.classes.forEach((classe, classIndex) => {
      const classeSlug = this.slugify(classe.slug || classe.nome || `classe-${classIndex + 1}`);
      classe.slug = classeSlug || `classe-${classIndex + 1}`;
      classe.id = classe.id || `class:${classe.slug}`;
      classe.source = classe.source || 'manual';
      classe.sourceRef = classe.sourceRef || classe.nome;
      classe.updatedAt = now;

      classe.subclasses.forEach((subclasse, subIndex) => {
        const subSlug = this.slugify(subclasse.slug || subclasse.nome || `subclasse-${subIndex + 1}`);
        subclasse.slug = subSlug || `subclasse-${subIndex + 1}`;
        subclasse.id = subclasse.id || `subclass:${classe.slug}:${subclasse.slug}`;
        subclasse.source = subclasse.source || 'manual';
        subclasse.sourceRef = subclasse.sourceRef || subclasse.nome;
        subclasse.updatedAt = now;

        subclasse.progressao.forEach((nivel) => {
          nivel.id = nivel.id || `progress:${subclasse.id}:nv${nivel.nivel}`;
          nivel.source = nivel.source || 'manual';
          nivel.sourceRef = nivel.sourceRef || nivel.habilidade;
          nivel.updatedAt = now;
        });
      });

      (classe.progressao || []).forEach((nivel) => {
        nivel.id = nivel.id || `progress:${classe.id}:nv${nivel.nivel}`;
        nivel.source = nivel.source || 'manual';
        nivel.sourceRef = nivel.sourceRef || nivel.habilidade;
        nivel.updatedAt = now;
      });
    });

    this.catalog.antecedentes.forEach((antecedente, index) => {
      const slug = this.slugify(antecedente.slug || antecedente.nome || `antecedente-${index + 1}`);
      antecedente.slug = slug || `antecedente-${index + 1}`;
      antecedente.id = antecedente.id || `antecedente:${antecedente.slug}`;
      antecedente.source = antecedente.source || 'manual';
      antecedente.sourceRef = antecedente.sourceRef || antecedente.nome;
      antecedente.updatedAt = now;
    });

    this.catalog.talentos.forEach((talento, index) => {
      const slug = this.slugify(talento.slug || talento.nome || `talento-${index + 1}`);
      talento.slug = slug || `talento-${index + 1}`;
      talento.id = talento.id || `talento:${talento.slug}`;
      talento.source = talento.source || 'manual';
      talento.sourceRef = talento.sourceRef || talento.nome;
      talento.updatedAt = now;
    });

    this.categoriasLoja.forEach((categoria) => {
      this.listarItensLoja(categoria.key).forEach((item, index) => {
        const slug = this.slugify(item.slug || item.nome || `item-${index + 1}`);
        item.slug = slug || `item-${index + 1}`;
        item.id = item.id || `item:${categoria.key}:${item.slug}`;
        item.source = item.source || 'manual';
        item.sourceRef = item.sourceRef || item.nome;
        item.updatedAt = now;
      });
    });

    this.catalog.updatedAt = now;
    this.catalog.seedVersion = this.catalog.seedVersion || 'front-seed-v1';
  }

  private criarItemLojaVazio(categoria: string): CyberpunkStoreItem {
    return {
      nome: '',
      descricao: '',
      precoEdinhos: null,
      categoria,
      paginaPdf: '',
      ca: null,
      cf: null,
      ct: null,
      restrito: false
    };
  }

  private criarLojaVazia(): CyberpunkStoreCatalog {
    return {
      armas: [],
      acessoriosMunicoes: [],
      protecaoCorporal: [],
      classeTecnologica: [],
      hacksRapidos: []
    };
  }

  private garantirLojaNoCatalogo(): void {
    if (!this.catalog) {
      return;
    }

    const loja = this.catalog.loja || this.criarLojaVazia();
    this.catalog.loja = {
      armas: Array.isArray(loja.armas) ? loja.armas : [],
      acessoriosMunicoes: Array.isArray(loja.acessoriosMunicoes) ? loja.acessoriosMunicoes : [],
      protecaoCorporal: Array.isArray(loja.protecaoCorporal) ? loja.protecaoCorporal : [],
      classeTecnologica: Array.isArray(loja.classeTecnologica) ? loja.classeTecnologica : [],
      hacksRapidos: Array.isArray(loja.hacksRapidos) ? loja.hacksRapidos : []
    };
  }

  ngOnInit(): void {
    const pagina = this.route.snapshot.data['pagina'] as CatalogPage | undefined;
    this.paginaAtiva = pagina || 'dashboard';

    this.route.data.subscribe((data) => {
      const p = data['pagina'] as CatalogPage | undefined;
      if (p) {
        this.paginaAtiva = p;
        if (p === 'acessorios') {
          this.carregarAcessoriosArmas();
        }
      }
    });

    if (this.paginaAtiva === 'acessorios') {
      this.carregarAcessoriosArmas();
    } else {
      this.carregar();
    }
  }

  get resumoCatalogo(): {
    classes: number;
    subclasses: number;
    progressaoClasses: number;
    progressaoSubclasses: number;
    antecedentes: number;
    talentos: number;
    talentosComClasse: number;
    itensLoja: number;
    hacks: number;
    armas: number;
    ataquesCatalogados: number;
  } {
    if (!this.catalog) {
      return {
        classes: 0,
        subclasses: 0,
        progressaoClasses: 0,
        progressaoSubclasses: 0,
        antecedentes: 0,
        talentos: 0,
        talentosComClasse: 0,
        itensLoja: 0,
        hacks: 0,
        armas: 0,
        ataquesCatalogados: 0
      };
    }

    const subclasses = this.catalog.classes.reduce((acc, classe) => acc + classe.subclasses.length, 0);
    const progressaoClasses = this.catalog.classes.reduce((acc, classe) => acc + (classe.progressao?.length || 0), 0);
    const progressaoSubclasses = this.catalog.classes.reduce(
      (acc, classe) => acc + classe.subclasses.reduce((subAcc, sub) => subAcc + sub.progressao.length, 0),
      0
    );
    const talentosComClasse = this.catalog.talentos.filter((item) => item.classes.length > 0).length;
    const itensLoja = this.categoriasLoja.reduce((acc, categoria) => acc + this.listarItensLoja(categoria.key).length, 0);
    const hacks = this.catalog.loja?.hacksRapidos?.length || 0;
    const armas = this.catalog.loja?.armas?.length || 0;

    const termosAtaque = /(ataque|tiro|atirar|golpe|disparo|execucao)/i;
    const ataquesClasses = this.catalog.classes.reduce(
      (acc, classe) => acc + (classe.progressao || []).filter((item) => termosAtaque.test(item.habilidade) || termosAtaque.test(item.descricao)).length,
      0
    );
    const ataquesSubclasses = this.catalog.classes.reduce(
      (acc, classe) => acc + classe.subclasses.reduce(
        (subAcc, sub) => subAcc + sub.progressao.filter((item) => termosAtaque.test(item.habilidade) || termosAtaque.test(item.descricao)).length,
        0
      ),
      0
    );
    const ataquesTalentos = this.catalog.talentos.filter((item) => termosAtaque.test(item.nome) || termosAtaque.test(item.descricao)).length;

    return {
      classes: this.catalog.classes.length,
      subclasses,
      progressaoClasses,
      progressaoSubclasses,
      antecedentes: this.catalog.antecedentes.length,
      talentos: this.catalog.talentos.length,
      talentosComClasse,
      itensLoja,
      hacks,
      armas,
      ataquesCatalogados: ataquesClasses + ataquesSubclasses + ataquesTalentos
    };
  }

  private atualizarListasDerivadas(): void {
    if (!this.catalog) {
      this.classesDisponiveis = [];
      this.classesFiltradas = [];
      this.antecedentesFiltrados = [];
      this.talentosFiltrados = [];
      this.lojaItensFiltrados = {};
      return;
    }

    this.classesDisponiveis = this.catalog.classes.map((item) => item.nome);
    this.atualizarClassesFiltradas();
    this.atualizarAntecedentesFiltrados();

    const filter = this.classFilter.trim();
    const nomeTalento = this.talentoNomeFilter.trim().toLowerCase();

    this.talentosFiltrados = this.catalog.talentos
      .map((talento, index) => ({ talento, index }))
      .filter((item) => {
        const atendeClasse = !filter || item.talento.classes.includes(filter);
        const atendeNome = !nomeTalento
          || item.talento.nome.toLowerCase().includes(nomeTalento)
          || item.talento.descricao.toLowerCase().includes(nomeTalento);

        return atendeClasse && atendeNome;
      });

    this.atualizarLojaFiltrados();
  }

  atualizarLojaFiltrados(): void {
    if (!this.catalog?.loja) {
      this.lojaItensFiltrados = {};
      return;
    }
    const termoNome = this.lojaNomeFilter.trim().toLowerCase();
    const termoCategoria = this.lojaCategoriaFilter.trim().toLowerCase();
    const novo: Partial<Record<StoreCategoryKey, StoreItemRow[]>> = {};
    for (const cat of this.categoriasLoja) {
      const key = cat.key;
      if (this.lojaAbaAtiva !== 'todas' && this.lojaAbaAtiva !== key) {
        novo[key] = [];
        continue;
      }
      novo[key] = (this.catalog.loja[key] || [])
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => {
          const nome = String(item?.nome || '').toLowerCase();
          const descricao = String(item?.descricao || '').toLowerCase();
          const categoria = String(item?.categoria || '').toLowerCase();
          return (!termoNome || nome.includes(termoNome) || descricao.includes(termoNome))
            && (!termoCategoria || categoria.includes(termoCategoria));
        });
    }
    this.lojaItensFiltrados = novo;
  }

  private atualizarClassesFiltradas(): void {
    if (!this.catalog) {
      this.classesFiltradas = [];
      return;
    }

    const nome = this.classNameFilter.trim().toLowerCase();
    const subclasse = this.subclassNameFilter.trim().toLowerCase();

    this.classesFiltradas = this.catalog.classes
      .map((classe, index) => ({ classe, index }))
      .filter((row) => {
        const atendeClasse = !nome
          || row.classe.nome.toLowerCase().includes(nome)
          || row.classe.descricao.toLowerCase().includes(nome);
        const atendeSubclasse = !subclasse
          || row.classe.subclasses.some((item) => item.nome.toLowerCase().includes(subclasse));
        return atendeClasse && atendeSubclasse;
      });
  }

  private atualizarAntecedentesFiltrados(): void {
    if (!this.catalog) {
      this.antecedentesFiltrados = [];
      return;
    }

    const termo = this.antecedenteFilter.trim().toLowerCase();
    this.antecedentesFiltrados = this.catalog.antecedentes
      .map((antecedente, index) => ({ antecedente, index }))
      .filter((row) => {
        if (!termo) {
          return true;
        }

        return row.antecedente.nome.toLowerCase().includes(termo)
          || row.antecedente.descricao.toLowerCase().includes(termo)
          || row.antecedente.talentoOrigem.toLowerCase().includes(termo);
      });
  }

  onClassNameFilterChange(): void {
    this.atualizarClassesFiltradas();
  }

  onSubclassNameFilterChange(): void {
    this.atualizarClassesFiltradas();
  }

  onAntecedenteFilterChange(): void {
    this.atualizarAntecedentesFiltrados();
  }

  onClassFilterChange(): void {
    this.atualizarListasDerivadas();
  }

  onTalentoNomeFilterChange(): void {
    this.atualizarListasDerivadas();
  }

  trackByTalentIndex(_index: number, item: CyberpunkTalentRow): number {
    return item.index;
  }

  trackByClassIndex(_index: number, item: ClassRow): number {
    return item.index;
  }

  trackByAntecedenteIndex(_index: number, item: AntecedenteRow): number {
    return item.index;
  }

  toggleSecao(secao: 'classes' | 'antecedentes' | 'talentos'): void {
    if (secao === 'classes') {
      this.mostrarClasses = !this.mostrarClasses;
      return;
    }

    if (secao === 'antecedentes') {
      this.mostrarAntecedentes = !this.mostrarAntecedentes;
      return;
    }

    this.mostrarTalentos = !this.mostrarTalentos;
  }

  private montarClassesComSubclasses(classes: CyberpunkClassCatalog[], subclasses: CyberpunkSubclassEntity[]): CyberpunkClassCatalog[] {
    const classesMap = new Map<string, CyberpunkClassCatalog>();

    const baseClasses = classes.map((classe) => {
      const classId = String(classe?.id || '').trim();
      const novaClasse: CyberpunkClassCatalog = {
        ...classe,
        subclasses: []
      };

      if (classId) {
        classesMap.set(classId, novaClasse);
      }

      return novaClasse;
    });

    subclasses.forEach((sub) => {
      const classId = String(sub?.classId || '').trim();
      const target = classesMap.get(classId);
      if (!target) {
        return;
      }

      target.subclasses.push({
        id: sub.id,
        slug: sub.slug,
        source: sub.source,
        sourceRef: sub.sourceRef,
        updatedAt: sub.updatedAt,
        nome: String(sub?.nome || '').trim(),
        descricao: String(sub?.descricao || '').trim(),
        progressao: Array.isArray(sub?.progressao) ? sub.progressao : []
      });
    });

    return baseClasses;
  }

  private montarCatalogoDeEntidades(payload: {
    classes: { system: string; version: number; seedVersion?: string; items: CyberpunkClassCatalog[] };
    subclasses: { items: CyberpunkSubclassEntity[] };
    antecedentes: { items: CyberpunkAntecedenteCatalog[] };
    talentos: { items: CyberpunkTalentCatalog[] };
    loja: { loja: Omit<CyberpunkStoreCatalog, 'hacksRapidos'> };
    hacks: { items: CyberpunkStoreItem[] };
  }): CyberpunkCatalog {
    return {
      system: 'cyberpun2080',
      version: Number(payload.classes?.version || 1),
      seedVersion: payload.classes?.seedVersion || 'backend-seed-v1',
      classes: this.montarClassesComSubclasses(payload.classes?.items || [], payload.subclasses?.items || []),
      antecedentes: payload.antecedentes?.items || [],
      talentos: payload.talentos?.items || [],
      loja: {
        armas: payload.loja?.loja?.armas || [],
        acessoriosMunicoes: payload.loja?.loja?.acessoriosMunicoes || [],
        protecaoCorporal: payload.loja?.loja?.protecaoCorporal || [],
        classeTecnologica: payload.loja?.loja?.classeTecnologica || [],
        hacksRapidos: payload.hacks?.items || []
      },
      updatedAt: new Date().toISOString()
    };
  }

  private isCatalogPayload(value: unknown): value is CyberpunkCatalog {
    if (!value || typeof value !== 'object') {
      return false;
    }

    const payload = value as Partial<CyberpunkCatalog>;
    return Array.isArray(payload.classes)
      && Array.isArray(payload.antecedentes)
      && Array.isArray(payload.talentos)
      && !!payload.loja
      && typeof payload.loja === 'object';
  }

  carregar(): void {
    this.loading = true;
    this.erro = '';
    this.sucesso = '';

    this.catalogService.getCatalog().pipe(
      timeout(8000),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (catalog) => {
        this.catalog = catalog;
        this.garantirLojaNoCatalogo();
        this.garantirIdentificadoresCatalogo();
        this.atualizarListasDerivadas();
      },
      error: () => {
        this.catalog = null;
        this.erro = 'Nao foi possivel carregar o catalogo CyberPunk. Verifique a conexao/backend e tente novamente.';
      }
    });
  }

  salvar(): void {
    if (!this.catalog) return;

    this.garantirIdentificadoresCatalogo();

    this.saving = true;
    this.erro = '';
    this.sucesso = '';

    const payload: CyberpunkCatalog = {
      ...this.catalog,
      classes: this.catalog.classes.map((item) => ({
        ...item,
        subclasses: item.subclasses
          .map((subclasse) => ({
            ...subclasse,
            nome: subclasse.nome.trim(),
            descricao: subclasse.descricao.trim(),
            progressao: subclasse.progressao
              .map((levelItem) => ({
                ...levelItem,
                habilidade: levelItem.habilidade.trim(),
                descricao: levelItem.descricao.trim()
              }))
              .filter((levelItem) => levelItem.habilidade.length > 0)
          }))
          .filter((subclasse) => subclasse.nome.length > 0)
      })),
      antecedentes: this.catalog.antecedentes.filter((item) => item.nome.trim().length > 0),
      talentos: this.catalog.talentos.filter((item) => item.nome.trim().length > 0)
        .map((item) => ({
          ...item,
          descricao: item.descricao.trim()
        })),
      loja: {
        armas: this.normalizarListaLoja(this.catalog.loja?.armas, 'Armas'),
        acessoriosMunicoes: this.normalizarListaLoja(this.catalog.loja?.acessoriosMunicoes, 'Acessorios e Municoes'),
        protecaoCorporal: this.normalizarListaLoja(this.catalog.loja?.protecaoCorporal, 'Protecao Corporal'),
        classeTecnologica: this.normalizarListaLoja(this.catalog.loja?.classeTecnologica, 'Classe Tecnologica (CT)'),
        hacksRapidos: this.normalizarListaLoja(this.catalog.loja?.hacksRapidos, 'Hacks Rapidos')
      },
      updatedAt: new Date().toISOString(),
      seedVersion: this.catalog.seedVersion || 'front-seed-v1'
    };

    this.catalogService.updateCatalog(payload).pipe(
      timeout(12000),
      finalize(() => {
        this.saving = false;
      })
    ).subscribe({
      next: (savedCatalog) => {
        this.catalog = savedCatalog;
        this.garantirLojaNoCatalogo();
        this.garantirIdentificadoresCatalogo();
        this.atualizarListasDerivadas();
        this.sucesso = 'Catalogo salvo com sucesso.';
      },
      error: () => {
        this.erro = 'Falha ao salvar catalogo no backend. Tente novamente em instantes.';
      }
    });
  }

  adicionarClasse(): void {
    if (!this.catalog) return;
    const novaClasse: CyberpunkClassCatalog = {
      id: `class:new-${Date.now()}`,
      slug: '',
      source: 'manual',
      nome: '',
      descricao: '',
      flavorText: [],
      hpNivel1: '',
      hpPorNivel: '',
      ctBase: 0,
      ctBonusNiveis: [],
      ramBase: null,
      proficiencias: {
        resistencias: [],
        armas: [],
        armaduras: [],
        ferramentas: [],
        pericias: { escolher: 4, opcoes: [] }
      },
      progressao: [],
      subclasses: []
    };
    this.catalog.classes.push(novaClasse);
    this.atualizarListasDerivadas();
  }

  removerClasse(index: number): void {
    if (!this.catalog) return;
    const classeRemovida = this.catalog.classes[index]?.nome;
    this.catalog.classes.splice(index, 1);

    if (classeRemovida) {
      this.catalog.talentos.forEach((talento) => {
        talento.classes = talento.classes.filter((className) => className !== classeRemovida);
      });
    }

    this.atualizarListasDerivadas();
  }

  adicionarSubclasse(classIndex: number): void {
    if (!this.catalog) return;
    const novaSubclasse: CyberpunkSubclassCatalog = {
      id: `subclass:new-${Date.now()}`,
      slug: '',
      source: 'manual',
      nome: '',
      descricao: '',
      progressao: []
    };
    this.catalog.classes[classIndex].subclasses.push(novaSubclasse);
  }

  removerSubclasse(classIndex: number, subIndex: number): void {
    if (!this.catalog) return;
    this.catalog.classes[classIndex].subclasses.splice(subIndex, 1);
  }

  adicionarFlavorText(classIndex: number): void {
    if (!this.catalog) return;
    if (!Array.isArray(this.catalog.classes[classIndex].flavorText)) {
      this.catalog.classes[classIndex].flavorText = [];
    }
    this.catalog.classes[classIndex].flavorText!.push('');
  }

  removerFlavorText(classIndex: number, textIndex: number): void {
    if (!this.catalog) return;
    this.catalog.classes[classIndex].flavorText!.splice(textIndex, 1);
  }

  garantirProficienciasClasse(classIndex: number): void {
    if (!this.catalog) return;
    const classe = this.catalog.classes[classIndex];
    if (!classe.proficiencias) {
      classe.proficiencias = {
        resistencias: [],
        armas: [],
        armaduras: [],
        ferramentas: [],
        pericias: { escolher: 4, opcoes: [] }
      };
    }
    if (!classe.proficiencias.pericias) {
      classe.proficiencias.pericias = { escolher: 4, opcoes: [] };
    }
  }

  setProficienciaField(classIndex: number, field: 'resistencias' | 'armaduras' | 'armas' | 'ferramentas', value: string): void {
    if (!this.catalog) return;
    const prof = this.catalog.classes[classIndex].proficiencias;
    if (prof) {
      prof[field] = value.split(',').map(s => s.trim()).filter(Boolean);
    }
  }

  setPericiaOpcoes(classIndex: number, value: string): void {
    if (!this.catalog) return;
    const prof = this.catalog.classes[classIndex].proficiencias;
    if (prof?.pericias) {
      prof.pericias.opcoes = value.split(',').map(s => s.trim()).filter(Boolean);
    }
  }

  adicionarNivelClasse(classIndex: number): void {
    if (!this.catalog) return;
    if (!Array.isArray(this.catalog.classes[classIndex].progressao)) {
      this.catalog.classes[classIndex].progressao = [];
    }
    const novoNivel: CyberpunkClassProgression = { nivel: 1, habilidade: '', descricao: '' };
    this.catalog.classes[classIndex].progressao!.push(novoNivel);
  }

  removerNivelClasse(classIndex: number, levelIndex: number): void {
    if (!this.catalog) return;
    this.catalog.classes[classIndex].progressao!.splice(levelIndex, 1);
  }

  adicionarNivelSubclasse(classIndex: number, subIndex: number): void {
    if (!this.catalog) return;

    this.catalog.classes[classIndex].subclasses[subIndex].progressao.push({
      nivel: 1,
      habilidade: '',
      descricao: ''
    });
  }

  removerNivelSubclasse(classIndex: number, subIndex: number, levelIndex: number): void {
    if (!this.catalog) return;
    this.catalog.classes[classIndex].subclasses[subIndex].progressao.splice(levelIndex, 1);
  }

  adicionarAntecedente(): void {
    if (!this.catalog) return;
    const novoAntecedente: CyberpunkAntecedenteCatalog = {
      id: `antecedente:new-${Date.now()}`,
      slug: '',
      source: 'manual',
      nome: '',
      emoji: '',
      descricao: '',
      atributos: [],
      talentoOrigem: '',
      talentoDescricao: '',
      dinheiroInicial: 0,
      itensIniciais: []
    };
    this.catalog.antecedentes.push(novoAntecedente);
  }

  adicionarAtributoAntecedente(antIndex: number): void {
    if (!this.catalog) return;
    if (!Array.isArray(this.catalog.antecedentes[antIndex].atributos)) {
      this.catalog.antecedentes[antIndex].atributos = [];
    }
    this.catalog.antecedentes[antIndex].atributos.push('');
  }

  removerAtributoAntecedente(antIndex: number, atrIndex: number): void {
    if (!this.catalog) return;
    this.catalog.antecedentes[antIndex].atributos.splice(atrIndex, 1);
  }

  adicionarItemInicialAntecedente(antIndex: number): void {
    if (!this.catalog) return;
    if (!Array.isArray(this.catalog.antecedentes[antIndex].itensIniciais)) {
      this.catalog.antecedentes[antIndex].itensIniciais = [];
    }
    this.catalog.antecedentes[antIndex].itensIniciais.push('');
  }

  removerItemInicialAntecedente(antIndex: number, itemIndex: number): void {
    if (!this.catalog) return;
    this.catalog.antecedentes[antIndex].itensIniciais.splice(itemIndex, 1);
  }

  removerAntecedente(index: number): void {
    if (!this.catalog) return;
    this.catalog.antecedentes.splice(index, 1);
  }

  adicionarTalento(): void {
    if (!this.catalog) return;
    this.catalog.talentos.push({
      id: `talento:new-${Date.now()}`,
      slug: '',
      source: 'manual',
      nome: '',
      descricao: '',
      classes: []
    });
    this.atualizarListasDerivadas();
  }

  removerTalento(index: number): void {
    if (!this.catalog) return;
    this.catalog.talentos.splice(index, 1);
    this.atualizarListasDerivadas();
  }

  isClasseMarcada(talentoIndex: number, className: string): boolean {
    if (!this.catalog) return false;
    return this.catalog.talentos[talentoIndex].classes.includes(className);
  }

  toggleClasseNoTalento(talentoIndex: number, className: string, checked: boolean): void {
    if (!this.catalog) return;

    const classes = this.catalog.talentos[talentoIndex].classes;
    const idx = classes.indexOf(className);

    if (checked && idx < 0) {
      classes.push(className);
      this.atualizarListasDerivadas();
      return;
    }

    if (!checked && idx >= 0) {
      classes.splice(idx, 1);
      this.atualizarListasDerivadas();
    }
  }

  private normalizarListaLoja(items: CyberpunkStoreItem[] | undefined, categoriaPadrao: string): CyberpunkStoreItem[] {
    return (Array.isArray(items) ? items : [])
      .map((item) => ({
        id: String(item?.id || '').trim() || undefined,
        slug: String(item?.slug || '').trim() || undefined,
        source: item?.source,
        sourceRef: String(item?.sourceRef || '').trim() || undefined,
        updatedAt: String(item?.updatedAt || '').trim() || undefined,
        nome: String(item?.nome || '').trim(),
        descricao: String(item?.descricao || '').trim(),
        precoEdinhos: Number.isFinite(Number(item?.precoEdinhos)) ? Number(item?.precoEdinhos) : null,
        categoria: String(item?.categoria || categoriaPadrao).trim() || categoriaPadrao,
        paginaPdf: String(item?.paginaPdf || '').trim(),
        ca: Number.isFinite(Number(item?.ca)) ? Number(item?.ca) : null,
        cf: Number.isFinite(Number(item?.cf)) ? Number(item?.cf) : null,
        ct: Number.isFinite(Number(item?.ct)) ? Number(item?.ct) : null,
        restrito: Boolean(item?.restrito)
      }))
      .filter((item) => item.nome.length > 0);
  }

  listarItensLoja(key: StoreCategoryKey): CyberpunkStoreItem[] {
    if (!this.catalog?.loja) {
      return [];
    }
    return this.catalog.loja[key] || [];
  }

  listarItensLojaFiltrados(key: StoreCategoryKey): StoreItemRow[] {
    if (this.lojaAbaAtiva !== 'todas' && this.lojaAbaAtiva !== key) {
      return [];
    }

    const termoNome = this.lojaNomeFilter.trim().toLowerCase();
    const termoCategoria = this.lojaCategoriaFilter.trim().toLowerCase();

    return this.listarItensLoja(key)
      .map((item, index) => ({ item, index }))
      .filter((row) => {
        const nome = String(row.item?.nome || '').toLowerCase();
        const descricao = String(row.item?.descricao || '').toLowerCase();
        const categoria = String(row.item?.categoria || '').toLowerCase();

        const atendeNome = !termoNome
          || nome.includes(termoNome)
          || descricao.includes(termoNome);
        const atendeCategoria = !termoCategoria
          || categoria.includes(termoCategoria);

        return atendeNome && atendeCategoria;
      });
  }

  mostrarSomenteHacks(): void {
    this.lojaAbaAtiva = 'hacksRapidos';
    this.atualizarLojaFiltrados();
  }

  mostrarTodasCategoriasLoja(): void {
    this.lojaAbaAtiva = 'todas';
    this.atualizarLojaFiltrados();
  }

  sincronizarHacksPdfNoBanco(): void {
    if (!this.catalog || this.loading || this.saving) {
      return;
    }

    this.garantirLojaNoCatalogo();

    const now = new Date().toISOString();
    this.catalog.loja.hacksRapidos = HACKS_RAPIDOS.map((hack) => ({
      id: `item:hacksRapidos:hack-${hack.id}`,
      slug: this.slugify(hack.nome),
      source: 'constants',
      sourceRef: `HACKS_RAPIDOS#${hack.id}`,
      updatedAt: now,
      nome: hack.nome,
      descricao: [
        `Descricao: ${hack.descricao}`,
        `Efeito: ${hack.efeito}`,
        `RAM: ${hack.ram}`,
        `Recarga: ${hack.recarga}`,
        `Alvo: ${hack.alvo}`,
        `Dica: ${hack.dica}`
      ].join('\n'),
      precoEdinhos: Number(hack.valor),
      categoria: 'Hacks Rapidos',
      paginaPdf: 'Secao de Hacks Rapidos',
      ca: null,
      cf: null,
      ct: null,
      restrito: false
    }));

    this.lojaAbaAtiva = 'hacksRapidos';
    this.sucesso = `Hacks do PDF carregados (${this.catalog.loja.hacksRapidos.length}). Salvando no banco...`;
    this.salvar();
  }

  adicionarItemLoja(key: StoreCategoryKey): void {
    if (!this.catalog?.loja) {
      return;
    }

    const categoria = this.categoriasLoja.find((item) => item.key === key)?.label || 'Loja Cyber';
    this.catalog.loja[key].push({
      ...this.criarItemLojaVazio(categoria),
      id: `item:${key}:new-${Date.now()}`,
      slug: '',
      source: 'manual'
    });
    this.atualizarLojaFiltrados();
  }

  removerItemLoja(key: StoreCategoryKey, index: number): void {
    if (!this.catalog?.loja) {
      return;
    }

    this.catalog.loja[key].splice(index, 1);
    this.atualizarLojaFiltrados();
  }

  popularComDadosLocais(): void {
    this.confirmandoPopular = false;
    this.erro = '';
    this.catalog = {
      system: 'cyberpun2080',
      version: 1,
      seedVersion: 'front-seed-v1',
      classes: CYBERPUN2080_CLASSES_FULL_DATA.map((c) => ({ ...c, subclasses: c.subclasses.map((s) => ({ ...s })) })),
      antecedentes: CYBERPUN2080_ANTECEDENTES.map((a) => ({ ...a })),
      talentos: [],
      loja: this.criarLojaVazia(),
      updatedAt: new Date().toISOString()
    };
    this.garantirLojaNoCatalogo();
    this.garantirIdentificadoresCatalogo();
    this.atualizarListasDerivadas();
    this.sucesso = 'Dados locais carregados. Salvando no banco...';
    this.salvar();
  }

  // ─────────────────────────────────────────
  //  Acessórios para Armas
  // ─────────────────────────────────────────

  carregarAcessoriosArmas(): void {
    this.loading = true;
    this.erro = '';
    this.sucesso = '';

    this.catalogService.getAcessoriosArmasEntity().pipe(
      timeout(8000),
      finalize(() => { this.loading = false; })
    ).subscribe({
      next: (resp) => {
        this.acessoriosArmas = resp.items || [];
        this.atualizarFiltroAcessorios();
      },
      error: () => {
        this.erro = 'Não foi possível carregar os acessórios. Verifique a conexão/backend.';
      }
    });
  }

  salvarAcessoriosArmas(): void {
    this.salvandoAcessorios = true;
    this.erro = '';
    this.sucesso = '';

    this.catalogService.updateAcessoriosArmasEntity(this.acessoriosArmas).pipe(
      timeout(12000),
      finalize(() => { this.salvandoAcessorios = false; })
    ).subscribe({
      next: (resp) => {
        this.acessoriosArmas = resp.items || [];
        this.atualizarFiltroAcessorios();
        this.sucesso = 'Acessórios salvos com sucesso.';
      },
      error: () => {
        this.erro = 'Falha ao salvar acessórios. Tente novamente.';
      }
    });
  }

  atualizarFiltroAcessorios(): void {
    const termo = this.acessorioNomeFilter.trim().toLowerCase();
    this.acessoriosFiltrados = termo
      ? this.acessoriosArmas.filter((a) =>
          a.nome.toLowerCase().includes(termo) ||
          a.categoria.toLowerCase().includes(termo) ||
          a.descricao.toLowerCase().includes(termo))
      : [...this.acessoriosArmas];
  }

  adicionarNovoAcessorio(): void {
    const novo: AcessorioArmaCatalog = {
      id: `acessorio-arma:novo-${Date.now()}`,
      slug: '',
      source: 'manual',
      nome: String(this.novoAcessorio.nome || '').trim(),
      categoria: this.novoAcessorio.categoria || 'mira',
      descricao: String(this.novoAcessorio.descricao || '').trim(),
      efeito: String(this.novoAcessorio.efeito || '').trim(),
      valor: Number.isFinite(Number(this.novoAcessorio.valor)) ? Number(this.novoAcessorio.valor) : 0,
      paginaPdf: 'Acessórios para Armas Tecnológicas (PDF)'
    };
    if (!novo.nome) { return; }
    this.acessoriosArmas.push(novo);
    this.novoAcessorio = {};
    this.mostrarFormNovoAcessorio = false;
    this.atualizarFiltroAcessorios();
  }

  removerAcessorioAdmin(index: number): void {
    this.acessoriosArmas.splice(index, 1);
    this.atualizarFiltroAcessorios();
  }
}
