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
      }
    }
  }
`;

export const polls = (skip: number | null, limit: number | null) => `
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
