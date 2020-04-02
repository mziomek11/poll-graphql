import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import NavigationLink from './NavigationLink';
import useToken from '../../hooks/useToken';

const LoggedInNavigation = () => {
  const history = useHistory();
  const { setToken } = useToken();
  const handleLogoutClick = () => {
    setToken(null);
    history.push('/login');
  };

  return (
    <nav>
      <NavigationLink to="/create">Add poll</NavigationLink>
      <Button color="inherit" onClick={handleLogoutClick}>
        Logout
      </Button>
    </nav>
  );
};

export default LoggedInNavigation;
