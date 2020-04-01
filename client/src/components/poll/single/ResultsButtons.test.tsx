import React from 'react';
import { fireEvent } from '@testing-library/react';

import ResultsButtons, { loggedOutMessage } from './ResultsButtons';
import { TokenContext, Token } from '../../../context/token';
import {
  renderWithPollContext,
  OverrideContext
} from '../../../testUtils/poll';

const renderResultsButtons = (
  pollContext: OverrideContext,
  token: Token = null
) => {
  const comp = (
    <TokenContext.Provider value={{ token, setToken: jest.fn() }}>
      <ResultsButtons />
    </TokenContext.Provider>
  );

  return renderWithPollContext(comp, pollContext);
};

describe('Component SinglePollResultsButton', () => {
  test('render nothing when already voted', () => {
    const { container } = renderResultsButtons({ canVote: false }, 'a');

    expect(container.nodeValue).toBe(null);
  });

  test('renders Voting button when not voted', () => {
    const { getByText } = renderResultsButtons({ canVote: true }, 'a');

    expect(getByText('Voting')).toBeTruthy();
  });

  test('Voting button updates poll context', () => {
    const mockUpdatePollContextFn = jest.fn();
    const { getByText } = renderResultsButtons(
      { canVote: true, updatePollContext: mockUpdatePollContextFn },
      'a'
    );

    fireEvent.click(getByText('Voting'));

    expect(mockUpdatePollContextFn.mock.calls.length).toBe(1);
    expect(mockUpdatePollContextFn.mock.calls[0][0]).toEqual({
      showVoteSection: true
    });
  });

  test('renders information message when is not logged in', () => {
    const { getByText } = renderResultsButtons({ canVote: false });

    expect(getByText(loggedOutMessage)).toBeTruthy();
  });
});
