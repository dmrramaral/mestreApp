import { Component } from '@angular/core';
import { LootItens } from '../../models/loot-itens';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { ItensService } from './itens.service';
import { Observable } from 'rxjs';
import { Item } from '../../models/item';

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




  constructor(private serviceItens: ItensService ) { }

  ngOnInit() {
   this.serviceItens.getItens().subscribe((data: any[]) => {
      this.itens = data;
    });
  }


  buscarItens() {
    this.geradorRange();
    this.sortearItem();

  }

  acertoCritico() {
    this.rangeItens ="Acerto Crítico"
    this.itemSorteado = this.itens.find(item => item.tipo === this.ObjetoItem &&
      item.range === this.dadoRange && item.sorte === this.rangeItens);

    
  }



  geradorRange() {
    console.log('Gerando Range');
    if (this.sorteJogador === undefined) {
      this.rangeItens = 'critico';
    } else if (this.sorteJogador >= 2 && this.sorteJogador <= 9) {
      this.rangeItens = 'Baixa';
    } else if (this.sorteJogador >= 10 && this.sorteJogador <= 15) {
      this.rangeItens = 'Média';
    } else if (this.sorteJogador >= 16 && this.sorteJogador <= 22) {
      this.rangeItens = 'Alta';
    } else if (this.sorteJogador >= 23) {
      this.rangeItens = 'Lendária';
    } else {
      this.rangeItens = 'critico';
    }
  }

  sortearItem() {

    this.itemSorteado = this.itens.find(item => item.tipo === this.ObjetoItem &&
      item.range === this.dadoRange && item.sorte === this.rangeItens);
    
  }

  

}
