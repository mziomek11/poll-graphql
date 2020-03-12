import { Field, ArgsType, Int } from 'type-graphql';
import { Min, Max } from 'class-validator';

const maxLimit = 20;

const skipLessThanOne = "Skip can't be less than 0";

const limitLessThanOne = "Limit can't be less than 1";
const limitTooBig = `Limit can't be greater than ${maxLimit}`;

@ArgsType()
export default class GetPollsArgs {
  @Field(() => Int)
  @Min(0, { message: skipLessThanOne })
  skip: number;

  @Field(() => Int)
  @Min(1, { message: limitLessThanOne })
  @Max(maxLimit, { message: limitTooBig })
  limit: number;
}
