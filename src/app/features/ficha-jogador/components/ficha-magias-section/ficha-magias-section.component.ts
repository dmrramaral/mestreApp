import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ficha-magias-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ficha-magias-section.component.html',
  styleUrl: './ficha-magias-section.component.scss'
})
export class FichaMagiasSectionComponent {
  @Input() isDnd5e = false;
  @Input() jogador: any;
  @Input() editandoMagia: { [key: number]: boolean } = {};
  @Input() expandedSpellDetails: { [key: number]: any } = {};
  @Input() loadingSpellDetails: { [key: number]: boolean } = {};
  @Input() adicionandoMagia = false;
  @Input() novaMagia: any;

  @Input() getSpellComponents!: (magia: any, expandedDetails: any) => string;
  @Input() getSpellClassesFormatted!: (magia: any, expandedDetails: any) => string;

  @Output() abrirBuscarMagia = new EventEmitter<void>();
  @Output() adicionarMagia = new EventEmitter<void>();
  @Output() toggleSpellDetailsInList = new EventEmitter<{ index: number; nome: string }>();
  @Output() toggleEditarMagia = new EventEmitter<number>();
  @Output() removerMagia = new EventEmitter<number>();
  @Output() saveToCache = new EventEmitter<void>();
  @Output() confirmarAdicionarMagia = new EventEmitter<void>();
  @Output() cancelarAdicionarMagia = new EventEmitter<void>();
}
