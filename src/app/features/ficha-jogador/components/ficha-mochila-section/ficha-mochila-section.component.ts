import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ficha-mochila-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ficha-mochila-section.component.html',
  styleUrl: './ficha-mochila-section.component.scss'
})
export class FichaMochilaSectionComponent {
  @Input() jogador: any;
  editandoItem: { [key: number]: boolean } = {};
  adicionandoItem = false;
  novoItem: { nome: string; descricao: string } = { nome: '', descricao: '' };

  @Output() dirty = new EventEmitter<void>();

  adicionarItem(): void {
    this.adicionandoItem = true;
  }

  toggleEditarItem(index: number): void {
    this.editandoItem[index] = !this.editandoItem[index];
    if (!this.editandoItem[index]) {
      this.dirty.emit();
    }
  }

  removerItem(item: { nome: string; descricao: string }): void {
    if (!Array.isArray(this.jogador?.mochila)) {
      return;
    }
    const index = this.jogador.mochila.indexOf(item);
    if (index >= 0) {
      this.jogador.mochila.splice(index, 1);
      this.dirty.emit();
    }
  }

  confirmarAdicionarItem(): void {
    if (!this.novoItem.nome || !this.novoItem.descricao) {
      return;
    }

    if (!Array.isArray(this.jogador.mochila)) {
      this.jogador.mochila = [];
    }

    this.jogador.mochila.push({ ...this.novoItem });
    this.novoItem = { nome: '', descricao: '' };
    this.adicionandoItem = false;
    this.dirty.emit();
  }

  cancelarAdicionarItem(): void {
    this.novoItem = { nome: '', descricao: '' };
    this.adicionandoItem = false;
  }
}
