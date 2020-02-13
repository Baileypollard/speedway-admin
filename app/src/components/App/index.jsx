import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import React, { Component } from 'react';
import Navigation from '../Navigation';
import SignInPage from '../SignIn';
import DashboardPage from '../Dashboard';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

import { withAuthentication } from '../Session';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => (
  <AuthUserContext.Consumer>
  { authUser =>
    <Router>
      {authUser ? <Navigation/> : null}
        <Route exact path="/"> authUser ? <Redirect to="/login" /> : <Redirect to="/dashboard" /> </Route>
        <Route exact path={ROUTES.DASHBOARD} component={DashboardPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
    </Router>
  }
</AuthUserContext.Consumer>
  
  
);
export default withAuthentication(App);