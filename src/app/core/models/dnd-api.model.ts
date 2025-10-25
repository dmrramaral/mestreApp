/**
 * Interfaces para respostas da D&D 5e API
 * Baseado na API 2024: https://www.dnd5eapi.co/api/2024/
 */

/**
 * Referência comum para recursos da API
 */
export interface ApiReference {
  index: string;
  name: string;
  url: string;
}

/**
 * Lista de recursos da API
 */
export interface ApiResourceList {
  count: number;
  results: ApiReference[];
}

/**
 * Ability Score (Atributo)
 */
export interface AbilityScore extends ApiReference {
  full_name: string;
  description: string;
  skills: ApiReference[];
}

/**
 * Alignment (Alinhamento)
 */
export interface Alignment extends ApiReference {
  abbreviation: string;
  description: string;
}

/**
 * Condition (Condição)
 */
export interface Condition extends ApiReference {
  description: string[];
}

/**
 * Damage Type (Tipo de Dano)
 */
export interface DamageType extends ApiReference {
  description: string[];
}

/**
 * Equipment (Equipamento)
 */
export interface Equipment extends ApiReference {
  equipment_category: ApiReference;
  equipment_categories?: ApiReference[];
  cost?: {
    quantity: number;
    unit: string;
  };
  weight?: number;
  description?: string[];
}

/**
 * Equipment Category (Categoria de Equipamento)
 */
export interface EquipmentCategory extends ApiReference {
  equipment: ApiReference[];
}

/**
 * Language (Idioma)
 */
export interface Language extends ApiReference {
  type: string;
  typical_speakers: string[];
  script?: string;
  description?: string;
  is_rare: boolean;
}

/**
 * Magic School (Escola de Magia)
 */
export interface MagicSchool extends ApiReference {
  description: string;
}

/**
 * Skill (Perícia)
 */
export interface Skill extends ApiReference {
  description: string;
  ability_score: ApiReference;
}

/**
 * Weapon Mastery Property (Propriedade de Maestria de Arma)
 */
export interface WeaponMasteryProperty extends ApiReference {
  description: string[];
}

/**
 * Weapon Property (Propriedade de Arma)
 */
export interface WeaponProperty extends ApiReference {
  description: string[];
}

/**
 * Class (Classe) - 2014 API
 */
export interface DndClass extends ApiReference {
  hit_die?: number;
  proficiencies?: ApiReference[];
  saving_throws?: ApiReference[];
  starting_equipment?: any[];
  class_levels?: string;
  multi_classing?: any;
  subclasses?: ApiReference[];
  spellcasting?: any;
}

/**
 * Race (Raça) - 2014 API
 */
export interface DndRace extends ApiReference {
  speed?: number;
  ability_bonuses?: Array<{
    ability_score: ApiReference;
    bonus: number;
  }>;
  alignment?: string;
  age?: string;
  size?: string;
  size_description?: string;
  starting_proficiencies?: ApiReference[];
  languages?: ApiReference[];
  language_desc?: string;
  traits?: ApiReference[];
  subraces?: ApiReference[];
}

/**
 * Spell (Magia) - 2014 API
 */
export interface DndSpell extends ApiReference {
  level?: number;
  school?: ApiReference;
  casting_time?: string;
  range?: string;
  components?: string[];
  duration?: string;
  concentration?: boolean;
  ritual?: boolean;
  description?: string[];
  higher_level?: string[];
  material?: string;
  attack_type?: string;
  damage?: {
    damage_type?: ApiReference;
    damage_at_slot_level?: { [key: string]: string };
    damage_at_character_level?: { [key: string]: string };
  };
  dc?: {
    dc_type?: ApiReference;
    dc_success?: string;
  };
  area_of_effect?: {
    type?: string;
    size?: number;
  };
  classes?: ApiReference[];
  subclasses?: ApiReference[];
}

/**
 * Feat (Talento) - 2014 API
 */
export interface DndFeat extends ApiReference {
  prerequisites?: Array<{
    ability_score?: ApiReference;
    minimum_score?: number;
  }>;
  description?: string[];
}
