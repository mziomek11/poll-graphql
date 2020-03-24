import React, { createContext, useState } from 'react';

import { ResponseListPoll } from '../graphql/types';

type PollContextData = {
  polls: ResponseListPoll[];
  page: number;
};

type PollContext = PollContextData & {
  setContext: (data: PollContextData) => void;
};

const initialContextData: PollContextData = { polls: [], page: 1 };

export const PollContext = createContext<PollContext>({
  ...initialContextData,
  setContext: () => new Error('Must be inside PollProvider')
});

export const PollProvider: React.FC = ({ children }) => {
  const [context, setContext] = useState<PollContextData>(initialContextData);
  const handleSetContext = (data: PollContextData) => {
    setContext(data);
  };
  const contextValue = { ...context, setContext: handleSetContext };

  return (
    <PollContext.Provider value={contextValue}>{children}</PollContext.Provider>
  );
};
