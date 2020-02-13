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

import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux'
import { useSelector } from 'react-redux'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import PrivateRoute from '../PrivateRoute/index'

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div></div>;

  return children;
}

function App() {
    const auth = useSelector(state => state.firebase.auth);
    return (
      <AuthIsLoaded>
        <Router>
            {isLoaded(auth) && isEmpty(auth) ? null : <Navigation/>}
            <Route exact path="/"> {(isLoaded(auth) && !isEmpty(auth)) ? <Redirect to="/login" /> : <Redirect to="/dashboard" /> }</Route>
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <PrivateRoute path={ROUTES.DASHBOARD}>
              <DashboardPage/>
            </PrivateRoute> 
        </Router>
      </AuthIsLoaded>
      );
}
const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(App);