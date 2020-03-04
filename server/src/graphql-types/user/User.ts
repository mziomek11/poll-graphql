import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export default class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;
}
