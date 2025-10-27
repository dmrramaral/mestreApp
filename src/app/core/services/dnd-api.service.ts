import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

/**
 * Serviço para integração com D&D 5e API 2024
 * Fornece dados para auxiliar na criação de personagens
 */
@Injectable({
  providedIn: 'root'
})
export class DndApiService {
  private readonly BASE_URL = 'https://www.dnd5eapi.co/api/2024';
  private readonly BASE_URL_2014 = 'https://www.dnd5eapi.co/api/2014';
  private readonly OPEN5E_URL = 'https://api.open5e.com';

  // Cache para evitar requisições desnecessárias
  private abilityScoresCache$?: Observable<any>;
  private alignmentsCache$?: Observable<any>;
  private conditionsCache$?: Observable<any>;
  private damageTypesCache$?: Observable<any>;
  private equipmentCache$?: Observable<any>;
  private equipmentCategoriesCache$?: Observable<any>;
  private languagesCache$?: Observable<any>;
  private magicSchoolsCache$?: Observable<any>;
  private skillsCache$?: Observable<any>;
  private weaponMasteryPropertiesCache$?: Observable<any>;
  private weaponPropertiesCache$?: Observable<any>;
  private classesCache$?: Observable<any>;
  private racesCache$?: Observable<any>;
  private spellsCache$?: Observable<any>;
  private featsCache$?: Observable<any>;

  constructor(private http: HttpClient) { }

  /**
   * Obtém lista de scores de habilidade (ability scores)
   * Ex: Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma
   */
  getAbilityScores(): Observable<any> {
    if (!this.abilityScoresCache$) {
      this.abilityScoresCache$ = this.http.get(`${this.BASE_URL}/ability-scores`).pipe(
        shareReplay(1)
      );
    }
    return this.abilityScoresCache$;
  }

