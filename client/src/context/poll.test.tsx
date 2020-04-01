import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { act, RenderResult } from '@testing-library/react';

import { PollProvider, PollContext } from './poll';
import { defaultPoll } from '../testUtils/poll';
import { renderWithTokenContext } from '../testUtils/token';
import { createFetchImplementation } from '../testUtils/api';

const TestComponent = () => {
  const { poll, canVote, showVoteSection } = useContext(PollContext);

  return (
    <div>
      <p>{JSON.stringify(poll)}</p>
      <p data-testid="canVote">{canVote.toString()}</p>
      <p data-testid="showVoteSection">{showVoteSection.toString()}</p>
    </div>
  );
};

const renderTestComponent = (hasToken: boolean) => {
  const token = hasToken ? 'access_token' : null;
  const comp = (
    <BrowserRouter>
      <PollProvider>
        <TestComponent />
      </PollProvider>
    </BrowserRouter>
  );

  return renderWithTokenContext(comp, { token });
};

describe('Context poll', () => {
  test('calls query with pollVoted when is logged in', async () => {
    const fetchImp = createFetchImplementation({
      data: { poll: defaultPoll, pollVoted: true }
    });
    jest.spyOn(global, 'fetch' as any).mockImplementationOnce(fetchImp);

    await act(async () => {
      renderTestComponent(true);
    });

    expect(fetchImp).toBeCalledTimes(1);

    const isPollVotedInQuery = (fetchImp.mock.calls[0] as any)[1].body.includes(
      'pollVoted'
    );
    expect(isPollVotedInQuery).toBe(true);
  });

  test('calls query without pollVoted when is not logged in', async () => {
    const fetchImp = createFetchImplementation({
      data: { poll: defaultPoll }
    });
    jest.spyOn(global, 'fetch' as any).mockImplementationOnce(fetchImp);

    await act(async () => {
      renderTestComponent(false);
    });

    expect(fetchImp).toBeCalledTimes(1);

    const isPollVotedInQuery = (fetchImp.mock.calls[0] as any)[1].body.includes(
      'pollVoted'
    );
    expect(isPollVotedInQuery).toBe(false);
  });

  test('after query updates poll', async () => {
    const fetchImp = createFetchImplementation({
      data: { poll: defaultPoll }
    });

    jest.spyOn(global, 'fetch' as any).mockImplementationOnce(fetchImp);
    let utils: RenderResult = {} as any;
    await act(async () => {
      utils = renderTestComponent(false);
    });

    expect(utils.getByText(JSON.stringify(defaultPoll))).toBeTruthy();
  });

  describe('sets canVote and pollVoted', () => {
    test('to false when is not logged in', async () => {
      const fetchImp = createFetchImplementation({
        data: { poll: defaultPoll }
      });

      jest.spyOn(global, 'fetch' as any).mockImplementationOnce(fetchImp);
      let utils: RenderResult = {} as any;
      await act(async () => {
        utils = renderTestComponent(false);
      });

      expect(utils.getAllByText('false').length).toBe(2);
    });

    test('to false when is logged in and already voted', async () => {
      const fetchImp = createFetchImplementation({
        data: { poll: defaultPoll, pollVoted: true }
      });

      jest.spyOn(global, 'fetch' as any).mockImplementationOnce(fetchImp);
      let utils: RenderResult = {} as any;
      await act(async () => {
        utils = renderTestComponent(true);
      });

      expect(utils.getAllByText('false').length).toBe(2);
    });

    test('to true when is logged in and not voted yet', async () => {
      const fetchImp = createFetchImplementation({
        data: { poll: defaultPoll, pollVoted: false }
      });

      jest.spyOn(global, 'fetch' as any).mockImplementationOnce(fetchImp);
      let utils: RenderResult = {} as any;
      await act(async () => {
        utils = renderTestComponent(true);
      });

      expect(utils.getAllByText('true').length).toBe(2);
    });
  });
});
