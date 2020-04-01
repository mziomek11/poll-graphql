import React from 'react';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';
import Grid from './Grid';

const useStyles = makeStyles(() => ({
  root: {
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    hyphens: 'auto'
  }
}));

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Box mt={11} className={classes.root}>
      <Header />
      <Grid>{children}</Grid>
    </Box>
  );
};

export default Layout;
