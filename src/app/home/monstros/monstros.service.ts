import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonstrosService {

  private apiDnD = 'https://www.dnd5eapi.co/api/monsters/';

  constructor(private httpCliente : HttpClient) { }

  getMonstros() {
    return this.httpCliente.get(this.apiDnD);
  }
}
