import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../core/services/storage.service';
import { STORAGE_KEYS } from '../../core/constants/rpg.constants';

/**
 * Interface para um participante na ordem de iniciativa
 */
interface ParticipanteIniciativa {
  nome: string;
  iniciativa: number;
  vida: number;
}

interface AtributosFichaRapida {
  forca: number | null;
  destreza: number | null;
  constituicao: number | null;
  inteligencia: number | null;
  sabedoria: number | null;
  carisma: number | null;
}

interface FichaRapidaIniciativa {
  id: string;
  nome: string;
  tipo: 'NPC' | 'Personagem' | 'Boss';
  funcao: string;
  dificuldade: string;
  pv: number | null;
  ca: number | null;
  cf: number | null;
  ct: number | null;
  iniciativa: number | null;
  deslocamento: string;
  atributos: AtributosFichaRapida;
  equipamentos: string[];
  implantes: string[];
  habilidades: string[];
  ataques: string[];
  resistencias: string[];
  tatica: string;
  observacoes: string;
}

interface NovaFichaRapidaForm {
  nome: string;
  tipo: 'NPC' | 'Personagem' | 'Boss';
  funcao: string;
  dificuldade: string;
  pv: number | null;
  ca: number | null;
  cf: number | null;
  ct: number | null;
  iniciativa: number | null;
  deslocamento: string;
  atributos: AtributosFichaRapida;
  equipamentosTexto: string;
  implantesTexto: string;
  habilidadesTexto: string;
  ataquesTexto: string;
  resistenciasTexto: string;
  tatica: string;
  observacoes: string;
}

/**
 * Componente para gerenciar a ordem de iniciativa em combate
 * Permite adicionar jogadores/NPCs e rastrear seus pontos de vida
 */
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

  listaIniciativa: ParticipanteIniciativa[] = [];
  fichasRapidas: FichaRapidaIniciativa[] = [];
  novaFicha: NovaFichaRapidaForm = this.criarNovaFicha();

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    const listaIniciativa = this.storageService.getObject<ParticipanteIniciativa[]>(STORAGE_KEYS.INITIATIVE_LIST);
    if (listaIniciativa) {
      this.listaIniciativa = listaIniciativa;
    }

    const fichasRapidas = this.storageService.getObject<FichaRapidaIniciativa[]>(STORAGE_KEYS.INITIATIVE_SHEETS);
    if (fichasRapidas) {
      this.fichasRapidas = fichasRapidas;
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.storageService.setObject(STORAGE_KEYS.INITIATIVE_LIST, this.listaIniciativa);
      });
    }
  }

  /**
   * Adiciona um novo participante à lista de iniciativa
   * Ordena automaticamente por valor de iniciativa (maior para menor)
   */
  adicionar() {
    if (this.nome && this.iniciativa !== null) {
      this.listaIniciativa.push({ nome: this.nome, iniciativa: this.iniciativa, vida: 0 });
      this.listaIniciativa.sort((a, b) => b.iniciativa - a.iniciativa);
      this.nome = '';
      this.iniciativa = null;
      this.storageService.setObject(STORAGE_KEYS.INITIATIVE_LIST, this.listaIniciativa);
    }
  }

  /**
   * Remove um participante da lista de iniciativa
   */
  remover(jogador: ParticipanteIniciativa) {
    const index = this.listaIniciativa.indexOf(jogador);
    if (index > -1) {
      this.listaIniciativa.splice(index, 1);
      this.storageService.setObject(STORAGE_KEYS.INITIATIVE_LIST, this.listaIniciativa);
    }
  }

  /**
   * Salva alterações nos pontos de vida
   */
  salvarVida() {
    this.storageService.setObject(STORAGE_KEYS.INITIATIVE_LIST, this.listaIniciativa);
  }

  adicionarFichaRapida() {
    if (!this.novaFicha.nome?.trim()) {
      return;
    }

    const ficha: FichaRapidaIniciativa = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      nome: this.novaFicha.nome.trim(),
      tipo: this.novaFicha.tipo,
      funcao: this.novaFicha.funcao.trim(),
      dificuldade: this.novaFicha.dificuldade.trim(),
      pv: this.novaFicha.pv,
      ca: this.novaFicha.ca,
      cf: this.novaFicha.cf,
      ct: this.novaFicha.ct,
      iniciativa: this.novaFicha.iniciativa,
      deslocamento: this.novaFicha.deslocamento.trim(),
      atributos: { ...this.novaFicha.atributos },
      equipamentos: this.converterTextoEmLista(this.novaFicha.equipamentosTexto),
      implantes: this.converterTextoEmLista(this.novaFicha.implantesTexto),
      habilidades: this.converterTextoEmLista(this.novaFicha.habilidadesTexto),
      ataques: this.converterTextoEmLista(this.novaFicha.ataquesTexto),
      resistencias: this.converterTextoEmLista(this.novaFicha.resistenciasTexto),
      tatica: this.novaFicha.tatica.trim(),
      observacoes: this.novaFicha.observacoes.trim()
    };

    this.fichasRapidas = [ficha, ...this.fichasRapidas];
    this.storageService.setObject(STORAGE_KEYS.INITIATIVE_SHEETS, this.fichasRapidas);
    this.novaFicha = this.criarNovaFicha();
  }

  removerFichaRapida(id: string) {
    this.fichasRapidas = this.fichasRapidas.filter((ficha) => ficha.id !== id);
    this.storageService.setObject(STORAGE_KEYS.INITIATIVE_SHEETS, this.fichasRapidas);
  }

  adicionarFichaNaIniciativa(ficha: FichaRapidaIniciativa) {
    this.listaIniciativa.push({
      nome: ficha.nome,
      iniciativa: ficha.iniciativa ?? 0,
      vida: ficha.pv ?? 0
    });
    this.listaIniciativa.sort((a, b) => b.iniciativa - a.iniciativa);
    this.storageService.setObject(STORAGE_KEYS.INITIATIVE_LIST, this.listaIniciativa);
  }

  private converterTextoEmLista(texto: string): string[] {
    return texto
      .split('\n')
      .map((linha) => linha.replace(/^[-•\s]+/, '').trim())
      .filter(Boolean);
  }

  private criarNovaFicha(): NovaFichaRapidaForm {
    return {
      nome: '',
      tipo: 'NPC',
      funcao: '',
      dificuldade: '',
      pv: null,
      ca: null,
      cf: null,
      ct: null,
      iniciativa: null,
      deslocamento: '',
      atributos: {
        forca: null,
        destreza: null,
        constituicao: null,
        inteligencia: null,
        sabedoria: null,
        carisma: null
      },
      equipamentosTexto: '',
      implantesTexto: '',
      habilidadesTexto: '',
      ataquesTexto: '',
      resistenciasTexto: '',
      tatica: '',
      observacoes: ''
    };
  }
}
