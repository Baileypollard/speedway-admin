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

export const updateRace = (race, contestants) => {
    var contestantArray = Array.prototype.slice.call(contestants);

    return (dispatch, getState, {getFirestore}) => 
    {
       const firestore = getFirestore();
       firestore.update({collection: 'races', doc:race.id}, race)
       .then(() => {
            contestantArray.map((contestant, index) => {
                var contestantValues = JSON.parse(contestant.value);
                contestantValues['lapsCompleted'] = 0;
                contestantValues['position'] = index + 1;
                
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


export const createRace = (race, contestants) => {
    var contestantArray = Array.prototype.slice.call(contestants);

    return (dispatch, getState, {getFirestore}) => 
    {
       const firestore = getFirestore();
       firestore.set({collection: 'races', doc:race.id}, race)
       .then(() => {
            contestantArray.map((contestant, index) => {
                
                var contestantValues = {
                    lapsCompleted:0,
                    position:index+1,
                    id:contestant.value.id,
                    carNumber:contestant.value.carNumber,
                    imageName:contestant.value.imageName,
                    name:contestant.value.name
                };

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
