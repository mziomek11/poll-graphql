import request from '../testing/api/request';
import { poll } from '../testing/api/queries';
import { getFunctionThrowedError } from '../testing/other/getFunctionThrowedError';
import { connectMongoose } from '../utils/database';
import { User } from '../models/User';
import { Connection } from '../types/Connection';
import { username } from '../testing/database/createUser';
import { Poll } from '../models/Poll';

let connection: Connection;
let userId: string;

const pollData = {
  question: 'Example question',
  options: [
    { text: 'Option 1', votes: 10 },
    { text: 'Option 2', votes: 15 }
  ]
};

const createPollData = () => ({ ...pollData, userId });

beforeAll(async () => {
  connection = await connectMongoose();
  const user = await User.findOne({ username });
  userId = user!.id;
});

afterAll(async () => {
  await connection.disconnect();
});

describe('PollResolver', () => {
  describe('poll', () => {
    test('returns poll and user data', async () => {
      const data = createPollData();
      const createdPoll = await Poll.create(data);
      const query = poll(createdPoll.id);
      const res = await request(query);

      expect(res).toEqual({
        poll: {
          ...pollData,
          id: createdPoll.id,
          userId,
          user: {
            id: userId,
            username
          }
        }
      });
    });

    test('throw error when poll does not exists', async () => {
      const query = poll('id_that_do_not_exists');
      const err = await getFunctionThrowedError(() => request(query));

      expect(err).toBeTruthy();
    });
  });
});
