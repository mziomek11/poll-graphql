import React from 'react';

import NavigationLink from './NavigationLink';

const LoggedOutNavigation = () => {
  return (
    <nav>
      <NavigationLink to="/regiser">Register</NavigationLink>
      <NavigationLink to="/login">Login</NavigationLink>
    </nav>
  );
};

export default LoggedOutNavigation;
