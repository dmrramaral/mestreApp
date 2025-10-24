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
  desc: string[];
  skills: ApiReference[];
}

/**
 * Alignment (Alinhamento)
 */
export interface Alignment extends ApiReference {
  abbreviation: string;
  desc: string;
}

/**
 * Condition (Condição)
 */
export interface Condition extends ApiReference {
  desc: string[];
}

/**
 * Damage Type (Tipo de Dano)
 */
export interface DamageType extends ApiReference {
  desc: string[];
}

/**
 * Equipment (Equipamento)
 */
export interface Equipment extends ApiReference {
  equipment_category: ApiReference;
  cost?: {
    quantity: number;
    unit: string;
  };
  weight?: number;
  desc?: string[];
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
  desc?: string;
}

/**
 * Magic School (Escola de Magia)
 */
export interface MagicSchool extends ApiReference {
  desc: string;
}

/**
 * Skill (Perícia)
 */
export interface Skill extends ApiReference {
  desc: string[];
  ability_score: ApiReference;
}

/**
 * Weapon Mastery Property (Propriedade de Maestria de Arma)
 */
export interface WeaponMasteryProperty extends ApiReference {
  desc: string[];
}

/**
 * Weapon Property (Propriedade de Arma)
 */
export interface WeaponProperty extends ApiReference {
  desc: string[];
}
