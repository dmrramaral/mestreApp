import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItensService {

  private readonly API = '/assets/faixa.json';


  constructor(private http: HttpClient) { }

  getItens() {
    return this.http.get<any>(this.API).pipe(take(1));
  }

}
