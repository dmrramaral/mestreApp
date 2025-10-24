import { ATTRIBUTE_MODIFIER_RANGES } from '../constants/rpg.constants';

/**
 * Funções utilitárias para cálculos relacionados a RPG
 */

/**
 * Calcula o modificador de um atributo baseado no seu valor
 * Segue as regras do D&D 5e
 * 
 * @param attributeValue - Valor do atributo (8-30)
 * @returns O modificador calculado ou null se o valor estiver fora do range
 * 
 * @example
 * calcularModificador(16) // retorna 3
 * calcularModificador(10) // retorna 0
 */
export function calcularModificador(attributeValue: number | null): number | null {
  if (attributeValue === null || attributeValue === undefined) {
    return null;
  }

  const range = ATTRIBUTE_MODIFIER_RANGES.find(
    r => attributeValue >= r.min && attributeValue <= r.max
  );

  return range ? range.modifier : null;
}

/**
 * Calcula o bônus de perícia baseado no modificador do atributo,
 * proficiência e tipo de proficiência
 * 
 * @param attributeModifier - Modificador do atributo base
 * @param proficiencyBonus - Bônus de proficiência do personagem
 * @param proficiencyType - Tipo de proficiência ('nao', 'sim', 'expertise')
 * @returns O bônus total da perícia
 * 
 * @example
 * calcularBonusPericia(2, 3, 'sim') // retorna 5 (2 + 3)
 * calcularBonusPericia(2, 3, 'expertise') // retorna 8 (2 + 3*2)
 */
export function calcularBonusPericia(
  attributeModifier: number,
  proficiencyBonus: number,
  proficiencyType: 'nao' | 'sim' | 'expertise'
): number {
  let bonus = attributeModifier;

  if (proficiencyType === 'sim') {
    bonus += proficiencyBonus;
  } else if (proficiencyType === 'expertise') {
    bonus += proficiencyBonus * 2;
  }

  return bonus;
}

/**
 * Formata um modificador com o sinal apropriado
 * 
 * @param modifier - Valor do modificador
 * @returns String formatada com sinal (ex: "+3", "-1", "+0")
 * 
 * @example
 * formatarModificador(3) // retorna "+3"
 * formatarModificador(-1) // retorna "-1"
 * formatarModificador(0) // retorna "+0"
 */
export function formatarModificador(modifier: number | null): string {
  if (modifier === null) {
    return '+0';
  }
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}

/**
 * Calcula o bônus de proficiência baseado no nível do personagem
 * Segue as regras do D&D 5e
 * 
 * @param level - Nível do personagem (1-20)
 * @returns O bônus de proficiência
 * 
 * @example
 * calcularBonusProficiencia(1) // retorna 2
 * calcularBonusProficiencia(5) // retorna 3
 * calcularBonusProficiencia(17) // retorna 6
 */
export function calcularBonusProficiencia(level: number | null): number {
  if (!level || level < 1) {
    return 2;
  }
  return Math.floor((level - 1) / 4) + 2;
}

/**
 * Valida se um valor de atributo está dentro do range válido
 * 
 * @param value - Valor a ser validado
 * @returns true se o valor é válido
 */
export function validarValorAtributo(value: number | null): boolean {
  if (value === null || value === undefined) {
    return false;
  }
  return value >= 1 && value <= 30;
}

/**
 * Calcula dados de vida adicionais por nível
 * 
 * @param nivel - Nível atual
 * @param modificadorConstituicao - Modificador de constituição
 * @returns Pontos de vida adicionais por nível
 */
export function calcularPontosVidaPorNivel(
  nivel: number,
  modificadorConstituicao: number
): number {
  return nivel * modificadorConstituicao;
}
