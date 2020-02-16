import {getFirestore} from 'redux-firestore'

export const updatePositions = (contestants) => {

    return (dispatch, getState, {getFirestore}) => 
    {
        const firestore = getFirestore();
        const batch = firestore.batch();
        
        contestants.forEach((contestant, index) => {
            const contestantRef = firestore.collection('races')
            .doc('race-2019-01-01')
            .collection('contestants').doc(contestant.id);

            batch.update(contestantRef, {position: index+1, id:contestant.id});
        });

        batch.commit().then(() => {
            dispatch({type:'UPDATED_POSITION', contestants})
        })
    };    
};