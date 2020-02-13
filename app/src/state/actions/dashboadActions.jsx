export const updatePosition = (project) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        dispatch({type: 'UPDATE_POSITION', project});
        }
};