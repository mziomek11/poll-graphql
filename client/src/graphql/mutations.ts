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
