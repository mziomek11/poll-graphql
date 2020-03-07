const stringArrayToQlStringArray = (arr: string[]) => {
  let GQLStingArray = '[';
  arr.forEach((s, i) => {
    GQLStingArray += `"${s}"${i !== arr.length - 1 ? ',' : ''}`;
  });
  GQLStingArray += ']';

  return GQLStingArray;
};

export const register = (username: string, email: string, password: string) => `
  mutation {
    register(input: {
      username: "${username}", 
      email: "${email}", 
      password: "${password}"
    }){
      token
    }
  }
`;

export const login = (username: string, password: string) => `
  mutation {
    login(input:{
      username: "${username}",
      password: "${password}"
    }){
      token
    }
  }
`;

export const createPoll = (question: string, options: string[]) => `
  mutation {
    createPoll(input: {question: "${question}", options: ${stringArrayToQlStringArray(
  options
)}}){
      id,
      userId,
      creationTime,
      question,
      options{
        text,
        votes
      }
    }
  }
`;

export const deletePoll = (id: string) => `
  mutation {
    deletePoll(id: "${id}")
  }
`;

export const vote = (id: string, option: string) => `
  mutation {
    vote(id: "${id}", option: "${option}")
  }
`;
