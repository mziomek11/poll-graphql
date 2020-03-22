import { isEmail, isEmpty } from './validation';

describe('Utils validation', () => {
  describe('isEmpty', () => {
    describe('return true', () => {
      test("''", () => {
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

  describe('isEmail', () => {
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
});
