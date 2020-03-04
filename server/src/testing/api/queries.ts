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
