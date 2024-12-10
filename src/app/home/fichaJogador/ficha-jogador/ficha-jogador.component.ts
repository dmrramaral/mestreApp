import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ficha-jogador',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ficha-jogador.component.html',
  styleUrl: './ficha-jogador.component.scss'
})
export class FichaJogadorComponent implements OnInit {

  jogador: any;
  
  adicionandoMagia: boolean = false;
  novaMagia: any = { nome: '', descricao: '' };

  adicionandoItem: boolean = false;
  novoItem: any = { nome: '', descricao: '' };

  adicionandoTalento: boolean = false;
  novoTalento: any = { nome: '', descricao: '' };


  constructor() { }

  ngOnInit(): void {
    this.jogador = {
      avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      nome: 'Douglas',
      idade: 20,
      classe: 'Academico',
      raca: 'Humano',
      nivel: 1,
      pv: 30,
      pva: 10,
      ca: 15,
      deslocamento: 30,
      iniciativa: 2,
      inspiracao: 1,
      talentos: [
        { nome: 'Estratégia', descricao: '+1 Inteligencia' },
        { nome: 'Retorno Reação', descricao: 'Levando um da outro' },
        { nome: 'Intimidador Nato', descricao: 'Intimida' },
      ],
      atributos: {
        forca: 10,
        destreza: 12,
        constituicao: 14,
        inteligencia: 16,
        sabedoria: 8,
        carisma: 10,
        sorte: 12
      },
      pericias: [
        { nome: 'Atletismo', valor: 'sim' },
        { nome: 'Briga', valor: 'sim' },
        { nome: 'Acrobacia', valor: 'nao' },
        { nome: 'Furtividade', valor: 'sim' },
        { nome: 'Prestidigitação', valor: 'nao' },
        { nome: 'Resistência', valor: 'sim' },
        { nome: 'Tolerância', valor: 'sim' },
        { nome: 'Arcanismo', valor: 'sim' },
        { nome: 'Engenharia', valor: 'sim' },
        { nome: 'Investigação', valor: 'sim' },
        { nome: 'Natureza', valor: 'nao' },
        { nome: 'Religião', valor: 'sim' },
        { nome: 'Adestrar Animais', valor: 'nao' },
        { nome: 'Intuição', valor: 'sim' },
        { nome: 'Medicina', valor: 'sim' },
        { nome: 'Percepção', valor: 'sim' },
        { nome: 'Sobrevivência', valor: 'nao' },
        { nome: 'Atuação', valor: 'nao' },
        { nome: 'Enganação', valor: 'sim' },
        { nome: 'Intimidação', valor: 'sim' },
        { nome: 'Persuasão', valor: 'nao' },
        { nome: 'Adivinhação', valor: 'nao' },
        { nome: 'Jogos de Azar', valor: 'sim' },
        { nome: 'Sincronicidade', valor: 'nao' }
      ],
      equipamentos: {
        cabeca: [
          { nome: 'Capacete Pesado', descricao: 'Vantagem Cegueira e encantamento' }
        ],
        armadura: [
          { nome: 'Armadura de Placa', descricao: 'CA 16 -1 Cortante S/Medo' }
        ],
        pes: [
          { nome: 'Botas de Velocidade', descricao: 'Deslocamento +10' }
        ],
        escudo: [
          { nome: 'Escudo de Madeira', descricao: 'CA +2' }
        ],
        amuleto: [
          { nome: 'Benção', descricao: '1d4 PD' }
        ],
        anel: [
          { nome: 'Anel de Proteção', descricao: 'CA +1' }
        ]
       
      }
    };
  }

 
  adicionarMagia() {
    this.adicionandoMagia = true;
  }

  confirmarAdicionarMagia() {
    if (this.novaMagia.nome && this.novaMagia.descricao) {
      if (!this.jogador.magias) {
        this.jogador.magias = [];
      }
      this.jogador.magias.push({ ...this.novaMagia });
      this.novaMagia = { nome: '', descricao: '' };
      this.adicionandoMagia = false;
    }
  }

  cancelarAdicionarMagia() {
    this.novaMagia = { nome: '', descricao: '' };
    this.adicionandoMagia = false;
  }

  calcularModificador(arg0: any) {
      if (arg0 >= 8 && arg0 <= 9) {
        return -1;
      } else if (arg0 >= 10 && arg0 <= 11) {
        return 0;
      } else if (arg0 >= 12 && arg0 <= 13) {
        return 1;
      } else if (arg0 >= 14 && arg0 <= 15) {
        return 2;
      } else if (arg0 >= 16 && arg0 <= 17) {
        return 3;
      } else if (arg0 >= 18 && arg0 <= 19) {
        return 4;
      } else if (arg0 >= 20 && arg0 <= 21) {
        return 5;
      } else if (arg0 >= 22 && arg0 <= 23) {
        return 6;
      } else if (arg0 >= 24 && arg0 <= 25) {
        return 7;
      } else if (arg0 >= 26 && arg0 <= 27) {
        return 8;
      } else if (arg0 >= 28 && arg0 <= 29) {
        return 9;
      } else if (arg0 == 30) {
        return 10;
      } else {
        return null;
      }

  }



  adicionarItem() {
    this.adicionandoItem = true;
  }

  confirmarAdicionarItem() {
    if (this.novoItem.nome && this.novoItem.descricao) {
      if (!this.jogador.mochila) {
        this.jogador.mochila = [];
      }
      this.jogador.mochila.push({ ...this.novoItem });
      this.novoItem = { nome: '', descricao: '' };
      this.adicionandoItem = false;
    }
  }

  cancelarAdicionarItem() {
    this.novoItem = { nome: '', descricao: '' };
    this.adicionandoItem = false;
  }
    

 

  adicionarTalento() {
    this.adicionandoTalento = true;
  }

  confirmarAdicionarTalento() {
    if (this.novoTalento.nome && this.novoTalento.descricao) {
      if (!this.jogador.talentos) {
        this.jogador.talentos = [];
      }
      this.jogador.talentos.push({ ...this.novoTalento });
      this.novoTalento = { nome: '', descricao: '' };
      this.adicionandoTalento = false;
    }
  }

  cancelarAdicionarTalento() {
    this.novoTalento = { nome: '', descricao: '' };
    this.adicionandoTalento = false;
  }
}
