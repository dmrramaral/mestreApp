import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, timeout } from 'rxjs';
import {
    CyberpunkCatalog,
    CyberpunkStoreCatalog,
    CyberpunkStoreItem,
    CyberpunkSubclassCatalog,
    CyberpunkTalentRow
} from '../../core/models/cyberpunk-catalog.model';
import { CyberpunkCatalogService } from '../../core/services/cyberpunk-catalog.service';

type StoreCategoryKey = keyof CyberpunkStoreCatalog;

@Component({
  selector: 'app-cyberpunk-catalog-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cyberpunk-catalog-admin.component.html',
  styleUrl: './cyberpunk-catalog-admin.component.scss'
})
export class CyberpunkCatalogAdminComponent implements OnInit {
  catalog: CyberpunkCatalog | null = null;
  loading = false;
  saving = false;
  erro = '';
  sucesso = '';

  classFilter = '';
  classesDisponiveis: string[] = [];
  talentosFiltrados: CyberpunkTalentRow[] = [];
  mostrarClasses = true;
  mostrarAntecedentes = false;
  mostrarTalentos = false;
  mostrarLoja = false;

  readonly categoriasLoja: Array<{ key: StoreCategoryKey; label: string }> = [
    { key: 'armas', label: 'Armas' },
    { key: 'acessoriosMunicoes', label: 'Acessorios e Municoes' },
    { key: 'protecaoCorporal', label: 'Protecao Corporal' },
    { key: 'classeTecnologica', label: 'Classe Tecnologica (CT)' },
    { key: 'hacksRapidos', label: 'Hacks Rapidos' }
  ];

  constructor(private catalogService: CyberpunkCatalogService) {}

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
    this.carregar();
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
      .filter((item) => !filter || item.talento.classes.includes(filter));
  }

  onClassFilterChange(): void {
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
    this.catalog.classes.push({ nome: '', descricao: '', subclasses: [] });
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
    this.catalog.antecedentes.push({ nome: '', descricao: '', talentoOrigem: '' });
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
}
