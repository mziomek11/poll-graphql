import { ValidationError } from 'class-validator';

export default class OptionDoesNotExists implements ValidationError {
  property: string;
  constraints: { [key: string]: string };
  children: any[];

  constructor() {
    this.property = 'option';
    this.constraints = {
      doesNotExists: 'Option does not exists'
    };
    this.children = [];
  }
}
