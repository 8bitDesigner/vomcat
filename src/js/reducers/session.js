import {
  FB_INIT_START,
  FB_INIT_COMPLETE,
  FB_LOGIN_START,
  FB_LOGIN_COMPLETE,
  FB_LOGIN_FAILED
} from '../actions/session.js'

const initialState = {
  client: null,
  initing: true,
  loggingIn: false,
  user: null,
  error: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FB_INIT_START:
      return {...state, client: action.client}

    case FB_INIT_COMPLETE:
      return {...state, initing: false, user: action.user}

    case FB_LOGIN_START:
      return {...state, loggingIn: true}

    case FB_LOGIN_COMPLETE:
      return {...state, loggingIn: false, user: action.user}

    case FB_LOGIN_FAILED:
      return {...state, loggingIn: false, error: action.error}

    default:
      return state
  }
}
