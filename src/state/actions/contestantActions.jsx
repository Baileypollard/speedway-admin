import {getFirestore} from 'redux-firestore'

export const deleteContestant = (contestant) => {
    return (dispatch, getState, {getFirestore}) => 
    {
       const firestore = getFirestore();
       firestore.delete({collection: 'contestants', doc:contestant.id}).then(() => {
           dispatch({type:'DELETED_CONTESTANT'})
       }).catch((err) => {
           dispatch({type:'DELETED_CONTESTANT_ERR', err})
       }) 
    };    
};


export const createContestant = (contestant) => {

    return (dispatch, getState, {getFirestore}) => 
    {
       const firestore = getFirestore();
       firestore.set({collection: 'contestants', doc:contestant.id}, contestant)
       .then(() => {
            dispatch({type:'ADDED_CONTESTANT'})

       }).catch((err) => {
           dispatch({type:'ADDED_CONTESTANT_ERR', err})
       }) 
    };    
};
