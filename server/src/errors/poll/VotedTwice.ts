import { ValidationError } from 'class-validator';

export default class VotedTwice implements ValidationError {
  property: string;
  constraints: { [key: string]: string };
  children: any[];

  constructor() {
    this.property = 'id';
    this.constraints = {
      doesNotExists: "You can't vote twice"
    };
    this.children = [];
  }
}
