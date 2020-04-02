import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

type Props = {
  to: string;
};

const NavigationLink: React.FC<Props> = ({ to, children }) => {
  return (
    <Button component={Link} to={to} color="inherit">
      {children}
    </Button>
  );
};

export default NavigationLink;
