import React from 'react';

import Box from '@material-ui/core/Box';

import PageHeading from '../components/heading/Page';
import PollCreator from '../components/poll/creator/Creator';
import FormPageGrid from '../components/grid/FormPage';

const CreatePage = () => {
  return (
    <Box component="main" textAlign="center">
      <PageHeading>Create poll</PageHeading>
      <FormPageGrid>
        <PollCreator />
      </FormPageGrid>
    </Box>
  );
};

export default CreatePage;
