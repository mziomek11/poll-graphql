import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { home, poll, notFound } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/poll/:id" component={poll} />
        <Route exact path="/" component={home} />
        <Route path="/" component={notFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
