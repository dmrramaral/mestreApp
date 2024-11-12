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
    this.mercado = { armas: [], comidas: [], bebidas: [], armaduras: [], aneis: [], amuletos: [] };
  }

  ngOnInit() {
    this.mercadoService.getMercado().subscribe((data: any) => {
      this.mercado = data.mercado as Mercado;
      console.log(this.mercado);

    });
  }

 
}
