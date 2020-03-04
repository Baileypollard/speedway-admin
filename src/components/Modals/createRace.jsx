import React, {Component} from 'react'
import {Form, Col, Button} from 'react-bootstrap'
import {createRace} from '../../state/actions/raceActions'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

class CreateRaceModal extends Component {
  state = {
    currentContestants: []
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
      state:'INACTIVE',
    }

    this.props.createRace(race, contestants);
    this.props.closeModal();
  }
  render() {
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
              <Form.Control type="text" placeholder="Race name" />
            </Form.Group>
  
            <Form.Group as={Col} controlId="raceDate">
              <Form.Label>Race Date</Form.Label>
              <Form.Control type="date"/>
            </Form.Group>
          </Form.Row>
  
          <Form.Group controlId="raceDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control placeholder="Short description about the race..." />
          </Form.Group>

          <Form.Group controlId="raceContestants">
          <Form.Label>Contestants</Form.Label>
            <Form.Control as="select" multiple>
              {
                this.state.currentContestants.map((contestant) => 
                <option accessKey={contestant.id} value={JSON.stringify(contestant)}>{contestant.name + ' #' + contestant.carNumber}</option>)
              }
            </Form.Control>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} md='4' controlId="raceTotalLaps">
              <Form.Label>Number of Laps</Form.Label>
              <Form.Control type="number" placeholder="250" />
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



