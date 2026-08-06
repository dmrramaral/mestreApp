import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MonsterCardViewModel } from '../../../../core/models/monster-cards.model';

@Component({
  selector: 'app-monster-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monster-card.component.html',
  styleUrl: './monster-card.component.scss'
})
export class MonsterCardComponent {
  @Input({ required: true }) monster!: MonsterCardViewModel;
  @Input() selected = false;
  @Input() printMode = false;

  @Output() selectedChange = new EventEmitter<boolean>();

  onSelectionChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedChange.emit(target.checked);
  }

  formatModifier(value: number): string {
    return `${value >= 0 ? '+' : ''}${value}`;
  }
}
