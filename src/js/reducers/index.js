import {
  REQUEST_VOM_LIST,
  RECEIVE_VOM_LIST,
  REQUEST_VOM_CREATION,
  RECEIVE_VOM_CREATION
} from '../actions/index.js'

const initialState = {
  voms: [],
  lastVom: null,
  fetchingVoms: false,
  creatingVom: false
}

export default function (state = initialState, action) {
  const {voms, timestamp} = action

  switch (action.type) {
    case REQUEST_VOM_LIST:
      return {...state, fetchingVoms: true}

    case RECEIVE_VOM_LIST:
      return {...state, lastVom: voms[voms.length - 1], voms, fetchingVoms: false}

    case REQUEST_VOM_CREATION:
      return {...state, creatingVom: true}

    case RECEIVE_VOM_CREATION:
      return {...state, lastVom: action.timestamp, voms: state.voms.concat([timestamp]), creatingVom: false}

    default:
      return state
  }
}
