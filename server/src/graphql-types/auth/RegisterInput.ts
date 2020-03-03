import { Field, InputType } from 'type-graphql';
import { MinLength, IsEmail, MaxLength } from 'class-validator';

const usernameTooShort = 'Username must be at least 3 characters';
const usernameTooLong = 'Username is too long';

const emailTooLong = 'Email is too long';
const emailIsNotValid = 'Email is not valid';

const passwordTooShort = 'Password must be at least 3 characters';
const passwordTooLong = 'Password is too long';

@InputType()
export default class RegisterInput {
  @Field()
  @MinLength(3, { message: usernameTooShort })
  @MaxLength(30, { message: usernameTooLong })
  username: string;

  @Field()
  @MaxLength(30, { message: emailTooLong })
  @IsEmail({}, { message: emailIsNotValid })
  email: string;

  @Field()
  @MinLength(3, { message: passwordTooShort })
  @MaxLength(255, { message: passwordTooLong })
  password: string;
}
