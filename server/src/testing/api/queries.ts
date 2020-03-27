export const poll = (id: string) => `
  query {
    poll(id: "${id}"){
      id,
      question,
      userId,
      options{
        text,
        votes
      },
      user{
        id,
        username
      },
      totalVotes
    }
  }
`;

export const polls = (skip: number, limit: number) => `
  query {
    polls(skip: ${skip}, limit: ${limit}){
      id,
      question,
      userId,
      options{
        text,
        votes
      },
      user{
        id,
        username
      }
    }
  }
`;

export const pollsCount = `
  query {
    pollsCount
  }
`;

export const pollVoted = (pollId: string) => `
  query {
    pollVoted(id: "${pollId}")
  }
`;
