import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiReference, DndSpell } from '../../../../core/models/dnd-api.model';

@Component({
  selector: 'app-ficha-spell-search-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ficha-spell-search-modal.component.html',
  styleUrl: './ficha-spell-search-modal.component.scss'
})
export class FichaSpellSearchModalComponent {
  @Input() isOpen = false;
  @Input() selectedSpellDetails?: DndSpell | any;
  @Input() spellSearchTerm = '';
  @Input() spellLevelFilter = '';
  @Input() spellClassFilter = '';
  @Input() availableSpellLevels: number[] = [];
  @Input() availableClasses: ApiReference[] = [];
  @Input() loadingSpells = false;
  @Input() filteredSpells: ApiReference[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() searchTermChange = new EventEmitter<string>();
  @Output() spellLevelFilterChange = new EventEmitter<string>();
  @Output() spellClassFilterChange = new EventEmitter<string>();
  @Output() filtrarMagias = new EventEmitter<void>();
  @Output() aplicarFiltrosMagias = new EventEmitter<void>();
  @Output() limparFiltrosMagias = new EventEmitter<void>();
  @Output() viewSpellDetails = new EventEmitter<string>();
  @Output() voltarListaMagias = new EventEmitter<void>();
  @Output() adicionarMagia = new EventEmitter<DndSpell>();

  onSearchTermInput(value: string): void {
    this.searchTermChange.emit(value);
    this.filtrarMagias.emit();
  }

  onSpellLevelFilterChange(value: string): void {
    this.spellLevelFilterChange.emit(value);
    this.aplicarFiltrosMagias.emit();
  }

  onSpellClassFilterChange(value: string): void {
    this.spellClassFilterChange.emit(value);
    this.aplicarFiltrosMagias.emit();
  }

  onAddSelectedSpell(): void {
    if (this.selectedSpellDetails) {
      this.adicionarMagia.emit(this.selectedSpellDetails);
    }
  }
}
