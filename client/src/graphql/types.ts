export type AuthResponse = {
  token: string;
};

export type ResponseListPoll = {
  id: string;
  question: string;
  options: { votes: number }[];
  creationTime: string;
  user: {
    username: string;
  };
};
