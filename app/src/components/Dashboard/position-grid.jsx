import React, { Component } from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Cell from './cell';
import '../Styles/data-table.css';
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {updatePositions} from '../../state/actions/dashboadActions'
import { firestoreDataSelector, firestoreOrderedSelector } from 'redux-firestore'

const SortableItem = SortableElement(({contestant}) => 
<tr> 
  <Cell key={contestant + "-position"} content={contestant.position}/> 
  <Cell key={"photo"} content={"N/A"}/>
  <Cell key={"name"} content={contestant.name}/>
  <Cell key={"number"} content={contestant.carNumber}/>
  <Cell key={"lapsCompleted"} content={contestant.lapsCompleted}/>
</tr>);

const SortableList = SortableContainer(({items}) => {
  if (items === undefined) 
    items = []

  return (
      <tbody>
        {
        // items.map((value, index) => (
        //    <SortableItem key={`contestant-${value.name}`} index={index} contestant={value}/>
        // ))
        Object.values(items).map((d, key) => {
          return <SortableItem key={`contestant-${d.name}`} index={key} contestant={d}/>
        })
        }
      </tbody>
  );
});

class PositionGrid extends Component {
    
    constructor(props) {
      super(props);

      this.state = {
        loading: false,
        contestants: [],
        headers:["Position", "Photo", "Name", "Car Number", "Laps Completed"]
      };
    }
    static getDerivedStateFromProps(props, state) {
      if (props.contestants !== state.contestants) {
        if (props.contestants != null)
          return state.contestants = props.contestants;
      }
      return null
    }
    onSortEnd = ({oldIndex, newIndex}) => {
      var newArray = arrayMove(this.state.contestants, oldIndex, newIndex);
      this.props.updatePositions(newArray)
    }

      render() {
        return <div className="table-container">
          <table className="table">
            <thead>
              {this.state.headers.map((value, index) => (
                <Cell key={"header-" + index} content={value} header={true}/>
              ))}  
            </thead>
            <SortableList items={this.state.contestants} onSortEnd={this.onSortEnd}/> 
          </table>
          </div>
        
      }
  }  

const contestantQuery =  {
  collection:'races',
  doc: 'race-2019-01-01',
  storeAs:'racers',
  subcollections: [
    {
      collection:'contestants',
      orderBy:'position',
    },
  ],
}  

const mapDispatchToProps = (dispatch) => {
  return {
    updatePositions: (contestants) => dispatch(updatePositions(contestants))
  }
}

const mapStateToProps = (state) => {
  var contestants = state.firestore.ordered['racers'] !== undefined ? state.firestore.ordered['racers'] : [];
  var sortedContestants = contestants.slice().sort((a,b) => { return a.position - b.position});      
  return {
    contestants: sortedContestants
  }
}
  
export default compose(
  firestoreConnect([
    {
      collection:'races',
      doc: 'race-2019-01-01',
      storeAs:'racers',
      subcollections: [
        {
          collection:'contestants',
        },
      ],
    }
  ]),
  connect(mapStateToProps, mapDispatchToProps),
  
)(PositionGrid)