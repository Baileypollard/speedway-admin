import React, { Component } from "react";
import '../Styles/data-table.css';
import Cell from '../Dashboard/cell'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {connect} from 'react-redux'
import {Button, Image} from 'react-bootstrap'
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css'
import {deleteContestant} from '../../state/actions/contestantActions'
import {getImageURLForContestants} from '../../state/actions/contestantImageActions'

class ContestantGrid extends Component {

    constructor(props) {
      super(props)
    }

    state = {
       contestants: [], 
       headers: [
       {Header: 'Name' , accessor:'name'}, 
       {Header: 'Picture', accessor:'pictureName', Cell: props => {
          return <center><Image className='contestant-image' 
          src={this.props.contestantImageMap[props.original.id]}
          /></center>
       }}, 
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


    static getDerivedStateFromProps(props, state) {
      if (props.currentContestants !== state.contestants) {
            props.getImageUrlForContestants(props.currentContestants)
            return state.contestants = props.currentContestants;
        }
        return null
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
        getImageUrlForContestants: (contestants) => dispatch(getImageURLForContestants(contestants)),
        deleteContestant : (contestant) => dispatch(deleteContestant(contestant))
    }

}

const mapStateToProps = (state) => {

    const contestantImageMap = state.contestantImages.contestantImageMap;
    const contestants = state.firestore.ordered.currentContestants; 
    return {
      currentContestants: contestants,
      contestantImageMap
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

