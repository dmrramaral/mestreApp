import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ficha-magias-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ficha-magias-section.component.html',
  styleUrl: './ficha-magias-section.component.scss'
})
export class FichaMagiasSectionComponent {
  @Input() isDnd5e = true;
  @Input() jogador: any;
  @Input() editandoMagia: { [key: number]: boolean } = {};
  @Input() expandedSpellDetails: { [key: number]: any } = {};
  @Input() loadingSpellDetails: { [key: number]: boolean } = {};
  @Input() adicionandoMagia = false;
  @Input() novaMagia: any;
  @Input() spellcastingSummary: any;
  @Input() preparedSpellCount = 0;
  @Input() spellFeedback = '';

  @Input() getSpellComponents!: (magia: any, expandedDetails: any) => string;
  @Input() getSpellClassesFormatted!: (magia: any, expandedDetails: any) => string;

  @Output() abrirBuscarMagia = new EventEmitter<void>();
  @Output() adicionarMagia = new EventEmitter<void>();
  @Output() toggleSpellDetailsInList = new EventEmitter<{ index: number; nome: string }>();
  @Output() toggleEditarMagia = new EventEmitter<number>();
  @Output() removerMagia = new EventEmitter<number>();
  @Output() saveToCache = new EventEmitter<void>();
  @Output() confirmarAdicionarMagia = new EventEmitter<void>();
  @Output() cancelarAdicionarMagia = new EventEmitter<void>();
  @Output() togglePrepararMagia = new EventEmitter<number>();
  @Output() conjurarMagia = new EventEmitter<{ index: number; slotLevel: number }>();

  private spellEditDrafts: Record<number, any> = {};
  castingSlotSelection: Record<number, number> = {};

  spellDraft(index: number, magia: any, expandedDetails: any): any {
    if (!this.spellEditDrafts[index]) {
      this.spellEditDrafts[index] = {
        nome: magia?.nome || '',
        level: this.getSpellLevel(magia, expandedDetails),
        damage_formula: magia?.damage_formula || this.getSpellDamageSummary(magia, expandedDetails),
        school: this.getSpellSchool(magia, expandedDetails),
        casting_time: this.getSpellCastingTime(magia, expandedDetails),
        range: this.getSpellRange(magia, expandedDetails),
        duration: this.getSpellDuration(magia, expandedDetails),
        components_text: this.getSpellComponentsText(magia, expandedDetails),
        material: this.getSpellMaterial(magia, expandedDetails),
        classes_text: this.getSpellClassesText(magia, expandedDetails),
        descricao: this.getSpellDescription(magia, expandedDetails),
        higher_level_text: this.getSpellHigherLevel(magia, expandedDetails)
      };
    }

    return this.spellEditDrafts[index];
  }

  startSpellEdit(index: number, magia: any, expandedDetails: any): void {
    this.spellDraft(index, magia, expandedDetails);
    this.toggleEditarMagia.emit(index);
  }

  saveSpellEdit(index: number, magia: any): void {
    const draft = this.spellEditDrafts[index];
    if (!draft) {
      this.toggleEditarMagia.emit(index);
      return;
    }

    magia.nome = draft.nome || '';
    magia.level = draft.level;
    magia.nivel = draft.level;
    magia.damage_formula = draft.damage_formula || '';

    magia.school = draft.school || '';
    magia.escola = magia.school;
    magia.casting_time = draft.casting_time || '';
    magia.range = draft.range || '';
    magia.duration = draft.duration || '';
    magia.material = draft.material || '';
    magia.descricao = draft.descricao || '';

    magia.components = (draft.components_text || '')
      .split(',')
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0);

