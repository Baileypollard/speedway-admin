export const showModal = ({ modalProps, modalType }) => dispatch => {
    console.log('showing')
    dispatch({
      type: 'SHOW_MODAL',
      modalProps,
      modalType
    })
  }
  
  export const hideModal = () => dispatch => {
    console.log('hiding')
    dispatch({
      type: 'HIDE_MODAL'
    })
  }