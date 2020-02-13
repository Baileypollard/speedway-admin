import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import {Button, OutlinedInput, FormControl, InputLabel } from '@material-ui/core';

import "./index.css";

const SignInPage = () => (
    <SignInForm />
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    var logo = require('../../images/logo.jpg')
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      
      <div className="Login">

        <form onSubmit={this.onSubmit}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel ref="email" htmlFor="component-outlined">
            Email
          </InputLabel>

          <OutlinedInput
            name="email"
            className="inputLabel"
            id="component-outlined"
            onChange={this.onChange}
            type="email"
            value={this.email}
          />

        </FormControl>

        <FormControl variant="outlined" fullWidth>
          <InputLabel ref="password" htmlFor="component-outlined">
            Password
          </InputLabel>

          <OutlinedInput
            name="password"
            className="inputLabel"
            id="component-outlined"
            value={this.password}
            type="password"
            onChange={this.onChange}
          />
          
        </FormControl>
        {error && <p>{error.message}</p>}
        <Button variant="contained" type="submit" color="primary" fullWidth>
          Log In
        </Button>
        </form>
    </div>
    );
  }
}
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;
export { SignInForm };