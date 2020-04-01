import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import PollList, { Props as PollListProps } from './List';

const pollsPerPage = 10;

const renderPollList = (overrideProps: Partial<PollListProps> = {}) => {
  const props: PollListProps = {
    pollsPerPage,
    loading: false,
    polls: new Array(pollsPerPage).fill(0).map((_, i) => ({
      id: `poll${i}`,
      question: `Question ${i}`,
      totalVotes: 30,
      creationTime: '2020-03-24T12:05:09.793Z',
      user: { username: 'bob' }
    })),
    ...overrideProps
  };

  return render(
    <BrowserRouter>
      <PollList {...props} />
    </BrowserRouter>
  );
};

describe('Component PollList', () => {
  test('render loading items when is loading', () => {
    const { getAllByRole } = renderPollList({ loading: true });

    expect(getAllByRole('progressbar').length).toBe(pollsPerPage);
  });

  test('render normal items when is not loading', () => {
    const { getByText } = renderPollList({ loading: false });

    for (let i = 0; i < pollsPerPage; i++) {
      expect(getByText(`Question ${i}`)).toBeTruthy();
    }
  });
});
