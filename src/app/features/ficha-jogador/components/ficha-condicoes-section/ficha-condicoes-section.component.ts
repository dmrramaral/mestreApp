import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ficha-condicoes-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ficha-condicoes-section.component.html',
  styleUrl: './ficha-condicoes-section.component.scss'
})
export class FichaCondicoesSectionComponent {
  @Input() jogador: any;
  @Output() saveToCache = new EventEmitter<void>();
}
