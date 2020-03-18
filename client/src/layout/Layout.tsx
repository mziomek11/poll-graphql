import React from 'react';

import Box from '@material-ui/core/Box';

import Header from './Header';
import Grid from './Grid';

const Layout: React.FC = ({ children }) => {
  return (
    <Box mt={12}>
      <Header />
      <Grid>{children}</Grid>
    </Box>
  );
};

export default Layout;
