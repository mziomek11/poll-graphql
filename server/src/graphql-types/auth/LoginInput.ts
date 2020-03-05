import { Field, InputType } from 'type-graphql';

import { IUserDataModel } from '../../models/User';

@InputType()
export default class LoginInput implements Partial<IUserDataModel> {
  @Field()
  username: string;

  @Field()
  password: string;
}
