import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { JSON_PATHS } from '../../core/constants/rpg.constants';

/**
 * Serviço para gerenciar dados de monstros
 */
@Injectable({
  providedIn: 'root'
})
export class MonstrosService {
  private monstrosCache$?: Observable<any>;

  constructor(private httpCliente: HttpClient) { }

  /**
   * Obtém lista de monstros
   * Usa cache para evitar requisições desnecessárias
   */
  getMonstros(): Observable<any> {
    if (!this.monstrosCache$) {
      this.monstrosCache$ = this.httpCliente.get(JSON_PATHS.MONSTERS).pipe(
        shareReplay(1)
      );
    }
    return this.monstrosCache$;
  }
}
