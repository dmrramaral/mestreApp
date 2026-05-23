import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

/**
 * Serviço para gerenciar dados de itens/loot
 */
@Injectable({
  providedIn: 'root'
})
export class ItensService {
  private itensCache$?: Observable<any>;

  constructor(private http: HttpClient) { }

  /**
   * Obtém lista de itens
   * Usa cache para evitar requisições desnecessárias
   */
  getItens(): Observable<any> {
    if (!this.itensCache$) {
      this.itensCache$ = this.http.get<any>('/assets/faixa.json').pipe(
        shareReplay(1)
      );
    }
    return this.itensCache$;
  }
}
