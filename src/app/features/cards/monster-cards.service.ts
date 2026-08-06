import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, shareReplay, switchMap } from 'rxjs';
import {
    MonsterCardViewModel,
    MonsterCombatAction,
    MonsterDetail,
    MonsterFilter,
    MonsterListResponse
} from '../../core/models/monster-cards.model';

@Injectable({
  providedIn: 'root'
})
export class MonsterCardsService {
  private readonly baseUrl = 'https://www.dnd5eapi.co/api/monsters';
  private readonly imageBaseUrl = 'https://www.dnd5eapi.co';
  private readonly lang = 'pt-BR';

  private monsterCardsCache$?: Observable<MonsterCardViewModel[]>;

  constructor(private readonly http: HttpClient) {}

  getMonsterCards(): Observable<MonsterCardViewModel[]> {
    if (!this.monsterCardsCache$) {
      this.monsterCardsCache$ = this.getMonsterList().pipe(
        switchMap((listResponse) => {
          const results = listResponse.results ?? [];
          if (!results.length) {
            return of([]);
          }

          return forkJoin(
            results.map((item) =>
              this.getMonsterDetail(item.index).pipe(
                map((detail) => this.toViewModel(detail)),
                catchError(() => of(null))
              )
            )
          );
        }),
        map((items) => items.filter((item): item is MonsterCardViewModel => item !== null)),
        map((items) => [...items].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))),
        shareReplay(1)
      );
    }

    return this.monsterCardsCache$;
  }

  applyFilters(cards: MonsterCardViewModel[], filter: MonsterFilter): MonsterCardViewModel[] {
    return cards.filter((card) => {
      const query = filter.query.trim().toLowerCase();
      const nameMatches = !query || card.name.toLowerCase().includes(query);
      const crMatches = card.challengeRating >= filter.crMin && card.challengeRating <= filter.crMax;

      const hpMin = filter.hpMin ?? Number.NEGATIVE_INFINITY;
      const hpMax = filter.hpMax ?? Number.POSITIVE_INFINITY;
      const hpMatches = card.hitPoints >= hpMin && card.hitPoints <= hpMax;

      const typeMatches = !filter.types.length || filter.types.includes(card.type);

      return nameMatches && crMatches && hpMatches && typeMatches;
    });
  }

  private getMonsterList(): Observable<MonsterListResponse> {
    const params = new HttpParams().set('lang', this.lang);
    return this.http.get<MonsterListResponse>(this.baseUrl, { params });
  }

  private getMonsterDetail(index: string): Observable<MonsterDetail> {
    const params = new HttpParams().set('lang', this.lang);
    return this.http.get<MonsterDetail>(`${this.baseUrl}/${index}`, { params });
  }

  private toViewModel(detail: MonsterDetail): MonsterCardViewModel {
    const armorClassEntry = Array.isArray(detail.armor_class) && detail.armor_class.length
      ? detail.armor_class[0]
      : { value: 0, type: 'N/A' };

    const specialAbilities = Array.isArray(detail.special_abilities)
      ? detail.special_abilities
      : [];

    const combatActions = (Array.isArray(detail.actions) ? detail.actions : [])
      .map((action) => this.normalizeAction(action.name, action.desc, action.attack_bonus, action.damage));

    return {
      index: detail.index,
      name: detail.name,
      imageUrl: this.resolveImage(detail.image),
      size: detail.size,
      type: detail.type,
      alignment: detail.alignment,
      challengeRating: Number(detail.challenge_rating ?? 0),
      hitPoints: Number(detail.hit_points ?? 0),
      armorClass: Number(armorClassEntry.value ?? 0),
      armorClassType: armorClassEntry.type ?? 'N/A',
      speedText: this.formatSpeed(detail.speed),
      stats: [
        { label: 'STR', value: detail.strength, modifier: this.getModifier(detail.strength) },
        { label: 'DEX', value: detail.dexterity, modifier: this.getModifier(detail.dexterity) },
        { label: 'CON', value: detail.constitution, modifier: this.getModifier(detail.constitution) },
        { label: 'INT', value: detail.intelligence, modifier: this.getModifier(detail.intelligence) },
        { label: 'WIS', value: detail.wisdom, modifier: this.getModifier(detail.wisdom) },
        { label: 'CHA', value: detail.charisma, modifier: this.getModifier(detail.charisma) }
      ],
      savingThrows: this.extractSavingThrows(detail.proficiencies),
      damageResistances: this.normalizeTags(detail.damage_resistances),
      damageImmunities: this.normalizeTags(detail.damage_immunities),
      damageVulnerabilities: this.normalizeTags(detail.damage_vulnerabilities),
      specialAbilities,
      combatActions
    };
  }

  private normalizeAction(
    name: string,
    description: string,
    attackBonus?: number,
    damage?: Array<{ damage_dice?: string; damage_type?: { name?: string } }>
  ): MonsterCombatAction {
    const rangeMatch = description.match(/alcance\s+([\d\s\w.,]+?)(?:,|\.)/i)
      ?? description.match(/reach\s+([\d\s\w.,]+?)(?:,|\.)/i);

    const damageText = (damage ?? [])
      .map((entry) => {
        const dice = entry.damage_dice ?? '';
        const typeName = entry.damage_type?.name ?? '';
        return `${dice}${typeName ? ` ${typeName}` : ''}`.trim();
      })
      .filter(Boolean)
      .join(' + ');

    return {
      name,
      description,
      rangeText: rangeMatch ? rangeMatch[1].trim() : undefined,
      attackBonusText: attackBonus === undefined ? undefined : `${attackBonus >= 0 ? '+' : ''}${attackBonus}`,
      damageText: damageText || undefined
    };
  }

  private formatSpeed(speed: Record<string, string | undefined>): string {
    const entries = Object.entries(speed ?? {})
      .filter(([, value]) => Boolean(value))
      .map(([key, value]) => `${this.translateSpeedType(key)} ${value}`);

    return entries.length ? entries.join(' | ') : 'N/A';
  }

  private translateSpeedType(type: string): string {
    const map: Record<string, string> = {
      walk: 'Andar',
      fly: 'Voar',
      swim: 'Nadar',
      climb: 'Escalar',
      burrow: 'Escavar'
    };

    return map[type] ?? type;
  }

  private normalizeTags(values: Array<string | { name?: string }> | undefined): string[] {
    if (!Array.isArray(values)) {
      return [];
    }

    return values
      .map((item) => {
        if (typeof item === 'string') {
          return item;
        }
        return item?.name ?? '';
      })
      .map((item) => item.trim())
      .filter(Boolean);
  }

  private extractSavingThrows(proficiencies: Array<{ proficiency?: { name?: string }; value?: number }> | undefined): string[] {
    if (!Array.isArray(proficiencies)) {
      return [];
    }

    return proficiencies
      .filter((item) => (item.proficiency?.name ?? '').toLowerCase().includes('saving throw'))
      .map((item) => {
        const name = item.proficiency?.name?.replace('Saving Throw:', '').trim() ?? 'N/A';
        const value = item.value ?? 0;
        return `${name} ${value >= 0 ? '+' : ''}${value}`;
      });
  }

  private resolveImage(image?: string): string | null {
    if (!image) {
      return null;
    }

    if (image.startsWith('http')) {
      return image;
    }

    return `${this.imageBaseUrl}${image}`;
  }

  private getModifier(value: number): number {
    return Math.floor((Number(value ?? 0) - 10) / 2);
  }
}
