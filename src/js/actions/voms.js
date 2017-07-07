export const REQUEST_VOM_LIST = 'REQUEST_VOM_LIST'
export const RECEIVE_VOM_LIST = 'RECEIVE_VOM_LIST'
export const REQUEST_VOM_CREATION = 'REQUEST_VOM_CREATION'
export const RECEIVE_VOM_CREATION = 'RECEIVE_VOM_CREATION'

export const fetchVoms = () => (dispatch, getState) => {
  const {awsClient, userID} = getState().session

  dispatch({type: REQUEST_VOM_LIST})

  awsClient.query({
    ConsistentRead: true,
    ScanIndexForward: false,
    ProjectionExpression: 'vom_date',
    KeyConditionExpression: 'user_id = :uid',
    ExpressionAttributeValues: { ':uid': userID }
  }, function (err, response) {
    if (err) {
      console.error(err)
    } else {
      const timestamps = response.Items.map(i => new Date(i.vom_date)).reverse()
      dispatch({ type: RECEIVE_VOM_LIST, list: timestamps })
    }
  })
}

export const createVom = timestamp => (dispatch, getState) => {
  const {awsClient, userID} = getState().session
  const now = new Date().valueOf()

  dispatch({type: REQUEST_VOM_CREATION})

  awsClient.put({
    Item: {
      user_id: userID,
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
