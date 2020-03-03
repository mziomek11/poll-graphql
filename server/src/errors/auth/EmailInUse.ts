import { ValidationError } from 'class-validator';

export default class EmailInUseError implements ValidationError {
  property: string;
  constraints: { [key: string]: string };
  children: any[];

  constructor() {
    this.property = 'email';
    this.constraints = {
      isTaken: 'Email is already taken'
    };
    this.children = [];
  }
}
