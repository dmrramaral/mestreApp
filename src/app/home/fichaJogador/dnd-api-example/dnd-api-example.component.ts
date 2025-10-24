import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndApiService } from '../../../core/services/dnd-api.service';
import { 
  ApiResourceList, 
  AbilityScore, 
  Alignment, 
  Language, 
  MagicSchool, 
  Skill 
} from '../../../core/models/dnd-api.model';

/**
 * Componente de exemplo para demonstrar o uso do DndApiService
 * Este componente mostra como buscar dados da API D&D 5e para criação de personagens
 */
@Component({
  selector: 'app-dnd-api-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2>Exemplo de uso da D&D 5e API</h2>
      <p class="text-muted">Demonstração de como usar o DndApiService para buscar dados de criação de personagens</p>
      
      <div class="row mt-4">
        <!-- Ability Scores -->
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-header">
              <h5>Ability Scores (Atributos)</h5>
              <button class="btn btn-sm btn-primary" (click)="loadAbilityScores()">Carregar</button>
            </div>
            <div class="card-body">
              <div *ngIf="loadingAbilityScores">Carregando...</div>
              <ul *ngIf="abilityScores" class="list-group">
                <li *ngFor="let score of abilityScores.results" class="list-group-item">
                  {{score.name}}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Alignments -->
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-header">
              <h5>Alignments (Alinhamentos)</h5>
              <button class="btn btn-sm btn-primary" (click)="loadAlignments()">Carregar</button>
            </div>
            <div class="card-body">
              <div *ngIf="loadingAlignments">Carregando...</div>
              <ul *ngIf="alignments" class="list-group">
                <li *ngFor="let alignment of alignments.results" class="list-group-item">
                  {{alignment.name}}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Languages -->
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-header">
              <h5>Languages (Idiomas)</h5>
              <button class="btn btn-sm btn-primary" (click)="loadLanguages()">Carregar</button>
            </div>
            <div class="card-body">
              <div *ngIf="loadingLanguages">Carregando...</div>
              <ul *ngIf="languages" class="list-group">
                <li *ngFor="let language of languages.results" class="list-group-item">
                  {{language.name}}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Magic Schools -->
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-header">
              <h5>Magic Schools (Escolas de Magia)</h5>
              <button class="btn btn-sm btn-primary" (click)="loadMagicSchools()">Carregar</button>
            </div>
            <div class="card-body">
              <div *ngIf="loadingMagicSchools">Carregando...</div>
              <ul *ngIf="magicSchools" class="list-group">
                <li *ngFor="let school of magicSchools.results" class="list-group-item">
                  {{school.name}}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Skills -->
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-header">
              <h5>Skills (Perícias)</h5>
              <button class="btn btn-sm btn-primary" (click)="loadSkills()">Carregar</button>
            </div>
            <div class="card-body">
              <div *ngIf="loadingSkills">Carregando...</div>
              <ul *ngIf="skills" class="list-group">
                <li *ngFor="let skill of skills.results" class="list-group-item">
                  {{skill.name}}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Equipment Categories -->
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-header">
              <h5>Equipment Categories (Categorias de Equipamento)</h5>
              <button class="btn btn-sm btn-primary" (click)="loadEquipmentCategories()">Carregar</button>
            </div>
            <div class="card-body">
              <div *ngIf="loadingEquipmentCategories">Carregando...</div>
              <ul *ngIf="equipmentCategories" class="list-group">
                <li *ngFor="let category of equipmentCategories.results" class="list-group-item">
                  {{category.name}}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="alert alert-info mt-4">
        <h6>Exemplo de código:</h6>
        <pre><code>// No componente, injete o serviço
constructor(private dndApiService: DndApiService) {{ '{' }}{{ '}' }}

// Para buscar ability scores
this.dndApiService.getAbilityScores().subscribe(data => {{ '{' }}
  console.log('Ability Scores:', data);
{{ '}' }});

// Para buscar detalhes de um ability score específico
this.dndApiService.getAbilityScoreDetails('str').subscribe(data => {{ '{' }}
  console.log('Strength details:', data);
{{ '}' }});</code></pre>
      </div>
    </div>
  `,
  styles: [`
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .list-group {
      max-height: 200px;
      overflow-y: auto;
    }
    pre {
      background: #f5f5f5;
      padding: 1rem;
      border-radius: 4px;
    }
  `]
})
export class DndApiExampleComponent implements OnInit {
  abilityScores?: ApiResourceList;
  alignments?: ApiResourceList;
  languages?: ApiResourceList;
  magicSchools?: ApiResourceList;
  skills?: ApiResourceList;
  equipmentCategories?: ApiResourceList;

  loadingAbilityScores = false;
  loadingAlignments = false;
  loadingLanguages = false;
  loadingMagicSchools = false;
  loadingSkills = false;
  loadingEquipmentCategories = false;

  constructor(private dndApiService: DndApiService) {}

  ngOnInit(): void {
    // Opcionalmente, pode carregar dados automaticamente
  }

  loadAbilityScores(): void {
    this.loadingAbilityScores = true;
    this.dndApiService.getAbilityScores().subscribe({
      next: (data) => {
        this.abilityScores = data;
        this.loadingAbilityScores = false;
        console.log('Ability Scores loaded:', data);
      },
      error: (error) => {
        console.error('Error loading ability scores:', error);
        this.loadingAbilityScores = false;
      }
    });
  }

  loadAlignments(): void {
    this.loadingAlignments = true;
    this.dndApiService.getAlignments().subscribe({
      next: (data) => {
        this.alignments = data;
        this.loadingAlignments = false;
        console.log('Alignments loaded:', data);
      },
      error: (error) => {
        console.error('Error loading alignments:', error);
        this.loadingAlignments = false;
      }
    });
  }

  loadLanguages(): void {
    this.loadingLanguages = true;
    this.dndApiService.getLanguages().subscribe({
      next: (data) => {
        this.languages = data;
        this.loadingLanguages = false;
        console.log('Languages loaded:', data);
      },
      error: (error) => {
        console.error('Error loading languages:', error);
        this.loadingLanguages = false;
      }
    });
  }

  loadMagicSchools(): void {
    this.loadingMagicSchools = true;
    this.dndApiService.getMagicSchools().subscribe({
      next: (data) => {
        this.magicSchools = data;
        this.loadingMagicSchools = false;
        console.log('Magic Schools loaded:', data);
      },
      error: (error) => {
        console.error('Error loading magic schools:', error);
        this.loadingMagicSchools = false;
      }
    });
  }

  loadSkills(): void {
    this.loadingSkills = true;
    this.dndApiService.getSkills().subscribe({
      next: (data) => {
        this.skills = data;
        this.loadingSkills = false;
        console.log('Skills loaded:', data);
      },
      error: (error) => {
        console.error('Error loading skills:', error);
        this.loadingSkills = false;
      }
    });
  }

  loadEquipmentCategories(): void {
    this.loadingEquipmentCategories = true;
    this.dndApiService.getEquipmentCategories().subscribe({
      next: (data) => {
        this.equipmentCategories = data;
        this.loadingEquipmentCategories = false;
        console.log('Equipment Categories loaded:', data);
      },
      error: (error) => {
        console.error('Error loading equipment categories:', error);
        this.loadingEquipmentCategories = false;
      }
    });
  }
}
