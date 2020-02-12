import * as bcrypt from 'bcrypt';
import { Resolver, Mutation, Arg, Query } from 'type-graphql';

import User from '../entity/User';
import { registerSchema } from '../validators/userSchema';

export const accountCreatedMessage = 'Account created';

console.warn('Remove random query from there');

@Resolver()
export default class AuthResolver {
  @Query(() => String)
  async randomQuery() {
    return 'random query';
  }

  @Mutation(() => String)
  async register(
    @Arg('email') email: string,
    @Arg('username') username: string,
    @Arg('password') password: string
  ) {
    try {
      await registerSchema.validate({
        email,
        username,
        password
      });
    } catch (err) {
      throw err;
    }

    const usernameAlreadyExists = await User.findOne({
      where: { username },
      select: ['id']
    });
    if (usernameAlreadyExists) {
      throw new Error('This username is already taken');
    }

    const emailTaken = await User.findOne({ where: { email }, select: ['id'] });
    if (emailTaken) {
      throw new Error('This email is already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = User.create({ email, username, password: hashedPassword });
    await newUser.save();

    return accountCreatedMessage;
  }
}
