import React from 'react';

import PollPaper from '../Paper';
import VoteSection from './Vote';
import ResultsSection from './Results';
import PollDetails from '../Details';
import usePoll from '../../../hooks/usePoll';

const SinglePoll = () => {
  const { poll, showVoteSection } = usePoll();
  const { creationTime, question, user, totalVotes } = poll!;
  const pollDetailsProps = {
    username: user.username,
    creationTime,
    question,
    totalVotes
  };

  return (
    <PollPaper>
      <PollDetails {...pollDetailsProps} />
      {showVoteSection ? <VoteSection /> : <ResultsSection />}
    </PollPaper>
  );
};

export default SinglePoll;
