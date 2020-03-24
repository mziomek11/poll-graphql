import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import ListPaper from './Paper';

const LoadingItem = () => {
  return (
    <Box component="li" textAlign="left" mb={2}>
      <ListPaper>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={52}
        >
          <CircularProgress />
        </Box>
      </ListPaper>
    </Box>
  );
};

export default LoadingItem;
