import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import PageHeading from '../components/heading/Page';

const NotFoundPage = () => {
  return (
    <Box component="main" textAlign="center">
      <PageHeading>404</PageHeading>
      <Typography>Page does not exists</Typography>
    </Box>
  );
};

export default NotFoundPage;
