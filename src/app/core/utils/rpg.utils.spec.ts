import { 
  calcularModificador, 
  calcularBonusPericia, 
  formatarModificador,
  calcularBonusProficiencia,
  validarValorAtributo,
  calcularPontosVidaPorNivel
} from './rpg.utils';

describe('RPG Utils', () => {
  
  describe('calcularModificador', () => {
    it('should return -1 for attributes 8-9', () => {
      expect(calcularModificador(8)).toBe(-1);
      expect(calcularModificador(9)).toBe(-1);
    });

    it('should return 0 for attributes 10-11', () => {
      expect(calcularModificador(10)).toBe(0);
      expect(calcularModificador(11)).toBe(0);
    });

    it('should return 3 for attributes 16-17', () => {
      expect(calcularModificador(16)).toBe(3);
      expect(calcularModificador(17)).toBe(3);
    });

    it('should return 10 for attribute 30', () => {
      expect(calcularModificador(30)).toBe(10);
    });

    it('should return null for out of range values', () => {
      expect(calcularModificador(7)).toBe(null);
      expect(calcularModificador(31)).toBe(null);
      expect(calcularModificador(null)).toBe(null);
    });
  });

  describe('calcularBonusPericia', () => {
    it('should return only attribute modifier when not proficient', () => {
      expect(calcularBonusPericia(2, 3, 'nao')).toBe(2);
    });

    it('should add proficiency bonus when proficient', () => {
      expect(calcularBonusPericia(2, 3, 'sim')).toBe(5);
    });

    it('should double proficiency bonus with expertise', () => {
      expect(calcularBonusPericia(2, 3, 'expertise')).toBe(8);
    });
  });

  describe('formatarModificador', () => {
    it('should format positive modifiers with +', () => {
      expect(formatarModificador(3)).toBe('+3');
    });

    it('should format negative modifiers', () => {
      expect(formatarModificador(-1)).toBe('-1');
    });

    it('should format zero with +', () => {
      expect(formatarModificador(0)).toBe('+0');
    });

    it('should handle null values', () => {
      expect(formatarModificador(null)).toBe('+0');
    });
  });

  describe('calcularBonusProficiencia', () => {
    it('should return 2 for levels 1-4', () => {
      expect(calcularBonusProficiencia(1)).toBe(2);
      expect(calcularBonusProficiencia(4)).toBe(2);
    });

    it('should return 3 for levels 5-8', () => {
      expect(calcularBonusProficiencia(5)).toBe(3);
      expect(calcularBonusProficiencia(8)).toBe(3);
    });

    it('should return 4 for levels 9-12', () => {
      expect(calcularBonusProficiencia(9)).toBe(4);
      expect(calcularBonusProficiencia(12)).toBe(4);
    });

    it('should return 6 for levels 17-20', () => {
      expect(calcularBonusProficiencia(17)).toBe(6);
      expect(calcularBonusProficiencia(20)).toBe(6);
    });

    it('should return 2 for null or invalid levels', () => {
      expect(calcularBonusProficiencia(null)).toBe(2);
      expect(calcularBonusProficiencia(0)).toBe(2);
    });
  });

  describe('validarValorAtributo', () => {
    it('should return true for valid values', () => {
      expect(validarValorAtributo(1)).toBe(true);
      expect(validarValorAtributo(15)).toBe(true);
      expect(validarValorAtributo(30)).toBe(true);
    });

    it('should return false for invalid values', () => {
      expect(validarValorAtributo(0)).toBe(false);
      expect(validarValorAtributo(31)).toBe(false);
      expect(validarValorAtributo(null)).toBe(false);
    });
  });

  describe('calcularPontosVidaPorNivel', () => {
    it('should calculate hit points correctly', () => {
      expect(calcularPontosVidaPorNivel(5, 2)).toBe(10);
      expect(calcularPontosVidaPorNivel(10, 3)).toBe(30);
    });

    it('should handle negative constitution modifiers', () => {
      expect(calcularPontosVidaPorNivel(5, -1)).toBe(-5);
    });

    it('should handle zero modifier', () => {
      expect(calcularPontosVidaPorNivel(5, 0)).toBe(0);
    });
  });
});
