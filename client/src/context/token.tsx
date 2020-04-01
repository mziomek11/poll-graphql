import React, { createContext, useState } from 'react';
import JwtDecode from 'jwt-decode';

export type Token = string | null;
export type TokenContextType = {
  token: Token;
  setToken: (token: Token) => void;
};

export const TokenContext = createContext<TokenContextType>({
  token: null,
  setToken: () => new Error('Should be inside provider')
});

export const getInitialToken = () => {
  let token = localStorage.getItem('token');
  if (token && (JwtDecode(token) as any).exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    token = null;
  }

  return token;
};

export const TokenProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(getInitialToken);
  const setContextToken = (token: string | null) => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
    setToken(token);
  };

  const contextValue: TokenContextType = { token, setToken: setContextToken };

  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
};
