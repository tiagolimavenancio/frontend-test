import { Actions } from 'react-native-router-flux'
import Types from '../types/authTypes'
import Auth from '../../services/Auth'
import Session from '../../services/Session'

export function signIn(email, password, signInSuccess, signInFail) {
    return (dispatch) => {
        dispatch(waiting())
        Auth.signIn(email, password, (success, data, error) => {
            if(success) {
                if(data.exists) dispatch({ type: Types.SIGNED_IN, data })
                signInSuccess(data)
            }else {
                signInFail(error)
            }
            dispatch(done())
        })       
    }
}

export function signOut(signOutSuccess, signOutFail) {
    return (dispatch) => {
        dispatch(waiting())
        Auth.signOut((success, data, error) => {
            if (success) {
                dispatch({
                    type: Types.SIGNED_OUT
                })
                signOutSuccess()
            } else {
                signOutFail(error)
            }
            dispatch(done())
        })
        
    }
}

export function checkSessionStatus(callback) {
    return (dispatch) => {        
        Session.Credential.get('@Token:user').then((response) => {
            if(response) {                
                dispatch({
                    type: Types.SIGNED_IN,
                    data: response
                })
                callback(true)
            }else {
                dispatch({ type: Types.SIGNED_OUT })
                callback(false)
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

