import React from 'react';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
  fillPercentage: number;
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.light
  },
  fill: {
    backgroundColor: theme.palette.primary.dark
  }
}));

const SinglePollResultsBar: React.FC<Props> = ({ fillPercentage }) => {
  const classes = useStyles();

  return (
    <Box height="100%" className={classes.root}>
      <Box
        width={`${fillPercentage}%`}
        height="100%"
        className={classes.fill}
      />
    </Box>
  );
};

export default SinglePollResultsBar;
