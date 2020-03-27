import request from '../testing/api/request';
import { poll, polls, pollsCount, pollVoted } from '../testing/api/queries';
import { createPoll, deletePoll, vote } from '../testing/api/mutations';
import { getFunctionThrowedError } from '../testing/other/getFunctionThrowedError';
import { connectMongoose } from '../utils/database';
import { User } from '../models/User';
import { Connection } from '../types/Connection';
import { username } from '../testing/database/createUser';
import { Poll, IPollModel } from '../models/Poll';
import { signToken } from '../utils/auth';

let connection: Connection;
let userId: string;

beforeAll(async () => {
  connection = await connectMongoose();
  const user = await User.findOne({ username }, 'id').lean();
  userId = user!._id.toString();
});

afterAll(async () => {
  await connection.disconnect();
});

describe('PollResolver', () => {
  describe('getPoll', () => {
    test('returns poll, user data and total votes', async () => {
      const pollData = {
        question: 'Example question',
        options: [
          { text: 'Option 1', votes: 10 },
          { text: 'Option 2', votes: 15 }
        ],
        userId
      };

      const createdPoll = await Poll.create(pollData);
      const query = poll(createdPoll.id);
      const res = await request(query);

      expect(res.poll.question).toBe(pollData.question);
      expect(res.poll.options).toEqual(pollData.options);
      expect(res.poll.id).toBe(createdPoll._id.toString());
      expect(res.poll.userId).toEqual(userId);
      expect(res.poll.user.id).toBe(userId);
      expect(res.poll.user.username).toBe(username);
      expect(res.poll.totalVotes).toBe(25);
    });

    test('throw error when poll does not exists', async () => {
      const query = poll('id_that_do_not_exists');
      const err = await getFunctionThrowedError(() => request(query));

      expect(err).toBeDefined();
    });
  });

  describe('getPolls', () => {
    const testPolls = new Array(7).fill(0).map((_, index) => ({
      question: `Question ${index}`,
      options: [
        { text: `Q${index}O1`, votes: 0 },
        { text: `Q${index}O2`, votes: 0 }
      ],
      votedBy: []
    }));

    beforeAll(async () => {
      await Poll.deleteMany({});
      const testPollsWithUserId = testPolls.map(p => ({ ...p, userId }));
      for (const testPoll of testPollsWithUserId) {
        await Poll.create(testPoll);
      }
    });

    test('return 3 latest polls ', async () => {
      const query = polls(0, 3);
      const res = await request(query);

      expect(res.polls.length).toBe(3);
      const [p1, p2, p3] = res.polls;
      expect(p1.question).toBe('Question 6');
      expect(p2.question).toBe('Question 5');
      expect(p3.question).toBe('Question 4');
    });

    test('skip 2 latest polls and return 3 after it', async () => {
      const query = polls(2, 3);
      const res = await request(query);

      expect(res.polls.length).toBe(3);
      const [p1, p2, p3] = res.polls;
      expect(p1.question).toBe('Question 4');
      expect(p2.question).toBe('Question 3');
      expect(p3.question).toBe('Question 2');
    });

    test('return empty array when skip is bigger than polls in db', async () => {
      const query = polls(8, 3);
      const res = await request(query);

      expect(res.polls.length).toBe(0);
    });

    test('throw error when data validation fails', async () => {
      const query = polls(1, -1);
      const err = await getFunctionThrowedError(() => request(query));

      expect(err).toBeDefined();
    });
  });

  describe('getPollsCount', () => {
    test('returns proper number', async () => {
      await Poll.deleteMany({});
      const testPolls = new Array(2).fill({
        question: 'question',
        options: [
          { text: 'a', votes: 0 },
          { text: 'b', votes: 0 }
        ],
        votedBy: [],
        userId
      });
      for (const testPoll of testPolls) {
        await Poll.create(testPoll);
      }

      const res = await request(pollsCount);
      expect(res.pollsCount).toBe(2);
    });
  });

  describe('isPollVotedByUser', () => {
    test('return true when user voted poll', async () => {
      const token = signToken(userId);
      const pollData = {
        question: 'Example question',
        options: [
          { text: 'Option 1', votes: 10 },
          { text: 'Option 2', votes: 15 }
        ],
        userId,
        votedBy: [userId]
      };

      const createdPoll = await Poll.create(pollData);
      const query = pollVoted(createdPoll.id);
      const res = await request(query, token);

      expect(res.pollVoted).toBe(true);
    });

    test('return false when user not voted poll', async () => {
      const token = signToken(userId);
      const pollData = {
        question: 'Example question',
        options: [
          { text: 'Option 1', votes: 10 },
          { text: 'Option 2', votes: 15 }
        ],
        userId,
        votedBy: []
      };

      const createdPoll = await Poll.create(pollData);
      const query = pollVoted(createdPoll.id);
      const res = await request(query, token);

      expect(res.pollVoted).toBe(false);
    });

    test('throw error when token not provided', async () => {
      const pollData = {
        question: 'Example question',
        options: [
          { text: 'Option 1', votes: 10 },
          { text: 'Option 2', votes: 15 }
        ],
        userId,
        votedBy: []
      };

      const createdPoll = await Poll.create(pollData);
      const query = pollVoted(createdPoll.id);
      const err = await getFunctionThrowedError(() => request(query));

      expect(err).toBeDefined();
    });

    test('throw error when poll does not exists', async () => {
      const query = pollVoted('id_that_do_not_exists');
      const err = await getFunctionThrowedError(() => request(query));

      expect(err).toBeDefined();
    });
  });

  describe('createPoll', () => {
    test('creates and returns poll', async () => {
      const question = 'is_this_created_poll_question?';
      const options = ['no', 'yes'];
      const mutation = createPoll(question, options);
      const token = signToken(userId);
      const res = await request(mutation, token);
      const resData = res.createPoll;
      const pollInDb = (await Poll.findById(resData.id).lean()) as IPollModel;

      expect(pollInDb.question).toBe(question);
      expect(pollInDb.userId.toString()).toBe(userId);
      expect(pollInDb.options.length).toBe(2);
      expect(pollInDb.options[0].text).toBe('no');
      expect(pollInDb.options[0].votes).toBe(0);
      expect(pollInDb.options[1].text).toBe('yes');
      expect(pollInDb.options[1].votes).toBe(0);
      expect(pollInDb.votedBy).toEqual([]);

      expect(resData.question).toBe(question);
      expect(resData.userId).toBe(userId);
      expect(resData.options).toEqual([
        { text: 'no', votes: 0 },
        { text: 'yes', votes: 0 }
      ]);
    });

    test('throw error when token is not valid', async () => {
      const token = 'some_not_valid_token';
      const mutation = createPoll('question', ['a', 'b', 'c']);
      const err = await getFunctionThrowedError(() => request(mutation, token));

      expect(err).toBeDefined();
    });

    test('throw error when data validation fails', async () => {
      const token = signToken(userId);
      const mutation = createPoll('question', ['need_at_least_2_options']);
      const err = await getFunctionThrowedError(() => request(mutation, token));

      expect(err).toBeDefined();
    });
  });

  describe('deletePoll', () => {
    test('deletes poll and returns success message', async () => {
      const pollToDelete = await Poll.create({
        question: 'ab',
        options: [],
        votedBy: [],
        userId
      });
      const token = signToken(userId);
      const mutation = deletePoll(pollToDelete.id);
      const res = await request(mutation, token);
      expect(res.deletePoll).toBe('Deleted');

      const deletedPoll = await Poll.findOne({ id: pollToDelete.id }).lean();
      expect(deletedPoll).toBe(null);
    });

    test('throw error when token is not valid', async () => {
      const pollToDelete = await Poll.create({
        question: 'ab',
        options: [],
        userId
      });

      const mutation = deletePoll(pollToDelete.id);
      const err = await getFunctionThrowedError(() =>
        request(mutation, 'token')
      );
      expect(err).toBeDefined();
    });

    test('throw error when poll does not exists', async () => {
      const mutation = deletePoll('not_existing_poll');
      const token = signToken(userId);
      const err = await getFunctionThrowedError(() => request(mutation, token));
      expect(err).toBeDefined();
    });

    test('throw error when user is not owner of poll', async () => {
      const pollToDelete = await Poll.create({
        question: 'ab',
        options: [],
        userId: '5e600251946b5d13fa43f002'
      });

      const token = signToken(userId);
      const mutation = deletePoll(pollToDelete.id);
      const err = await getFunctionThrowedError(() => request(mutation, token));
      expect(err).toBeDefined();
    });
  });

  describe('vote', () => {
    const pollData = {
      question: 'question_to_vote',
      options: [
        { text: 'yes', votes: 0 },
        { text: 'no', votes: 0 }
      ],
      votedBy: [],
      userId
    };

    test('increament voted option votes and add user to votedBy', async () => {
      const createdPoll = await Poll.create(pollData);
      const token = signToken(userId);
      const mutation = vote(createdPoll.id, 'yes');
      const res = await request(mutation, token);
      const updatedPoll = await Poll.findById(createdPoll.id).lean();

      expect(updatedPoll.options.length).toBe(2);
      expect(updatedPoll.options[0].text).toBe('yes');
      expect(updatedPoll.options[0].votes).toBe(1);
      expect(updatedPoll.options[1].text).toBe('no');
      expect(updatedPoll.options[1].votes).toBe(0);

      expect(updatedPoll.votedBy.length).toBe(1);
      expect(updatedPoll.votedBy[0].toString()).toBe(userId);

      expect(res).toEqual({ vote: 'Voted' });
    });

    test('throw error when token is not valid', async () => {
      const createdPoll = await Poll.create(pollData);
      const mutation = vote(createdPoll.id, 'yes');
      const err = await getFunctionThrowedError(() =>
        request(mutation, 'not valid token')
      );

      expect(err).toBeDefined();
    });

    test('throw error when poll does not exists', async () => {
      const token = signToken(userId);
      const mutation = vote('not_existing_id', 'option');
      const err = await getFunctionThrowedError(() => request(mutation, token));

      expect(err).toBeDefined();
    });

    test('throw error when option does not exists', async () => {
      const createdPoll = await Poll.create(pollData);
      const token = signToken(userId);
      const mutation = vote(createdPoll.id, 'not_existing_option');
      const err = await getFunctionThrowedError(() => request(mutation, token));

      expect(err).toBeDefined();
    });

    test('throw error when user already voted', async () => {
      const createdPoll = await Poll.create({ ...pollData, votedBy: [userId] });
      const token = signToken(userId);
      const mutation = vote(createdPoll.id, 'yes');
      const err = await getFunctionThrowedError(() => request(mutation, token));

      expect(err).toBeDefined();
    });
  });
});
