import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiReference } from '../../../../core/models/dnd-api.model';
import { DndApiService } from '../../../../core/services/dnd-api.service';

@Component({
  selector: 'app-feature-search-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feature-search-modal.component.html',
  styleUrl: './feature-search-modal.component.scss'
})
export class FeatureSearchModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() featSelected = new EventEmitter<any>();

  availableFeats: ApiReference[] = [];
  filteredFeats: ApiReference[] = [];
  featSearchTerm = '';
  loadingFeats = false;
  selectedFeatDetails: any = null;

  constructor(private dndApiService: DndApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']?.currentValue === true && this.availableFeats.length === 0) {
      this.loadFeatsFromOpen5e();
    }
  }

  fechar(): void {
    this.featSearchTerm = '';
    this.selectedFeatDetails = null;
    this.filteredFeats = this.availableFeats;
    this.closeModal.emit();
  }

  loadFeatsFromOpen5e(page: number = 1): void {
    this.loadingFeats = true;
    this.dndApiService.getFeatsOpen5e(page).subscribe({
      next: (data) => {
        this.availableFeats = data.results || [];
        this.filteredFeats = this.availableFeats;
        this.loadingFeats = false;
      },
      error: () => {
        this.loadFeats();
      }
    });
  }

  loadFeats(): void {
    this.loadingFeats = true;
    this.dndApiService.getFeats().subscribe({
      next: (data) => {
        this.availableFeats = data.results || [];
        this.filteredFeats = this.availableFeats;
        this.loadingFeats = false;
      },
      error: () => {
        this.loadingFeats = false;
      }
    });
  }

  filtrarTalentos(): void {
    if (!this.featSearchTerm || this.featSearchTerm.trim().length < 2) {
      this.loadFeatsFromOpen5e();
      return;
    }

    this.loadingFeats = true;
    this.dndApiService.searchFeatsOpen5e(this.featSearchTerm).subscribe({
      next: (data) => {
        this.availableFeats = data.results || [];
        this.filteredFeats = this.availableFeats;
        this.loadingFeats = false;
      },
      error: () => {
        const term = this.featSearchTerm.toLowerCase();
        this.filteredFeats = this.availableFeats.filter((feat) =>
          feat.name?.toLowerCase().includes(term) || (feat as any).slug?.toLowerCase().includes(term)
        );
        this.loadingFeats = false;
      }
    });
  }

  viewFeatDetails(featIndexOrSlug: string): void {
    if (!featIndexOrSlug) {
      return;
    }

    this.dndApiService.getFeatDetailsOpen5e(featIndexOrSlug).subscribe({
      next: (data) => {
        this.selectedFeatDetails = data;
      },
      error: () => {
        this.dndApiService.getFeatDetails(featIndexOrSlug).subscribe({
          next: (data) => {
            this.selectedFeatDetails = data;
          }
        });
      }
    });
  }

  adicionarTalentoApi(feat: any): void {
    this.featSelected.emit(feat);
    this.fechar();
  }

  voltarListaTalentos(): void {
    this.selectedFeatDetails = null;
  }

  isString(value: any): boolean {
    return typeof value === 'string';
  }

  getFeatDescPreview(feat: any): string {
    const desc = feat.desc;
    if (!desc) {
      return '';
    }
    if (typeof desc === 'string') {
      return desc.length > 100 ? `${desc.substring(0, 100)}...` : desc;
    }
    return '';
  }

  getFeatId(feat: any): string {
    return feat.index || feat.slug || '';
  }
}
