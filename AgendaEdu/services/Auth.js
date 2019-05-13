import Http from './Http'
import Session from './Session'

export default function signIn(email, password, callback) {
    Http.post('/login', {
        email,
        password,
    }).then((response) => {        
        saveCredential('@Token:user', response.data)
        callback(true, response.data, null)
    })
    .catch((error) => callback(false, null, error))
}

export default function signOut(callback) {
    Session.Credential.destroy('@Token:user')
    .then(() => callback(true, null, null))
    .catch((error) => callback(false, null, error))
}

function saveCredential(key, credential) {
    let { token } = credential
    Session.Credential.set(key, token)
}

