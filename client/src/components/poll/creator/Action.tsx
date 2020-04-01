import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
  onClick: VoidFunction;
};

const useStyles = makeStyles(theme => ({
  root: {
    margin: `${theme.spacing(2)}px ${theme.spacing(1)}px`
  }
}));

const PollCreatorAction: React.FC<Props> = ({ children, onClick }) => {
  const classes = useStyles();

  return (
    <Button className={classes.root} variant="outlined" onClick={onClick}>
      {children}
    </Button>
  );
};

export default PollCreatorAction;
