import { Field, InputType } from 'type-graphql';
import {
  MinLength,
  MaxLength,
  ArrayMinSize,
  ArrayUnique,
  ArrayMaxSize
} from 'class-validator';

const maxPollOptions = 15;

const questionEmpty = 'Question must not be empty';
const questionTooLong = 'Question is too long';

const arrayTooSmall = 'Poll must have at least 2 options';
const arrayTooBig = `Poll can't have more than ${maxPollOptions} options`;
const arrayTheSameOptions = 'Poll must have unique options';

const optionEmpty = 'Option must not be empty';
const optionTooLong = 'Option is too long';

@InputType()
export default class PollInput {
  @Field()
  @MinLength(1, { message: questionEmpty })
  @MaxLength(255, { message: questionTooLong })
  question: string;

  @Field(() => [String])
  @ArrayMinSize(2, { message: arrayTooSmall })
  @ArrayMaxSize(maxPollOptions, { message: arrayTooBig })
  @ArrayUnique({ message: arrayTheSameOptions })
  @MinLength(1, { message: optionEmpty, each: true })
  @MaxLength(255, { message: optionTooLong, each: true })
  options: string[];
}
