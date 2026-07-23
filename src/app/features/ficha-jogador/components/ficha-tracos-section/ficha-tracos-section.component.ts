import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FichaJogadorService } from '../../../../core/services/ficha-jogador.service';

@Component({
  selector: 'app-ficha-tracos-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ficha-tracos-section.component.html',
  styleUrl: './ficha-tracos-section.component.scss'
})
export class FichaTracosSectionComponent {
  @Input() jogador: any;
  @Input() isDnd5e = false;

  @Output() abrirBuscarTracos = new EventEmitter<void>();
  @Output() dirty = new EventEmitter<void>();

  adicionandoTracos = false;
  novoTracos: { nome: string; descricao: string } = { nome: '', descricao: '' };
  editandoTracos: { [key: number]: boolean } = {};

  constructor(private fichaService: FichaJogadorService) {}

  adicionarTracos(): void {
    this.adicionandoTracos = true;
  }

  removerTracos(Tracos: { nome: string; descricao: string }): void {
    this.fichaService.removerTracos(this.jogador, Tracos);
    this.dirty.emit();
  }

  confirmarAdicionarTracos(): void {
    if (this.novoTracos.nome && this.novoTracos.descricao) {
      this.fichaService.adicionarTracos(this.jogador, this.novoTracos);
      this.novoTracos = { nome: '', descricao: '' };
      this.adicionandoTracos = false;
      this.dirty.emit();
    }
  }

  cancelarAdicionarTracos(): void {
    this.novoTracos = { nome: '', descricao: '' };
    this.adicionandoTracos = false;
  }

  toggleEditarTracos(index: number): void {
    this.editandoTracos[index] = !this.editandoTracos[index];
    if (!this.editandoTracos[index]) {
      this.dirty.emit();
    }
  }
}
