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
  description: string[];
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
  description: string[];
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
