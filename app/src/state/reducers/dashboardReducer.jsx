const initState = {
}

const dashboardReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATED_POSITION':
            console.log('updated position')
            return state
        case 'UPDATED_POSITION_ERR':    
            console.log("ERROR: " + action.err)
            return state;
        case 'UPDATED_LAP_COUNT':
            console.log('updated lap count')
            return state    
              
        default:
            return state;    
    }
}

export default dashboardReducer