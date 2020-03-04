import { ValidationError } from 'class-validator';

export default class PollDoesNotExists implements ValidationError {
  property: string;
  constraints: { [key: string]: string };
  children: any[];

  constructor() {
    this.property = 'id';
    this.constraints = {
      doesNotExists: 'Poll does not exists'
    };
    this.children = [];
  }
}
