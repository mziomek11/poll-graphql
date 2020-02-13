import * as bcrypt from 'bcrypt';
import { Resolver, Mutation, Arg, Query } from 'type-graphql';

import User from '../entity/User';
import { registerSchema, loginSchema } from '../validators/authSchema';
import { signToken } from '../utils/auth';
import { AuthResponse } from '../types/AuthResponse';
import { AuthError } from '../errors/auth';

@Resolver()
export default class AuthResolver {
  @Query(() => String)
  async randomQuery() {
    return 'random query';
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

    const usernameAlreadyExists = await User.findOne({
      where: { username },
      select: ['id']
    });
    if (usernameAlreadyExists) throw new Error(AuthError.USERNAME_IN_USE);

    const emailTaken = await User.findOne({ where: { email }, select: ['id'] });
    if (emailTaken) throw new Error(AuthError.EMAIL_IN_USE);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = User.create({ email, username, password: hashedPassword });
    await newUser.save();

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

    const user = await User.findOne({
      where: { username },
      select: ['id', 'password']
    });
    if (!user) throw new Error(AuthError.WRONG_CREDENTIALS);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new Error(AuthError.WRONG_CREDENTIALS);

    const token = signToken(user!.id);

    return { token };
  }
}
