import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class AuthResponse {
  @Field()
  token: string;
}
