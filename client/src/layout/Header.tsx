import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import LoggedInNavigation from './LoggedInNavigation';
import LoggedOutNavigation from './LoggedOutNavigation';
import Grid from './Grid';
import useToken from '../hooks/useToken';

const Header = () => {
  const { token } = useToken();

  return (
    <AppBar position="fixed">
      <Grid>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          minHeight={64}
        >
          <Link
            color="inherit"
            variant="h6"
            underline="none"
            component={RouterLink}
            to="/"
          >
            Voter
          </Link>
          {token ? <LoggedInNavigation /> : <LoggedOutNavigation />}
        </Box>
      </Grid>
    </AppBar>
  );
};

export default Header;
