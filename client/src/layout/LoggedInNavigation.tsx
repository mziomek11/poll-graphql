import React from 'react';

import Button from '@material-ui/core/Button';

import useToken from '../hooks/useToken';

const LoggedInNavigation = () => {
  const { setToken } = useToken();
  const handleLogoutClick = () => setToken(null);

  return (
    <nav>
      <Button color="inherit" onClick={handleLogoutClick}>
        Logout
      </Button>
    </nav>
  );
};

export default LoggedInNavigation;
