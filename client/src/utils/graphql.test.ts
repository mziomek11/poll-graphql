import { stringArrayToQlStringArray } from './graphql';

describe('Utils graphql', () => {
  describe('stringArrayToQlStringArray', () => {
    test('empty array', () => {
      const testArr: string[] = [];
      expect(stringArrayToQlStringArray(testArr)).toBe('[]');
    });

    test('array with one item', () => {
      const testArr = ['one'];
      expect(stringArrayToQlStringArray(testArr)).toBe(`["one"]`);
    });

    test('array with two items', () => {
      const testArr = ['one', 'two'];
      expect(stringArrayToQlStringArray(testArr)).toBe(`["one","two"]`);
    });
  });
});
