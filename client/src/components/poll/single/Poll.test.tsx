import React from 'react';

import Poll from './Poll';
import { loggedOutMessage } from './ResultsButtons';
import { renderWithPollContext } from '../../../testUtils/poll';

describe('Component SinglePoll', () => {
  test('renders vote section', () => {
    const { getByText } = renderWithPollContext(<Poll />, {
      showVoteSection: true,
      canVote: true
    });

    expect(getByText('Vote')).toBeTruthy();
  });

  test('renders results section', () => {
    const { getByText } = renderWithPollContext(<Poll />, {
      showVoteSection: false,
      canVote: false
    });

    expect(getByText(loggedOutMessage)).toBeTruthy();
  });
});
