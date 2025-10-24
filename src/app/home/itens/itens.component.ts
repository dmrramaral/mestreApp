import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ItensService } from './itens.service';
import { Item } from '../../models/item';
import { LOOT_RARITY_RANGES } from '../../core/constants/rpg.constants';

/**
 * Componente para geração de loot/itens aleatórios
 * Permite sortear itens com base em raridade e tipo
 */
@Component({
  selector: 'app-itens',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './itens.component.html',
  styleUrl: './itens.component.scss'
})
export class ItensComponent implements OnInit {

  itens!: any[];
  ObjetoItem: string = "Objeto";
  sorteJogador!: number;
  dadoRange!: number;
  rangeItens!: string;
  itemSorteado!: Item;

  constructor(private serviceItens: ItensService) { }

  ngOnInit() {
    this.serviceItens.getItens().subscribe((data: any[]) => {
      this.itens = data;
    });
  }

  /**
   * Busca e sorteia um item baseado nos parâmetros atuais
   */
  buscarItens() {
    this.geradorRange();
    this.sortearItem();
  }

  /**
   * Define o item como acerto crítico
   */
  acertoCritico() {
    this.rangeItens = "Acerto Crítico"
    this.itemSorteado = this.itens.find(item => item.tipo === this.ObjetoItem &&
      item.range === this.dadoRange && item.sorte === this.rangeItens);
  }

  /**
   * Gera a faixa de raridade baseada no valor sorteado
   * Usa constantes definidas para determinar raridade
   */
  geradorRange() {
    if (this.sorteJogador === undefined) {
      this.rangeItens = 'critico';
    } else if (this.sorteJogador >= LOOT_RARITY_RANGES.BAIXA.min && 
               this.sorteJogador <= LOOT_RARITY_RANGES.BAIXA.max) {
      this.rangeItens = LOOT_RARITY_RANGES.BAIXA.nome;
    } else if (this.sorteJogador >= LOOT_RARITY_RANGES.MEDIA.min && 
               this.sorteJogador <= LOOT_RARITY_RANGES.MEDIA.max) {
      this.rangeItens = LOOT_RARITY_RANGES.MEDIA.nome;
    } else if (this.sorteJogador >= LOOT_RARITY_RANGES.ALTA.min && 
               this.sorteJogador <= LOOT_RARITY_RANGES.ALTA.max) {
      this.rangeItens = LOOT_RARITY_RANGES.ALTA.nome;
    } else if (this.sorteJogador >= LOOT_RARITY_RANGES.LENDARIA.min) {
      this.rangeItens = LOOT_RARITY_RANGES.LENDARIA.nome;
    } else {
      this.rangeItens = 'critico';
    }
  }

  /**
   * Sorteia um item da lista com base nos critérios definidos
   */
  sortearItem() {
    this.itemSorteado = this.itens.find(item => item.tipo === this.ObjetoItem &&
      item.range === this.dadoRange && item.sorte === this.rangeItens);
  }
}
