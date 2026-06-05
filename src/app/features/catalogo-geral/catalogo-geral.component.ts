import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { AtributoCatalog, PericiaCatalog } from '../../core/models/catalog-geral.model';
import { CatalogGeralService } from '../../core/services/catalog-geral.service';

type ModalMode = 'atributo' | 'pericia';

@Component({
  selector: 'app-catalogo-geral',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './catalogo-geral.component.html',
  styleUrl: './catalogo-geral.component.scss'
})
export class CatalogoGeralComponent implements OnInit {
  atributos: AtributoCatalog[] = [];
  loading = false;
  saving = false;
  erro = '';
  sucesso = '';

  // Filtro
  filtroNome = '';
  filtroSistema = '';
  sistemaOpcoes = ['dnd5e', 'cyberpun2080'];

  // Expansão de atributo
  expandidoIndex: number | null = null;

  // Modal
  modalAberto = false;
  modalMode: ModalMode = 'atributo';
  editAtributoIndex: number | null = null;
  editPericiaAtributoIndex: number | null = null;
  editPericiaIndex: number | null = null;

  // Form atributo
  formAtributo: AtributoCatalog = this.novoAtributo();
  // Form perícia
  formPericia: PericiaCatalog = this.novaPericia();

  // ── Helpers ───────────────────────────────────────────────────────────────

  private catalogGeralService = inject(CatalogGeralService);

  constructor() {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.loading = true;
    this.erro = '';
    this.catalogGeralService.getAtributos().pipe(finalize(() => (this.loading = false))).subscribe({
      next: (resp) => {
        this.atributos = resp.items || [];
      },
      error: (err) => {
        this.erro = 'Erro ao carregar atributos: ' + String(err?.message || err);
      }
    });
  }

  get atributosFiltrados(): AtributoCatalog[] {
    const nome = this.filtroNome.trim().toLowerCase();
    const sistema = this.filtroSistema.trim();
    return this.atributos.filter((a) => {
      const matchNome = !nome || a.nome.toLowerCase().includes(nome);
      const matchSistema = !sistema || (a.sistemas || []).includes(sistema);
      return matchNome && matchSistema;
    });
  }

  toggleExpandir(index: number): void {
    this.expandidoIndex = this.expandidoIndex === index ? null : index;
  }

  isExpandido(index: number): boolean {
    return this.expandidoIndex === index;
  }

  // ── Atributo CRUD ─────────────────────────────────────────────────────────

  abrirModalNovoAtributo(): void {
    this.formAtributo = this.novoAtributo();
    this.editAtributoIndex = null;
    this.modalMode = 'atributo';
    this.modalAberto = true;
  }

  abrirModalEditarAtributo(index: number): void {
    const a = this.atributos[index];
    this.formAtributo = {
      ...a,
      sistemas: [...(a.sistemas || [])],
      pericias: a.pericias.map((p) => ({ ...p, sistemas: [...(p.sistemas || [])] }))
    };
    this.editAtributoIndex = index;
    this.modalMode = 'atributo';
    this.modalAberto = true;
  }

  confirmarAtributo(): void {
    if (!this.formAtributo.nome.trim()) {
      return;
    }
    const atributo = { ...this.formAtributo, pericias: this.formAtributo.pericias || [] };
    if (this.editAtributoIndex !== null) {
      this.atributos[this.editAtributoIndex] = atributo;
    } else {
      this.atributos.push(atributo);
    }
    this.fecharModal();
    this.salvar();
  }

  excluirAtributo(index: number): void {
    if (!confirm(`Excluir o atributo "${this.atributos[index].nome}"?`)) return;
    this.atributos.splice(index, 1);
    if (this.expandidoIndex === index) this.expandidoIndex = null;
    this.salvar();
  }

  // ── Perícia CRUD ──────────────────────────────────────────────────────────

  abrirModalNovaPericia(atributoIndex: number): void {
    this.formPericia = this.novaPericia();
    this.editPericiaAtributoIndex = atributoIndex;
    this.editPericiaIndex = null;
    this.modalMode = 'pericia';
    this.modalAberto = true;
  }

  abrirModalEditarPericia(atributoIndex: number, periciaIndex: number): void {
    const p = this.atributos[atributoIndex].pericias[periciaIndex];
    this.formPericia = { ...p, sistemas: [...(p.sistemas || [])] };
    this.editPericiaAtributoIndex = atributoIndex;
    this.editPericiaIndex = periciaIndex;
    this.modalMode = 'pericia';
    this.modalAberto = true;
  }

  confirmarPericia(): void {
    if (!this.formPericia.nome.trim() || this.editPericiaAtributoIndex === null) return;
    const pericia = { ...this.formPericia };
    const pericias = this.atributos[this.editPericiaAtributoIndex].pericias;
    if (this.editPericiaIndex !== null) {
      pericias[this.editPericiaIndex] = pericia;
    } else {
      pericias.push(pericia);
    }
    this.fecharModal();
    this.salvar();
  }

  excluirPericia(atributoIndex: number, periciaIndex: number): void {
    const pericias = this.atributos[atributoIndex].pericias;
    if (!confirm(`Excluir a perícia "${pericias[periciaIndex].nome}"?`)) return;
    pericias.splice(periciaIndex, 1);
    this.salvar();
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  // ── Sistemas checkboxes ───────────────────────────────────────────────────

  toggleSistemaAtributo(sistema: string): void {
    const sistemas = this.formAtributo.sistemas || [];
    const idx = sistemas.indexOf(sistema);
    if (idx >= 0) {
      sistemas.splice(idx, 1);
    } else {
      sistemas.push(sistema);
    }
    this.formAtributo.sistemas = [...sistemas];
  }

  isSistemaAtributoChecked(sistema: string): boolean {
    return (this.formAtributo.sistemas || []).includes(sistema);
  }

  toggleSistemaPericia(sistema: string): void {
    const sistemas = this.formPericia.sistemas || [];
    const idx = sistemas.indexOf(sistema);
    if (idx >= 0) {
      sistemas.splice(idx, 1);
    } else {
      sistemas.push(sistema);
    }
    this.formPericia.sistemas = [...sistemas];
  }

  isSistemaPericiaChecked(sistema: string): boolean {
    return (this.formPericia.sistemas || []).includes(sistema);
  }

  // ── Salvar ────────────────────────────────────────────────────────────────

  salvar(): void {
    this.saving = true;
    this.erro = '';
    this.sucesso = '';
    this.catalogGeralService.updateAtributos(this.atributos).pipe(finalize(() => (this.saving = false))).subscribe({
      next: (resp) => {
        this.atributos = resp.items || [];
        this.sucesso = 'Catálogo salvo com sucesso!';
        setTimeout(() => (this.sucesso = ''), 3000);
      },
      error: (err) => {
        this.erro = 'Erro ao salvar: ' + String(err?.message || err);
      }
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private novoAtributo(): AtributoCatalog {
    return { nome: '', abreviacao: '', descricao: '', sistemas: [], pericias: [] };
  }

  private novaPericia(): PericiaCatalog {
    return { nome: '', descricao: '', sistemas: [] };
  }

  getSistemasBadgeClass(sistema: string): string {
    switch (sistema) {
      case 'dnd5e': return 'badge bg-primary';
      case 'cyberpun2080': return 'badge bg-warning text-dark';
      default: return 'badge bg-secondary';
    }
  }

  getSistemaLabel(sistema: string): string {
    switch (sistema) {
      case 'dnd5e': return 'D&D 5e';
      case 'cyberpun2080': return 'Cyberpunk 2080';
      default: return sistema;
    }
  }
}
