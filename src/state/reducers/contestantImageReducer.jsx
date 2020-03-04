const initState = {
    contestantImageMap : {}
}

const contestantImageReducer = (state = initState, action) => {
    switch (action.type) {
        case 'IMAGE_URL_FETCHED':
            return {...state,
                contestantImageMap: {...state.contestantImageMap, [action.contestantId] : action.url}
            }
        case 'IMAGE_URL_FETCH_ERR':
            console.log('ERR: ' + action.err)
            return state;              
        default:
            return state;    
    }
}

export default contestantImageReducer