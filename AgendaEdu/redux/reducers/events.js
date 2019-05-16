import Types from '../types/eventsTypes'

const initialState = {
    data: [],
    isWaiting: false    
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case Types.GET_EVENTS:
            return { ...state, data: action.data }
        case Types.WAITING_EVENTS:
            return { ...state, isWaiting: true }
        case Types.DONE_EVENTS:
            return { ...state, isWaiting: false }
        default:
            return state
    }
}
