import React, { useContext } from 'react';
import JwtDecode from 'jwt-decode';
import { render, fireEvent } from '@testing-library/react';

import { getInitialToken, TokenContext, TokenProvider } from './token';
import { LocalStorageMock } from '../testUtils/LocalStorage';

jest.mock('jwt-decode');

beforeEach(() => {
  (global as any).localStorage = new LocalStorageMock();
});

afterAll(() => {
  (global as any).localStorage = undefined;
});

const newToken = 'new token';
const renderTestComponent = () => {
  const TestComponent = () => {
    const { setToken } = useContext(TokenContext);

    return (
      <div>
        <button data-testid="b1" onClick={() => setToken(newToken)} />
        <button data-testid="b2" onClick={() => setToken(null)} />
      </div>
    );
  };

  return render(
    <TokenProvider>
      <TestComponent />
    </TokenProvider>
  );
};

describe('Context token', () => {
  describe('getInitialToken', () => {
    test('returns null when token is not in localstorage', () => {
      expect(getInitialToken()).toBeNull();
    });

    test('returns null when token is in localstorage but expired and removes it from storage', () => {
      (global as any).localStorage.setItem('token', 'asdasdasdasd');
      (JwtDecode as any).mockReturnValueOnce({ exp: Date.now() / 1000 - 1 });

      expect(getInitialToken()).toBeNull();
      expect((global as any).localStorage.getItem('token')).toBeNull();
    });

    test('returns token when token is in storage and has not expired', () => {
      const token = 'asdoipanhsdiopashnopidhnosad';
      (global as any).localStorage.setItem('token', token);
      (JwtDecode as any).mockReturnValueOnce({ exp: Date.now() * 2 });

      expect(getInitialToken()).toBe(token);
    });
  });

  describe('setContextToken', () => {
    test('set token in localStorage when token is not null', () => {
      (global as any).localStorage.setItem('token', 'adasd');
      (JwtDecode as any).mockReturnValueOnce({ exp: Date.now() * 2 });
      const { getByTestId } = renderTestComponent();

      fireEvent.click(getByTestId('b1'));
      expect((global as any).localStorage.getItem('token')).toBe(newToken);
    });

    test('remove token from localStorage when token is null', () => {
      (global as any).localStorage.setItem('token', 'adasd');
      (JwtDecode as any).mockReturnValueOnce({ exp: Date.now() * 2 });
      const { getByTestId } = renderTestComponent();

      fireEvent.click(getByTestId('b2'));
      expect((global as any).localStorage.getItem('token')).toBeNull();
    });
  });
});
