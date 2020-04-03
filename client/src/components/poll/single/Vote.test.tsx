import React from 'react';
import { fireEvent, act } from '@testing-library/react';

import Vote from './Vote';
import { TokenContext } from '../../../context/token';
import { createFetchImplementation } from '../../../testUtils/api';
import { renderWithPollContext, defaultPoll } from '../../../testUtils/poll';

describe('Component SinglePollVote', () => {
  test('on submit updates showVoteSection, canVote, totalVotes and pollOptions', async () => {
    const mockUpdatePollContextFn = jest.fn();
    const contextOverride = { updatePollContext: mockUpdatePollContextFn };
    const contextPollOverride = {
      options: [
        { text: '1', votes: 5 },
        { text: '2', votes: 8 }
      ],
      totalVotes: 13
    };

    const comp = (
      <TokenContext.Provider value={{ token: 'a' } as any}>
        <Vote />
      </TokenContext.Provider>
    );

    const { getByText } = renderWithPollContext(
      comp,
      contextOverride,
      contextPollOverride
    );

    const fetchImp = createFetchImplementation({ data: 'success' });
    jest.spyOn(global, 'fetch' as any).mockImplementationOnce(fetchImp);

    await act(async () => {
      fireEvent.submit(getByText('Vote'));
    });

    expect(mockUpdatePollContextFn.mock.calls.length).toBe(1);
    expect(mockUpdatePollContextFn.mock.calls[0][0]).toEqual({
      showVoteSection: false,
      canVote: false,
      poll: {
        ...defaultPoll,
        options: [
          { text: '1', votes: 6 },
          { text: '2', votes: 8 }
        ],
        totalVotes: 14
      }
    });
  });
});
