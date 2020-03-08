import React, {Component} from 'react'
import {Form, Col, Button} from 'react-bootstrap'
import {createRace, updateRace} from '../../state/actions/raceActions'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {RACE_STATES} from '../../constants/raceStates'
import Select from 'react-select';

class CreateRaceModal extends Component {
  
  constructor(props) {
    super(props);
    const race = this.props.race;
    this.state = {
      currentContestants: [],
      raceName: race ? race.name : '', 
      raceDate: race ? race.date : '', 
      raceTotalLaps: race ? race.totalLaps : '', 
      raceDescription: race ? race.description : '', 
      state: race ? race.state : 'INACTIVE',
      selectedContestants: []
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.edit == true && state.selectedContestants?.length == 0) {
      if (props.selectedContestants !== undefined) {
        return {
          selectedContestants: props.selectedContestants
        };
      }
    }
    return null;
  }

  handleSubmit(event) {
    event.preventDefault();

    var contestants = this.state.selectedContestants;

    var race = {
      id:'race-' + event.target.elements.raceDate.value,
      name:event.target.elements.raceName.value,
      description:event.target.elements.raceDescription.value,
      totalLaps:event.target.elements.raceTotalLaps.value,
      date:event.target.elements.raceDate.value,
      state:event.target.elements.state.value,
    }
    if (this.props.edit) {
      this.props.updateRace(race, contestants, this.props.selectedContestants);
    } else {
      this.props.createRace(race, contestants);
    }
    this.props.closeModal();
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  };

  onContestantChange(event) {
    this.setState({selectedContestants: event});
  }



  render() {
    const race = this.props.race ? this.props.race : {}

    if (this.props.currentContestants === undefined) {
      this.state.currentContestants = [];
    } else {
      this.state.currentContestants = this.props.currentContestants;
    }    

    return <div className="modal-content">
          <div className="modal-header">
          <h5 className="modal-title">{this.props.title}</h5>
        </div>
        <div className="modal-body" style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Row>
            <Form.Group as={Col} controlId="raceName">
              <Form.Label>Race Name</Form.Label>
              <Form.Control
              key='raceName'
              name='raceName' 
              type="text" 
              placeholder="Race name" 
              value={this.state.raceName} 
              onChange={e => this.onChange(e)}/>
            </Form.Group>
  
            <Form.Group as={Col} controlId="raceDate">
              <Form.Label>Race Date</Form.Label>
              <Form.Control
              key='raceDate'
              name='raceDate' 
              type="date" 
              value={this.state.raceDate} 
              onChange={e => this.onChange(e)}/>
            </Form.Group>
          </Form.Row>
  
          <Form.Group controlId="raceDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control 
            name='raceDescription'
            placeholder="Short description about the race..." 
            value={this.state.raceDescription}  
            onChange={e => this.onChange(e)}/>
          </Form.Group>

          <Form.Group controlId="raceContestants">
          <Form.Label>Contestants</Form.Label>
            <Select
            isMulti
            value={this.state.selectedContestants}
            onChange={e => this.onContestantChange(e)}
            options={createContestantLabels(this.state.currentContestants)}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} md='4' controlId="raceTotalLaps">
              <Form.Label>Number of Laps</Form.Label>
              <Form.Control
              name='raceTotalLaps' 
              type="number" 
              placeholder="250" 
              value={this.state.raceTotalLaps} 
              onChange={e => this.onChange(e)}/>
            </Form.Group>
            
            <Form.Group controlId="state">
            <Form.Label>Race State</Form.Label>
            <Form.Control 
            noOptionsMessage='No contestants to choose from...'
            as="select" 
            name="state" 
            value={this.state.state} 
            onChange={e => this.onChange(e)}>
            {
                RACE_STATES.map((state) => 
                <option accessKey={state} value={state}>{state}</option>)
            }
            </Form.Control>
          </Form.Group>
          </Form.Row>
  
          <Button variant="primary" type="submit">
            Confirm
          </Button>
        </Form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={this.props.closeModal}>Close</button>
        </div>
      </div>
  }
}
function createContestantLabels(contestants) {
  let labels = [];
  if (contestants == undefined) 
    return labels;
  contestants.map((contestant) => {
    labels.push({'value':contestant, 'label':contestant.name +' #' + contestant.carNumber})
  })
  return labels;
}


const mapDispatchToProps = (dispatch) => {
  return {
      createRace: (race, contestants) => dispatch(createRace(race, contestants)),
      updateRace: (race, contestants, originalContestants) => dispatch(updateRace(race, contestants, originalContestants))
  }
}

const mapStateToProps = (state) => {
  const contestants = state.firestore.ordered.currentContestants; 
  const selectedContestants = createContestantLabels(state.firestore.ordered.racers)
  return {
    currentContestants: contestants,
    selectedContestants
  }
}


export default compose(
  firestoreConnect((props) => [
    {
      collection:'contestants',
      storeAs:'currentContestants',
    },
    {
      collection:'races',
      doc:props.race ? props.race.id : 'NULL',      
      storeAs:'racers',
      subcollections:[
        {
          collection:'contestants'
        }
      ]
    }
  ]),
  connect(mapStateToProps, mapDispatchToProps),
  
)(CreateRaceModal)



