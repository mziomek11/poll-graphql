import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from './layout/Layout';
import PublicRoute from './components/routing/PublicRoute';
import ProtectedRoute from './components/routing/ProtectedRoute';
import { TokenProvider } from './context/token';
import { AlertProvider } from './context/alert';
import { home, poll, notFound, register, login, create } from './pages';

const App = () => {
  return (
    <TokenProvider>
      <AlertProvider>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Switch>
              <PublicRoute exact path="/register" component={register} />
              <PublicRoute exact path="/login" component={login} />
              <ProtectedRoute exact path="/create" component={create} />
              <Route exact path="/poll/:id" component={poll} />
              <Route exact path="/page/:page" component={home} />
              <Route exact path="/" component={home} />
              <Route path="/" component={notFound} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </AlertProvider>
    </TokenProvider>
  );
};

export default App;
