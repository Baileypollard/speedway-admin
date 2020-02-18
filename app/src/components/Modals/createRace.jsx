import React from 'react'
import {Form, Col, Button} from 'react-bootstrap'

const CreateRaceModal = ({ closeModal, title, message }) => {
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">{title}</h5>
      </div>
      <div className="modal-body" style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridRaceName">
            <Form.Label>Race Name</Form.Label>
            <Form.Control type="text" placeholder="Race name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridRaceDate">
            <Form.Label>Race Date</Form.Label>
            <Form.Control type="date"/>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control placeholder="Short description about the race..." />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} md='4' controlId="formGridLapCount">
            <Form.Label>Number of Laps</Form.Label>
            <Form.Control type="number" placeholder="250" />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
      </div>
    </div>
  )
}

export default CreateRaceModal