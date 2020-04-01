import React from 'react';
import { fireEvent } from '@testing-library/react';

import VoteButtons from './VoteButtons';
import { renderWithPollContext } from '../../../testUtils/poll';

describe('Component SinglePollVoteButtons', () => {
  test('updates poll context after results click when not disabled', () => {
    const mockUpdatePollContextFn = jest.fn();
    const comp = <VoteButtons loading={false} />;
    const overrideContext = { updatePollContext: mockUpdatePollContextFn };
    const { getByText } = renderWithPollContext(comp, overrideContext);
    fireEvent.click(getByText('Results'));

    expect(mockUpdatePollContextFn.mock.calls.length).toBe(1);
    expect(mockUpdatePollContextFn.mock.calls[0][0]).toEqual({
      showVoteSection: false
    });
  });

  test('not updates poll context after results click when disabled', () => {
    const mockUpdatePollContextFn = jest.fn();
    const comp = <VoteButtons loading={true} />;
    const overrideContext = { updatePollContext: mockUpdatePollContextFn };
    const { getByText } = renderWithPollContext(comp, overrideContext);
    fireEvent.click(getByText('Results'));

    expect(mockUpdatePollContextFn.mock.calls.length).toBe(0);
  });
});
