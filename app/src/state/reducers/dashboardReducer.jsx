const initState = {
    activeRace : null,
    contestantImageMap : {}
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
        case 'STARTED_RACE':
            return {...state,
                activeRace: action.startedRace
            };        
        case 'ENDED_RACE':
            return {...state,
                activeRace : null
            }
        case 'IMAGE_URL_FETCHED':
            console.log('url fetched')
            return {...state,
                contestantImageMap: {...state.contestantImageMap, [action.contestantId] : action.url}
            }          
        default:
            return state;    
    }
}

export default dashboardReducer