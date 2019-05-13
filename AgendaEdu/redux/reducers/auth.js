import Types from '../types/authTypes'

const initialState = {
    data: {},
    isWaiting: false
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case Types.SIGNED_IN:
            return { ...state, data: action.data }
        case Types.SIGNED_OUT:
            return state
        case Types.WAITING_AUTH:
            return { ...state, isWaiting: true }
        case Types.DONE_AUTH:
            return { ...state, isWaiting: false }
        default:
            return state
    }
}