import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

const Navigation = () => {
  return (
    <nav>
      <Button component={Link} to="/register" color="inherit">
        Register
      </Button>
      <Button component={Link} to="/login" color="inherit">
        Login
      </Button>
    </nav>
  );
};

export default Navigation;
