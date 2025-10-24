import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../../core/services/storage.service';
import { FichaJogadorService } from '../../../core/services/ficha-jogador.service';
import { calcularModificador, formatarModificador } from '../../../core/utils/rpg.utils';
import { STORAGE_KEYS, EQUIPMENT_CATEGORIES } from '../../../core/constants/rpg.constants';

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
        iniciativa: null,
        inspiracao: null,
        fome: null,
        sede: null,
        cansaco: null,
        calor: null,
        frio: null,
        sono: null,
        
        proficiencia: null,
        deslocamento: null,
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
        ouro: 0,
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

  editandoAtributos: boolean = false;
  editandoPericias: boolean = false;
  editandoCombate: boolean = false;

  private cacheKey = STORAGE_KEYS.PLAYER_CHARACTER;
  readonly equipmentCategories = EQUIPMENT_CATEGORIES;

  constructor(
    private storageService: StorageService,
    private fichaService: FichaJogadorService
  ) {

  }

  saveToCache() {
    this.storageService.setObject(this.cacheKey, this.jogador);
  }

  ngOnInit(): void {
    const jogador = this.storageService.getObject(this.cacheKey);
    if (jogador) {
      this.jogador = jogador;
    } else {
      this.jogador = this.fichaService.criarFichaVazia();
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.storageService.setObject(this.cacheKey, this.jogador);
      });
    }
  }
  limparCache() {
    if (confirm('Tem certeza que deseja limpar o cache?')) {
      this.storageService.removeItem(this.cacheKey);
      this.jogador = this.fichaService.criarFichaVazia();
      this.saveToCache();
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

  /**
   * Calcula modificador de um atributo
   * Usa função utilitária centralizada
   */
  calcularModificador(valor: any): number | null {
    return calcularModificador(valor);
  }

  /**
   * Formata modificador com sinal apropriado
   */
  formatarModificador(modificador: number | null): string {
    return formatarModificador(modificador);
  }



  adicionarItem() {
    this.adicionandoItem = true;
  }

  removerItem(item: { nome: string, descricao: string }) {
    this.fichaService.removerItemMochila(this.jogador, item);
    this.saveToCache();
  }

  confirmarAdicionarItem() {
    if (this.novoItem.nome && this.novoItem.descricao) {
      this.fichaService.adicionarItemMochila(this.jogador, this.novoItem);
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
    this.fichaService.removerTalento(this.jogador, talento);
    this.saveToCache();
  }

  confirmarAdicionarTalento() {
    if (this.novoTalento.nome && this.novoTalento.descricao) {
      this.fichaService.adicionarTalento(this.jogador, this.novoTalento);
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
      this.fichaService.adicionarEquipamento(this.jogador, this.novaCategoria, this.novoEquipamento);
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
    this.fichaService.removerEquipamento(this.jogador, categoria, equipamento);
    this.saveToCache();
  }

  updatePericiaValor(event: Event, pericia: any) {
    const input = event.target as HTMLInputElement;
    pericia.valor = input.checked ? 'sim' : 'nao';
  }

  getCategoryIcon(categoria: string): string {
    const icons: { [key: string]: string } = {
      'cabeca': 'fa-hat-wizard',
      'armadura': 'fa-vest',
      'pes': 'fa-socks',
      'escudo': 'fa-shield-alt',
      'amuleto': 'fa-gem',
      'anel': 'fa-ring'
    };
    return icons[categoria] || 'fa-shield';
  }

  getCategoryName(categoria: string): string {
    const names: { [key: string]: string } = {
      'cabeca': 'Cabeça',
      'armadura': 'Armadura',
      'pes': 'Pés',
      'escudo': 'Escudo',
      'amuleto': 'Amuleto',
      'anel': 'Anel'
    };
    return names[categoria] || categoria;
  }

  hasEquipment(): boolean {
    return Object.values(this.jogador.equipamentos).some((arr: any) => arr && arr.length > 0);
  }

  hasProficiencies(): boolean {
    return this.jogador.pericias.some((p: any) => p.valor === 'sim');
  }

  toggleEditarAtributos() {
    this.editandoAtributos = !this.editandoAtributos;
  }

  toggleEditarPericias() {
    this.editandoPericias = !this.editandoPericias;
  }

  toggleEditarCombate() {
    this.editandoCombate = !this.editandoCombate;
  }
}
