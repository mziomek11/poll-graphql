import React from 'react';

import PageGrid from '../components/grid/Page';
import Poll from '../components/poll/single/Poll';
import PollLoadingPaper from '../components/poll/LoadingPaper';
import { PollProvider, PollContext } from '../context/poll';

const PollPage = () => {
  return (
    <PageGrid component="main">
      <PollProvider>
        <PollContext.Consumer>
          {props => (props.poll ? <Poll /> : <PollLoadingPaper />)}
        </PollContext.Consumer>
      </PollProvider>
    </PageGrid>
  );
};

export default PollPage;
