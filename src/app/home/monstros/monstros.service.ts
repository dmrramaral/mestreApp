import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { table } from 'console';
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

/*   getCaracteristicasForEachMontros() {
    this.getMonstros().subscribe((data: any) => {
      data.results.forEach((monstro: any) => {
        this.httpCliente.get('https://www.dnd5eapi.co' + monstro.url).subscribe((data: any) => {
          this.mostrosData = data;
          console.log(data);
        });
      });
    });

    return this.mostrosData;
  }  */
  
}
