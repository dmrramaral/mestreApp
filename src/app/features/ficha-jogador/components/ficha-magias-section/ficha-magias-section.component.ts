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
  @Input() isDnd5e = false;
  @Input() jogador: any;
  @Input() editandoMagia: { [key: number]: boolean } = {};
  @Input() expandedSpellDetails: { [key: number]: any } = {};
  @Input() loadingSpellDetails: { [key: number]: boolean } = {};
  @Input() adicionandoMagia = false;
  @Input() novaMagia: any;

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

  private spellEditDrafts: Record<number, any> = {};

  spellDraft(index: number, magia: any, expandedDetails: any): any {
    if (!this.spellEditDrafts[index]) {
      this.spellEditDrafts[index] = {
        nome: magia?.nome || '',
        level: this.getSpellLevel(magia, expandedDetails),
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
