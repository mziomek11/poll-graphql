import React from 'react';

import ResultsButtons from './ResultsButtons';
import ResultsOption from './ResultsOption';
import usePoll from '../../../hooks/usePoll';

const SinglePollResults = () => {
  const { poll } = usePoll();
  const { options, totalVotes } = poll!;

  return (
    <section>
      {options
        .sort((a, b) => b.votes - a.votes)
        .map(({ text, votes }) => (
          <ResultsOption
            key={text}
            text={text}
            votesPercent={
              totalVotes === 0 ? 0 : Math.round((votes / totalVotes) * 100)
            }
          />
        ))}
      <ResultsButtons />
    </section>
  );
};

export default SinglePollResults;
