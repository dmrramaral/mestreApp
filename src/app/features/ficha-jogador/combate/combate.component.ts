import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SKILLS } from '../../../core/constants/rpg.constants';

export interface ResultadoRolagem {
  campo: string;
  d20: number;
  mod: number;
  total: number;
  detalhe?: string;
}

export type CombateAction =
  | { type: 'dirty' }
  | { type: 'roll'; payload: ResultadoRolagem };

@Component({
  selector: 'app-combate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './combate.component.html',
  styleUrl: './combate.component.scss'
})
export class CombateComponent {

  @Input() jogador: any;
  @Input() vantagemIniciativa = false;

  @Output() action = new EventEmitter<CombateAction>();
  @Output() vantagemIniciativaChange = new EventEmitter<boolean>();

  editandoCombate: boolean = false;
  editandoAtributos: boolean = false;
  mostrarDetalheCA = false;
  mostrarDetalheCF = false;

  emitirMudanca(): void {
    this.action.emit({ type: 'dirty' });
  }

  onVantagemIniciativaChange(): void {
    this.vantagemIniciativaChange.emit(this.vantagemIniciativa);
    this.emitirMudanca();
  }

  toggleEditarAtributos() {
    this.editandoAtributos = !this.editandoAtributos;
    this.emitirMudanca();
  }

  togglePericiaProf(pericia: any) {
    pericia.valor = pericia.valor === 'sim' ? 'nao' : 'sim';
    this.emitirMudanca();
  }

  getPericiasByAtributo(atributo: string): any[] {
    if (!Array.isArray(this.jogador?.pericias)) return [];
    return this.jogador.pericias.filter((p: any) => {
      if (p.atributo) return p.atributo === atributo;
      const skill = SKILLS.find((s) => s.nome === p.nome);
      return skill?.atributo === atributo;
    });
  }

  calcularModificador(valor: any): number | null {
    const n = Number(valor);
    if (!Number.isFinite(n)) {
      return null;
    }
    return Math.floor((n - 10) / 2);
  }

  rolarDado(campo: string, mod: number): void {
    let d20 = Math.floor(Math.random() * 20) + 1;
    if(d20 <=15){
      d20 = 15;
    }
    this.action.emit({
      type: 'roll',
      payload: { campo, d20, mod, total: d20 + mod }
    });
  }

  rolarD20(campo: string, mod: number, vantagem: boolean = false): void {
    const d20 = Math.floor(Math.random() * 20) + 1;
    if (vantagem) {
      const d20_2 = Math.floor(Math.random() * 20) + 1;
      const melhor = Math.max(d20, d20_2);
      this.action.emit({
        type: 'roll',
        payload: {
          campo,
          d20: melhor,
          mod,
          total: melhor + mod,
          detalhe: `Rolou ${d20} e ${d20_2} com vantagem`
        }
      });
      return;
    }

    this.action.emit({
      type: 'roll',
      payload: { campo, d20, mod, total: d20 + mod }
    });
  }

  rolarPericia(pericia: any, modAtributo: number): void {
    const prof = pericia.valor === 'sim' ? (this.jogador?.proficiencia ?? 0) : 0;
    this.rolarDado(pericia.nome, modAtributo + prof);
  }

  get caCalculada(): number {
    const modDex = this.calcularModificador(this.jogador?.atributos?.destreza) ?? 0;
    const equip = this.jogador?.equipamentos;

    const armadura = equip?.['armadura']?.[0];
    let ca = armadura?.ca ? armadura.ca + modDex : 10 + modDex;

    const escudo = equip?.['escudo']?.[0];
    if (escudo?.ca) ca += escudo.ca;

    for (const cat of ['cabeca', 'pes', 'amuleto', 'anel']) {
      const e = equip?.[cat]?.[0];
      if (e?.ca) ca += e.ca;
    }

    if (Array.isArray(this.jogador?.ataques)) {
      for (const ataque of this.jogador.ataques) {
        if (ataque.equipado && Number(ataque.ca) > 0) {
          ca += Number(ataque.ca);
        }
      }
    }
    ca += Number(this.jogador?.caManual) || 0;

    return ca;
  }


  get caDetalhes(): Array<{ fonte: string; valor: number }> {
    const det: Array<{ fonte: string; valor: number }> = [];
    const modDex = this.calcularModificador(this.jogador?.atributos?.destreza) ?? 0;
    const equip = this.jogador?.equipamentos;

    const armadura = equip?.['armadura']?.[0];
    if (armadura?.ca) {
      det.push({ fonte: `Armadura: ${armadura.nome || 'Armadura'}`, valor: armadura.ca });
    } else {
      det.push({ fonte: 'Base', valor: 10 });
    }
    if (modDex !== 0) det.push({ fonte: 'Mod. Destreza', valor: modDex });

    const escudo = equip?.['escudo']?.[0];
    if (escudo?.ca) det.push({ fonte: `Escudo: ${escudo.nome || 'Escudo'}`, valor: escudo.ca });

    for (const cat of ['cabeca', 'pes', 'amuleto', 'anel']) {
      const e = equip?.[cat]?.[0];
      if (e?.ca) det.push({ fonte: e.nome || cat, valor: e.ca });
    }

    if (Array.isArray(this.jogador?.ataques)) {
      for (const ataque of this.jogador.ataques) {
        if (ataque.equipado && Number(ataque.ca) > 0) {
          det.push({ fonte: `Arma: ${ataque.nome}`, valor: Number(ataque.ca) });
        }
      }
    }

    const manual = Number(this.jogador?.caManual) || 0;
    if (manual !== 0) det.push({ fonte: 'Bônus manual', valor: manual });

    return det;
  }


  toggleEditarCombate() {
    this.editandoCombate = !this.editandoCombate;
    this.emitirMudanca();
  }

}
