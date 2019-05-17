import * as _ from 'lodash'
import Http from '../../services/Http'
import Types from '../types/eventsTypes'
import events from '../../sample.json'

export function getEvents() {
    dispatch(waiting()) 
    Http.get('/events?limit=1&page=1').then((response) => {
        dispatch({
            type: Types.GET_EVENTS,
            data: response.data
        })
        dispatch(done())
    }).catch((error) => {
        dispatch(done())            
        setTimeout(() => { alert(error.response.data.message), 1000 })
    })
}

export function fakeEvents() {
    let arr = _.chain(events.data).map((event) => {                      
        return event 
    }).orderBy('startAt', 'desc').groupBy('startAt').value()    
    return {
        type: Types.GET_EVENTS,
        data: arr
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