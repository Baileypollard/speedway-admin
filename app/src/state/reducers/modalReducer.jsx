const initialState = {
    modalType: null,
    modalProps: {
      open: false
    }
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'SHOW_MODAL':
        console.log(action.modalProps, action.modalType, action.type)
        return {
          modalProps: action.modalProps,
          modalType: action.modalType,
          type: action.type
        }
      case 'HIDE_MODAL':
        return initialState
      default:
        return state
    }
  }