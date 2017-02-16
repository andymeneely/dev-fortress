/* global process */

import React from 'react';
import { syncHistoryWithStore } from 'react-router-redux';
import {
  Router,
  Route,
  browserHistory,
  IndexRoute
} from 'react-router';

import authentication from 'modules/authentication';
import Home from 'lib/components/connectedHome';
import NavigationFrame from 'lib/components/navigationFrame';

import DevTools from 'lib/components/devTools';
import Store from './store';

const history = syncHistoryWithStore(browserHistory, Store);

const App = () => (
  <div>
    {process.env.NODE_ENV === 'production' ? null : <DevTools />}
    <Router history={history}>
      <Route path="/" component={NavigationFrame}>
        <IndexRoute component={Home} />
        <Route path="login" component={authentication.LoginView} />
      </Route>
    </Router>
  </div>
  );

export default App;
