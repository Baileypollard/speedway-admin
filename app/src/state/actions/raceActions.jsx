import {getFirestore} from 'redux-firestore'

export const deleteRace = (race) => {

    return (dispatch, getState, {getFirestore}) => 
    {
       console.log(race)
       const firestore = getFirestore();
       firestore.delete({collection: 'races', doc:race.id}).then(() => {
           dispatch({type:'DELETED_RACE'})
       }).catch((err) => {
           dispatch({type:'DELETED_RACE_ERR', err})
       }) 
    };    
};
