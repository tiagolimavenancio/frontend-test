import Types from '../types/authTypes'
import Auth from '../../services/Auth'
import Session from '../../services/Session'

export function requestSignIn(email, password, onSuccess, onFailure) {    
    return (dispatch) => {
        dispatch(waiting())                      
        Auth.signIn(email, password, (success, data, error) => {            
            if(success) {                
                dispatch({ type: Types.SIGNED_IN, data })
                dispatch(done()) 
                onSuccess(data)                
            }else {  
                dispatch(done())              
                onFailure(error)
            }            
        })                  
    }
}

export function checkSessionStatus(callback) {
    return (dispatch) => {   
        dispatch(waiting())     
        Session.Credential.get('@AgendaEdu:token').then((response) => {
            if(response) {                          
                dispatch({ type: Types.SIGNED_IN, data: response })
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

export function requestSignOut(onSuccess, onFailure) {
    return (dispatch) => {
        dispatch(waiting())
        Auth.signOut((success, error) => {
            if (success) {
                dispatch({ type: Types.SIGNED_OUT })
                dispatch(done())
                onSuccess()                
            } else {                
                dispatch(done())
                onFailure(error)
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

