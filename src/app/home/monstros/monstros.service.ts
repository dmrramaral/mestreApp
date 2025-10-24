import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonstrosService {

  private apiDnD = 'https://www.dnd5eapi.co/api/monsters';
  private readonly jsonDnD = '/assets/dnd.json';
  mostrosData : any;
  mostrosListaData : any;


  constructor(private httpCliente : HttpClient) { }

  getMonstros() {

    return this.httpCliente.get(this.jsonDnD).pipe(take(1));
  }

  
}
