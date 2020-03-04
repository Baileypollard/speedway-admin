import React, {Component} from 'react'
import {Form, Col, Button} from 'react-bootstrap'
import {createRace, updateRace} from '../../state/actions/raceActions'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {RACE_STATES} from '../../constants/raceStates'
import Select from 'react-select';

class CreateRaceModal extends Component {
  
  race = this.props.race;

  state = {
    currentContestants: [],
    raceName: this.race ? this.props.race.name : '', 
    raceDate: this.race ? this.props.race.date : '', 
    raceTotalLaps: this.race ? this.props.race.totalLaps : '', 
    raceDescription: this.race ? this.props.race.description : '', 
    state: this.race? this.props.race.state : 'INACTIVE',
  }

  handleSubmit(event) {
    event.preventDefault();

    var contestants = event.target.elements.raceContestants.selectedOptions;

    var race = {
      id:'race-' + event.target.elements.raceDate.value,
      name:event.target.elements.raceName.value,
      description:event.target.elements.raceDescription.value,
      totalLaps:event.target.elements.raceTotalLaps.value,
      date:event.target.elements.raceDate.value,
      state:event.target.elements.state.value,
    }

    this.props.createRace(race, contestants);
    this.props.closeModal();
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  };

  createContestantLabels(contestants) {
    let labels = [];
    contestants.map((contestant) => {
      labels.push({'value':contestant, 'label':contestant.name +' #' + contestant.carNumber})
    })

    return labels;
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
              name='raceName' 
              type="text" 
              placeholder="Race name" 
              value={this.state.raceName} 
              onChange={e => this.onChange(e)}/>
            </Form.Group>
  
            <Form.Group as={Col} controlId="raceDate">
              <Form.Label>Race Date</Form.Label>
              <Form.Control
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
            options={this.createContestantLabels(this.state.currentContestants)}
            />
            {/* <Form.Control as="select" multiple>
              {
                this.state.currentContestants.map((contestant) => 
                <option accessKey={contestant.id} value={JSON.stringify(contestant)}>{contestant.name + ' #' + contestant.carNumber}</option>)
              }
            </Form.Control>
            */}
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


const mapDispatchToProps = (dispatch) => {
  return {
      createRace: (race, contestants) => dispatch(createRace(race, contestants)),
      updateRace: (race, contestants) => dispatch(updateRace(race, contestants))
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
  
)(CreateRaceModal)



