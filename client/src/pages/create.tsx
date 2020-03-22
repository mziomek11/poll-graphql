import React from 'react';

import Box from '@material-ui/core/Box';

import PageHeading from '../components/heading/Page';
import PollCreator from '../components/poll/creator/Creator';

const CreatePage = () => {
  return (
    <Box component="main" textAlign="center">
      <PageHeading>Create poll</PageHeading>
      <PollCreator />
    </Box>
  );
};

export default CreatePage;
