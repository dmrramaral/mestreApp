import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorageServcieService } from '../../localStorage/local-storage-servcie.service';

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

  jogador: any =
    {
      "avatar": "https://www.w3schools.com/howto/img_avatar.png",
      "nome": "Amaral",
      "idade": 20,
      "classe": "Academico",
      "raca": "Humano",
      "nivel": 3,
      "pv": 30,
      "pva": 30,
      "ca": 19,
      "fome": 10,
      "sede": 10,
      "cansaco": 10,
      "calor": 10,
      "frio": 10,
      "sono": 10,
      "proficiencia": 2,
      "deslocamento": 30,
      "iniciativa": -1,
      "inspiracao": 0,
      "talentos": [
        {
          "nome": "Estratégia Rápida",
          "descricao": "+1 em Inteligência. Uma vez por descanso curto, use uma ação bônus para conceder a um aliado próximo vantagem em um teste de habilidade ou ataque"
        },
        {
          "nome": "Retorno Impiedoso",
          "descricao": "Quando você for atingido por um ataque corpo a corpo, use sua reação para realizar um ataque básico contra o atacante. Uma vez por combate."
        },
        {
          "nome": "Intimidador Nato",
          "descricao": "+1 em Carisma. Uma vez por descanso longo, adicione o dobro do seu modificador de Carisma em testes de Intimidação, Enganação e Persuasão."
        }
      ],
      "atributos": {
        "forca": 14,
        "destreza": 8,
        "constituicao": 10,
        "inteligencia": 13,
        "sabedoria": 8,
        "carisma": 16,
        "sorte": 12
      },
      "pericias": [
        {
          "nome": "Atletismo",
          "valor": "nao"
        },
        {
          "nome": "Briga",
          "valor": "nao"
        },
        {
          "nome": "Acrobacia",
          "valor": "nao"
        },
        {
          "nome": "Furtividade",
          "valor": "nao"
        },
        {
          "nome": "Prestidigitação",
          "valor": "nao"
        },
        {
          "nome": "Resistência",
          "valor": "nao"
        },
        {
          "nome": "Tolerância",
          "valor": "nao"
        },
        {
          "nome": "Arcanismo",
          "valor": "sim"
        },
        {
          "nome": "Engenharia",
          "valor": "nao"
        },
        {
          "nome": "Investigação",
          "valor": "sim"
        },
        {
          "nome": "Natureza",
          "valor": "sim"
        },
        {
          "nome": "Religião",
          "valor": "nao"
        },
        {
          "nome": "Adestrar Animais",
          "valor": "nao"
        },
        {
          "nome": "Intuição",
          "valor": "nao"
        },
        {
          "nome": "Medicina",
          "valor": "nao"
        },
        {
          "nome": "Percepção",
          "valor": "sim"
        },
        {
          "nome": "Sobrevivência",
          "valor": "sim"
        },
        {
          "nome": "Atuação",
          "valor": "nao"
        },
        {
          "nome": "Enganação",
          "valor": "nao"
        },
        {
          "nome": "Intimidação",
          "valor": "nao"
        },
        {
          "nome": "Persuasão",
          "valor": "sim"
        },
        {
          "nome": "Adivinhação",
          "valor": "nao"
        },
        {
          "nome": "Jogos de Azar",
          "valor": "nao"
        },
        {
          "nome": "Sincronicidade",
          "valor": "nao"
        }
      ],
      "equipamentos": {
        "cabeca": [
          {
            "nome": "Capacete Pesado",
            "descricao": "Vantagem Cegueira e encantamento"
          }
        ],
        "armadura": [
          {
            "nome": "Armadura de Placa",
            "descricao": "CA 16 -1 Cortante S/Medo"
          }
        ],
        "pes": [
          {
            "nome": "Botas de Velocidade",
            "descricao": "Deslocamento +10"
          }
        ],
        "escudo": [
          {
            "nome": "Escudo de Madeira",
            "descricao": "CA +2"
          }
        ],
        "amuleto": [
          {
            "nome": "Amuleto Benção",
            "descricao": "1d4 PD"
          }
        ],
        "anel": [
          {
            "nome": "Anel de Proteção",
            "descricao": "CA +1"
          }
        ]
      },
      "magias": [
        {
          "nome": "Ataque Corpo a Corpo nv1",
          "descricao": "Golpe Radiante: Causa 1d6 de dano cortante + 1d4 de dano radiante."
        },
        {
          "nome": "Luz Ofuscante nv1",
          "descricao": "Emite um flash de luz que causa 1d8 de dano radiante e cega um alvo por 2 turnos, em caso de falha em um teste de Constituição CD 14."
        },
        {
          "nome": "AB Reflexo de Luz: nv1",
          "descricao": "Concede +1 de bônus na CA por 2 turnos para cada criatura hostil que esteja em até 5m de distância do usuário (máx 3)."
        },
        {
          "nome": "AB Corte Iluminado: nv1",
          "descricao": "Aumenta o dano do próximo ataque em 1d8 de dano radiante no alvo e 1d4 de dano radiante em todos a até 5m de distância do alvo."
        },
        {
          "nome": "Explosão Radiante nv3",
          "descricao": "Causa 2d8 de dano radiante a todos em um raio de 5m ao redor do usuário. Inimigos atingidos devem passar em um teste de Constituição CD 14 ou ficarão cegos por 1 turno. O local se torna iluminado magicamente por 2 turnos. Tempo de Recarga: 2d4 turnos."
        },
        {
          "nome": "Escudo Luminoso nv3",
          "descricao": "Cria uma barreira de luz em volta do usuário ou de uma criatura a até 9m que absorve 2d6 de dano durante 2 turnos. Tempo de Recarga: 2d4 turnos."
        },
        {
          "nome": "Luz Purificadora nv3",
          "descricao": "Cura o usuário ou uma criatura a até 6m em 2d6 de vida e remove condições debilitantes como envenenamento, queimadura ou paralisia. Usar essa habilidade em uma criatura concede a ela Olhar Radiante por 1 turno. Tempo de Recarga: 2d4 turnos."
        },
        {
          "nome": "Passiva: Olhar Radiante nv3",
          "descricao": "Você é imune à condição de cegar e consegue enxergar na escuridão total. Caso esteja em um local iluminado magicamente, aumenta sua cura em 1d8 de qualquer fonte."
        },
        {
          "nome": "Passiva: Caminhar na Luz nv5",
          "descricao": "Enquanto estiver em um ambiente iluminado, seu deslocamento aumenta em 3m e resistência a dano necrótico."
        },
        {
          "nome": "Corte Celestial nv5",
          "descricao": "Ataque que causa 3d8 de dano cortante + 2d6 de dano radiante. Alcance: 1,5m. Tempo de Recarga: 2d4 turnos."
        },
        {
          "nome": "Aura de Clareza nv5",
          "descricao": "Concede imunidade a efeitos de medo e charmes a si e a até 3 criaturas a até 10m por 1d6 turnos. Tempo de Recarga: 1d4 turnos."
        },
        {
          "nome": "Proteção Sagrada nv5",
          "descricao": "Cria uma esfera de luz em torno de si ou de uma criatura a até 9m que reduz o dano recebido pela metade por 1d4 turnos. Após o fim deste efeito, uma área iluminada magicamente de 9m surge ao redor do alvo. Tempo de Recarga: 2d4 turnos."
        }
      ],
      "mochila": [
        {
          "nome": "Poção de Cura",
          "descricao": "Cura 2d4+2 de vida"
        },
        {
          "nome": "Poção de Resistência",
          "descricao": "Concede resistência a dano de um tipo por 1d4 turnos"
        }
      ]
    };

  novaCategoria: string = '';
  novoEquipamento: any = { nome: '', descricao: '' };
  adicionandoEquipamento: boolean = false;


  adicionandoMagia: boolean = false;
  novaMagia: any = { nome: '', descricao: '' };

  adicionandoItem: boolean = false;
  novoItem: any = { nome: '', descricao: '' };

  adicionandoTalento: boolean = false;
  novoTalento: any = { nome: '', descricao: '' };

  private cacheKey = 'jogador';

  constructor(private localStorageServcieService: LocalStorageServcieService) {

  }

  saveToCache() {
    localStorage.setItem(this.cacheKey, JSON.stringify(this.jogador));
  }

  ngOnInit(): void {

    const jogador = this.localStorageServcieService.getItem('jogador');
    if (jogador) {
      this.jogador = JSON.parse(jogador);
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.localStorageServcieService.setItem('jogador', JSON.stringify(this.jogador));
      });
    }

  }
  limparCache() {
    if (confirm('Tem certeza que deseja limpar o cache?')) {
      localStorage.removeItem(this.cacheKey);
      this.jogador = {
        avatar: '',
        nome: '',
        idade: null,
        classe: '',
        raca: '',
        nivel: null,
        pv: null,
        pva: null,
        ca: null,
        fome: null,
        sede: null,
        cansaco: null,
        calor: null,
        frio: null,
        sono: null,
        proficiencia: null,
        deslocamento: null,
        iniciativa: null,
        inspiracao: null,
        talentos: [],
        atributos: {
          forca: null,
          destreza: null,
          constituicao: null,
          inteligencia: null,
          sabedoria: null,
          carisma: null,
          sorte: null
        },
        pericias: [],
        equipamentos: {
          cabeca: [],
          armadura: [],
          pes: [],
          escudo: [],
          amuleto: [],
          anel: []
        },
        magias: [],
        mochila: []
      };
    }
  }
  confirmandoLimparCache: boolean = false;

  confirmarLimparCache() {
    this.confirmandoLimparCache = true;
  }

  cancelarLimparCache() {
    this.confirmandoLimparCache = false;
  }

  baixarJogador() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.jogador));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "jogador.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  carregarJogador(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const content = e.target.result;
        this.jogador = JSON.parse(content);
        this.saveToCache();
      };
      reader.readAsText(file);
    }
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
      this.saveToCache();
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

  removerItem(item: { nome: string, descricao: string }) {
    this.jogador.mochila = this.jogador.mochila.filter((i: { nome: string, descricao: string }) => i.nome !== item.nome);
    this.saveToCache();
  }

  confirmarAdicionarItem() {
    if (this.novoItem.nome && this.novoItem.descricao) {
      if (!this.jogador.mochila) {
        this.jogador.mochila = [];
      }
      this.jogador.mochila.push({ ...this.novoItem });
      this.novoItem = { nome: '', descricao: '' };
      this.adicionandoItem = false;
      this.saveToCache();
    }
  }

  cancelarAdicionarItem() {
    this.novoItem = { nome: '', descricao: '' };
    this.adicionandoItem = false;
  }




  adicionarTalento() {
    this.adicionandoTalento = true;
  }

  removerTalento(talento: { nome: string, descricao: string }) {
    this.jogador.talentos = this.jogador.talentos.filter((t: { nome: string, descricao: string }) => t.nome !== talento.nome);
    this.saveToCache();
  }

  confirmarAdicionarTalento() {
    if (this.novoTalento.nome && this.novoTalento.descricao) {
      if (!this.jogador.talentos) {
        this.jogador.talentos = [];
      }
      this.jogador.talentos.push({ ...this.novoTalento });
      this.novoTalento = { nome: '', descricao: '' };
      this.adicionandoTalento = false;
      this.saveToCache();
    }
  }

  cancelarAdicionarTalento() {
    this.novoTalento = { nome: '', descricao: '' };
    this.adicionandoTalento = false;
  }


  adicionarEquipamento() {
    this.adicionandoEquipamento = true;
    console.log(this.adicionandoEquipamento);
  }

  confirmarAdicionarEquipamento() {
    if (this.novaCategoria && this.novoEquipamento.nome && this.novoEquipamento.descricao) {
      if (!this.jogador.equipamentos[this.novaCategoria]) {
        this.jogador.equipamentos[this.novaCategoria] = [];
      }
      this.jogador.equipamentos[this.novaCategoria].push({ ...this.novoEquipamento });
      this.novoEquipamento = { nome: '', descricao: '' };
      this.novaCategoria = '';
      this.adicionandoEquipamento = false;
      this.saveToCache();
    }
  }

  cancelarAdicionarEquipamento() {
    this.novoEquipamento = { nome: '', descricao: '' };
    this.novaCategoria = '';
    this.adicionandoEquipamento = false;
    console.log(this.adicionandoEquipamento);
  }

  removerEquipamento(categoria: string, equipamento: { nome: string, descricao: string }) {
    this.jogador.equipamentos[categoria] = this.jogador.equipamentos[categoria].filter((e: { nome: string, descricao: string }) => e.nome !== equipamento.nome);
    this.saveToCache();
  }
}
