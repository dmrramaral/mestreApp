import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Mercado } from '../../models/mercado';
import { MercadoService } from './mercado.service';

/**
 * Componente para exibir o mercado de itens/equipamentos
 * Permite filtrar por categoria e subcategoria
 */
@Component({
  selector: 'app-mercado',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './mercado.component.html',
  styleUrls: ['./mercado.component.scss']
})
export class MercadoComponent implements OnInit {

  mercado: Mercado;
  mercadoDnD: any;

  filter = {
    category: '',
    subcategory: ''
  }

  categories: any[] = [];
  subcategories: any[] = [];

  constructor(private mercadoService: MercadoService) {
    this.mercado = { armas: [], comidas: [], bebidas: [], armaduras: [], aneis: [], amuletos: [] };
  }

  ngOnInit() {
    this.mercadoService.getMercado().subscribe((data: any) => {
      this.mercado = data.mercado as Mercado;
    });

    this.mercadoService.getMercadoDnD().subscribe((data: any) => {
      this.mercadoDnD = data;
      this.categories = [...new Set(this.mercadoDnD
        .filter((item: any) => item.equipment_category && item.equipment_category.name)
        .map((item: any) => item.equipment_category.name as string)
      )].sort((a, b) => (a as string).localeCompare(b as string));

      this.subcategories = [...new Set(this.mercadoDnD
        .filter((item: any) => item.gear_category && item.gear_category.name)
        .map((item: any) => item.gear_category.name as string)
      )].sort((a, b) => (a as string).localeCompare(b as string));
    });
  }

  /**
   * Aplica filtros de categoria e subcategoria aos itens do mercado
   */
  applyFilters() {
    this.mercadoService.getMercadoDnD().subscribe((data: any) => {
      this.mercadoDnD = data.filter((item: any) => {
        const result = (this.filter.category ? item.equipment_category.name === this.filter.category : true) &&
          (this.filter.subcategory ? item.gear_category && item.gear_category.name === this.filter.subcategory : true);

        return result;
      });
    });
  }
}
