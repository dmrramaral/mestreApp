import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FichaJogadorService } from '../../../../core/services/ficha-jogador.service';

@Component({
  selector: 'app-ficha-talentos-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ficha-talentos-section.component.html',
  styleUrl: './ficha-talentos-section.component.scss'
})
export class FichaTalentosSectionComponent {
  @Input() jogador: any;
  @Input() isDnd5e = false;

  @Output() abrirBuscarTalento = new EventEmitter<void>();
  @Output() dirty = new EventEmitter<void>();

  adicionandoTalento = false;
  novoTalento: { nome: string; descricao: string } = { nome: '', descricao: '' };
  editandoTalento: { [key: number]: boolean } = {};

  constructor(private fichaService: FichaJogadorService) {}

  adicionarTalento(): void {
    this.adicionandoTalento = true;
  }

  removerTalento(talento: { nome: string; descricao: string }): void {
    this.fichaService.removerTalento(this.jogador, talento);
    this.dirty.emit();
  }

  confirmarAdicionarTalento(): void {
    if (this.novoTalento.nome && this.novoTalento.descricao) {
      this.fichaService.adicionarTalento(this.jogador, this.novoTalento);
      this.novoTalento = { nome: '', descricao: '' };
      this.adicionandoTalento = false;
      this.dirty.emit();
    }
  }

  cancelarAdicionarTalento(): void {
    this.novoTalento = { nome: '', descricao: '' };
    this.adicionandoTalento = false;
  }

  toggleEditarTalento(index: number): void {
    this.editandoTalento[index] = !this.editandoTalento[index];
    if (!this.editandoTalento[index]) {
      this.dirty.emit();
    }
  }
}
