import {getFirestore} from 'redux-firestore'

export const deleteRace = (race) => {
    console.log(race)
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


export const createRace = (race, contestants) => {
    var contestantArray = Array.prototype.slice.call(contestants);

    return (dispatch, getState, {getFirestore}) => 
    {
       const firestore = getFirestore();
       firestore.set({collection: 'races', doc:race.id}, race)
       .then(() => {
            contestantArray.map((contestant) => {
                var contestantValues = JSON.parse(contestant.value);
                console.log(contestantValues)
                firestore.set({collection:'races', doc:race.id, subcollections:[
                    {
                        collection:'contestants',
                        doc:contestantValues.id,
                    }
                ]}, contestantValues).then(() => {
                        dispatch({type:'RACE_ADDED'})
                    })
                })
       }).catch((err) => {
           dispatch({type:'ADDED_RACE_ERR', err})
       }) 
    };    
};
