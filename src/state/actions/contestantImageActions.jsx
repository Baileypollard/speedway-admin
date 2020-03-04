import firebase from '../../components/Firebase/index'


export const getImageURLForContestants = (contestants) => {
    if (contestants === undefined)
        contestants = []

    return (dispatch, getState) => 
    {
        const storageRef = firebase.storage().ref('contestant-images');
        contestants.forEach((contestant) => {
            if (contestant.imageName != null) {
                console.log('fetching url for ' + contestant.name )
                storageRef
                .child(contestant.imageName)
                .getDownloadURL()
                .then((url) => {
                    var contestantId = contestant.id;
                    dispatch({type:'IMAGE_URL_FETCHED', contestantId, url})
                }).catch((err) => {
                    console.log(err);
                })
            }
        })
    };    
};