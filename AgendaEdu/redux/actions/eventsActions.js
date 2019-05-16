import Http from '../../services/Http'
import Types from '../types/eventsTypes'

export function getEvents() {
    return (dispatch) => {
        dispatch(waiting())
        Http.get('/api/events?limit=1;page=1').then((response) => {
            dispatch({
                type: Types.GET_EVENTS,
                data: response.data
            })
            dispatch(done())
        }).catch((error) => {
            dispatch(done())
            setTimeout(() => { alert(error.message), 2000 })
        })
    }
}

export function waiting() {
    return {
        type: Types.WAITING_EVENTS
    }
}

export function done() {
    return {
        type: Types.DONE_EVENTS
    }
}