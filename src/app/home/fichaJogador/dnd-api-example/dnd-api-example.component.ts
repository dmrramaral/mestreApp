import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndApiService } from '../../../core/services/dnd-api.service';
import { 
  ApiResourceList, 
  ApiReference,
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
      <h2>API Demonstração</h2>
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
                  <div class="d-flex justify-content-between align-items-center">
                    <span>{{score.name}}</span>
                    <button class="btn btn-sm btn-outline-info" (click)="loadAbilityScoreDetails(score.index)">
                      Ver Detalhes
                    </button>
                  </div>
                  <div *ngIf="abilityScoreDetails[score.index]" class="mt-3 detail-section">
                    <div *ngIf="loadingDetails[score.index]" class="text-center">
                      <small>Carregando detalhes...</small>
                    </div>
                    <div *ngIf="!loadingDetails[score.index] && abilityScoreDetails[score.index]">
                      <strong>Nome Completo:</strong> {{abilityScoreDetails[score.index].full_name}}<br>
                      <strong>Descrição:</strong> {{abilityScoreDetails[score.index].description}}<br>
                      <strong>Skills Relacionadas:</strong>
                      <ul *ngIf="abilityScoreDetails[score.index]?.skills?.length">
                        <li *ngFor="let skill of abilityScoreDetails[score.index]?.skills">{{skill.name}}</li>
                      </ul>
                      <span *ngIf="!abilityScoreDetails[score.index]?.skills?.length" class="text-muted">Nenhuma skill relacionada</span>
                    </div>
                  </div>
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
                  <div class="d-flex justify-content-between align-items-center">
                    <span>{{alignment.name}}</span>
                    <button class="btn btn-sm btn-outline-info" (click)="loadAlignmentDetails(alignment.index)">
                      Ver Detalhes
                    </button>
                  </div>
                  <div *ngIf="alignmentDetails[alignment.index]" class="mt-3 detail-section">
                    <div *ngIf="loadingDetails[alignment.index]" class="text-center">
                      <small>Carregando detalhes...</small>
                    </div>
                    <div *ngIf="!loadingDetails[alignment.index] && alignmentDetails[alignment.index]">
                      <strong>Abreviação:</strong> {{alignmentDetails[alignment.index].abbreviation}}<br>
                      <strong>Descrição:</strong> {{alignmentDetails[alignment.index].description}}
                    </div>
                  </div>
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
                  <div class="d-flex justify-content-between align-items-center">
                    <span>{{language.name}}</span>
                    <button class="btn btn-sm btn-outline-info" (click)="loadLanguageDetails(language.index)">
                      Ver Detalhes
                    </button>
                  </div>
                  <div *ngIf="languageDetails[language.index]" class="mt-3 detail-section">
                    <div *ngIf="loadingDetails[language.index]" class="text-center">
                      <small>Carregando detalhes...</small>
                    </div>
                    <div *ngIf="!loadingDetails[language.index] && languageDetails[language.index]">
                      <strong>Tipo:</strong> {{languageDetails[language.index].is_rare}}<br>
                      <strong>Falantes Típicos:</strong> {{languageDetails[language.index].typical_speakers?.join(', ')}}<br>
                      <strong *ngIf="languageDetails[language.index].script">Escrita:</strong> 
                      <span *ngIf="languageDetails[language.index].script">{{languageDetails[language.index].script}}</span><br>
                      <strong *ngIf="languageDetails[language.index].description">Descrição:</strong> 
                      <span *ngIf="languageDetails[language.index].description">{{languageDetails[language.index].description}}</span>
                    </div>
                  </div>
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
                  <div class="d-flex justify-content-between align-items-center">
                    <span>{{school.name}}</span>
                    <button class="btn btn-sm btn-outline-info" (click)="loadMagicSchoolDetails(school.index)">
                      Ver Detalhes
                    </button>
                  </div>
                  <div *ngIf="magicSchoolDetails[school.index]" class="mt-3 detail-section">
                    <div *ngIf="loadingDetails[school.index]" class="text-center">
                      <small>Carregando detalhes...</small>
                    </div>
                    <div *ngIf="!loadingDetails[school.index] && magicSchoolDetails[school.index]">
                      <strong>Descrição:</strong> {{magicSchoolDetails[school.index].description}}
                    </div>
                  </div>
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
                  <div class="d-flex justify-content-between align-items-center">
                    <span>{{skill.name}}</span>
                    <button class="btn btn-sm btn-outline-info" (click)="loadSkillDetails(skill.index)">
                      Ver Detalhes
                    </button>
                  </div>
                  <div *ngIf="skillDetails[skill.index]" class="mt-3 detail-section">
                    <div *ngIf="loadingDetails[skill.index]" class="text-center">
                      <small>Carregando detalhes...</small>
                    </div>
                    <div *ngIf="!loadingDetails[skill.index] && skillDetails[skill.index]">
                      <strong>Atributo Relacionado:</strong> {{skillDetails[skill.index].ability_score?.name}}<br>
                      <strong>Descrição:</strong> {{skillDetails[skill.index].description}}
                    </div>
                  </div>
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
      max-height: 400px;
      overflow-y: auto;
    }
    .list-group-item {
      border-left: 3px solid transparent;
      transition: border-left-color 0.2s ease;
    }
    .list-group-item:hover {
      border-left-color: #0d6efd;
    }
    .detail-section {
      background-color: #f8f9fa;
      padding: 10px;
      border-radius: 5px;
      border-left: 3px solid #0dcaf0;
      font-size: 0.9rem;
    }
    .detail-section strong {
      color: #0d6efd;
      margin-right: 5px;
    }
    .detail-section ul {
      margin-top: 5px;
      margin-bottom: 5px;
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

  // Details storage
  abilityScoreDetails: { [key: string]: AbilityScore } = {};
  alignmentDetails: { [key: string]: Alignment } = {};
  languageDetails: { [key: string]: Language } = {};
  magicSchoolDetails: { [key: string]: MagicSchool } = {};
  skillDetails: { [key: string]: Skill } = {};
  
  // Loading states
  loadingAbilityScores = false;
  loadingAlignments = false;
  loadingLanguages = false;
  loadingMagicSchools = false;
  loadingSkills = false;
  loadingEquipmentCategories = false;
  loadingDetails: { [key: string]: boolean } = {};

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

  loadAbilityScoreDetails(index: string): void {
    // Toggle detail view
    if (this.abilityScoreDetails[index]) {
      delete this.abilityScoreDetails[index];
      return;
    }

    this.loadingDetails[index] = true;
    this.dndApiService.getAbilityScoreDetails(index).subscribe({
      next: (data) => {
        this.abilityScoreDetails[index] = data;
        this.loadingDetails[index] = false;
        console.log('Ability Score details loaded:', data);
      },
      error: (error) => {
        console.error('Error loading ability score details:', error);
        this.loadingDetails[index] = false;
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

  loadAlignmentDetails(index: string): void {
    // Toggle detail view
    if (this.alignmentDetails[index]) {
      delete this.alignmentDetails[index];
      return;
    }

    this.loadingDetails[index] = true;
    this.dndApiService.getAlignmentDetails(index).subscribe({
      next: (data) => {
        this.alignmentDetails[index] = data;
        this.loadingDetails[index] = false;
        console.log('Alignment details loaded:', data);
      },
      error: (error) => {
        console.error('Error loading alignment details:', error);
        this.loadingDetails[index] = false;
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

  loadLanguageDetails(index: string): void {
    // Toggle detail view
    if (this.languageDetails[index]) {
      delete this.languageDetails[index];
      return;
    }

    this.loadingDetails[index] = true;
    this.dndApiService.getLanguageDetails(index).subscribe({
      next: (data) => {
        this.languageDetails[index] = data;
        this.loadingDetails[index] = false;
        console.log('Language details loaded:', data);
      },
      error: (error) => {
        console.error('Error loading language details:', error);
        this.loadingDetails[index] = false;
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

  loadMagicSchoolDetails(index: string): void {
    // Toggle detail view
    if (this.magicSchoolDetails[index]) {
      delete this.magicSchoolDetails[index];
      return;
    }

    this.loadingDetails[index] = true;
    this.dndApiService.getMagicSchoolDetails(index).subscribe({
      next: (data) => {
        this.magicSchoolDetails[index] = data;
        this.loadingDetails[index] = false;
        console.log('Magic School details loaded:', data);
      },
      error: (error) => {
        console.error('Error loading magic school details:', error);
        this.loadingDetails[index] = false;
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

  loadSkillDetails(index: string): void {
    // Toggle detail view
    if (this.skillDetails[index]) {
      delete this.skillDetails[index];
      return;
    }

    this.loadingDetails[index] = true;
    this.dndApiService.getSkillDetails(index).subscribe({
      next: (data) => {
        this.skillDetails[index] = data;
        this.loadingDetails[index] = false;
        console.log('Skill details loaded:', data);
      },
      error: (error) => {
        console.error('Error loading skill details:', error);
        this.loadingDetails[index] = false;
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
