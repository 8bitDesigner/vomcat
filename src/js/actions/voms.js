export const REQUEST_VOM_LIST = 'REQUEST_VOM_LIST'
export const RECEIVE_VOM_LIST = 'RECEIVE_VOM_LIST'
export const REQUEST_VOM_CREATION = 'REQUEST_VOM_CREATION'
export const RECEIVE_VOM_CREATION = 'RECEIVE_VOM_CREATION'

export const fetchVoms = () => dispatch => {
  dispatch({type: REQUEST_VOM_LIST})

  return window.fetch(process.env.API, {method: 'GET', mode: 'cors'})
  .then(res => res.json())
  .then(strings => strings.map(s => new Date(s).valueOf()))
  .then(timestamps => dispatch({ type: RECEIVE_VOM_LIST, list: timestamps }))
}

export const createVom = timestamp => dispatch => {
  dispatch({type: REQUEST_VOM_CREATION})

  return window.fetch(process.env.API, {method: 'POST', mode: 'cors'})
  .then(() => dispatch({ type: RECEIVE_VOM_CREATION, timestamp }))
}
