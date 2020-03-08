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
            return state;
        case 'ADDED_RACE_ERR':    
            console.log("ADDED RACE ERROR: " + action.err)
            return state;  
        case 'RACE_UPDATED':
            console.log("UPDATED RACE")
            return state;   
        case 'UPDATE_RACE_ERR':
            console.log("UPDATE RACE ERROR: " + action.err)
            return state;            
        default:
            return state;    
    }
}

export default raceReducer