import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadoService {

  private readonly API = '/assets/mercado.json';
  private readonly APIMercado = '/assets/equipments.json';
  private apiDnD = 'https://www.dnd5eapi.co/api/equipment';
  
  constructor(private httpClient : HttpClient) { }

 
  getMercado() {
    return this.httpClient.get(this.API).pipe(take(1));
  }

  getMercadoDnD() {
    return this.httpClient.get(this.APIMercado).pipe(take(1));
  }

  getCaracteristicasEquipamentos(){
    this.getMercadoDnD().subscribe((data: any) => {
      const equipamentos = data.results;
      const caracteristicas: any[] = [];

      equipamentos.forEach((equipamento: any) => {
        this.httpClient.get(`https://www.dnd5eapi.co${equipamento.url}`).pipe(take(1)).subscribe((detalhes: any) => {
          caracteristicas.push(detalhes);
          if (caracteristicas.length === equipamentos.length) {
            console.log(JSON.stringify(caracteristicas));
          }
        });
      });
    });
  }




}
