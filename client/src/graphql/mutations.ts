import { stringArrayToQlStringArray } from '../utils/graphql';

export const register = (data: {
  username: string;
  email: string;
  password: string;
}) => `
  mutation {
    register(input: {
      username: "${data.username}", 
      email: "${data.email}", 
      password: "${data.password}"
    }){
      token
    }
  }
`;

export const login = (data: { username: string; password: string }) => `
  mutation {
    login(input: {
      username: "${data.username}", 
      password: "${data.password}"
    }){
      token
    }
  }
`;

export const createPoll = (data: { question: string; options: string[] }) => `
  mutation {
    createPoll(input: {
      question: "${data.question}", 
      options: ${stringArrayToQlStringArray(data.options)}
    }){
      id
    }
  }
`;
