import React from 'react';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1.5),
    paddingTop: theme.spacing(1.5)
  }
}));

const ListPaper: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={3}>
      {children}
    </Paper>
  );
};

export default ListPaper;
