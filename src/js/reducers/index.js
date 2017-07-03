import { combineReducers } from 'redux'
import voms from './voms.js'
import session from './session.js'

export default combineReducers({
  voms,
  session
})
