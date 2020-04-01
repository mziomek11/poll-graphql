import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import LoadableButton from '../../buttons/Loadable';
import usePoll from '../../../hooks/usePoll';

type Props = {
  loading: boolean;
};

const SinglePollVoteButtons: React.FC<Props> = ({ loading }) => {
  const { updatePollContext } = usePoll();

  const handleResultsClick = () => {
    updatePollContext({ showVoteSection: false });
  };

  return (
    <Box mt={2} display="flex" justifyContent="space-around">
      <LoadableButton loading={loading}>Vote</LoadableButton>
      <Button
        onClick={handleResultsClick}
        disabled={loading}
        variant="outlined"
      >
        Results
      </Button>
    </Box>
  );
};

export default SinglePollVoteButtons;
