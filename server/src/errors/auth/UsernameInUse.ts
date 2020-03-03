import { ValidationError } from 'class-validator';

export default class UsernameInUse implements ValidationError {
  property: string;
  constraints: { [key: string]: string };
  children: any[];

  constructor() {
    this.property = 'username';
    this.constraints = {
      isTaken: 'Username is already taken'
    };
    this.children = [];
  }
}
