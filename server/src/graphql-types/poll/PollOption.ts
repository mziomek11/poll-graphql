import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
export default class PollOption {
  @Field()
  text: string;

  @Field(() => Int)
  votes: number;
}
