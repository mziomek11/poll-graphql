import React from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}));

const PollPaper: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Box mb={2}>
      <Paper className={classes.root} elevation={3}>
        {children}
      </Paper>
    </Box>
  );
};

export default PollPaper;
