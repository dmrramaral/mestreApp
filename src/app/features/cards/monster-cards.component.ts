import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MonsterCardViewModel, MonsterFilter } from '../../core/models/monster-cards.model';
import { MonsterCardComponent } from './components/monster-card/monster-card.component';
import { MonsterFilterComponent } from './components/monster-filter/monster-filter.component';
import { MonsterCardsService } from './monster-cards.service';

@Component({
  selector: 'app-monster-cards',
  standalone: true,
  imports: [CommonModule, MonsterFilterComponent, MonsterCardComponent],
  templateUrl: './monster-cards.component.html',
  styleUrl: './monster-cards.component.scss'
})
export class MonsterCardsComponent implements OnInit, OnDestroy {
  allMonsters: MonsterCardViewModel[] = [];
  filteredMonsters: MonsterCardViewModel[] = [];
  printMonsters: MonsterCardViewModel[] = [];
  monsterTypes: string[] = [];

  currentFilter: MonsterFilter = {
    query: '',
    crMin: 0,
    crMax: 30,
    hpMin: null,
    hpMax: null,
    types: []
  };

  selectedMonsters = new Set<string>();

  isLoading = true;
  loadError = '';

  private readonly onAfterPrint = (): void => {
    document.body.classList.remove('cards-print-mode');
  };

  private readonly isBrowser: boolean;

  constructor(
    private readonly monsterCardsService: MonsterCardsService,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      window.addEventListener('afterprint', this.onAfterPrint);
    }
    this.loadMonsters();
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('afterprint', this.onAfterPrint);
      document.body.classList.remove('cards-print-mode');
    }
  }

  onFiltersChange(filter: MonsterFilter): void {
    this.currentFilter = filter;
    this.applyCurrentFilters();
  }

  onClearRequested(): void {
    this.selectedMonsters.clear();
  }

  onCardSelectionChange(monsterIndex: string, selected: boolean): void {
    if (selected) {
      this.selectedMonsters.add(monsterIndex);
      return;
    }

    this.selectedMonsters.delete(monsterIndex);
  }

  isCardSelected(monsterIndex: string): boolean {
    return this.selectedMonsters.has(monsterIndex);
  }

  printOrExportPdf(): void {
    if (!this.isBrowser) {
      return;
    }

    const selected = this.filteredMonsters.filter((monster) => this.selectedMonsters.has(monster.index));
    this.printMonsters = selected.length ? selected : [...this.filteredMonsters];

    if (!this.printMonsters.length) {
      return;
    }

    document.body.classList.add('cards-print-mode');
    setTimeout(() => window.print(), 80);
  }

  get selectedCount(): number {
    return this.selectedMonsters.size;
  }

  trackByMonster(_index: number, monster: MonsterCardViewModel): string {
    return monster.index;
  }

  private loadMonsters(): void {
    this.isLoading = true;
    this.loadError = '';

    this.monsterCardsService.getMonsterCards().subscribe({
      next: (cards) => {
        this.allMonsters = cards;
        this.monsterTypes = [...new Set(cards.map((card) => card.type))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
        this.applyCurrentFilters();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.loadError = 'Falha ao carregar os monstros da API. Tente novamente em instantes.';
      }
    });
  }

  private applyCurrentFilters(): void {
    this.filteredMonsters = this.monsterCardsService.applyFilters(this.allMonsters, this.currentFilter);

    const visibleIndexes = new Set(this.filteredMonsters.map((monster) => monster.index));
    this.selectedMonsters = new Set(
      Array.from(this.selectedMonsters).filter((index) => visibleIndexes.has(index))
    );
  }
}
