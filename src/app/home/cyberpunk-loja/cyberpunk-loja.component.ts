import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize, timeout } from 'rxjs';
import { CyberpunkCatalog, CyberpunkStoreCatalog, CyberpunkStoreItem } from '../../core/models/cyberpunk-catalog.model';
import { CyberpunkCatalogService } from '../../core/services/cyberpunk-catalog.service';

type LojaCategoria = keyof CyberpunkStoreCatalog;

@Component({
  selector: 'app-cyberpunk-loja',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cyberpunk-loja.component.html',
  styleUrl: './cyberpunk-loja.component.scss'
})
export class CyberpunkLojaComponent implements OnInit {
  catalog: CyberpunkCatalog | null = null;
  loading = false;
  erro = '';
  busca = '';

  readonly categorias: Array<{ key: LojaCategoria; label: string; icone: string }> = [
    { key: 'armas', label: 'Armas', icone: 'fa-crosshairs' },
    { key: 'acessoriosMunicoes', label: 'Acessorios e Municoes', icone: 'fa-box-open' },
    { key: 'protecaoCorporal', label: 'Protecao Corporal', icone: 'fa-shield-halved' },
    { key: 'classeTecnologica', label: 'Classe Tecnologica (CT)', icone: 'fa-microchip' },
    { key: 'hacksRapidos', label: 'Hacks Rapidos', icone: 'fa-bolt' }
  ];

  constructor(private catalogService: CyberpunkCatalogService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.loading = true;
    this.erro = '';

    this.catalogService.getCatalog().pipe(
      timeout(12000),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (catalog) => {
        this.catalog = catalog;
      },
      error: () => {
        this.erro = 'Nao foi possivel carregar a Loja Cyber. Verifique a conexao com o backend e tente novamente.';
      }
    });
  }

  itensFiltrados(categoria: LojaCategoria): CyberpunkStoreItem[] {
    const lista = this.catalog?.loja?.[categoria] || [];
    const termo = this.busca.trim().toLowerCase();
    if (!termo) {
      return lista;
    }

    return lista.filter((item) => {
      const nome = String(item.nome || '').toLowerCase();
      const descricao = String(item.descricao || '').toLowerCase();
      const tag = String(item.categoria || '').toLowerCase();
      return nome.includes(termo) || descricao.includes(termo) || tag.includes(termo);
    });
  }

  formatarPreco(valor: number | null | undefined): string {
    if (!Number.isFinite(Number(valor))) {
      return '--';
    }
    return `${Number(valor).toLocaleString('pt-BR')} edinhos`;
  }
}
