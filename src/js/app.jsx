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
import adminModule from 'modules/admin';
import Home from 'lib/components/connectedHome';
import NavigationFrame from 'lib/components/navigationFrame';

import DevTools from 'lib/components/devTools';
import { redirectIfLoggedIn, isAuthenticated } from 'lib/routerHooks';

import Store from './store';

const history = syncHistoryWithStore(browserHistory, Store);

const App = () => (
  <div>
    <authentication.TokenWatchdog />
    {process.env.NODE_ENV === 'production' ? null : <DevTools />}
    <Router history={history}>
      <Route path="/" component={NavigationFrame}>
        <IndexRoute component={Home} />
        <Route
          path="login"
          component={authentication.LoginView}
          onEnter={redirectIfLoggedIn}
        />
        <Route
          path="admin"
          component={adminModule.AdminView}
          onEnter={isAuthenticated}
        />
      </Route>
    </Router>
  </div>
  );

export default App;
