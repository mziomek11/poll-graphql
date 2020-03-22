import validatePollOption from './pollOption';
import { optionEmpty, optionExists } from './messages';

describe('Validator validatePollOption', () => {
  test('return empty object when option is valid', () => {
    const res1 = validatePollOption({ option: 'op', options: [] });
    expect(Object.keys(res1).length).toBe(0);

    const res2 = validatePollOption({ option: 'op2', options: ['op'] });
    expect(Object.keys(res2).length).toBe(0);
  });

  test('return object with optionEmpty error when option is empty', () => {
    const res = validatePollOption({ option: '', options: [] });

    expect(res).toEqual({ option: optionEmpty });
  });

  test('return object with optionExists error when option already in options', () => {
    const res = validatePollOption({
      option: 'some_option',
      options: ['some_option']
    });

    expect(res).toEqual({ option: optionExists });
  });
});
