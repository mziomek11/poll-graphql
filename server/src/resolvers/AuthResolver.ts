import * as bcrypt from 'bcrypt';
import { Resolver, Mutation, Query, Arg } from 'type-graphql';

import AuthError from '../errors/auth';
import AuthResponse from '../graphql-types/AuthResponse';
import { User } from '../models/User';
import { registerSchema, loginSchema } from '../validators/authSchema';
import { signToken } from '../utils/auth';

@Resolver()
export default class AuthResolver {
  @Query(() => [String])
  async randomQuery() {
    return ['1', '2'];
  }

  @Mutation(() => AuthResponse)
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

    const usernameAlreadyExists = await User.findOne({ username });
    if (usernameAlreadyExists) throw new Error(AuthError.USERNAME_IN_USE);

    const emailTaken = await User.findOne({ email });
    if (emailTaken) throw new Error(AuthError.EMAIL_IN_USE);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, username, password: hashedPassword };
    const newUser = await User.create(user);

    const token = signToken(newUser.id);

    return { token };
  }

  @Mutation(() => AuthResponse)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string
  ) {
    try {
      await loginSchema.validate({ username, password });
    } catch (err) {
      throw err;
    }

    const user = await User.findOne({ username });
    if (!user) throw new Error(AuthError.WRONG_CREDENTIALS);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new Error(AuthError.WRONG_CREDENTIALS);

    const token = signToken(user!.id);

    return { token };
  }
}
