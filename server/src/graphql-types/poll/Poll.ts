import { Field, ObjectType, ID } from 'type-graphql';

import PollOption from './PollOption';

@ObjectType()
export default class Poll {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field()
  question: string;

  @Field()
  creationTime: Date;

  @Field(() => [PollOption])
  options: PollOption[];
}
