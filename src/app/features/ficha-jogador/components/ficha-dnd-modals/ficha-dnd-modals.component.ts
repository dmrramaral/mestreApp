import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiReference, DndClass, DndRace } from '../../../../core/models/dnd-api.model';

@Component({
  selector: 'app-ficha-dnd-modals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ficha-dnd-modals.component.html',
  styleUrl: './ficha-dnd-modals.component.scss'
})
export class FichaDndModalsComponent {
  @Input() jogador: any;
  @Input() loadingClassDetails = false;
  @Input() selectedClassDetails?: DndClass;
  @Input() loadingRaceDetails = false;
  @Input() selectedRaceDetails?: DndRace;
  @Input() availableClasses: ApiReference[] = [];
  @Input() availableRaces: ApiReference[] = [];

  @Output() closeClassDetails = new EventEmitter<void>();
  @Output() closeRaceDetails = new EventEmitter<void>();
  @Output() selectClass = new EventEmitter<ApiReference>();
  @Output() viewClassDetails = new EventEmitter<string>();
  @Output() selectRace = new EventEmitter<ApiReference>();
  @Output() viewRaceDetails = new EventEmitter<string>();
}
