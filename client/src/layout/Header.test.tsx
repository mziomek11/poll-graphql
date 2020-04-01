import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './Header';
import { renderWithTokenContext } from '../testUtils/token';

const renderHeader = (hasToken: boolean) => {
  const comp = (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  const token = hasToken ? 'access_token' : null;

  return renderWithTokenContext(comp, { token });
};

describe('Compoent LayoutHeader', () => {
  test('renders logged in nav when is logged in', () => {
    const { getByText } = renderHeader(true);

    expect(getByText('Logout')).toBeTruthy();
  });

  test('renders logged out nav when is logged out', () => {
    const { getByText } = renderHeader(false);

    expect(getByText('Login')).toBeTruthy();
  });
});
