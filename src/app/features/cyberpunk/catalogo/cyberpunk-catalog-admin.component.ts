import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { finalize, timeout } from 'rxjs';
import { CYBERPUN2080_ANTECEDENTES, CYBERPUN2080_CLASSES_FULL_DATA } from '../../../core/constants/rpg.constants';
import {
    CyberpunkAntecedenteCatalog,
    CyberpunkCatalog,
    CyberpunkClassCatalog,
    CyberpunkClassProgression,
    CyberpunkStoreCatalog,
    CyberpunkStoreItem,
    CyberpunkSubclassCatalog,
    CyberpunkTalentRow
} from '../../../core/models/cyberpunk-catalog.model';
import { CyberpunkCatalogService } from '../../../core/services/cyberpunk-catalog.service';

type StoreCategoryKey = keyof CyberpunkStoreCatalog;
type CatalogPage = 'dashboard' | 'classes' | 'conteudo' | 'loja';

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
  classesDisponiveis: string[] = [];
  talentosFiltrados: CyberpunkTalentRow[] = [];
  mostrarClasses = true;
  mostrarAntecedentes = false;
  mostrarTalentos = false;
  mostrarLoja = false;
  confirmandoPopular = false;

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
    this.route.data.subscribe((data) => {
      const pagina = data['pagina'] as CatalogPage | undefined;
      this.paginaAtiva = pagina || 'dashboard';
    });
    this.carregar();
  }

  get classesFiltradas(): ClassRow[] {
    if (!this.catalog) {
      return [];
    }

    const nome = this.classNameFilter.trim().toLowerCase();
    const subclasse = this.subclassNameFilter.trim().toLowerCase();

    return this.catalog.classes
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

  get antecedentesFiltrados(): AntecedenteRow[] {
    if (!this.catalog) {
      return [];
    }

    const termo = this.antecedenteFilter.trim().toLowerCase();
    return this.catalog.antecedentes
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
      this.talentosFiltrados = [];
      return;
    }

    this.classesDisponiveis = this.catalog.classes.map((item) => item.nome);
    const filter = this.classFilter.trim();

    this.talentosFiltrados = this.catalog.talentos
      .map((talento, index) => ({ talento, index }))
      .filter((item) => {
        const atendeClasse = !filter || item.talento.classes.includes(filter);
        const atendeNome = !this.talentoNomeFilter.trim()
          || item.talento.nome.toLowerCase().includes(this.talentoNomeFilter.trim().toLowerCase())
          || item.talento.descricao.toLowerCase().includes(this.talentoNomeFilter.trim().toLowerCase());

        return atendeClasse && atendeNome;
      });
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

  carregar(): void {
    this.loading = true;
    this.erro = '';
    this.sucesso = '';

    this.catalogService.getCatalog().pipe(
      timeout(12000),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (catalog) => {
        this.catalog = catalog;
        this.garantirLojaNoCatalogo();
        this.atualizarListasDerivadas();
      },
      error: () => {
        this.erro = 'Nao foi possivel carregar o catalogo CyberPunk. Verifique a conexao/backend e tente novamente.';
      }
    });
  }

  salvar(): void {
    if (!this.catalog) return;

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
      }
    };

    this.catalogService.updateCatalog(payload).pipe(
      timeout(12000),
      finalize(() => {
        this.saving = false;
      })
    ).subscribe({
      next: (saved) => {
        this.catalog = saved;
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
    this.catalog.talentos.push({ nome: '', descricao: '', classes: [] });
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
    const termoNome = this.lojaNomeFilter.trim().toLowerCase();
    const termoCategoria = this.lojaCategoriaFilter.trim().toLowerCase();

    return this.listarItensLoja(key)
      .map((item, index) => ({ item, index }))
      .filter((row) => {
        const atendeNome = !termoNome
          || row.item.nome.toLowerCase().includes(termoNome)
          || row.item.descricao.toLowerCase().includes(termoNome);
        const atendeCategoria = !termoCategoria
          || row.item.categoria.toLowerCase().includes(termoCategoria);

        return atendeNome && atendeCategoria;
      });
  }

  adicionarItemLoja(key: StoreCategoryKey): void {
    if (!this.catalog?.loja) {
      return;
    }

    const categoria = this.categoriasLoja.find((item) => item.key === key)?.label || 'Loja Cyber';
    this.catalog.loja[key].push(this.criarItemLojaVazio(categoria));
  }

  removerItemLoja(key: StoreCategoryKey, index: number): void {
    if (!this.catalog?.loja) {
      return;
    }

    this.catalog.loja[key].splice(index, 1);
  }

  popularComDadosLocais(): void {
    this.confirmandoPopular = false;
    this.erro = '';
    this.catalog = {
      system: 'cyberpun2080',
      version: 1,
      classes: CYBERPUN2080_CLASSES_FULL_DATA.map((c) => ({ ...c, subclasses: c.subclasses.map((s) => ({ ...s })) })),
      antecedentes: CYBERPUN2080_ANTECEDENTES.map((a) => ({ ...a })),
      talentos: [],
      loja: this.criarLojaVazia(),
      updatedAt: new Date().toISOString()
    };
    this.garantirLojaNoCatalogo();
    this.atualizarListasDerivadas();
    this.sucesso = 'Dados locais carregados. Revise e clique em "Salvar no Banco" para persistir.';
  }
}
