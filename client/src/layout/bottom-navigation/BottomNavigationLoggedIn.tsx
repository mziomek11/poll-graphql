import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import MUIBottomNavigation, {
  BottomNavigationProps
} from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import PollIcon from '@material-ui/icons/Poll';
import HomeIcon from '@material-ui/icons/Home';
import LockIcon from '@material-ui/icons/Lock';

import useToken from '../../hooks/useToken';

const BottomNavigationLoggedIn: React.FC<BottomNavigationProps> = props => {
  const { setToken } = useToken();
  const { pathname } = useLocation();
  const history = useHistory();

  const getValue = () => {
    if (pathname === '/create') return 0;
    if (pathname === '/' || pathname.includes('/page/')) return 1;
  };

  const handleChange = (e: React.ChangeEvent<{}>, value: any) => {
    if (value === 0) history.push('/create');
    else if (value === 1) history.push('/');
    else if (value === 2) setToken(null);
  };

  return (
    <MUIBottomNavigation value={getValue()} onChange={handleChange} {...props}>
      <BottomNavigationAction label="Add poll" icon={<PollIcon />} />
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Logout" icon={<LockIcon />} />
    </MUIBottomNavigation>
  );
};

export default BottomNavigationLoggedIn;
