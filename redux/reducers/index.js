import { combineReducers } from 'redux'
import { user } from './user'
import { app } from './app'

const rootReducer = combineReducers({
    userState: user,
    appState: app
})

export default rootReducer