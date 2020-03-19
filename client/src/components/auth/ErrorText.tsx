import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1)
  }
}));

const ErrorText: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.root} variant="body2" color="error">
      {children}
    </Typography>
  );
};

export default ErrorText;
