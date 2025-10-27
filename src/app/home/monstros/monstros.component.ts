import { Component, OnInit } from '@angular/core';
import { MonstrosService } from './monstros.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Componente para exibir e filtrar monstros
 * Permite buscar monstros por nome, alinhamento, tamanho, tipo e XP
 */
@Component({
  selector: 'app-monstros',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './monstros.component.html',
  styleUrls: ['./monstros.component.scss']
})
export class MonstrosComponent implements OnInit {

  monstros: any;

  filter = {
    name: '',
    alignment: '',
    size: '',
    type: '',
    xp: ''
  };

  monsterTypes: any[] = [];

  names: any[] = [];
  alignments: any[] = [];
  sizes: any[] = [];
  types: any[] = [];
  xp: any[] = [];

  constructor(private monstrosService: MonstrosService) { }

  ngOnInit() {
    this.monstrosService.getMonstros().subscribe((data: any) => {
      this.monstros = data;
      this.types = [...new Set(this.monstros.map((monster: any) => monster.type as string))].sort((a, b) => (a as string).localeCompare(b as string));
      this.sizes = [...new Set(this.monstros.map((monster: any) => monster.size))].sort((a, b) => (a as string).localeCompare(b as string));
      this.alignments = [...new Set(this.monstros.map((monster: any) => monster.alignment as string))].sort((a, b) => (a as string).localeCompare(b as string));
      this.names = Array.from(new Set(this.monstros.map((monster: any) => monster.name as string))).sort((a, b) => (a as string).localeCompare(b as string));
      this.xp = [...new Set(this.monstros.map((monster: any) => monster.xp))].sort((a, b) => (a as number) - (b as number));
    });
  }

  /**
   * Aplica filtros para buscar monstros específicos
   * Filtra por nome (busca parcial), alinhamento, XP, tamanho e tipo
   */
  applyFilters() {
    this.monstrosService.getMonstros().subscribe((data: any) => {
      this.monstros = data.filter((monstro: any) => {
        const result = (this.filter.name ? monstro.name.toLowerCase().includes(this.filter.name.toLowerCase()) : true) &&
          (this.filter.alignment ? monstro.alignment === this.filter.alignment : true) &&
          (this.filter.xp ? monstro.xp === Number(this.filter.xp) : true) &&
          (this.filter.size ? monstro.size === this.filter.size : true) &&
          (this.filter.type ? monstro.type === this.filter.type : true);

        return result;
      });
    });
  }

  /**
   * Limpa todos os filtros e recarrega todos os monstros
   */
  clearFilters() {
    this.filter = {
      name: '',
      alignment: '',
      size: '',
      type: '',
      xp: ''
    };
    this.monstrosService.getMonstros().subscribe((data: any) => {
      this.monstros = data;
    });
  }
}