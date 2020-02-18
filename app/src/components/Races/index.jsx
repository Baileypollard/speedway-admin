import React, { Component } from "react";
import RacesGrid from './racesGrid'
import '../Styles/races.css'
import {Button} from 'react-bootstrap'
import {createRace} from '../../state/actions/raceActions'
import {connect} from 'react-redux'
import {showModal, hideModal} from '../../state/actions/modalActions'

class RacesPage extends Component {

    render() {
        return <div className="races">
                    <h1>Races</h1>
                    <div className="button">
                        <Button className="ml-auto" 
                        onClick={() => this.openCreateRaceModal(this.props)}>Create Race</Button>
                    </div>
                    <RacesGrid/>
                </div>
    }

    openCreateRaceModal(props) {
        props.showModal({
            open:true,
            title:'Create New Race',
            closeModal: props.hideModal
        }, 'createRace');
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        createRace: (race) => dispatch(createRace(race)),
        showModal: (modalProps, modalType) => dispatch(showModal({modalProps, modalType})),
        hideModal: () => dispatch(hideModal())
    }
}


const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RacesPage);