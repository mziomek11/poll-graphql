import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core';

import LoggedInNavigation from './LoggedInNavigation';
import LoggedOutNavigation from './LoggedOutNavigation';
import Grid from '../Grid';
import useToken from '../../hooks/useToken';

const useStyles = makeStyles(theme => ({
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: theme.spacing(8),
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  }
}));

const Header = () => {
  const classes = useStyles();
  const { token } = useToken();

  return (
    <AppBar position="fixed">
      <Grid>
        <div className={classes.headerContent}>
          <Link
            color="inherit"
            variant="h6"
            underline="none"
            component={RouterLink}
            to="/"
          >
            Voter
          </Link>
          <Hidden xsDown>
            {token ? <LoggedInNavigation /> : <LoggedOutNavigation />}
          </Hidden>
        </div>
      </Grid>
    </AppBar>
  );
};

export default Header;
