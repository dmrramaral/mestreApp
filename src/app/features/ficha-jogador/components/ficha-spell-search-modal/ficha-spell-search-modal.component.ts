import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiReference, DndSpell } from '../../../../core/models/dnd-api.model';
import { DndApiService } from '../../../../core/services/dnd-api.service';

@Component({
  selector: 'app-ficha-spell-search-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ficha-spell-search-modal.component.html',
  styleUrl: './ficha-spell-search-modal.component.scss'
})
export class FichaSpellSearchModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() className = '';
  availableClasses: ApiReference[] = [];

  selectedSpellDetails?: DndSpell | any;
  spellSearchTerm = '';
  spellLevelFilter = '';
  spellClassFilter = '';
  availableSpellLevels: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  availableSpells: ApiReference[] = [];
  filteredSpells: ApiReference[] = [];
  loadingSpells = false;

  @Output() close = new EventEmitter<void>();
  @Output() adicionarMagia = new EventEmitter<DndSpell>();

  constructor(private dndApiService: DndApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']?.currentValue === true) {
      if (this.availableClasses.length === 0) {
        this.loadClasses();
      }

      if (!this.spellClassFilter && this.className) {
        const classeSelecionada = this.availableClasses.find((classe) =>
          classe.name.toLowerCase() === this.className.toLowerCase()
        );
        if (classeSelecionada) {
          this.spellClassFilter = classeSelecionada.index;
        }
      }

      if (this.availableSpells.length === 0) {
        this.loadSpells();
      }
    }
  }

  private loadClasses(): void {
    this.dndApiService.getClasses().subscribe({
      next: (data) => {
        this.availableClasses = data.results || [];
      }
    });
  }

  fechar(): void {
    this.spellSearchTerm = '';
    this.selectedSpellDetails = null;
    this.filteredSpells = this.availableSpells;
    this.close.emit();
  }

  loadSpells(): void {
    this.loadingSpells = true;
    this.dndApiService.getSpells().subscribe({
      next: (data) => {
        this.availableSpells = data.results || [];
        this.filteredSpells = this.availableSpells;
        this.loadingSpells = false;
      },
      error: () => {
        this.loadingSpells = false;
      }
    });
  }

  filtrarMagias(): void {
    let filtered = this.availableSpells;

    if (this.spellSearchTerm) {
      const term = this.spellSearchTerm.toLowerCase();
      filtered = filtered.filter((spell) => spell.name.toLowerCase().includes(term));
    }

    this.filteredSpells = filtered;
  }

  aplicarFiltrosMagias(): void {
    this.loadingSpells = true;

    if (!this.spellLevelFilter && !this.spellClassFilter) {
      this.loadSpells();
      return;
    }

    this.dndApiService.getSpellsWithFilters(
      this.spellLevelFilter || undefined,
      this.getClasseFiltroApi()
    ).subscribe({
      next: (data: any) => {
        this.availableSpells = data.results || [];
        this.filtrarMagias();
        this.loadingSpells = false;
      },
      error: () => {
        this.aplicarFiltrosLocalmente();
      }
    });
  }

  limparFiltrosMagias(): void {
    this.spellLevelFilter = '';
    this.spellClassFilter = '';
    this.spellSearchTerm = '';
    this.loadSpells();
  }

  viewSpellDetails(spellIndex: string): void {
    if (!spellIndex) {
      return;
    }

    this.dndApiService.getSpellDetails(spellIndex).subscribe({
      next: (data) => {
        this.selectedSpellDetails = data;
      }
    });
  }

  voltarListaMagias(): void {
    this.selectedSpellDetails = null;
  }

  onSearchTermInput(value: string): void {
    this.spellSearchTerm = value;
    this.filtrarMagias();
  }

  onSpellLevelFilterChange(value: string): void {
    this.spellLevelFilter = value;
    this.aplicarFiltrosMagias();
  }

  onSpellClassFilterChange(value: string): void {
    this.spellClassFilter = value;
    this.aplicarFiltrosMagias();
  }

  onAddSelectedSpell(): void {
    if (this.selectedSpellDetails) {
      this.adicionarMagia.emit(this.selectedSpellDetails);
      this.fechar();
    }
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

  private aplicarFiltrosLocalmente(): void {
    this.dndApiService.getSpells().subscribe({
      next: (data: any) => {
        const allSpells = data.results || [];

        if (!this.spellLevelFilter && !this.spellClassFilter) {
          this.availableSpells = allSpells;
          this.filtrarMagias();
          this.loadingSpells = false;
          return;
        }

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
      error: () => {
        this.loadingSpells = false;
      }
    });
  }

  private checkSpellMatchesFilters(spell: any, results: any[], callback: () => void): void {
    this.dndApiService.getSpellDetails(spell.index).subscribe({
      next: (details) => {
        let matches = true;

        if (this.spellLevelFilter) {
          const filterLevel = Number.parseInt(this.spellLevelFilter, 10);
          if (details.level !== filterLevel) {
            matches = false;
          }
        }

        if (this.spellClassFilter && matches) {
          const classFilter = this.spellClassFilter.toLowerCase();
          const hasClass = details.classes?.some((c: any) => c.name.toLowerCase() === classFilter);
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
}
