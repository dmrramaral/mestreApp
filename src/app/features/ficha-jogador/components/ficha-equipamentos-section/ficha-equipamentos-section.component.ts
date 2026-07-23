import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ficha-equipamentos-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ficha-equipamentos-section.component.html',
  styleUrl: './ficha-equipamentos-section.component.scss'
})
export class FichaEquipamentosSectionComponent {
  @Input() jogador: any;
  @Input() isCyberPun2080 = false;
  editandoEquipamento: { [categoria: string]: { [key: number]: boolean } } = {};
  adicionandoEquipamento = false;
  novaCategoria = '';
  novoEquipamento: { nome: string; descricao: string; ca: number | null } = {
    nome: '',
    descricao: '',
    ca: null
  };

  @Output() dirty = new EventEmitter<void>();

  readonly categorias = ['cabeca', 'arma', 'armadura', 'pes', 'escudo', 'anel', 'amuleto'];

  hasEquipment(): boolean {
    const equipamentos = this.jogador?.equipamentos;
    if (!equipamentos) {
      return false;
    }
    return Object.values(equipamentos).some((arr: any) => Array.isArray(arr) && arr.length > 0);
  }

  getCategoryIcon(categoria: string): string {
    const icons: { [key: string]: string } = {
      cabeca: 'fa-hat-wizard',
      arma: 'fa-gun',
      armadura: 'fa-vest',
      pes: 'fa-socks',
      escudo: 'fa-shield-alt',
      amuleto: 'fa-gem',
      anel: 'fa-ring'
    };
    return icons[categoria] || 'fa-shield';
  }

  getCategoryName(categoria: string): string {
    const names: { [key: string]: string } = {
      cabeca: 'Cabeça',
      arma: 'Arma',
      armadura: 'Armadura',
      pes: 'Pés',
      escudo: 'Escudo',
      amuleto: 'Amuleto',
      anel: 'Anel'
    };
    return names[categoria] || categoria;
  }

  categoriaAcessorioIcon(categoria: string): string {
    const icons: Record<string, string> = {
      mira: 'fas fa-crosshairs',
      carregador: 'fas fa-battery-full',
      supressor: 'fas fa-volume-mute'
    };
    return icons[categoria] ?? 'fas fa-cog';
  }

  adicionarEquipamento(): void {
    this.adicionandoEquipamento = true;
  }

  confirmarAdicionarEquipamento(): void {
    if (!this.novaCategoria || !this.novoEquipamento.nome || !this.novoEquipamento.descricao) {
      return;
    }

    if (!this.jogador.equipamentos) {
      this.jogador.equipamentos = {};
    }

    if (!Array.isArray(this.jogador.equipamentos[this.novaCategoria])) {
      this.jogador.equipamentos[this.novaCategoria] = [];
    }

    this.jogador.equipamentos[this.novaCategoria].push({ ...this.novoEquipamento });
    this.novoEquipamento = { nome: '', descricao: '', ca: null };
    this.novaCategoria = '';
    this.adicionandoEquipamento = false;
    this.dirty.emit();
  }

  cancelarAdicionarEquipamento(): void {
    this.novoEquipamento = { nome: '', descricao: '', ca: null };
    this.novaCategoria = '';
    this.adicionandoEquipamento = false;
  }

  removerEquipamento(categoria: string, equipamento: { nome: string; descricao: string }): void {
    const lista = this.jogador?.equipamentos?.[categoria];
    if (!Array.isArray(lista)) {
      return;
    }

    const index = lista.indexOf(equipamento);
    if (index >= 0) {
      lista.splice(index, 1);
      this.dirty.emit();
    }
  }

  toggleEditarEquipamento(categoria: string, index: number): void {
    if (!this.editandoEquipamento[categoria]) {
      this.editandoEquipamento[categoria] = {};
    }
    this.editandoEquipamento[categoria][index] = !this.editandoEquipamento[categoria][index];
    if (!this.editandoEquipamento[categoria][index]) {
      this.dirty.emit();
    }
  }
}
