import { useContext } from 'react';

import { TokenContext } from '../context/token';

export default function() {
  const tokenContext = useContext(TokenContext);

  return tokenContext;
}
