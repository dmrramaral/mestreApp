import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MercadoService } from './mercado.service';
import { Mercado } from '../../models/mercado';

@Component({
  selector: 'app-mercado',
  standalone: true,
  imports: [
    CommonModule,

  ],
  templateUrl: './mercado.component.html',
  styleUrls: ['./mercado.component.scss']
})
export class MercadoComponent {

  mercado: Mercado;



  constructor(private mercadoService: MercadoService) {
    this.mercado = { armas: [
      {
        nome: 'Espada de Ferro',
        preco: 100,
        moeda: "ouro"
      },
      {
        nome: 'Espada de Diamante',
        preco: 1000,
        moeda: "ouro"
      }
    ], comidas: [], bebidas: [], armaduras: [] };
  }

  ngOnInit() {
    this.mercadoService.getMercado().subscribe((data: any) => {
      this.mercado = data.mercado as Mercado;
      console.log(this.mercado);

    });
  }

 
}
