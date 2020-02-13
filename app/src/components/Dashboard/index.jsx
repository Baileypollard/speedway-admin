import React, { Component } from 'react';
import { withAuthorization, AuthUserContext } from '../Session';
import PositionGrid from './position-grid'
import '../Styles/dashboard.css'
import { Button } from 'react-bootstrap'

const DashboardPage = () => (
  <AuthUserContext.Consumer>
  { authUser => (
    <div className="dashboard">
      <h1>Live Race</h1>
      <div className="button">
        <Button className="start">Start Race</Button>
        <Button className="end">End Race</Button>
      </div>
      <PositionGrid/>
    </div>
  )}
  </AuthUserContext.Consumer>
  );

const condition = authUser => !!authUser;
export default withAuthorization(condition)(DashboardPage);