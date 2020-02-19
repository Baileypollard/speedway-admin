import React, { Component } from "react";
import ContestantGrid from './contestantGrid'
import '../Styles/races.css'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {showModal, hideModal} from '../../state/actions/modalActions'
import {createContestant} from '../../state/actions/contestantActions'
class ContestantsPage extends Component {

    render() {
        return <div className="races">
                    <h1>Contestants</h1>
                    <div className="button">
                        <Button className="ml-auto" 
                        onClick={() => this.openCreateContestantModal(this.props)}>Create Contestant</Button>
                    </div>
                    <ContestantGrid/>
                </div>
    }

    openCreateContestantModal(props) {
        props.showModal({
            open:true,
            title:'Create New Contestant',
            closeModal: props.hideModal
        }, 'createContestant');
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        createContestant: (race) => dispatch(createContestant(race)),
        showModal: (modalProps, modalType) => dispatch(showModal({modalProps, modalType})),
        hideModal: () => dispatch(hideModal())
    }
}


const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContestantsPage);