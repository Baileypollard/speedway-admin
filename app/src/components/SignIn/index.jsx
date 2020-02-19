import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import {connect} from 'react-redux'
import {signIn} from '../../state/actions/authActions'
import {Button, OutlinedInput, FormControl, InputLabel } from '@material-ui/core';
import {Redirect} from 'react-router-dom'

import "./index.css";

const SignInPage = () => (
    <SignInFormBase/>
);

const INITIAL_STATE = {
  email: '',
  password: '',
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.signIn(this.state)
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {

    var logo = require('../../images/logo.jpg')
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    const { auth } = this.props;
    
    if (auth.uid) return <Redirect to="/dashboard"/>

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

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInFormBase);
