import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './layout/Layout';
import { home, poll, notFound } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/poll/:id" component={poll} />
          <Route exact path="/" component={home} />
          <Route path="/" component={notFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
