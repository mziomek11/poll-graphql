import validateCreatePoll from './createPoll';
import { questionRequired, atLeast2Options } from './messages';

describe('Validator validateCreatePoll', () => {
  test('return empty object when option is valid', () => {
    const res1 = validateCreatePoll({
      question: 'smthing',
      options: ['yes', 'no']
    });
    expect(Object.keys(res1).length).toBe(0);
  });

  test('return object with questionRequired error when question is empty', () => {
    const res = validateCreatePoll({ question: '', options: ['op1', 'op2'] });

    expect(res).toEqual({ question: questionRequired });
  });

  test('return object with options error when the is not 2 options', () => {
    const res1 = validateCreatePoll({ question: 'qq', options: [] });
    expect(res1).toEqual({ options: atLeast2Options });

    const res2 = validateCreatePoll({ question: 'qq', options: ['op1'] });
    expect(res2).toEqual({ options: atLeast2Options });
  });

  test('return object with question and options errors', () => {
    const res = validateCreatePoll({ question: '', options: ['only_one'] });

    expect(res).toEqual({
      question: questionRequired,
      options: atLeast2Options
    });
  });
});
