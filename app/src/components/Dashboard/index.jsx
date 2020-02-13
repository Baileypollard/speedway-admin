import React, { Component } from 'react';
import PositionGrid from './position-grid'
import '../Styles/dashboard.css'
import { Button } from 'react-bootstrap'

const DashboardPage = () => (
    <div className="dashboard">
      <h1>Live Race</h1>
      <div className="button">
        <Button className="mr-auto">Add Contestant</Button>
        <Button className="start">Start Race</Button>
        <Button className="end">End Race</Button>
      </div>
      <PositionGrid/>
    </div>
  );

export default DashboardPage