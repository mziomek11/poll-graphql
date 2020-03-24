export type GetPollsData = { page: number; perPage: number };

export const getPollsAndCount = (data: GetPollsData) => `
  query {
    polls(skip: ${(data.page - 1) * data.perPage}, limit: ${data.perPage}){
      id,
      question,
      creationTime,
      options{
        votes
      },
      user{
        username
      }
    },
    pollsCount
  }
`;
