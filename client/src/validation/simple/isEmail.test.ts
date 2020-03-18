import isEmail from './isEmail';

describe('Validator isEmail', () => {
  describe('return true', () => {
    test('valid@email.com', () => {
      expect(isEmail('valid@email.com')).toBe(true);
    });
  });

  describe('return false', () => {
    test("''", () => {
      expect(isEmail('')).toBe(false);
    });

    test('a', () => {
      expect(isEmail('a')).toBe(false);
    });

    test('a@', () => {
      expect(isEmail('a@')).toBe(false);
    });

    test('a@a', () => {
      expect(isEmail('a@')).toBe(false);
    });

    test('a@a.', () => {
      expect(isEmail('a@a.')).toBe(false);
    });

    test('a@a.a', () => {
      expect(isEmail('a@a.a')).toBe(false);
    });
  });
});
