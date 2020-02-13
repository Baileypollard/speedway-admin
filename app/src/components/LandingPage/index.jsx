import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { withAuthorization, AuthUserContext } from '../Session';

const LandingPage = () => (
  <AuthUserContext.Consumer>
  {authUser => (
    <div>
      <h1>ADMIN</h1>
    </div>
  )}
  </AuthUserContext.Consumer>
  );


export default withAuthorization(true)(AdminPage);