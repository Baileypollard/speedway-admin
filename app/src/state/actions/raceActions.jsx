import {getFirestore} from 'redux-firestore'

export const deleteRace = (race) => {

    return (dispatch, getState, {getFirestore}) => 
    {
       const firestore = getFirestore();
       firestore.delete({collection: 'races', doc:race.id}).then(() => {
           dispatch({type:'DELETED_RACE'})
       }).catch((err) => {
           dispatch({type:'DELETED_RACE_ERR', err})
       }) 
    };    
};


export const createRace = (race) => {

    return (dispatch, getState, {getFirestore}) => 
    {
       const firestore = getFirestore();
       firestore.add({collection: 'races', doc:race.id}, race).then(() => {
           dispatch({type:'RACE_ADDED'})
       }).catch((err) => {
           dispatch({type:'ADDED_RACE_ERR', err})
       }) 
    };    
};
