import React from 'react';
import { renderWithPollContext } from '../../../testUtils/poll';

import Results from './Results';

describe('Component SinglePollResults', () => {
  test('renders options ordered by votes descending', () => {
    const options = [
      { text: 'option 2', votes: 2 },
      { text: 'option 3', votes: 3 },
      { text: 'option 1', votes: 1 }
    ];

    const { getAllByText } = renderWithPollContext(
      <Results />,
      {},
      { options }
    );

    const renderedOptions = getAllByText(content => {
      return content.includes('option');
    });

    expect(renderedOptions[0].textContent).toBe('option 3');
    expect(renderedOptions[1].textContent).toBe('option 2');
    expect(renderedOptions[2].textContent).toBe('option 1');
  });

  test('options votesPercent is 0 when totalVotes is 0', () => {
    const options = [
      { text: 'a', votes: 0 },
      { text: 'b', votes: 0 }
    ];
    const { getAllByText } = renderWithPollContext(
      <Results />,
      {},
      { options, totalVotes: 0 }
    );

    const percentTextes = getAllByText('0%');
    expect(percentTextes.length).toBe(2);
  });

  test('options has proper votesPercent when totalVotes is not 0', () => {
    const options = [
      { text: 'a', votes: 5 },
      { text: 'b', votes: 3 },
      { text: 'c', votes: 2 }
    ];

    const { getByText } = renderWithPollContext(
      <Results />,
      {},
      { options, totalVotes: 10 }
    );

    expect(getByText('50%')).toBeTruthy();
    expect(getByText('30%')).toBeTruthy();
    expect(getByText('20%')).toBeTruthy();
  });
});
