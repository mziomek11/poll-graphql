import React from 'react';

import VoteOptions from './VoteOptions';
import { renderWithPollContext } from '../../../testUtils/poll';

describe('Component SinglePollVoteOptions', () => {
  test('renders all poll options', () => {
    const options = [
      { text: 'o1', votes: 0 },
      { text: 'o2', votes: 0 }
    ];

    const props = { selectedOption: options[0].text, onChange: jest.fn() };
    const comp = <VoteOptions {...props} />;
    const { getByText } = renderWithPollContext(comp, {}, { options });

    expect(getByText(options[0].text)).toBeTruthy();
    expect(getByText(options[1].text)).toBeTruthy();
  });
});
