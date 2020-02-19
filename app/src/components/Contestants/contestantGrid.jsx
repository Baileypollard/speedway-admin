import React, { Component } from "react";
import '../Styles/data-table.css';
import Cell from '../Dashboard/cell'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css'
import {deleteContestant} from '../../state/actions/contestantActions'

class ContestantGrid extends Component {

    state = {
       contestants: [], 
       headers: [
       {Header: 'Name' , accessor:'name'}, 
       {Header: 'Picture', accessor:'pictureName'}, 
       {Header: 'Car Number', accessor:'carNumber'}, 
       {Header: 'Actions', width:100,Cell: props => {
           return (
             <div>
               <Button className='decrement-lap' 
               onClick={() => this.props.deleteContestant(props.original)}> Delete 
               </Button>
    
            </div>
           )
       }}] 
    }

    render() {
        this.state.contestants = this.props.currentContestants;
        return <div className="table-container">
                  <ReactTable
                    className='table'
                    columns={this.state.headers}
                    data={this.state.contestants}
                    defaultPageSize={10}
                    />
               </div>
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteContestant : (contestant) => dispatch(deleteContestant(contestant))
    }

}

const mapStateToProps = (state) => {
    const contestants = state.firestore.ordered.currentContestants; 
    return {
      currentContestants: contestants
    }
}
  

export default compose(
  firestoreConnect([
    {
      collection:'contestants',
      storeAs:'currentContestants',
    }
  ]),
  connect(mapStateToProps, mapDispatchToProps),
  
)(ContestantGrid)

