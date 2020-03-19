import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from './layout/Layout';
import { TokenProvider } from './context/token';
import { home, poll, notFound, register, login } from './pages';

const App = () => {
  return (
    <TokenProvider>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/register" component={register} />
            <Route exact path="/login" component={login} />
            <Route exact path="/poll/:id" component={poll} />
            <Route exact path="/" component={home} />
            <Route path="/" component={notFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </TokenProvider>
  );
};

export default App;
