import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../../core/services/storage.service';
import { FichaJogadorService } from '../../../core/services/ficha-jogador.service';
import { DndApiService } from '../../../core/services/dnd-api.service';
import { calcularModificador, formatarModificador } from '../../../core/utils/rpg.utils';
import { STORAGE_KEYS, EQUIPMENT_CATEGORIES } from '../../../core/constants/rpg.constants';
import { ApiReference, DndClass, DndRace } from '../../../core/models/dnd-api.model';

// Tempo de delay para transições entre modais (em milissegundos)
const MODAL_TRANSITION_DELAY = 300;

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
        tracos: [],
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
  novoEquipamento: any = { nome: '', descricao: '', ca: null };
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
  
  editandoMagia: { [key: number]: boolean } = {};
  editandoTalento: { [key: number]: boolean } = {};
  editandoItem: { [key: number]: boolean } = {};
  editandoEquipamento: { [categoria: string]: { [key: number]: boolean } } = {};

  private cacheKey = STORAGE_KEYS.PLAYER_CHARACTER;
  readonly equipmentCategories = EQUIPMENT_CATEGORIES;

  // DND API data
  availableClasses: ApiReference[] = [];
  availableRaces: ApiReference[] = [];
  selectedClassDetails?: DndClass;
  selectedRaceDetails?: DndRace;
  loadingClassDetails = false;
  loadingRaceDetails = false;

  constructor(
    private storageService: StorageService,
    private fichaService: FichaJogadorService,
    private dndApiService: DndApiService
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

    // Carregar classes e raças da API
    this.loadClassesAndRaces();
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
      this.novoEquipamento = { nome: '', descricao: '', ca: null };
      this.novaCategoria = '';
      this.adicionandoEquipamento = false;
      this.saveToCache();
    }
  }

  cancelarAdicionarEquipamento() {
    this.novoEquipamento = { nome: '', descricao: '', ca: null };
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

  toggleEditarMagia(index: number) {
    this.editandoMagia[index] = !this.editandoMagia[index];
  }

  removerMagia(index: number) {
    this.jogador.magias.splice(index, 1);
    this.saveToCache();
  }

  toggleEditarTalento(index: number) {
    this.editandoTalento[index] = !this.editandoTalento[index];
  }

  toggleEditarItem(index: number) {
    this.editandoItem[index] = !this.editandoItem[index];
  }

  toggleEditarEquipamento(categoria: string, index: number) {
    if (!this.editandoEquipamento[categoria]) {
      this.editandoEquipamento[categoria] = {};
    }
    this.editandoEquipamento[categoria][index] = !this.editandoEquipamento[categoria][index];
  }

  /**
   * Carrega classes e raças da API DND
   */
  loadClassesAndRaces(): void {
    this.dndApiService.getClasses().subscribe({
      next: (data) => {
        this.availableClasses = data.results || [];
      },
      error: (error) => {
        console.error('Erro ao carregar classes:', error);
      }
    });

    this.dndApiService.getRaces().subscribe({
      next: (data) => {
        this.availableRaces = data.results || [];
      },
      error: (error) => {
        console.error('Erro ao carregar raças:', error);
      }
    });
  }

  /**
   * Visualiza detalhes de uma classe
   */
  viewClassDetails(classIndex: string): void {
    if (!classIndex) return;
    
    this.loadingClassDetails = true;
    this.dndApiService.getClassDetails(classIndex).subscribe({
      next: (data) => {
        this.selectedClassDetails = data;
        this.loadingClassDetails = false;
        
        // Fecha o modal de seleção e abre o modal de detalhes
        if (typeof window !== 'undefined') {
          const bootstrap = (window as any).bootstrap;
          if (bootstrap) {
            const selectionModal = bootstrap.Modal.getInstance(document.getElementById('classSelectionModal'));
            if (selectionModal) {
              selectionModal.hide();
            }
            
            // Abre o modal de detalhes após um pequeno delay
            setTimeout(() => {
              const detailsModal = new bootstrap.Modal(document.getElementById('classDetailsModal'));
              detailsModal.show();
            }, MODAL_TRANSITION_DELAY);
          }
        }
      },
      error: (error) => {
        console.error('Erro ao carregar detalhes da classe:', error);
        this.loadingClassDetails = false;
      }
    });
  }

  /**
   * Visualiza detalhes de uma raça
   */
  viewRaceDetails(raceIndex: string): void {
    if (!raceIndex) return;
    
    this.loadingRaceDetails = true;
    this.dndApiService.getRaceDetails(raceIndex).subscribe({
      next: (data) => {
        this.selectedRaceDetails = data;
        this.loadingRaceDetails = false;
        
        // Fecha o modal de seleção e abre o modal de detalhes
        if (typeof window !== 'undefined') {
          const bootstrap = (window as any).bootstrap;
          if (bootstrap) {
            const selectionModal = bootstrap.Modal.getInstance(document.getElementById('raceSelectionModal'));
            if (selectionModal) {
              selectionModal.hide();
            }
            
            // Abre o modal de detalhes após um pequeno delay
            setTimeout(() => {
              const detailsModal = new bootstrap.Modal(document.getElementById('raceDetailsModal'));
              detailsModal.show();
            }, MODAL_TRANSITION_DELAY);
          }
        }
      },
      error: (error) => {
        console.error('Erro ao carregar detalhes da raça:', error);
        this.loadingRaceDetails = false;
      }
    });
  }

  /**
   * Abre modal de seleção de classe, fechando o modal de edição
   */
  openClassSelection(): void {
    if (typeof window !== 'undefined') {
      const bootstrap = (window as any).bootstrap;
      if (bootstrap) {
        // Fecha o modal de edição
        const editModal = bootstrap.Modal.getInstance(document.getElementById('editarFichaModal'));
        if (editModal) {
          editModal.hide();
        }
        
        // Abre o modal de seleção após um pequeno delay
        setTimeout(() => {
          const selectionModal = new bootstrap.Modal(document.getElementById('classSelectionModal'));
          selectionModal.show();
        }, MODAL_TRANSITION_DELAY);
      }
    }
  }

  /**
   * Fecha modal de detalhes da classe e volta para o modal de seleção
   */
  closeClassDetails(): void {
    this.selectedClassDetails = undefined;
    
    // Fecha o modal de detalhes e reabre o modal de seleção
    if (typeof window !== 'undefined') {
      const bootstrap = (window as any).bootstrap;
      if (bootstrap) {
        const detailsModal = bootstrap.Modal.getInstance(document.getElementById('classDetailsModal'));
        if (detailsModal) {
          detailsModal.hide();
        }
        
        // Reabre o modal de seleção após um pequeno delay
        setTimeout(() => {
          const selectionModal = new bootstrap.Modal(document.getElementById('classSelectionModal'));
          selectionModal.show();
        }, MODAL_TRANSITION_DELAY);
      }
    }
  }

  /**
   * Abre modal de seleção de raça, fechando o modal de edição
   */
  openRaceSelection(): void {
    if (typeof window !== 'undefined') {
      const bootstrap = (window as any).bootstrap;
      if (bootstrap) {
        // Fecha o modal de edição
        const editModal = bootstrap.Modal.getInstance(document.getElementById('editarFichaModal'));
        if (editModal) {
          editModal.hide();
        }
        
        // Abre o modal de seleção após um pequeno delay
        setTimeout(() => {
          const selectionModal = new bootstrap.Modal(document.getElementById('raceSelectionModal'));
          selectionModal.show();
        }, MODAL_TRANSITION_DELAY);
      }
    }
  }

  /**
   * Fecha modal de detalhes da raça e volta para o modal de seleção
   */
  closeRaceDetails(): void {
    this.selectedRaceDetails = undefined;
    
    // Fecha o modal de detalhes e reabre o modal de seleção
    if (typeof window !== 'undefined') {
      const bootstrap = (window as any).bootstrap;
      if (bootstrap) {
        const detailsModal = bootstrap.Modal.getInstance(document.getElementById('raceDetailsModal'));
        if (detailsModal) {
          detailsModal.hide();
        }
        
        // Reabre o modal de seleção após um pequeno delay
        setTimeout(() => {
          const selectionModal = new bootstrap.Modal(document.getElementById('raceSelectionModal'));
          selectionModal.show();
        }, MODAL_TRANSITION_DELAY);
      }
    }
  }

  /**
   * Encontra o index da classe pelo nome
   */
  getClassIndexByName(className: string): string {
    const foundClass = this.availableClasses.find(c => c.name.toLowerCase() === className.toLowerCase());
    return foundClass?.index || '';
  }

  /**
   * Encontra o index da raça pelo nome
   */
  getRaceIndexByName(raceName: string): string {
    const foundRace = this.availableRaces.find(r => r.name.toLowerCase() === raceName.toLowerCase());
    return foundRace?.index || '';
  }

  /**
   * Seleciona uma classe e carrega seus traços
   */
  selectClass(classRef: ApiReference): void {
    this.jogador.classe = classRef.name;
    
    // Carrega detalhes da classe para obter traços
    this.dndApiService.getClassDetails(classRef.index).subscribe({
      next: (classDetails: DndClass) => {
        // Remove traços antigos da classe
        if (!this.jogador.tracos) {
          this.jogador.tracos = [];
        }
        this.jogador.tracos = this.jogador.tracos.filter((t: any) => t.origem !== 'classe');
        
        // Adiciona proficiências como traços
        if (classDetails.proficiencies && classDetails.proficiencies.length > 0) {
          const profNames = classDetails.proficiencies.map(p => p.name).join(', ');
          this.jogador.tracos.push({
            nome: 'Proficiências da Classe',
            descricao: profNames,
            origem: 'classe'
          });
        }

        // Adiciona testes de resistência como traços
        if (classDetails.saving_throws && classDetails.saving_throws.length > 0) {
          const saveNames = classDetails.saving_throws.map(s => s.name).join(', ');
          this.jogador.tracos.push({
            nome: 'Testes de Resistência',
            descricao: saveNames,
            origem: 'classe'
          });
        }

        // Adiciona dado de vida como traço
        if (classDetails.hit_die) {
          this.jogador.tracos.push({
            nome: 'Dado de Vida',
            descricao: `d${classDetails.hit_die}`,
            origem: 'classe'
          });
        }

        // Adiciona informação sobre conjuração se disponível
        if (classDetails.spellcasting) {
          this.jogador.tracos.push({
            nome: 'Conjuração',
            descricao: 'Esta classe possui habilidades de conjuração',
            origem: 'classe'
          });
        }

        this.saveToCache();
      },
      error: (error) => {
        console.error('Erro ao carregar detalhes da classe:', error);
      }
    });
  }

  /**
   * Seleciona uma raça e carrega seus traços
   */
  selectRace(raceRef: ApiReference): void {
    this.jogador.raca = raceRef.name;
    
    // Carrega detalhes da raça para obter traços
    this.dndApiService.getRaceDetails(raceRef.index).subscribe({
      next: (raceDetails: DndRace) => {
        // Remove traços antigos da raça
        if (!this.jogador.tracos) {
          this.jogador.tracos = [];
        }
        this.jogador.tracos = this.jogador.tracos.filter((t: any) => t.origem !== 'raca');
        
        // Adiciona velocidade como traço
        if (raceDetails.speed) {
          this.jogador.tracos.push({
            nome: 'Velocidade',
            descricao: `${raceDetails.speed} pés`,
            origem: 'raca'
          });
        }

        // Adiciona bônus de atributos como traço
        if (raceDetails.ability_bonuses && raceDetails.ability_bonuses.length > 0) {
          const bonuses = raceDetails.ability_bonuses.map(b => 
            `${b.ability_score.name}: +${b.bonus}`
          ).join(', ');
          this.jogador.tracos.push({
            nome: 'Bônus de Atributos',
            descricao: bonuses,
            origem: 'raca'
          });
        }

        // Adiciona tamanho como traço
        if (raceDetails.size) {
          this.jogador.tracos.push({
            nome: 'Tamanho',
            descricao: raceDetails.size + (raceDetails.size_description ? ` - ${raceDetails.size_description}` : ''),
            origem: 'raca'
          });
        }

        // Adiciona idiomas como traço
        if (raceDetails.languages && raceDetails.languages.length > 0) {
          const langs = raceDetails.languages.map(l => l.name).join(', ');
          this.jogador.tracos.push({
            nome: 'Idiomas',
            descricao: langs + (raceDetails.language_desc ? ` - ${raceDetails.language_desc}` : ''),
            origem: 'raca'
          });
        }

        // Adiciona traços raciais
        if (raceDetails.traits && raceDetails.traits.length > 0) {
          const traits = raceDetails.traits.map(t => t.name).join(', ');
          this.jogador.tracos.push({
            nome: 'Traços Raciais',
            descricao: traits,
            origem: 'raca'
          });
        }

        this.saveToCache();
      },
      error: (error) => {
        console.error('Erro ao carregar detalhes da raça:', error);
      }
    });
  }

  /**
   * Remove um traço
   */
  removerTraco(traco: any): void {
    if (!this.jogador.tracos) return;
    const index = this.jogador.tracos.indexOf(traco);
    if (index > -1) {
      this.jogador.tracos.splice(index, 1);
      this.saveToCache();
    }
  }

  /**
   * Retorna traços de classe
   */
  getTracosClasse(): any[] {
    if (!this.jogador.tracos) return [];
    return this.jogador.tracos.filter((t: any) => t.origem === 'classe');
  }

  /**
   * Retorna traços de raça
   */
  getTracosRaca(): any[] {
    if (!this.jogador.tracos) return [];
    return this.jogador.tracos.filter((t: any) => t.origem === 'raca');
  }

  /**
   * Verifica se existem traços de classe
   */
  hasTracosClasse(): boolean {
    return this.getTracosClasse().length > 0;
  }

  /**
   * Verifica se existem traços de raça
   */
  hasTracosRaca(): boolean {
    return this.getTracosRaca().length > 0;
  }
}
