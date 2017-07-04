export const REQUEST_VOM_LIST = 'REQUEST_VOM_LIST'
export const RECEIVE_VOM_LIST = 'RECEIVE_VOM_LIST'
export const REQUEST_VOM_CREATION = 'REQUEST_VOM_CREATION'
export const RECEIVE_VOM_CREATION = 'RECEIVE_VOM_CREATION'

export const fetchVoms = () => (dispatch, getState) => {
  const client = getState().session.awsClient
  const year = new Date().getFullYear()

  dispatch({type: REQUEST_VOM_LIST})

  client.query({
    ConsistentRead: true,
    ScanIndexForward: false,
    ProjectionExpression: 'vom_date',
    KeyConditionExpression: '#yr = :yyyy',
    ExpressionAttributeNames: { '#yr': 'year' },
    ExpressionAttributeValues: { ':yyyy': year }
  }, function (err, response) {
    if (err) {
      console.error(err)
    } else {
      const timestamps = response.Items.map(i => new Date(i.vom_date)).reverse()
      console.log(timestamps)
      dispatch({ type: RECEIVE_VOM_LIST, list: timestamps })
    }
  })
}

export const createVom = timestamp => (dispatch, getState) => {
  const client = getState().session.awsClient
  const now = new Date().valueOf()
  const year = new Date().getFullYear()

  dispatch({type: REQUEST_VOM_CREATION})

  client.put({
    Item: {
      year: year,
      created_at: now,
      updated_at: now,
      vom_date: timestamp,
      reporter: 'Web Client'
    }
  }, function (err, response) {
    if (err) {
      console.error(err)
    } else {
      dispatch({ type: RECEIVE_VOM_CREATION, timestamp })
    }
  })
}
