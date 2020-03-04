const initState = {
}

const contestantReducer = (state = initState, action) => {
    switch (action.type) {
        case 'DELETED_CONTESTANT':
            return state
        case 'DELETED_CONTESTANT_ERR':    
            console.log("ERROR: " + action.err)
            return state;
        case 'ADDED_CONTESTANT':
            return state;
        case 'ADDED_CONTESTANT_ERR':    
            console.log("ERROR: " + action.err)
            return state;    
        default:
            return state;    
    }
}

export default contestantReducer