import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { TokenContext } from '../../context/token';

const PublicRoute: React.FC<RouteProps> = props => {
  const { token } = useContext(TokenContext);

  return !token ? <Route {...props} /> : <Redirect to="/" />;
};

export default PublicRoute;
