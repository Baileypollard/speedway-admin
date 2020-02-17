import React, { Component } from "react";
import '../Styles/data-table.css';
import Cell from '../Dashboard/cell'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {connect} from 'react-redux'

function RaceRow({race}) {
    return <tr> 
        <Cell key={race.id} content={race.id}/> 
        <Cell key={"name"} content={race.name}/>
        <Cell key={"description"} content={race.description}/>
        <Cell key={"total-laps"} content={race.totalLaps}/>
        <Cell key={"start-time"} content={race.startTime}/>
        <Cell key={"end-time"} content={race.endTime}/>
        <Cell key={"state"} content={race.state}/>
        {/* <td>
            <Button className="increment-lap" onClick={() => increment(contestant)}>Increment Lap</Button>
            <Button className="decrement-lap" onClick={() => decrement(contestant)}>Decrement Lap</Button>
        </td> */}
        </tr>       
};

function RaceList({races}) {
    if (races === undefined) 
      races = []
  
    return (
        <tbody>
          {
            Object.values(races).map((d, key) => {
              return <RaceRow key={`contestant-${d.name}`} index={key} race={d}/>
            })
          }
        </tbody>
    );
  };

class RacesGrid extends Component {

    state = {
       races: [], 
       headers: ['Id', 'Race Name', 'Description', 'Total Laps', 'Start Time', 'End Time', 'State', 'Actions'] 
    }

    render() {
        this.state.races = this.props.currentRaces;
        return <div className="table-container">
                  <table className="table">
                    <thead>
                    {
                        this.state.headers.map((value, index) => (
                            <Cell key={"header-" + index} content={value} header={true}/>
                        ))
                    }  
                    </thead>
                    <RaceList races={this.state.races}/>
                </table>
               </div>
    }
}

const mapStateToProps = (state) => {
    const races = state.firestore.ordered.currentRaces; 
    return {
      currentRaces: races
    }
}
  

export default compose(
  firestoreConnect([
    {
      collection:'races',
      storeAs:'currentRaces',
    }
  ]),
  connect(mapStateToProps, null),
  
)(RacesGrid)