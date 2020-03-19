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
    login(input: {
      username: "${username}", 
      password: "${password}"
    }){
      token
    }
  }
`;
