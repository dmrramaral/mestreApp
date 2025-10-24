import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Mercado } from '../../models/mercado';
import { MercadoService } from './mercado.service';
import { DndApiService } from '../../core/services/dnd-api.service';
import { forkJoin } from 'rxjs';

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
  mercadoDnD: any[] = [];
  weapons: any[] = [];
  armors: any[] = [];

  filter = {
    category: '',
    subcategory: ''
  }

  categories: any[] = [];
  subcategories: any[] = [];
  activeTab: string = 'all';

  constructor(
    private mercadoService: MercadoService,
    private dndApiService: DndApiService
  ) {
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

    // Load weapons from D&D API
    this.loadWeaponsFromDndApi();
    
    // Load armors from D&D API
    this.loadArmorsFromDndApi();
  }

  /**
   * Carrega armas detalhadas da API D&D
   */
  loadWeaponsFromDndApi() {
    // Fetch equipment-category for weapons
    this.dndApiService.getEquipmentCategoryDetails('weapons').subscribe({
      next: (weaponCategory: any) => {
        if (weaponCategory && weaponCategory.equipment) {
          // Fetch detailed information for each weapon
          const weaponDetails$ = weaponCategory.equipment.map((weapon: any) => 
            this.dndApiService.getEquipmentDetails(weapon.index)
          );
          
          if (weaponDetails$.length > 0) {
            forkJoin(weaponDetails$).subscribe((details) => {
              this.weapons = details as any[];
            });
          }
        }
      },
      error: (error) => {
        console.error('Erro ao carregar categoria de armas:', error);
      }
    });
  }

  /**
   * Carrega armaduras detalhadas da API D&D
   */
  loadArmorsFromDndApi() {
    // Fetch equipment-category for armor
    this.dndApiService.getEquipmentCategoryDetails('armor').subscribe({
      next: (armorCategory: any) => {
        if (armorCategory && armorCategory.equipment) {
          // Fetch detailed information for each armor
          const armorDetails$ = armorCategory.equipment.map((armor: any) => 
            this.dndApiService.getEquipmentDetails(armor.index)
          );
          
          if (armorDetails$.length > 0) {
            forkJoin(armorDetails$).subscribe((details) => {
              this.armors = details as any[];
            });
          }
        }
      },
      error: (error) => {
        console.error('Erro ao carregar categoria de armaduras:', error);
      }
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
