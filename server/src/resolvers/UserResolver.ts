import { Resolver, Query } from 'type-graphql';

import { User } from '../entity';

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async users() {
    const users = await User.find();
    return users;
  }
}
