export type AuthResponse = {
  token: string;
};

export type ResponseListPoll = {
  id: string;
  question: string;
  totalVotes: number;
  creationTime: string;
  user: {
    username: string;
  };
};

export type ResponsePoll = {
  id: string;
  question: string;
  options: { text: string; votes: number }[];
  totalVotes: number;
  creationTime: string;
  user: {
    username: string;
  };
};
