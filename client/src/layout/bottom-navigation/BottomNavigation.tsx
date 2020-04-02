import React from 'react';

import { BottomNavigationProps } from '@material-ui/core/BottomNavigation';
import { makeStyles } from '@material-ui/core/styles';

import BottomNavigationLoggedIn from './BottomNavigationLoggedIn';
import BottomNavigationLoggedOut from './BottomNavigationLoggedOut';

import useToken from '../../hooks/useToken';

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%'
  }
}));

const BottomNavigation = () => {
  const classes = useStyles();
  const { token } = useToken();
  const props: BottomNavigationProps = {
    component: 'nav',
    showLabels: true,
    className: classes.root
  };

  return token ? (
    <BottomNavigationLoggedIn {...props} />
  ) : (
    <BottomNavigationLoggedOut {...props} />
  );
};

export default BottomNavigation;
