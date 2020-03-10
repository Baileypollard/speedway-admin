import React, { Component } from 'react';
import PositionGrid from './position-grid'
import '../Styles/dashboard.css'
import { Button } from 'react-bootstrap'
import {startRace, endRace} from '../../state/actions/dashboadActions'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {connect} from 'react-redux'
import CollapisbleHeader from './collapsible-header'
class DashboardPage extends Component {

  startRace(race) {
    this.props.startRace(race);
  }
  
  endRace(race) {
    this.props.endRace(race);
  }
  

  render() {
    const race = this.props.race;
    if (race != null) {
      var isStarted = (race.state == 'STARTED') ? true : false;
      return <div className="dashboard">
        <h1>Live Race</h1>
        <CollapisbleHeader race={race}/>
        <div className="button">
          <Button className="start" disabled={isStarted} onClick={() => this.startRace(race)}>Start Race</Button>
          <Button className="end" disabled={!isStarted} onClick={() => this.endRace(race)}>End Race</Button>
        </div>
        <PositionGrid race={race}/>
      </div>
    } else {
      return <div className="dashboard">
                <h1><center>There are currently no active races!</center></h1>
             </div>
    }
    
  }
} 

const mapDispatchToProps = (dispatch) => {
    return {
      startRace: (race) => dispatch(startRace(race)),
      endRace: (race) => dispatch(endRace(race)),
    }
}

const mapStateToProps = (state) => {
  const race = state.firestore.ordered.race 
                && state.firestore.ordered.race[0];
  return {
    race
  }
}

export default compose(
  firestoreConnect([
    {
      collection:'races',
      storeAs:'race',
      where: [
        ['state', 'in', ['STARTED', 'ACTIVE']]
      ]
    }
  ]),
  connect(mapStateToProps, mapDispatchToProps),
  
)(DashboardPage)