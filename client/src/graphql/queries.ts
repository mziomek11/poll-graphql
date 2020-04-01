export type GetPollsData = { page: number; perPage: number };

export const getPollsAndCount = (data: GetPollsData) => `
  query {
    polls(skip: ${(data.page - 1) * data.perPage}, limit: ${data.perPage}){
      id,
      question,
      creationTime,
      totalVotes,
      user{
        username
      }
    },
    pollsCount
  }
`;

export const getPoll = (data: { id: string }) => `
  query {
    poll(id: "${data.id}"){
      id,
      question,
      creationTime,
      options{
        votes,
        text
      },
      totalVotes,
      user{
        username
      }
    }
  }
`;

export const getPollAndCheckIsVoted = (data: { id: string }) => `
  query {
    poll(id: "${data.id}"){
      id,
      question,
      creationTime,
      options{
        votes,
        text
      },
      totalVotes,
      user{
        username
      }
    },
    pollVoted(id: "${data.id}")
  }
`;
