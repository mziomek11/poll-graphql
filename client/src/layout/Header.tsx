import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import Navigation from './Navigation';
import Grid from './Grid';

const Header = () => {
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
          <Navigation />
        </Box>
      </Grid>
    </AppBar>
  );
};

export default Header;
