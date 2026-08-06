import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';
import { DEFAULT_MONSTER_FILTER, MonsterFilter } from '../../../../core/models/monster-cards.model';

@Component({
  selector: 'app-monster-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './monster-filter.component.html',
  styleUrl: './monster-filter.component.scss'
})
export class MonsterFilterComponent implements OnInit {
  @Input() monsterTypes: string[] = [];
  @Input() totalMonsters = 0;
  @Input() filteredMonsters = 0;

  @Output() filtersChange = new EventEmitter<MonsterFilter>();
  @Output() clearRequested = new EventEmitter<void>();

  private readonly fb = inject(FormBuilder);

  readonly filterForm = this.fb.group({
    query: this.fb.nonNullable.control(DEFAULT_MONSTER_FILTER.query),
    crMin: this.fb.nonNullable.control(DEFAULT_MONSTER_FILTER.crMin),
    crMax: this.fb.nonNullable.control(DEFAULT_MONSTER_FILTER.crMax),
    hpMin: this.fb.control<number | null>(DEFAULT_MONSTER_FILTER.hpMin),
    hpMax: this.fb.control<number | null>(DEFAULT_MONSTER_FILTER.hpMax),
    types: this.fb.nonNullable.control<string[]>([])
  });

  ngOnInit(): void {
    this.filterForm.valueChanges.pipe(
      startWith(this.filterForm.getRawValue()),
      debounceTime(120)
    ).subscribe((value) => {
      this.filtersChange.emit(this.normalizeFilter(value));
    });
  }

  toggleType(type: string): void {
    const current = this.filterForm.controls.types.value;
    const exists = current.includes(type);
    const updated = exists ? current.filter((item) => item !== type) : [...current, type];
    this.filterForm.controls.types.setValue(updated);
  }

  clearFilters(): void {
    this.filterForm.reset({ ...DEFAULT_MONSTER_FILTER, types: [] });
    this.clearRequested.emit();
  }

  isTypeSelected(type: string): boolean {
    return this.filterForm.controls.types.value.includes(type);
  }

  private normalizeFilter(value: Partial<MonsterFilter>): MonsterFilter {
    const crMin = this.toNumber(value.crMin, 0);
    const crMax = this.toNumber(value.crMax, 30);

    const normalizedCrMin = Math.max(0, Math.min(30, Math.min(crMin, crMax)));
    const normalizedCrMax = Math.max(0, Math.min(30, Math.max(crMin, crMax)));

    const hpMin = value.hpMin === null || value.hpMin === undefined ? null : this.toNumber(value.hpMin, 0);
    const hpMax = value.hpMax === null || value.hpMax === undefined ? null : this.toNumber(value.hpMax, 0);

    const normalizedHpMin = hpMin === null ? null : Math.max(0, hpMin);
    const normalizedHpMax = hpMax === null ? null : Math.max(0, hpMax);

    return {
      query: (value.query ?? '').trimStart(),
      crMin: normalizedCrMin,
      crMax: normalizedCrMax,
      hpMin: normalizedHpMin,
      hpMax: normalizedHpMax,
      types: value.types ?? []
    };
  }

  private toNumber(value: number | null | undefined, fallback: number): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
}
