import React from 'react';
import { render } from '@testing-library/react';

import { PollContext, PollContextType } from '../context/poll';
import { ResponsePoll } from '../graphql/types';

export type OverrideContext = Partial<Omit<PollContextType, 'poll'>>;
export type OverridePoll = Partial<ResponsePoll>;

export const defaultPoll = {
  creationTime: '19810405',
  totalVotes: 0,
  id: 'aa',
  question: 'a',
  options: [
    { text: 'option 1', votes: 1 },
    { text: 'option 2', votes: 2 }
  ],
  user: { username: 'aa' }
};

export const renderWithPollContext = (
  toRenderInside: JSX.Element,
  overrideContextData: OverrideContext = {},
  overridePollData: OverridePoll = {}
) => {
  const contextData = createPollContextData(
    overrideContextData,
    overridePollData
  );

  return render(
    <PollContext.Provider value={contextData}>
      {toRenderInside}
    </PollContext.Provider>
  );
};

export const createPollContextData = (
  overrideContextData: OverrideContext = {},
  overridePollData: OverridePoll = {}
) => {
  const data: PollContextType = {
    showVoteSection: false,
    updatePollContext: () => {},
    canVote: true,
    poll: {
      ...defaultPoll,
      ...overridePollData
    },
    ...overrideContextData
  };

  return data;
};
