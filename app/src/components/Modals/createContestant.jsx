import React, {Component} from 'react'
import {Form, Col, Button} from 'react-bootstrap'
import {createContestant} from '../../state/actions/contestantActions'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

class CreateContestantModal extends Component {

  handleSubmit(event) {
    event.preventDefault();
    var firstName = event.target.elements.firstName.value
    var lastName = event.target.elements.lastName.value
    var carNumber = event.target.elements.carNumber.value

    var contestant = {
      id:carNumber + '-' + firstName + '-' + lastName,
      name:firstName + " " + lastName,
      carNumber:carNumber,
      imageName:event.target.elements.pictureName.value,
    }

    this.props.createContestant(contestant);
    this.props.closeModal();
  }
  render() {
    return <div className="modal-content">
          <div className="modal-header">
          <h5 className="modal-title">{this.props.title}</h5>
        </div>
        <div className="modal-body" style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Row>
            <Form.Group as={Col} controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First name" />
            </Form.Group>
  
            <Form.Group as={Col} controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last name"/>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="carNumber">
              <Form.Label>Car Number</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
  
            <Form.Group as={Col} controlId="pictureName">
              <Form.Label>Photo File Name</Form.Label>
              <Form.Control type="text" placeholder="jeff-gordon.jpg"/>
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
      createContestant: (contestant) => dispatch(createContestant(contestant)),
  }
}

export default compose(connect(null, mapDispatchToProps))(CreateContestantModal)



