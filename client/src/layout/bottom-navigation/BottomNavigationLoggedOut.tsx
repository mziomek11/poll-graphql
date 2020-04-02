import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import MUIBottomNavigation, {
  BottomNavigationProps
} from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HomeIcon from '@material-ui/icons/Home';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const BottomNavigationLoggedOut: React.FC<BottomNavigationProps> = props => {
  const { pathname } = useLocation();
  const history = useHistory();

  const getValue = () => {
    if (pathname === '/register') return 0;
    if (pathname === '/' || pathname.includes('/page/')) return 1;
    if (pathname === '/login') return 2;
  };

  const handleChange = (e: React.ChangeEvent<{}>, value: any) => {
    if (value === 0) history.push('/register');
    else if (value === 1) history.push('/');
    else if (value === 2) history.push('/login');
  };

  return (
    <MUIBottomNavigation value={getValue()} onChange={handleChange} {...props}>
      <BottomNavigationAction label="Register" icon={<PersonAddIcon />} />
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Login" icon={<LockOpenIcon />} />
    </MUIBottomNavigation>
  );
};

export default BottomNavigationLoggedOut;
