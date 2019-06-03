import Http from './Http'
import Session from './Session'

export default {
    signIn: async (email, password, callback) => {
        await Http.post('/login', {
            email,
            password,
        }).then((response) => {                            
            saveCredential('@AgendaEdu:token', response.data)
            callback(true, response.data, null)
        }).catch((error) => {            
            callback(false, null, error)
        })
    },
    signOut: async (callback) => {
        await Session.Credential.destroy('@AgendaEdu:token')
        .then(() => callback(true, null))
        .catch((error) => callback(false, error))
    }
}

function saveCredential(key, credential) {    
    let { token } = credential
    Session.Credential.set(key, token)
}






