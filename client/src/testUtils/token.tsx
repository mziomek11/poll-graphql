import React from 'react';
import { render } from '@testing-library/react';

import { TokenContext, TokenContextType } from '../context/token';

export type OverrideToken = Partial<TokenContextType>;

export const renderWithTokenContext = (
  toRenderInside: JSX.Element,
  overrideData: OverrideToken
) => {
  const tokenData: TokenContextType = {
    token: null,
    setToken: () => {},
    ...overrideData
  };

  return render(
    <TokenContext.Provider value={tokenData}>
      {toRenderInside}
    </TokenContext.Provider>
  );
};
