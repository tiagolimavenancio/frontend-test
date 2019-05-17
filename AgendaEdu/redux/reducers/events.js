import * as _ from 'lodash'
import Types from '../types/eventsTypes'

const initialState = {
    data: {},
    metadata: { },
    isWaiting: false,
    isLoading: false,    
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case Types.GET_EVENTS:                     
            return { ...state, data: action.data, metadata: action.metadata }
        case Types.LOAD_MORE_EVENTS:        
            return { ...state, data: _.merge(state.data, action.data), metadata: action.metadata }
        case Types.WAITING_EVENTS:
            return { ...state, isWaiting: true }
        case Types.LOADING_EVENTS:
            return { ...state, isLoading: !state.isLoading }
        case Types.DONE_EVENTS:
            return { ...state, isWaiting: false, isLoading: false }
        default:
            return state
    }
}
