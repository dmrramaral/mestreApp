import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface ResultadoRolagem {
  campo: string;
  d20: number;
  mod: number;
  total: number;
  detalhe?: string;
}

@Component({
  selector: 'app-dice-roll-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dice-roll-toast.component.html',
  styleUrl: './dice-roll-toast.component.scss'
})
export class DiceRollToastComponent {
  @Input() resultado: ResultadoRolagem | null = null;
  @Output() fechar = new EventEmitter<void>();
}
