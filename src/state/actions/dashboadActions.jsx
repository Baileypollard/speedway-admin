import {getFirestore} from 'redux-firestore'

export const updatePositions = (race, contestants) => {

    return (dispatch, getState, {getFirestore}) => 
    {
        const firestore = getFirestore();
        const batch = firestore.batch();
        
        contestants.forEach((contestant, index) => {
            const contestantRef = firestore.collection('races')
            .doc(race.id)
            .collection('contestants').doc(contestant.id);

            batch.update(contestantRef, {position: index+1, id:contestant.id});
        });

        batch.commit().then(() => {
            dispatch({type:'UPDATED_POSITION', contestants})
        })
    };    
};


export const updateLapCount = (race, contestant, newLapCount) => {

    return (dispatch, getState, {getFirestore}) => 
    {
        const firestore = getFirestore();

        firestore.update({collection:'races', doc:race.id, 
        subcollections:[{collection:'contestants', doc:contestant.id}]}, 
        {lapsCompleted: newLapCount})
        .then(() => {
            dispatch({type:'UPDATED_LAP_COUNT'})
        })
    };    
};

export const startRace = (race) => {
    var d = new Date();
    return (dispatch, getState, {getFirestore}) => 
    {
        const firestore = getFirestore();

        firestore.update({
            collection:'races', 
            doc:race.id,
        }, 
        {
            state: 'STARTED',
            startTime:d.toLocaleString()
        })
        .then(() => {
            dispatch({type:'STARTED_RACE', race})
        }).catch((err) => {

        })
    };    
};

export const endRace = (race) => {
    var d = new Date();

    return (dispatch, getState, {getFirestore}) => 
    {
        const firestore = getFirestore();
        firestore.update({collection:'races', doc:race.id}, 
        {
            state: 'ENDED',
            endTime : d.toLocaleString()
        })
        .then(() => {
            dispatch({type:'ENDED_RACE', race})
        }).catch((err) => {
            
        })
    };    
};

// export const getImageURLForContestants = (contestants) => {
//     return (dispatch, getState) => 
//     {
//         const storageRef = firebase.storage().ref('contestant-images');
//         contestants.forEach((contestant) => {
//             if (contestant.imageName != null) {
//                 console.log('fetching url for ' + contestant.name )
//                 storageRef
//                 .child(contestant.imageName)
//                 .getDownloadURL()
//                 .then((url) => {
//                     var contestantId = contestant.id;
//                     dispatch({type:'IMAGE_URL_FETCHED', contestantId, url})
//                 }).catch((err) => {
//                     console.log(err);
//                 })
//             }
//         })
//     };    
// };
