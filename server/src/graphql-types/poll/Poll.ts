import { Field, ObjectType, ID } from 'type-graphql';

import GQLPollOption from './PollOption';

@ObjectType()
export default class Poll {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => ID, { nullable: true })
  userId: string;

  @Field({ nullable: true })
  question: string;

  @Field({ nullable: true })
  creationTime: Date;

  @Field(() => [GQLPollOption], { nullable: true })
  options: GQLPollOption[];
}
