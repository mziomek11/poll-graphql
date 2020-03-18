import isEmpty from './isEmpty';

describe('Validator isEmpty', () => {
  describe('return true', () => {
    test("is ''", () => {
      expect(isEmpty('')).toBe(true);
    });

    test("'     '", () => {
      expect(isEmpty('     ')).toBe(true);
    });
  });

  describe('return false', () => {
    test('a', () => {
      expect(isEmpty('a')).toBe(false);
    });
  });
});
