import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import PollPaper from './Paper';

const PollLoadingPaper = () => {
  return (
    <PollPaper>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={52}
      >
        <CircularProgress />
      </Box>
    </PollPaper>
  );
};

export default PollLoadingPaper;
