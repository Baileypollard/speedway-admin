import React from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import  CreateRaceModal  from './createRace'
import '../Styles/modal.css'

const MODAL_TYPES = {
    'createRace': CreateRaceModal,
}

const mapStateToProps = state => ({
  ...state.modal
})

class ModalContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: props.modalProps.open
    }

    this.closeModal = this.closeModal.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.modalProps.open !== this.props.modalProps.open) {
      this.setState({
        modalIsOpen: nextProps.modalProps.open
      })
    }
  }

  closeModal() {
    this.props.modalProps.closeModal()
  }

  render() {
    if (!this.props.modalType) {
      return null
    }

    const SpecifiedModal = MODAL_TYPES[this.props.modalType]
    return (
      <div>
        <ReactModal
          overlayClassName='overlay'
          className="modal-dialog"
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          bodyOpenClassName="modal-open">
       <SpecifiedModal
          closeModal={this.closeModal}
          {...this.props.modalProps}
        />
        </ReactModal>
      </div>
    )}
}

export default connect(mapStateToProps, null)(ModalContainer)