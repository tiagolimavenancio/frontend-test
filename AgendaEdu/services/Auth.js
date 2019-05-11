import Http from './Http'
import Session from './Session'


export default {
    signIn: (email, password, callback, fail) => {
        Http.post('/login', {
            email,
            password,
        }).then(responseSuccess.bind(this, callback))
        .catch(responseFail.bind(this, fail))
    },
    signOut: (callback, fail) => {
        Session.Credential.destroy('@Token:user').then(responseSignOutSuccess.bind(this, callback), responseSignOutFail.bind(this, fail))
    },
    configCredentials: configCredentials
}

function responseSuccess(callback, response) {
    configCredentials("@Token:user", response.data)
    return callback(response)
}

function responseFail(fail, error) {
    return fail(error)
}

function responseSignOutSuccess(callback, response) {
    return callback(response)
}

function responseSignOutFail(fail, error) {
    return fail(error)
}

function configCredentials(key, credential) {
    let { token } = credential
    Session.Credential.set(key, token)
}
