import React from 'react';

import NavigationLink from './NavigationLink';

const LoggedOutNavigation = () => {
  return (
    <nav>
      <NavigationLink to="/register">Register</NavigationLink>
      <NavigationLink to="/login">Login</NavigationLink>
    </nav>
  );
};

export default LoggedOutNavigation;
