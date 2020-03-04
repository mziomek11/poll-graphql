import {
  Resolver,
  Query,
  Arg,
  ArgumentValidationError,
  FieldResolver,
  Root
} from 'type-graphql';

import PollDoesNotExistsError from '../errors/poll/PollDoesNotExists';
import GQLPoll from '../graphql-types/poll/Poll';
import GQLUser from '../graphql-types/user/User';
import { Poll, IPollModel } from '../models/Poll';
import { User } from '../models/User';

@Resolver(() => GQLPoll)
export default class PollResolver {
  @Query(() => GQLPoll, { name: 'poll' })
  async getPoll(@Arg('id') pollId: string): Promise<GQLPoll> {
    let poll: IPollModel | null = null;

    try {
      poll = await Poll.findById(pollId);
    } catch (err) {
      throw new ArgumentValidationError([new PollDoesNotExistsError()]);
    }

    if (!poll) {
      throw new ArgumentValidationError([new PollDoesNotExistsError()]);
    }

    const responseData = {
      id: poll.id,
      userId: poll.userId,
      creationTime: poll.creationTime,
      question: poll.question,
      options: poll.options
    };

    return responseData;
  }

  @FieldResolver(() => GQLUser, { name: 'user' })
  async getPollUser(@Root() poll: GQLPoll): Promise<GQLUser> {
    const user = await User.findById(poll.userId, 'username');

    return {
      id: poll.userId,
      username: user!.username
    };
  }
}
