import React, { useState, ChangeEvent, FormEvent } from 'react';

import Box from '@material-ui/core/Box';

import VoteOptions from './VoteOptions';
import VoteButtons from './VoteButtons';
import useQuery from '../../../hooks/useQuery';
import usePoll from '../../../hooks/usePoll';
import { vote } from '../../../graphql/mutations';

const SinglePollVote = () => {
  const { poll, updatePollContext } = usePoll();
  const { id, totalVotes, options } = poll!;

  const query = useQuery(vote);
  const [option, setOption] = useState(options[0].text);
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await query({ id, option });
    const newOptions = options.map(o => ({ ...o }));
    const optionToIncr = newOptions.find(o => o.text === option);

    if (optionToIncr) {
      optionToIncr.votes++;
      updatePollContext({
        showVoteSection: false,
        canVote: false,
        poll: { ...poll!, options: newOptions, totalVotes: totalVotes + 1 }
      });
    }
  };

  return (
    <Box component="section" mt={1}>
      <form onSubmit={handleSubmit}>
        <VoteOptions onChange={handleOptionChange} selectedOption={option} />
        <VoteButtons loading={loading} />
      </form>
    </Box>
  );
};

export default SinglePollVote;
