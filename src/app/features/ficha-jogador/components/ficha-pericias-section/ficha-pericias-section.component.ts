import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ficha-pericias-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ficha-pericias-section.component.html',
  styleUrl: './ficha-pericias-section.component.scss'
})
export class FichaPericiasSectionComponent {
  @Input() jogador: any;
  editandoPericias = false;

  @Output() dirty = new EventEmitter<void>();

  hasProficiencies(): boolean {
    return Array.isArray(this.jogador?.pericias)
      && this.jogador.pericias.some((p: any) => p.valor === 'sim');
  }

  onPericiaChange(event: Event, pericia: any): void {
    const input = event.target as HTMLInputElement;
    pericia.valor = input.checked ? 'sim' : 'nao';
    this.dirty.emit();
  }

  toggleEditarPericias(): void {
    this.editandoPericias = !this.editandoPericias;
    if (!this.editandoPericias) {
      this.dirty.emit();
    }
  }
}
