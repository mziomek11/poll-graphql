import React from 'react';

import Box from '@material-ui/core/Box';

import PollLoadingPaper from '../LoadingPaper';

const PollListLoadingItem = () => {
  return (
    <Box component="li" textAlign="left" mb={2}>
      <PollLoadingPaper />
    </Box>
  );
};

export default PollListLoadingItem;
