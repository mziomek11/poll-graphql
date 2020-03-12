import * as DataLoader from 'dataloader';

import GQLUser from '../graphql-types/user/User';
import { User } from '../models/User';

export type UserLoader = typeof userLoader;

const userLoader = new DataLoader(async (keys: readonly string[]) => {
  const users = await User.find({ _id: keys })
    .select('id username')
    .lean();

  const usersMap: { [id: string]: GQLUser } = {};
  users.forEach(user => {
    usersMap[user._id] = {
      id: user._id,
      username: user.username
    };
  });

  return keys.map(key => usersMap[key]);
});

export default userLoader;
