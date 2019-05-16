import Types from '../types/authTypes'
import Auth from '../../services/Auth'
import Session from '../../services/Session'

export function requestSign(email, password, callback, fail) {    
    return (dispatch) => {
        dispatch(waiting())                      
        Auth.signIn(email, password, (success, data, error) => {            
            if(success) {                
                dispatch({ type: Types.SIGNED_IN, data })
                dispatch(done()) 
                callback(data)                
            }else {  
                dispatch(done())              
                fail(error)
            }            
        })                  
    }
}

export function checkSessionStatus(callback) {
    return (dispatch) => {   
        dispatch(waiting())     
        Session.Credential.get('@Token:user').then((response) => {
            if(response) {                
                dispatch({
                    type: Types.SIGNED_IN,
                    data: response
                })
                dispatch(done())
                callback(true)
            }else {
                dispatch({ type: Types.SIGNED_OUT })
                dispatch(done())
                callback(false)
            }
        })
    }
}

export function requestSignOut(callback, fail) {
    return (dispatch) => {
        dispatch(waiting())
        Auth.signOut((success, error) => {
            if (success) {
                dispatch({ type: Types.SIGNED_OUT })
                dispatch(done())
                callback()                
            } else {
                callback(error)
                dispatch(done())
            }            
        })        
    }
}

export function waiting() {
    return {
        type: Types.WAITING_AUTH
    }
}

export function done() {
    return {
        type: Types.DONE_AUTH
    }
}

