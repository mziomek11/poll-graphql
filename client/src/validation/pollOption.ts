import { isEmpty } from '../utils/validation';
import { optionEmpty, optionExists } from './messages';

export default function(data: { option: string; options: string[] }) {
  const errors: Partial<{ option: string }> = {};

  if (isEmpty(data.option)) errors.option = optionEmpty;
  else if (data.options.indexOf(data.option) >= 0) errors.option = optionExists;

  return errors;
}
