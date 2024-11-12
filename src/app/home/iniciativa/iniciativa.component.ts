import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorageServcieService } from '../localStorage/local-storage-servcie.service';

@Component({
  selector: 'app-iniciativa',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './iniciativa.component.html',
  styleUrl: './iniciativa.component.scss'
})
export class IniciativaComponent implements OnInit {

  nome!: string;
  iniciativa: number | null = null;

  listaIniciativa: any[] = [];


  constructor(private localStorageServcieService: LocalStorageServcieService) { }

  ngOnInit() {
    const listaIniciativa = this.localStorageServcieService.getItem('listaIniciativa');
    if (listaIniciativa) {
      this.listaIniciativa = JSON.parse(listaIniciativa);
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.localStorageServcieService.setItem('listaIniciativa', JSON.stringify(this.listaIniciativa));
      });
    }

  }






  adicionar() {
    this.listaIniciativa.push({ nome: this.nome, iniciativa: this.iniciativa });
    this.listaIniciativa.sort((a, b) => b.iniciativa - a.iniciativa);
    this.nome = '';
    this.iniciativa = null;
    this.localStorageServcieService.setItem('listaIniciativa', JSON.stringify(this.listaIniciativa));
  }

  remover(jogador: any) {
    const index = this.listaIniciativa.indexOf(jogador);
    this.listaIniciativa.splice(index, 1);
  }
}
