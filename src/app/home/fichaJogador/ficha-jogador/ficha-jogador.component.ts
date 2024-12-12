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
      avatar: 'https://www.w3schools.com/howto/img_avatar.png',
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
        pericias: [
          {
            nome: "Atletismo",
            valor: "nao"
          },
          {
            nome: "Briga",
            valor: "nao"
          },
          {
            nome: "Acrobacia",
            valor: "nao"
          },
          {
            nome: "Furtividade",
            valor: "nao"
          },
          {
            nome: "Prestidigitação",
            valor: "nao"
          },
          {
            nome: "Resistência",
            valor: "nao"
          },
          {
            nome: "Tolerância",
            valor: "nao"
          },
          {
            nome: "Arcanismo",
            valor: "nao"
          },
          {
            nome: "Engenharia",
            valor: "nao"
          },
          {
            nome: "Investigação",
            valor: "nao"
          },
          {
            nome: "Natureza",
            valor: "nao"
          },
          {
            nome: "Religião",
            valor: "nao"
          },
          {
            nome: "Adestrar Animais",
            valor: "nao"
          },
          {
            nome: "Intuição",
            valor: "nao"
          },
          {
            nome: "Medicina",
            valor: "nao"
          },
          {
            nome: "Percepção",
            valor: "nao"
          },
          {
            nome: "Sobrevivência",
            valor: "nao"
          },
          {
            nome: "Atuação",
            valor: "nao"
          },
          {
            nome: "Enganação",
            valor: "nao"
          },
          {
            nome: "Intimidação",
            valor: "nao"
          },
          {
            nome: "Persuasão",
            valor: "nao"
          },
          {
            nome: "Adivinhação",
            valor: "nao"
          },
          {
            nome: "Jogos de Azar",
            valor: "nao"
          },
          {
            nome: "Sincronicidade",
            valor: "nao"
          }          
        ],
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

    const jogador = this.localStorageServcieService.getItem(this.cacheKey);
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
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
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
        pericias: [
          {
            nome: "Atletismo",
            valor: "nao"
          },
          {
            nome: "Briga",
            valor: "nao"
          },
          {
            nome: "Acrobacia",
            valor: "nao"
          },
          {
            nome: "Furtividade",
            valor: "nao"
          },
          {
            nome: "Prestidigitação",
            valor: "nao"
          },
          {
            nome: "Resistência",
            valor: "nao"
          },
          {
            nome: "Tolerância",
            valor: "nao"
          },
          {
            nome: "Arcanismo",
            valor: "nao"
          },
          {
            nome: "Engenharia",
            valor: "nao"
          },
          {
            nome: "Investigação",
            valor: "nao"
          },
          {
            nome: "Natureza",
            valor: "nao"
          },
          {
            nome: "Religião",
            valor: "nao"
          },
          {
            nome: "Adestrar Animais",
            valor: "nao"
          },
          {
            nome: "Intuição",
            valor: "nao"
          },
          {
            nome: "Medicina",
            valor: "nao"
          },
          {
            nome: "Percepção",
            valor: "nao"
          },
          {
            nome: "Sobrevivência",
            valor: "nao"
          },
          {
            nome: "Atuação",
            valor: "nao"
          },
          {
            nome: "Enganação",
            valor: "nao"
          },
          {
            nome: "Intimidação",
            valor: "nao"
          },
          {
            nome: "Persuasão",
            valor: "nao"
          },
          {
            nome: "Adivinhação",
            valor: "nao"
          },
          {
            nome: "Jogos de Azar",
            valor: "nao"
          },
          {
            nome: "Sincronicidade",
            valor: "nao"
          }          
        ],
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
  }

  removerEquipamento(categoria: string, equipamento: { nome: string, descricao: string }) {
    this.jogador.equipamentos[categoria] = this.jogador.equipamentos[categoria].filter((e: { nome: string, descricao: string }) => e.nome !== equipamento.nome);
    this.saveToCache();
  }

  updatePericiaValor(event: Event, pericia: any) {
    const input = event.target as HTMLInputElement;
    pericia.valor = input.checked ? 'sim' : 'nao';
  }
}
