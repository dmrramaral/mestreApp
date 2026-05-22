import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, timeout } from 'rxjs';
import {
    CyberpunkCatalog,
    CyberpunkSubclassCatalog,
    CyberpunkTalentRow
} from '../../core/models/cyberpunk-catalog.model';
import { CyberpunkCatalogService } from '../../core/services/cyberpunk-catalog.service';

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

  constructor(private catalogService: CyberpunkCatalogService) {}

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
}
