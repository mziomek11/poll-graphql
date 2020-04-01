import React, { createContext, useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import useQuery from '../hooks/useQuery';
import useToken from '../hooks/useToken';
import { getPollAndCheckIsVoted, getPoll } from '../graphql/queries';
import { ResponsePoll } from '../graphql/types';

type Response = { poll: ResponsePoll; pollVoted?: boolean };
type Params = { id: string };

type PollContextData = {
  poll: ResponsePoll | null;
  showVoteSection: boolean;
  canVote: boolean;
};

export type PollContextType = {
  updatePollContext: (data: Partial<PollContextData>) => void;
} & PollContextData;

export const PollContext = createContext<PollContextType>({
  poll: null,
  showVoteSection: false,
  canVote: false,
  updatePollContext: () => new Error('Must be inside provider')
});

export const PollProvider: React.FC = ({ children }) => {
  const { token } = useToken();
  const mounted = useRef(true);
  const qglStringFn = token ? getPollAndCheckIsVoted : getPoll;
  const query = useQuery<Response, any, Params>(qglStringFn);
  const history = useHistory();
  const params = useParams<Params>();
  const [state, setState] = useState<PollContextData>({
    poll: null,
    showVoteSection: false,
    canVote: false
  });

  const updatePollContext = (newData: Partial<PollContextData>) => {
    setState({ ...state, ...newData });
  };

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await query(params);
        if (!res.data) history.push('/404');
        else if (mounted.current) {
          const { pollVoted, poll } = res.data;
          const canVote = typeof pollVoted === 'boolean' && !pollVoted;

          setState({ poll, canVote, showVoteSection: canVote });
        }
      } catch (e) {
        history.push('/404');
      }
    };

    fetchPage();

    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line
  }, []);

  const contextValue: PollContextType = { ...state, updatePollContext };

  return (
    <PollContext.Provider value={contextValue}>{children}</PollContext.Provider>
  );
};
