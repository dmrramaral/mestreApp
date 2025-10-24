import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../core/services/storage.service';
import { STORAGE_KEYS } from '../../core/constants/rpg.constants';

/**
 * Interface para um participante na ordem de iniciativa
 */
interface ParticipanteIniciativa {
  nome: string;
  iniciativa: number;
  vida: number;
}

/**
 * Componente para gerenciar a ordem de iniciativa em combate
 * Permite adicionar jogadores/NPCs e rastrear seus pontos de vida
 */
@Component({
  selector: 'app-iniciativa',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './iniciativa.component.html',
  styleUrl: './iniciativa.component.scss'
})
export class IniciativaComponent implements OnInit {

  nome!: string;
  iniciativa: number | null = null;

  listaIniciativa: ParticipanteIniciativa[] = [];

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    const listaIniciativa = this.storageService.getObject<ParticipanteIniciativa[]>(STORAGE_KEYS.INITIATIVE_LIST);
    if (listaIniciativa) {
      this.listaIniciativa = listaIniciativa;
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.storageService.setObject(STORAGE_KEYS.INITIATIVE_LIST, this.listaIniciativa);
      });
    }
  }

  /**
   * Adiciona um novo participante à lista de iniciativa
   * Ordena automaticamente por valor de iniciativa (maior para menor)
   */
  adicionar() {
    if (this.nome && this.iniciativa !== null) {
      this.listaIniciativa.push({ nome: this.nome, iniciativa: this.iniciativa, vida: 0 });
      this.listaIniciativa.sort((a, b) => b.iniciativa - a.iniciativa);
      this.nome = '';
      this.iniciativa = null;
      this.storageService.setObject(STORAGE_KEYS.INITIATIVE_LIST, this.listaIniciativa);
    }
  }

  /**
   * Remove um participante da lista de iniciativa
   */
  remover(jogador: ParticipanteIniciativa) {
    const index = this.listaIniciativa.indexOf(jogador);
    if (index > -1) {
      this.listaIniciativa.splice(index, 1);
      this.storageService.setObject(STORAGE_KEYS.INITIATIVE_LIST, this.listaIniciativa);
    }
  }

  /**
   * Salva alterações nos pontos de vida
   */
  salvarVida() {
    this.storageService.setObject(STORAGE_KEYS.INITIATIVE_LIST, this.listaIniciativa);
  }
}
