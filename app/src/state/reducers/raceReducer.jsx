const initState = {
}

const raceReducer = (state = initState, action) => {
    switch (action.type) {
        case 'DELETED_RACE':
            console.log('DELETED RACE')
            return state
        case 'DELETED_RACE_ERR':    
            console.log("ERROR: " + action.err)
            return state;
        case 'RACE_ADDED':
            console.log('ADDED RACE')
        case 'ADDED_RACE_ERR':    
            console.log("ERROR: " + action.err)
            return state;    
        default:
            return state;    
    }
}

export default raceReducer