import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

if (!process.env.REACT_APP_GRAPHQL_SERVER) {
  throw Error('Add REACT_APP_GRAPHQL_SERVER to env variables');
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
