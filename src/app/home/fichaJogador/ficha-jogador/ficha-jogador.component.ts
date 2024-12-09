import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ficha-jogador',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './ficha-jogador.component.html',
  styleUrl: './ficha-jogador.component.scss'
})
export class FichaJogadorComponent implements OnInit {
  jogador: any;

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
        sorte: 5
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

}
