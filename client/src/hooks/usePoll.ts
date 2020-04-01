import { useContext } from 'react';

import { PollContext } from '../context/poll';

export default function() {
  const pollContext = useContext(PollContext);

  return pollContext;
}