    magia.classes = (draft.classes_text || '')
      .split(',')
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0)
      .map((name: string) => ({ name }));

    magia.higher_level = (draft.higher_level_text || '')
      .split(/\n\s*\n|\n/)
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0);

    delete this.spellEditDrafts[index];
    this.saveToCache.emit();
    this.toggleEditarMagia.emit(index);
  }

  cancelSpellEdit(index: number): void {
    delete this.spellEditDrafts[index];
    this.toggleEditarMagia.emit(index);
  }

  getSpellLevel(magia: any, expandedDetails: any): number | undefined {
    if (magia?.level !== undefined && magia?.level !== null) {
      return Number(magia.level);
    }
    if (magia?.nivel !== undefined && magia?.nivel !== null) {
      return Number(magia.nivel);
    }
    if (expandedDetails?.level !== undefined && expandedDetails?.level !== null) {
      return Number(expandedDetails.level);
    }
    return undefined;
  }

  getModeLabel(): string {
    const mode = this.spellcastingSummary?.mode;
    if (mode === 'prepared') {
      return 'Conjurador preparado';
    }
    if (mode === 'all') {
      return 'Conjurador de lista completa';
    }
    return 'Conjurador por magias conhecidas';
  }

  isPreparedMode(): boolean {
    const mode = this.spellcastingSummary?.mode;
    return mode === 'prepared' || mode === 'all';
  }

  getPreparedLimit(): number | null {
    const limit = this.spellcastingSummary?.preparedLimit;
    return typeof limit === 'number' ? limit : null;
  }

  getKnownLimit(): number | null {
    const limit = this.spellcastingSummary?.knownLimit;
    return typeof limit === 'number' ? limit : null;
  }

  getPreparedBonus(): number {
    return Number(this.spellcastingSummary?.preparedBonus || 0);
  }

  getPreparedBonusCustom(): number {
    return Number(this.jogador?.spellcasting?.preparedBonusCustom || 0);
  }

  getAllowedSpellNamesText(): string {
    const lista = this.jogador?.spellcasting?.allowedSpellNames;
    if (!Array.isArray(lista) || !lista.length) {
      return '';
    }
    return lista.join(', ');
  }

  onPreparedBonusCustomChange(value: number | string): void {
    if (!this.jogador?.spellcasting) {
      this.jogador.spellcasting = {};
    }
    const numero = Number(value || 0);
    this.jogador.spellcasting.preparedBonusCustom = Number.isFinite(numero) ? Math.max(0, numero) : 0;
    this.saveToCache.emit();
  }

  onAllowedSpellNamesChange(value: string): void {
    if (!this.jogador?.spellcasting) {
      this.jogador.spellcasting = {};
    }
    this.jogador.spellcasting.allowedSpellNames = (value || '')
      .split(/,|\n/)
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0);
    this.saveToCache.emit();
  }

  getSpellSlotEntries(): Array<{ level: number; total: number; used: number }> {
    const slots = this.jogador?.spellSlots || {};
    const levels = Object.keys(slots)
      .map((key) => Number(key))
      .filter((level) => Number.isFinite(level))
      .sort((a, b) => a - b);

    return levels
      .map((level) => ({
        level,
        total: Number(slots[level]?.total || 0),
        used: Number(slots[level]?.used || 0)
      }))
      .filter((slot) => slot.total > 0);
  }

  isMagiaPreparada(magia: any): boolean {
    return magia?.preparada === true;
  }

  getCastingSlotOptions(index: number, magia: any, expandedDetails: any): number[] {
    const level = Number(this.getSpellLevel(magia, expandedDetails) ?? 0);
    if (level === 0) {
      return [0];
    }

    const slots = this.jogador?.spellSlots || {};
    const opcoes: number[] = [];
    for (let slotLevel = level; slotLevel <= 9; slotLevel++) {
      const total = Number(slots?.[slotLevel]?.total || 0);
      const used = Number(slots?.[slotLevel]?.used || 0);
      if (total - used > 0) {
        opcoes.push(slotLevel);
      }
    }

    if (!opcoes.length) {
      opcoes.push(level);
    }

    if (!this.castingSlotSelection[index] || !opcoes.includes(this.castingSlotSelection[index])) {
      this.castingSlotSelection[index] = opcoes[0];
    }

    return opcoes;
  }

  getSlotLabel(level: number): string {
    if (level === 0) {
      return 'Truque';
    }
    return `Slot ${level}`;
  }

  onConjurar(index: number, magia: any, expandedDetails: any): void {
    const options = this.getCastingSlotOptions(index, magia, expandedDetails);
    const slotLevel = this.castingSlotSelection[index] ?? options[0] ?? 0;
    this.conjurarMagia.emit({ index, slotLevel });
  }

  getSpellSchool(magia: any, expandedDetails: any): string {
    return magia?.school || magia?.escola || expandedDetails?.school?.name || expandedDetails?.school || '';
  }

  getSpellDescription(magia: any, expandedDetails: any): string {
    if (magia?.descricao) {
      return magia.descricao;
    }
    if (Array.isArray(expandedDetails?.desc) && expandedDetails.desc.length > 0) {
      return expandedDetails.desc.join('\n\n');
    }
    return '';
  }

  getSpellHigherLevel(magia: any, expandedDetails: any): string {
    if (Array.isArray(magia?.higher_level) && magia.higher_level.length > 0) {
      return magia.higher_level.join('\n\n');
    }
    if (Array.isArray(expandedDetails?.higher_level) && expandedDetails.higher_level.length > 0) {
      return expandedDetails.higher_level.join('\n\n');
    }
    return '';
  }

  getSpellDamageSummary(magia: any, expandedDetails: any): string {
    if (magia?.damage_formula) {
      return magia.damage_formula;
    }

    const mapaCantrip = magia?.damage_at_character_level || expandedDetails?.damage?.damage_at_character_level;
    if (mapaCantrip && typeof mapaCantrip === 'object') {
      const nivelPersonagem = Number(this.jogador?.nivel || 1);
      const niveis = Object.keys(mapaCantrip)
        .map((item) => Number(item))
        .filter((item) => Number.isFinite(item))
        .sort((a, b) => a - b);

      if (niveis.length > 0) {
        const nivelAplicado = niveis.filter((n) => n <= nivelPersonagem).pop() ?? niveis[0];
        const dano = mapaCantrip[String(nivelAplicado)];
        if (dano) {
          return `${dano} (escala de truque)`;
        }
      }
    }

    const mapaSlot = magia?.damage_at_slot_level || expandedDetails?.damage?.damage_at_slot_level;
    if (mapaSlot && typeof mapaSlot === 'object') {
      const nivelMagia = this.getSpellLevel(magia, expandedDetails) ?? 0;
      const dano = mapaSlot[String(nivelMagia)] || Object.values(mapaSlot)[0];
      if (typeof dano === 'string' && dano) {
        return dano;
      }
    }

    return '';
  }

  getSpellClassesText(magia: any, expandedDetails: any): string {
    return this.getSpellClassesFormatted?.(magia, expandedDetails) || '';
  }

  getSpellCastingTime(magia: any, expandedDetails: any): string {
    return magia?.casting_time || expandedDetails?.casting_time || '';
  }

  getSpellRange(magia: any, expandedDetails: any): string {
    return magia?.range || expandedDetails?.range || '';
  }

  getSpellDuration(magia: any, expandedDetails: any): string {
    return magia?.duration || expandedDetails?.duration || '';
  }

  getSpellComponentsText(magia: any, expandedDetails: any): string {
    return this.getSpellComponents?.(magia, expandedDetails) || '';
  }

  getSpellMaterial(magia: any, expandedDetails: any): string {
    return magia?.material || expandedDetails?.material || '';
  }

  onSpellLevelChange(magia: any, value: number | undefined): void {
    magia.level = value;
    magia.nivel = value;
    this.saveToCache.emit();
  }

  onSpellSchoolChange(magia: any, value: string): void {
    magia.school = value;
    magia.escola = value;
    this.saveToCache.emit();
  }

  onSpellDescriptionChange(magia: any, value: string): void {
    magia.descricao = value;
    this.saveToCache.emit();
  }

  onSpellCastingTimeChange(magia: any, value: string): void {
    magia.casting_time = value;
    this.saveToCache.emit();
  }

  onSpellRangeChange(magia: any, value: string): void {
    magia.range = value;
    this.saveToCache.emit();
  }

  onSpellDurationChange(magia: any, value: string): void {
    magia.duration = value;
    this.saveToCache.emit();
  }

  onSpellComponentsChange(magia: any, value: string): void {
    magia.components = value
      .split(',')
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0);
    this.saveToCache.emit();
  }

  onSpellMaterialChange(magia: any, value: string): void {
    magia.material = value;
    this.saveToCache.emit();
  }

  onSpellClassesChange(magia: any, value: string): void {
    magia.classes = value
      .split(',')
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0)
      .map((name: string) => ({ name }));
    this.saveToCache.emit();
  }

  onSpellHigherLevelChange(magia: any, value: string): void {
    magia.higher_level = value
      .split(/\n\s*\n|\n/)
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0);
    this.saveToCache.emit();
  }
}
