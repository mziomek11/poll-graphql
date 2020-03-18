import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
  text: string;
  to: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1)
  }
}));

const RedirectText: React.FC<Props> = ({ text, to }) => {
  const classes = useStyles();

  return (
    <Typography variant="body2" className={classes.root}>
      {`${text} `}
      <Link component={RouterLink} to={to}>
        here
      </Link>
      .
    </Typography>
  );
};

export default RedirectText;
