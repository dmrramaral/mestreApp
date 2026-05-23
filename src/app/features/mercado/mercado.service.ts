import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, take } from 'rxjs';
import { API_URLS, JSON_PATHS } from '../../core/constants/rpg.constants';

/**
 * Serviço para gerenciar dados do mercado
 */
@Injectable({
  providedIn: 'root'
})
export class MercadoService {
  private mercadoCache$?: Observable<any>;
  private equipmentCache$?: Observable<any>;
  
  constructor(private httpClient: HttpClient) { }

  /**
   * Obtém dados do mercado local
   * Usa cache para evitar requisições desnecessárias
   */
  getMercado(): Observable<any> {
    if (!this.mercadoCache$) {
      this.mercadoCache$ = this.httpClient.get('/assets/mercado.json').pipe(
        shareReplay(1)
      );
    }
    return this.mercadoCache$;
  }

  /**
   * Obtém dados de equipamentos D&D
   * Usa cache para evitar requisições desnecessárias
   */
  getMercadoDnD(): Observable<any> {
    if (!this.equipmentCache$) {
      this.equipmentCache$ = this.httpClient.get('/assets/equipments.json').pipe(
        shareReplay(1)
      );
    }
    return this.equipmentCache$;
  }

  /**
   * Busca características detalhadas de equipamentos
   * @deprecated Método não utilizado - considere remover se não for necessário
   */
  getCaracteristicasEquipamentos(): void {
    this.getMercadoDnD().subscribe((data: any) => {
      const equipamentos = data.results;
      const caracteristicas: any[] = [];

      equipamentos.forEach((equipamento: any) => {
        this.httpClient.get(`${API_URLS.DND_EQUIPMENT}${equipamento.url}`).pipe(take(1)).subscribe((detalhes: any) => {
          caracteristicas.push(detalhes);
          if (caracteristicas.length === equipamentos.length) {
            console.log(JSON.stringify(caracteristicas));
          }
        });
      });
    });
  }
}
