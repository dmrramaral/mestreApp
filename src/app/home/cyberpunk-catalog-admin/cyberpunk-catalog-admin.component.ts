import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  constructor(private catalogService: CyberpunkCatalogService) {}

  ngOnInit(): void {
    this.carregar();
  }

  get classesDisponiveis(): string[] {
    if (!this.catalog) return [];
    return this.catalog.classes.map((item) => item.nome);
  }

  get talentosFiltrados(): CyberpunkTalentRow[] {
    if (!this.catalog) return [];

    const filter = this.classFilter.trim();
    return this.catalog.talentos
      .map((talento, index) => ({ talento, index }))
      .filter((item) => !filter || item.talento.classes.includes(filter));
  }

  carregar(): void {
    this.loading = true;
    this.erro = '';
    this.sucesso = '';

    this.catalogService.getCatalog().subscribe({
      next: (catalog) => {
        this.catalog = catalog;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.erro = 'Nao foi possivel carregar o catalogo CyberPunk.';
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

    this.catalogService.updateCatalog(payload).subscribe({
      next: (saved) => {
        this.catalog = saved;
        this.saving = false;
        this.sucesso = 'Catalogo salvo com sucesso.';
      },
      error: () => {
        this.saving = false;
        this.erro = 'Falha ao salvar catalogo no backend.';
      }
    });
  }

  adicionarClasse(): void {
    if (!this.catalog) return;
    this.catalog.classes.push({ nome: '', descricao: '', subclasses: [] });
  }

  removerClasse(index: number): void {
    if (!this.catalog) return;
    this.catalog.classes.splice(index, 1);
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
  }

  removerTalento(index: number): void {
    if (!this.catalog) return;
    this.catalog.talentos.splice(index, 1);
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
      return;
    }

    if (!checked && idx >= 0) {
      classes.splice(idx, 1);
    }
  }
}
