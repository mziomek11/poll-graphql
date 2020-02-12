export const register = (username: string, email: string, password: string) => `
  mutation {
    register(username: "${username}", email: "${email}", password: "${password}")
  }
`;
