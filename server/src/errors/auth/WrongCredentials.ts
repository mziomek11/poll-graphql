import { ValidationError } from 'class-validator';

export default class WrongCredentials implements ValidationError {
  property: string;
  constraints: { [key: string]: string };
  children: any[];

  constructor() {
    this.property = 'credentials';
    this.constraints = {
      wrongCredentials: 'Wrong username or password'
    };
    this.children = [];
  }
}
