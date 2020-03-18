import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(0.5)
  }
}));

const Heading: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Typography variant="h3" className={classes.root}>
      {children}
    </Typography>
  );
};

export default Heading;
