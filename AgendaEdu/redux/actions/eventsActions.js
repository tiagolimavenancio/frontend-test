import * as _ from 'lodash'
import Http from '../../services/Http'
import Types from '../types/eventsTypes'
import events from '../../sample.json'

export function getEvents() {
    return (dispatch) => {         
        dispatch(waiting()) 
        console.log("On Refresh")        
        Http.get(`/events?limit=5&page=1`).then((response) => {  
            var arr = _.chain(response.data.data).map((event) => {                      
                return event 
            }).orderBy('startAt', 'desc').groupBy('startAt').value()                                    
            dispatch({
                type: Types.GET_EVENTS,
                data: arr,
                metadata: response.data.metadata               
            })
            dispatch(done())
        }).catch((error) => {
            dispatch(done())            
            setTimeout(() => { alert(error.message), 1000 })
        })        
    }
}

export function loadMoreEvents(page) {
    return (dispatch) => {        
        dispatch(loading()) 
        console.log("On Load")               
        Http.get(`/events?limit=5&page=${Number(page)+1}`).then((response) => {
            var arr = _.chain(response.data.data).map((event) => {                      
                return event 
            }).orderBy('startAt', 'desc').groupBy('startAt').value()                         
            dispatch({
                type: Types.LOAD_MORE_EVENTS,
                data: arr,
                metadata: response.data.metadata
            })
            dispatch(done())
        }).catch((error) => {
            dispatch(done())            
            setTimeout(() => { alert(error.message), 1000 })
        })
    }
}

export function waiting() {
    return {
        type: Types.WAITING_EVENTS
    }
}

export function loading() {
    return {
        type: Types.LOADING_EVENTS
    }
}

export function done() {
    return {
        type: Types.DONE_EVENTS
    }
}