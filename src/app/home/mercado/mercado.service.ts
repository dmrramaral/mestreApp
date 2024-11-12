import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadoService {

  private readonly API = '/assets/mercado.json';
  
  constructor(private httpClient : HttpClient) { }
  getMercado() {
    return this.httpClient.get(this.API).pipe(take(1));
  }


}
