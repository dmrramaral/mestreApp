import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FichaJogadorLegacy } from '../models/ficha-jogador.model';
import { DEFAULT_AVATAR, SKILLS, STORAGE_KEYS } from '../constants/rpg.constants';
import { calcularBonusProficiencia } from '../utils/rpg.utils';

/**
 * Serviço para gerenciar a ficha do jogador
 * Centraliza a lógica de negócio e estado da ficha
 */
@Injectable({
  providedIn: 'root'
})
export class FichaJogadorService {
  private fichaSubject = new BehaviorSubject<FichaJogadorLegacy | null>(null);
  public ficha$: Observable<FichaJogadorLegacy | null> = this.fichaSubject.asObservable();

  constructor() {}

  /**
   * Cria uma nova ficha vazia com valores padrão
   */
  criarFichaVazia(): FichaJogadorLegacy {
    return {
      avatar: DEFAULT_AVATAR,
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
      pericias: this.criarPericiasVazias(),
      armasCorpoACorpo: [],
      armasDistancia: [],
      armadurasLeves: [],
      armadurasMedias: [],
      armadurasPesadas: [],
      escudos: [],
      itensGerais: [],
      ferramentas: [],
      kits: [],
      mochila: [],
      magias: []
    };
  }

  /**
   * Cria a lista de perícias com valores padrão
   */
  private criarPericiasVazias(): any[] {
    return SKILLS.map(skill => ({
      nome: skill.nome,
      valor: 'nao'
    }));
  }

  /**
   * Atualiza o bônus de proficiência baseado no nível
   */
  atualizarBonusProficiencia(ficha: FichaJogadorLegacy): void {
    if (ficha.nivel) {
      ficha.proficiencia = calcularBonusProficiencia(ficha.nivel);
    }
  }

  /**
   * Adiciona um item à mochila
   */
  adicionarItemMochila(ficha: FichaJogadorLegacy, item: { nome: string; descricao: string }): void {
    if (!ficha['mochila']) {
      ficha['mochila'] = [];
    }
    ficha['mochila'].push({ ...item });
  }

  /**
   * Remove um item da mochila
   */
  removerItemMochila(ficha: FichaJogadorLegacy, item: { nome: string }): void {
    if (ficha['mochila']) {
      ficha['mochila'] = ficha['mochila'].filter((i: any) => i.nome !== item.nome);
    }
  }

  /**
   * Adiciona um talento
   */
  adicionarTalento(ficha: FichaJogadorLegacy, talento: { nome: string; descricao: string }): void {
    if (!ficha.talentos) {
      ficha.talentos = [];
    }
    ficha.talentos.push({ ...talento });
  }

  /**
   * Remove um talento
   */
  removerTalento(ficha: FichaJogadorLegacy, talento: { nome: string }): void {
    if (ficha.talentos) {
      ficha.talentos = ficha.talentos.filter((t: any) => t.nome !== talento.nome);
    }
  }

  /**
   * Adiciona uma magia
   */
  adicionarMagia(ficha: FichaJogadorLegacy, magia: any): void {
    if (!ficha['magias']) {
      ficha['magias'] = [];
    }
    ficha['magias'].push({ ...magia });
  }

  /**
   * Remove uma magia
   */
  removerMagia(ficha: FichaJogadorLegacy, magia: { nome: string }): void {
    if (ficha['magias']) {
      ficha['magias'] = ficha['magias'].filter((m: any) => m.nome !== magia.nome);
    }
  }

  /**
   * Adiciona equipamento em uma categoria específica
   */
  adicionarEquipamento(
    ficha: FichaJogadorLegacy,
    categoria: string,
    equipamento: { nome: string; descricao: string }
  ): void {
    if (!ficha[categoria]) {
      ficha[categoria] = [];
    }
    ficha[categoria].push({ ...equipamento });
  }

  /**
   * Remove equipamento de uma categoria específica
   */
  removerEquipamento(
    ficha: FichaJogadorLegacy,
    categoria: string,
    equipamento: { nome: string }
  ): void {
    if (ficha[categoria]) {
      ficha[categoria] = ficha[categoria].filter((e: any) => e.nome !== equipamento.nome);
    }
  }

  /**
   * Exporta a ficha como JSON
   */
  exportarFicha(ficha: FichaJogadorLegacy): string {
    return JSON.stringify(ficha, null, 2);
  }

  /**
   * Importa uma ficha de JSON
   */
  importarFicha(json: string): FichaJogadorLegacy | null {
    try {
      const ficha = JSON.parse(json);
      return ficha;
    } catch (error) {
      console.error('Erro ao importar ficha:', error);
      return null;
    }
  }

  /**
   * Valida se a ficha tem dados mínimos necessários
   */
  validarFicha(ficha: FichaJogadorLegacy): boolean {
    return !!(ficha.nome && ficha.classe && ficha.raca);
  }

  /**
   * Atualiza a ficha no BehaviorSubject
   */
  atualizarFicha(ficha: FichaJogadorLegacy): void {
    this.fichaSubject.next(ficha);
  }

  /**
   * Obtém a ficha atual
   */
  obterFichaAtual(): FichaJogadorLegacy | null {
    return this.fichaSubject.value;
  }
}
