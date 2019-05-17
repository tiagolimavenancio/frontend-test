import { combineReducers } from 'redux'

//Models
import auth from './auth'
import events from './events'

export default combineReducers({
    auth,
    events    
})