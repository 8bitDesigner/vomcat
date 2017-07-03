import {
  REQUEST_VOM_LIST,
  RECEIVE_VOM_LIST,
  REQUEST_VOM_CREATION,
  RECEIVE_VOM_CREATION
} from '../actions/voms.js'

const initialState = {
  list: [],
  last: null,
  fetching: false,
  creating: false
}

export default function (state = initialState, action) {
  const {list, timestamp} = action

  switch (action.type) {
    case REQUEST_VOM_LIST:
      return {...state, fetching: true}

    case RECEIVE_VOM_LIST:
      return {...state, last: list[list.length - 1], list, fetching: false}

    case REQUEST_VOM_CREATION:
      return {...state, creating: true}

    case RECEIVE_VOM_CREATION:
      return {...state, last: action.timestamp, list: state.list.concat([timestamp]), creating: false}

    default:
      return state
  }
}
