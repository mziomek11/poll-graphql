import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import usePoll from '../../../hooks/usePoll';
import useToken from '../../../hooks/useToken';

export const loggedOutMessage = 'You have to be logged in to vote';

const SinglePollResultsButtons = () => {
  const { token } = useToken();
  const { updatePollContext, canVote } = usePoll();

  const handleVoteClick = () => {
    updatePollContext({ showVoteSection: true });
  };

  if (token && !canVote) return null;

  return (
    <Box textAlign="center">
      <Divider />
      <Box mt={2}>
        {token ? (
          <Button color="primary" variant="contained" onClick={handleVoteClick}>
            Voting
          </Button>
        ) : (
          <Typography variant="body2">{loggedOutMessage}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SinglePollResultsButtons;
