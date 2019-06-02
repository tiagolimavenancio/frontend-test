import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from '../reducers'

const middleware = [logger, thunk]

export function configureStore() {
    return compose(applyMiddleware(...middleware))(createStore)(reducers)
}

export default {
    instance: null
}