import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ficha-anotacoes-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ficha-anotacoes-section.component.html',
  styleUrl: './ficha-anotacoes-section.component.scss'
})
export class FichaAnotacoesSectionComponent {
  @Input() jogador: any;
  @Output() saveToCache = new EventEmitter<void>();
}
