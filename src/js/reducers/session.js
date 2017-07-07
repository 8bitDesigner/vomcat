import awsClientFactory from '../lib/aws-client.js'
import {
  FB_INIT_START,
  FB_INIT_COMPLETE,
  FB_LOGIN_START,
  FB_LOGIN_COMPLETE,
  FB_LOGIN_FAILED
} from '../actions/session.js'

const initialState = {
  fbClient: null,
  awsClient: null,
  initing: true,
  loggingIn: false,
  userID: null,
  error: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FB_INIT_START:
      return {...state, fbClient: action.fbClient}

    case FB_INIT_COMPLETE:
      return {...state, initing: false}

    case FB_LOGIN_START:
      return {...state, loggingIn: true, error: null}

    case FB_LOGIN_COMPLETE:
      return {
        ...state,
        loggingIn: false,
        userID: action.userID,
        awsClient: awsClientFactory(action.accessToken, 'vom-users-dev')
      }

    case FB_LOGIN_FAILED:
      return {...state, loggingIn: false, error: action.error}

    default:
      return state
  }
}
