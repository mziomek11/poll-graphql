import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import LoadableButon, { LoadableButtonProps } from '../buttons/Loadable';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  }
}));

const AuthButton: React.FC<LoadableButtonProps> = props => {
  const classes = useStyles();
  return <LoadableButon type="submit" className={classes.root} {...props} />;
};

export default AuthButton;
