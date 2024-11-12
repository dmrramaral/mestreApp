import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonstrosService {

  private apiDnD = 'https://www.dnd5eapi.co/api/monsters';
  mostrosData : any;
  mostrosListaData : any;


  constructor(private httpCliente : HttpClient) { }

  getMonstros() {
    return this.httpCliente.get(this.apiDnD);
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
  getMonstrosComCaracteristicas(): Observable<any>{
    const monstrosComCaracteristicas: any[] = [];

    this.getMonstros().subscribe((data: any) => {
      data.results.forEach((monstro: any) => {
        this.httpCliente.get('https://www.dnd5eapi.co' + monstro.url).subscribe((caracteristicas: any) => {
          monstrosComCaracteristicas.push(caracteristicas);
        });
      });
    });

    return of(monstrosComCaracteristicas);
  }
}
