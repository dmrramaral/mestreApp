import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiReference, DndClass, DndRace } from '../../../../core/models/dnd-api.model';
import { DndApiService } from '../../../../core/services/dnd-api.service';

const MODAL_TRANSITION_DELAY = 300;

@Component({
  selector: 'app-ficha-dnd-modals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ficha-dnd-modals.component.html',
  styleUrl: './ficha-dnd-modals.component.scss'
})
export class FichaDndModalsComponent {
  @Input() jogador: any;
  @Input() isDnd5e = false;

  @Output() dirty = new EventEmitter<void>();

  loadingClassDetails = false;
  selectedClassDetails?: DndClass;
  loadingRaceDetails = false;
  selectedRaceDetails?: DndRace;
  availableClasses: ApiReference[] = [];
  availableRaces: ApiReference[] = [];

  constructor(private dndApiService: DndApiService) {}

  openClassSelection(): void {
    if (!this.isDnd5e) {
      return;
    }
    this.loadClassesAndRaces();
    this.hideModal('editarFichaModal');
    setTimeout(() => this.showModal('classSelectionModal'), MODAL_TRANSITION_DELAY);
  }

  openRaceSelection(): void {
    if (!this.isDnd5e) {
      return;
    }
    this.loadClassesAndRaces();
    this.hideModal('editarFichaModal');
    setTimeout(() => this.showModal('raceSelectionModal'), MODAL_TRANSITION_DELAY);
  }

  closeClassDetails(): void {
    this.selectedClassDetails = undefined;
    this.hideModal('classDetailsModal');
    setTimeout(() => this.showModal('classSelectionModal'), MODAL_TRANSITION_DELAY);
  }

  closeRaceDetails(): void {
    this.selectedRaceDetails = undefined;
    this.hideModal('raceDetailsModal');
    setTimeout(() => this.showModal('raceSelectionModal'), MODAL_TRANSITION_DELAY);
  }

  viewClassDetails(classIndex: string): void {
    if (!classIndex) {
      return;
    }

    this.loadingClassDetails = true;
    this.dndApiService.getClassDetails(classIndex).subscribe({
      next: (data) => {
        this.selectedClassDetails = data;
        this.loadingClassDetails = false;
        this.hideModal('classSelectionModal');
        setTimeout(() => this.showModal('classDetailsModal'), MODAL_TRANSITION_DELAY);
      },
      error: () => {
        this.loadingClassDetails = false;
      }
    });
  }

  viewRaceDetails(raceIndex: string): void {
    if (!raceIndex) {
      return;
    }

    this.loadingRaceDetails = true;
    this.dndApiService.getRaceDetails(raceIndex).subscribe({
      next: (data) => {
        this.selectedRaceDetails = data;
        this.loadingRaceDetails = false;
        this.hideModal('raceSelectionModal');
        setTimeout(() => this.showModal('raceDetailsModal'), MODAL_TRANSITION_DELAY);
      },
      error: () => {
        this.loadingRaceDetails = false;
      }
    });
  }

  selectClass(classRef: ApiReference): void {
    if (!this.isDnd5e || !this.jogador) {
      return;
    }

    this.jogador.classe = classRef.name;

    this.dndApiService.getClassDetails(classRef.index).subscribe({
      next: (classDetails: DndClass) => {
        if (!this.jogador.tracos) {
          this.jogador.tracos = [];
        }
        this.jogador.tracos = this.jogador.tracos.filter((t: any) => t.origem !== 'classe');

        if (classDetails.proficiencies?.length) {
          this.jogador.tracos.push({
            nome: 'Proficiências da Classe',
            descricao: classDetails.proficiencies.map((p) => p.name).join(', '),
            origem: 'classe'
          });
        }

        if (classDetails.saving_throws?.length) {
          this.jogador.tracos.push({
            nome: 'Testes de Resistência',
            descricao: classDetails.saving_throws.map((s) => s.name).join(', '),
            origem: 'classe'
          });
        }

        if (classDetails.hit_die) {
          this.jogador.tracos.push({
            nome: 'Dado de Vida',
            descricao: `d${classDetails.hit_die}`,
            origem: 'classe'
          });
        }

        if (classDetails.spellcasting) {
          this.jogador.tracos.push({
            nome: 'Conjuração',
            descricao: 'Esta classe possui habilidades de conjuração',
            origem: 'classe'
          });
        }

        this.dirty.emit();
      }
    });
  }

  selectRace(raceRef: ApiReference): void {
    if (!this.isDnd5e || !this.jogador) {
      return;
    }

    this.jogador.raca = raceRef.name;

    this.dndApiService.getRaceDetails(raceRef.index).subscribe({
      next: (raceDetails: DndRace) => {
        if (!this.jogador.tracos) {
          this.jogador.tracos = [];
        }
        this.jogador.tracos = this.jogador.tracos.filter((t: any) => t.origem !== 'raca');

        if (raceDetails.speed) {
          this.jogador.tracos.push({
            nome: 'Velocidade',
            descricao: `${raceDetails.speed} pés`,
            origem: 'raca'
          });
        }

        if (raceDetails.ability_bonuses?.length) {
          this.jogador.tracos.push({
            nome: 'Bônus de Atributos',
            descricao: raceDetails.ability_bonuses.map((b) => `${b.ability_score.name}: +${b.bonus}`).join(', '),
            origem: 'raca'
          });
        }

        if (raceDetails.size) {
          this.jogador.tracos.push({
            nome: 'Tamanho',
            descricao: raceDetails.size + (raceDetails.size_description ? ` - ${raceDetails.size_description}` : ''),
            origem: 'raca'
          });
        }

        if (raceDetails.languages?.length) {
          const langs = raceDetails.languages.map((l) => l.name).join(', ');
          this.jogador.tracos.push({
            nome: 'Idiomas',
            descricao: langs + (raceDetails.language_desc ? ` - ${raceDetails.language_desc}` : ''),
            origem: 'raca'
          });
        }

        if (raceDetails.traits?.length) {
          this.jogador.tracos.push({
            nome: 'Traços Raciais',
            descricao: raceDetails.traits.map((t) => t.name).join(', '),
            origem: 'raca'
          });
        }

        this.dirty.emit();
      }
    });
  }

  private loadClassesAndRaces(): void {
    if (!this.availableClasses.length) {
      this.dndApiService.getClasses().subscribe({
        next: (data) => {
          this.availableClasses = data.results || [];
        }
      });
    }

    if (!this.availableRaces.length) {
      this.dndApiService.getRaces().subscribe({
        next: (data) => {
          this.availableRaces = data.results || [];
        }
      });
    }
  }

  private showModal(modalId: string): void {
    if (typeof window === 'undefined') {
      return;
    }

    const bootstrap = (window as any).bootstrap;
    const modalElement = document.getElementById(modalId);
    if (!bootstrap || !modalElement) {
      return;
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
  }

  private hideModal(modalId: string): void {
    if (typeof window === 'undefined') {
      return;
    }

    const bootstrap = (window as any).bootstrap;
    const modalElement = document.getElementById(modalId);
    if (!bootstrap || !modalElement) {
      return;
    }

    const modal = bootstrap.Modal.getInstance(modalElement);
    modal?.hide();
  }
}
