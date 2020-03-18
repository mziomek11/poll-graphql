import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchGQL } from '../utils/graphql';

type ResponsePoll = {
  id: string;
  question: string;
  options: { votes: number }[];
  user: {
    username: string;
  };
};

const GET_POLLS = `
  query {
    polls(skip: 0, limit: 20){
      id,
      question,
      options{
        votes
      },
      user{
        username
      }
    }
  }
`;

const HomePage = () => {
  const [polls, setPolls] = useState<ResponsePoll[] | null>(null);
  useEffect(() => {
    fetchGQL<{ polls: ResponsePoll[] }>(GET_POLLS).then(({ data }) =>
      setPolls(data!.polls)
    );
  }, []);

  return (
    <main>
      <h2>HomePage page</h2>
      {polls ? (
        <ul>
          {polls.map(({ id, question }) => (
            <li key={id}>
              <Link to={`/poll/${id}`}>{question}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <h3>Loading polls...</h3>
      )}
    </main>
  );
};

export default HomePage;
