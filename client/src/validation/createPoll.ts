import { isEmpty } from '../utils/validation';
import { questionRequired, atLeast2Options } from './messages';

type CreatePollData = {
  question: string;
  options: string[];
};

type CreatePollErrors = {
  question: string;
  options: string;
};

export default function({ question, options }: CreatePollData) {
  const errors: Partial<CreatePollErrors> = {};

  if (isEmpty(question)) errors.question = questionRequired;

  if (options.length < 2) errors.options = atLeast2Options;

  return errors;
}
