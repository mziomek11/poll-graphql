import { hasKeys } from './object';

describe('Utils object', () => {
  describe('hasKeys', () => {
    test('return true when has keys', () => {
      const testObj = { something: 123 };
      expect(hasKeys(testObj)).toBe(true);
    });

    test('return false when has not keys', () => {
      const testObj = {};
      expect(hasKeys(testObj)).toBe(false);
    });
  });
});