  /**
   * Obtém detalhes de um ability score específico
   */
  getAbilityScoreDetails(index: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/ability-scores/${index}`);
  }

  /**
   * Obtém lista de alinhamentos (alignments)
   * Ex: Lawful Good, Chaotic Evil, etc.
   */
  getAlignments(): Observable<any> {
    if (!this.alignmentsCache$) {
      this.alignmentsCache$ = this.http.get(`${this.BASE_URL}/alignments`).pipe(
        shareReplay(1)
      );
    }
    return this.alignmentsCache$;
  }

  /**
   * Obtém detalhes de um alinhamento específico
   */
  getAlignmentDetails(index: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/alignments/${index}`);
  }

  /**
   * Obtém lista de condições (conditions)
   * Ex: Blinded, Charmed, Frightened, etc.
   */
  getConditions(): Observable<any> {
    if (!this.conditionsCache$) {
      this.conditionsCache$ = this.http.get(`${this.BASE_URL}/conditions`).pipe(
        shareReplay(1)
      );
    }
    return this.conditionsCache$;
  }

  /**
   * Obtém detalhes de uma condição específica
   */
  getConditionDetails(index: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/conditions/${index}`);
  }

  /**
   * Obtém lista de tipos de dano (damage types)
   * Ex: Fire, Cold, Lightning, etc.
   */
  getDamageTypes(): Observable<any> {
    if (!this.damageTypesCache$) {
      this.damageTypesCache$ = this.http.get(`${this.BASE_URL}/damage-types`).pipe(
        shareReplay(1)
      );
    }
    return this.damageTypesCache$;
  }

  /**
   * Obtém detalhes de um tipo de dano específico
   */
  getDamageTypeDetails(index: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/damage-types/${index}`);
  }

  /**
   * Obtém lista de equipamentos (equipment)
   */
  getEquipment(): Observable<any> {
    if (!this.equipmentCache$) {
      this.equipmentCache$ = this.http.get(`${this.BASE_URL}/equipment`).pipe(
        shareReplay(1)
      );
    }
    return this.equipmentCache$;
  }

  /**
   * Obtém detalhes de um equipamento específico
   */
  getEquipmentDetails(index: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/equipment/${index}`);
  }

  /**
   * Obtém lista de categorias de equipamento (equipment categories)
   */
  getEquipmentCategories(): Observable<any> {
    if (!this.equipmentCategoriesCache$) {
      this.equipmentCategoriesCache$ = this.http.get(`${this.BASE_URL}/equipment-categories`).pipe(
        shareReplay(1)
      );
    }
    return this.equipmentCategoriesCache$;
  }

  /**
   * Obtém detalhes de uma categoria de equipamento específica
   */
  getEquipmentCategoryDetails(index: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/equipment-categories/${index}`);
  }

  /**
   * Obtém lista de idiomas (languages)
   */
  getLanguages(): Observable<any> {
    if (!this.languagesCache$) {
      this.languagesCache$ = this.http.get(`${this.BASE_URL}/languages`).pipe(
        shareReplay(1)
      );
    }
    return this.languagesCache$;
  }

  /**
   * Obtém detalhes de um idioma específico
   */
  getLanguageDetails(index: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/languages/${index}`);
  }

  /**
   * Obtém lista de escolas de magia (magic schools)
   * Ex: Abjuration, Conjuration, Divination, etc.
   */
  getMagicSchools(): Observable<any> {
    if (!this.magicSchoolsCache$) {
      this.magicSchoolsCache$ = this.http.get(`${this.BASE_URL}/magic-schools`).pipe(
        shareReplay(1)
      );
    }
    return this.magicSchoolsCache$;
  }

  /**
   * Obtém detalhes de uma escola de magia específica
   */
  getMagicSchoolDetails(index: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/magic-schools/${index}`);
  }

  /**
   * Obtém lista de perícias (skills)
   * Ex: Athletics, Acrobatics, Stealth, etc.
   */
  getSkills(): Observable<any> {
    if (!this.skillsCache$) {
      this.skillsCache$ = this.http.get(`${this.BASE_URL}/skills`).pipe(
        shareReplay(1)
      );
    }
    return this.skillsCache$;
  }

  /**
   * Obtém detalhes de uma perícia específica
   */
  getSkillDetails(index: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/skills/${index}`);
  }

  /**
   * Obtém lista de propriedades de maestria de arma (weapon mastery properties)
   */
  getWeaponMasteryProperties(): Observable<any> {
    if (!this.weaponMasteryPropertiesCache$) {
      this.weaponMasteryPropertiesCache$ = this.http.get(`${this.BASE_URL}/weapon-mastery-properties`).pipe(
        shareReplay(1)
      );
    }
    return this.weaponMasteryPropertiesCache$;
  }

  /**
   * Obtém detalhes de uma propriedade de maestria de arma específica
   */
  getWeaponMasteryPropertyDetails(index: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/weapon-mastery-properties/${index}`);
  }

  /**
   * Obtém lista de propriedades de arma (weapon properties)
   * Ex: Finesse, Heavy, Light, Loading, etc.
   */
  getWeaponProperties(): Observable<any> {
    if (!this.weaponPropertiesCache$) {
      this.weaponPropertiesCache$ = this.http.get(`${this.BASE_URL}/weapon-properties`).pipe(
        shareReplay(1)
      );
    }
    return this.weaponPropertiesCache$;
  }

  /**
   * Obtém detalhes de uma propriedade de arma específica
   */
  getWeaponPropertyDetails(index: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/weapon-properties/${index}`);
  }

  /**
   * Obtém lista de classes (2014 API)
   * Ex: Barbarian, Bard, Cleric, etc.
   */
  getClasses(): Observable<any> {
    if (!this.classesCache$) {
      this.classesCache$ = this.http.get(`${this.BASE_URL_2014}/classes`).pipe(
        shareReplay(1)
      );
    }
    return this.classesCache$;
  }

  /**
   * Obtém detalhes de uma classe específica (2014 API)
   */
  getClassDetails(index: string): Observable<any> {
    return this.http.get(`${this.BASE_URL_2014}/classes/${index}`);
  }

  /**
   * Obtém lista de raças (2014 API)
   * Ex: Dragonborn, Dwarf, Elf, etc.
   */
  getRaces(): Observable<any> {
    if (!this.racesCache$) {
      this.racesCache$ = this.http.get(`${this.BASE_URL_2014}/races`).pipe(
        shareReplay(1)
      );
    }
    return this.racesCache$;
  }

  /**
   * Obtém detalhes de uma raça específica (2014 API)
   */
  getRaceDetails(index: string): Observable<any> {
    return this.http.get(`${this.BASE_URL_2014}/races/${index}`);
  }

  /**
   * Obtém lista de magias (2014 API)
   * Ex: Fireball, Magic Missile, Cure Wounds, etc.
   */
  getSpells(): Observable<any> {
    if (!this.spellsCache$) {
      this.spellsCache$ = this.http.get(`${this.BASE_URL_2014}/spells`).pipe(
        shareReplay(1)
      );
    }
    return this.spellsCache$;
  }

  /**
   * Obtém lista de magias com filtros (2014 API)
   * @param level - Nível da magia (0-9)
   * @param className - Nome da classe (ex: 'wizard', 'cleric')
   */
  getSpellsWithFilters(level?: string, className?: string): Observable<any> {
    let url = `${this.BASE_URL_2014}/spells`;
    const params: string[] = [];

    if (level) {
      params.push(`level=${level}`);
    }

    if (className) {
      params.push(`class=${className.toLowerCase()}`);
    }

    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    return this.http.get(url);
  }

  /**
   * Obtém detalhes de uma magia específica (2014 API)
   */
  getSpellDetails(index: string): Observable<any> {
    return this.http.get(`${this.BASE_URL_2014}/spells/${index}`);
  }

  /**
   * Obtém lista de talentos/feats (2014 API)
   * Ex: Grappler, Actor, Alert, etc.
   */
  getFeats(): Observable<any> {
    if (!this.featsCache$) {
      this.featsCache$ = this.http.get(`${this.BASE_URL_2014}/feats`).pipe(
        shareReplay(1)
      );
    }
    return this.featsCache$;
  }

  /**
   * Obtém detalhes de um talento/feat específico (2014 API)
   */
  getFeatDetails(index: string): Observable<any> {
    return this.http.get(`${this.BASE_URL_2014}/feats/${index}`);
  }

  /**
   * Busca talentos na Open5e API com busca por texto
   * Retorna resultados paginados com informações completas
   */
  searchFeatsOpen5e(searchTerm: string = '', page: number = 1): Observable<any> {
    const params: any = { page };
    if (searchTerm) {
      params.search = searchTerm;
    }
    const queryString = new URLSearchParams(params).toString();
    return this.http.get(`${this.OPEN5E_URL}/feats/?${queryString}`);
  }

  /**
   * Obtém detalhes de um talento específico da Open5e API
   */
  getFeatDetailsOpen5e(slug: string): Observable<any> {
    return this.http.get(`${this.OPEN5E_URL}/feats/${encodeURIComponent(slug)}/`);
  }

  /**
   * Obtém todos os talentos da Open5e API (paginado)
   */
  getFeatsOpen5e(page: number = 1): Observable<any> {
    return this.http.get(`${this.OPEN5E_URL}/feats/?page=${page}`);
  }

  /**
   * Limpa todos os caches
   * Útil quando é necessário forçar atualização dos dados
   */
  clearCache(): void {
    this.abilityScoresCache$ = undefined;
    this.alignmentsCache$ = undefined;
    this.conditionsCache$ = undefined;
    this.damageTypesCache$ = undefined;
    this.equipmentCache$ = undefined;
    this.equipmentCategoriesCache$ = undefined;
    this.languagesCache$ = undefined;
    this.magicSchoolsCache$ = undefined;
    this.skillsCache$ = undefined;
    this.weaponMasteryPropertiesCache$ = undefined;
    this.weaponPropertiesCache$ = undefined;
    this.classesCache$ = undefined;
    this.racesCache$ = undefined;
    this.spellsCache$ = undefined;
    this.featsCache$ = undefined;
  }
}
