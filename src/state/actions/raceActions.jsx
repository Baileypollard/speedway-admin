
export const deleteRace = (race) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.delete({ collection: 'races', doc: race.id }).then(() => {
            dispatch({ type: 'DELETED_RACE' })
        }).catch((err) => {
            dispatch({ type: 'DELETED_RACE_ERR', err })
        })
    };
};

export const updateRace = (race, updatedContestants, originalContestants) => {

    console.log(originalContestants)
    console.log(updatedContestants)

    var deletedContestants = originalContestants.filter(x => !updatedContestants.some(z => JSON.stringify(z) === JSON.stringify(x)));
    var addedContestants = updatedContestants.filter(x => !originalContestants.some(z => JSON.stringify(z) === JSON.stringify(x)));

    console.log(deletedContestants)
    console.log(addedContestants)

    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();



        deletedContestants.map((contestant) => {
            console.log(contestant.value);
            firestore.delete({ collection: 'races', doc: race.id, 
            subcollections:[{collection:'contestants', doc:contestant.value.id}]});
        })

        firestore.set({ collection: 'races', doc: race.id }, race)
            .then(() => {
                addedContestants.map((contestant, index) => {
                    var contestantValues = {
                        lapsCompleted: 0,
                        position: index + 1,
                        id: contestant.value.id,
                        carNumber: contestant.value.carNumber,
                        imageName: contestant.value.imageName,
                        name: contestant.value.name
                    };

                    firestore.set({
                        collection: 'races', doc: race.id, subcollections: [
                            {
                                collection: 'contestants',
                                doc: contestantValues.id,
                            }
                        ]
                    }, contestantValues).then(() => {
                        dispatch({ type: 'RACE_UPDATED' })
                    })
                })
            }).catch((err) => {
                dispatch({ type: 'UPDATE_RACE_ERR', err })
            })
    };
};



export const createRace = (race, contestants) => {
    var contestantArray = Array.prototype.slice.call(contestants);

    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.set({ collection: 'races', doc: race.id }, race)
            .then(() => {
                contestantArray.map((contestant, index) => {

                    var contestantValues = {
                        lapsCompleted: 0,
                        position: index + 1,
                        id: contestant.value.id,
                        carNumber: contestant.value.carNumber,
                        imageName: contestant.value.imageName,
                        name: contestant.value.name
                    };

                    firestore.set({
                        collection: 'races', doc: race.id, subcollections: [
                            {
                                collection: 'contestants',
                                doc: contestantValues.id,
                            }
                        ]
                    }, contestantValues).then(() => {
                        dispatch({ type: 'RACE_ADDED' })
                    })
                })
            }).catch((err) => {
                dispatch({ type: 'ADDED_RACE_ERR', err })
            })
    };
};
