import React, { Component } from "react";
import '../Styles/data-table.css';
import Cell from '../Dashboard/cell'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css'
import {deleteRace} from '../../state/actions/raceActions'

class RacesGrid extends Component {

    state = {
       races: [], 
       headers: [{Header: 'Date' , accessor:'date', width:110}, 
       {Header: 'Race Name', accessor:'name'}, 
       {Header: 'Description', accessor:'description'}, 
       {Header: 'Total Laps', accessor:'totalLaps', width:100, style :{textAlign:'center'}}, 
       {Header: 'Start Time', accessor:'startTime'}, 
       {Header: 'End Time', accessor:'endTime'}, 
       {Header: 'State', accessor:'state', style:{textAlign:'center'}}, 
       {Header: 'Actions', width:100,Cell: props => {
           return (
               <Button className='decrement-lap' 
               onClick={() => this.props.deleteRace(props.original)}> Delete </Button>
           )
       }}] 
    }

    render() {
        this.state.races = this.props.currentRaces;
        return <div className="table-container">
                  <ReactTable
                    className='table'
                    columns={this.state.headers}
                    data={this.state.races}
                    defaultPageSize={10}
                    />
               </div>
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteRace : (race) => dispatch(deleteRace(race))
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
  connect(mapStateToProps, mapDispatchToProps),
  
)(RacesGrid)