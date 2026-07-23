import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ficha-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ficha-edit-modal.component.html',
  styleUrl: './ficha-edit-modal.component.scss'
})
export class FichaEditModalComponent {
  @Input() jogador: any;
  @Input() isDnd5e = false;
  @Input() caCalculada = 0;

  @Output() openClassSelection = new EventEmitter<void>();
  @Output() openRaceSelection = new EventEmitter<void>();
  @Output() dirty = new EventEmitter<void>();

  onPericiaChange(event: Event, pericia: any): void {
    const input = event.target as HTMLInputElement;
    pericia.valor = input.checked ? 'sim' : 'nao';
    this.dirty.emit();
  }
}
