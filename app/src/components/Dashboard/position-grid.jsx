import React, { Component } from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Cell from './cell';
import '../Styles/data-table.css';
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {updatePositions, updateLapCount} from '../../state/actions/dashboadActions'
import { firestoreDataSelector, firestoreOrderedSelector } from 'redux-firestore'
import {Button} from 'react-bootstrap'

const SortableItem = SortableElement(({contestant, increment, decrement}) => 
<tr> 
  <Cell key={contestant + "-position"} content={contestant.position}/> 
  <Cell key={"photo"} content={"N/A"}/>
  <Cell key={"name"} content={contestant.name}/>
  <Cell key={"number"} content={contestant.carNumber}/>
  <Cell key={"lapsCompleted"} content={contestant.lapsCompleted}/>
  <td>
    <Button className="increment-lap" onClick={() => increment(contestant)}>Increment Lap</Button>
    <Button className="decrement-lap" onClick={() => decrement(contestant)}>Decrement Lap</Button>
  </td>
</tr>);

const SortableList = SortableContainer(({items, increment, decrement}) => {
  if (items === undefined) 
    items = []

  return (
      <tbody>
        {
          Object.values(items).map((d, key) => {
            return <SortableItem key={`contestant-${d.name}`} index={key} 
            contestant={d} increment={increment} decrement={decrement}/>
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
        headers:["Position", "Photo", "Name", "Car Number", "Laps Completed", "Actions"]
      };

      this.incrementLapCount = this.incrementLapCount.bind(this)
      this.decrementLapCount = this.decrementLapCount.bind(this)
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

    incrementLapCount(contestant) {
      var newLapCount = contestant.lapsCompleted + 1;
      this.props.updateLapCount(contestant, newLapCount);
    }
    
    decrementLapCount (contestant) {
      if (contestant.lapsCompleted > 0) {
        var newLapCount = contestant.lapsCompleted - 1;
        this.props.updateLapCount(contestant, newLapCount);
      }
    }
    

    render() {
        return <div className="table-container">
          <table className="table">
            <thead>
              {this.state.headers.map((value, index) => (
                <Cell key={"header-" + index} content={value} header={true}/>
              ))}  
            </thead>
            <SortableList items={this.state.contestants} onSortEnd={this.onSortEnd} increment={this.incrementLapCount} decrement={this.decrementLapCount}/> 
          </table>
          </div>
        
      }
  }  

const mapDispatchToProps = (dispatch) => {
  return {
    updatePositions: (contestants) => dispatch(updatePositions(contestants)),
    updateLapCount: (contestant, newLapCount) => dispatch(updateLapCount(contestant, newLapCount))
  }
}

const mapStateToProps = (state) => {
  var contestants = state.firestore.ordered['racers'] !== undefined ? state.firestore.ordered['racers'] : [];
  //Sorting here since the DB query orderby is not reliable
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