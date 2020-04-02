import React from 'react';

import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

import Header from './header/Header';
import BottomNavigation from './bottom-navigation/BottomNavigation';
import Grid from './Grid';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(11),
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    hyphens: 'auto',
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(7)
    }
  }
}));

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />

      <Grid>{children}</Grid>
      <Hidden smUp>
        <BottomNavigation />
      </Hidden>
    </div>
  );
};

export default Layout;
