export interface MonsterApiReference {
  index: string;
  name: string;
  url: string;
}

export interface MonsterListResponse {
  count: number;
  results: MonsterApiReference[];
}

export interface MonsterArmorClass {
  type?: string;
  value: number;
}

export interface MonsterSpeed {
  walk?: string;
  burrow?: string;
  climb?: string;
  fly?: string;
  swim?: string;
  [key: string]: string | undefined;
}

export interface MonsterDamageEntry {
  damage_dice?: string;
  damage_type?: {
    index?: string;
    name?: string;
    url?: string;
  };
}

export interface MonsterAction {
  name: string;
  desc: string;
  attack_bonus?: number;
  damage?: MonsterDamageEntry[];
}

export interface MonsterSpecialAbility {
  name: string;
  desc: string;
}

export interface MonsterProficiency {
  proficiency?: {
    index?: string;
    name?: string;
    url?: string;
  };
  value?: number;
}

export interface MonsterDetail {
  index: string;
  name: string;
  image?: string;
  size: string;
  type: string;
  alignment: string;
  challenge_rating: number;
  hit_points: number;
  armor_class: MonsterArmorClass[];
  speed: MonsterSpeed;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  damage_vulnerabilities: Array<string | { name?: string }>;
  damage_resistances: Array<string | { name?: string }>;
  damage_immunities: Array<string | { name?: string }>;
  proficiencies: MonsterProficiency[];
  special_abilities: MonsterSpecialAbility[];
  actions: MonsterAction[];
}

export interface MonsterFilter {
  query: string;
  crMin: number;
  crMax: number;
  hpMin: number | null;
  hpMax: number | null;
  types: string[];
}

export interface MonsterStat {
  label: 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';
  value: number;
  modifier: number;
}

export interface MonsterCombatAction {
  name: string;
  description: string;
  rangeText?: string;
  attackBonusText?: string;
  damageText?: string;
}

export interface MonsterCardViewModel {
  index: string;
  name: string;
  imageUrl: string | null;
  size: string;
  type: string;
  alignment: string;
  challengeRating: number;
  hitPoints: number;
  armorClass: number;
  armorClassType: string;
  speedText: string;
  stats: MonsterStat[];
  savingThrows: string[];
  damageResistances: string[];
  damageImmunities: string[];
  damageVulnerabilities: string[];
  specialAbilities: MonsterSpecialAbility[];
  combatActions: MonsterCombatAction[];
}

export const DEFAULT_MONSTER_FILTER: MonsterFilter = {
  query: '',
  crMin: 0,
  crMax: 30,
  hpMin: null,
  hpMax: null,
  types: []
};
