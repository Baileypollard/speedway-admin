import React, { Component } from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Cell from './cell';
import '../Styles/data-table.css';
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {updatePositions, updateLapCount} from '../../state/actions/dashboadActions'
import {getImageURLForContestants} from '../../state/actions/contestantImageActions'
import { firestoreDataSelector, firestoreOrderedSelector } from 'redux-firestore'
import {Button, Image} from 'react-bootstrap'

const SortableItem = SortableElement(({contestant, imageSrc, increment, decrement}) => 
  <tr> 
    <Cell key={contestant + "-position"} content={contestant.position}/> 
    <Cell key={"photo"} content={
      <Image className='contestant-image' 
      src={imageSrc}
      />
    }/>
    <Cell key={"name"} content={contestant.name}/>
    <Cell key={"number"} content={contestant.carNumber}/>
    <Cell key={"lapsCompleted"} content={contestant.lapsCompleted}/>
    <td>
      <Button className="increment-lap" onClick={() => increment(contestant)}>Increment Lap</Button>
      <Button className="decrement-lap" onClick={() => decrement(contestant)}>Decrement Lap</Button>
    </td>
  </tr>
);

const SortableList = SortableContainer(({items, imageMap, increment, decrement}) => {

  if (items === undefined) 
    items = []
  if (imageMap === undefined) {
    imageMap = {}
  }
  return (
      <tbody>
        {
          Object.values(items).map((d, key) => {
            return <SortableItem key={`contestant-${d.name}`} index={key} 
            contestant={d} imageSrc={imageMap[d.id]} increment={increment} decrement={decrement}/>
          })
        }
      </tbody>
  );
});

class PositionGrid extends Component {
    
    constructor(props) {
      super(props);

      this.state = {
        contestants: [],
        headers:["Position", "Photo", "Name", "Car Number", "Laps Completed", "Actions"]
      };

      this.incrementLapCount = this.incrementLapCount.bind(this)
      this.decrementLapCount = this.decrementLapCount.bind(this)
    }

    static getDerivedStateFromProps(props, state) {
      if (props.contestants !== state.contestants) {
        if (props.contestants != null) {
          return state.contestants = props.contestants;
        }
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

    componentDidUpdate(prevProps) {
      if (this.props.contestants.length != prevProps.contestants.length) {
        this.props.getImageUrlForContestants(this.state.contestants)
      }
    }
    
    render() {
        return <div className="table-container">
          <table className="table">
            <thead>
              {
                this.state.headers.map((value, index) => (
                  <Cell key={"header-" + index} content={value} header={true}/>
                ))
              }  
            </thead>
            <SortableList lockAxis="y" locklockToContainerEdges={true} items={this.state.contestants} imageMap={this.props.contestantImageMap} onSortEnd={this.onSortEnd} increment={this.incrementLapCount} decrement={this.decrementLapCount}/> 
          </table>
          </div>
      }
  }  

const mapDispatchToProps = (dispatch) => {
  return {
    updatePositions: (contestants) => dispatch(updatePositions(contestants)),
    updateLapCount: (contestant, newLapCount) => dispatch(updateLapCount(contestant, newLapCount)),
    getImageUrlForContestants: (contestants) => dispatch(getImageURLForContestants(contestants))
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  var contestantImageMap = state.contestantImages.contestantImageMap;
  var contestants = state.firestore.ordered['racers'] !== undefined ? state.firestore.ordered['racers'] : [];
  //Sorting here since the DB query orderby is not reliable
  var sortedContestants = contestants.slice().sort((a,b) => { return a.position - b.position});      
  return {
    contestants: sortedContestants,
    contestantImageMap: contestantImageMap
  }
}
  
export default compose(
  firestoreConnect((props) => [
    {
      collection:'races',
      doc: props.race.id,
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