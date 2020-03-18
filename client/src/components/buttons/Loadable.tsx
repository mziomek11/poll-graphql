import React from 'react';

import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

type OwnProps = {
  loading: boolean;
};

type Props = ButtonProps & OwnProps;

const useStyles = makeStyles(theme => ({
  progress: {
    color: theme.palette.primary as any,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));

const LoadableButton: React.FC<Props> = ({
  loading,
  children,
  ...buttonProps
}) => {
  const classes = useStyles();

  return (
    <Box position="relative">
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        {...buttonProps}
      >
        {children}
        {loading && <CircularProgress size={24} className={classes.progress} />}
      </Button>
    </Box>
  );
};

export default LoadableButton;
