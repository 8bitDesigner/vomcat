export const FB_LOGIN_START = 'FB_LOGIN_START'
export const FB_LOGIN_COMPLETE = 'FB_LOGIN_COMPLETE'
export const FB_LOGIN_FAILED = 'FB_LOGIN_FAILED'
export const FB_INIT_START = 'FB_INIT_START'
export const FB_INIT_COMPLETE = 'FB_INIT_COMPLETE'

export const login = (dispatch, getState) => {
  const FB = getState().session.client
  dispatch({type: FB_LOGIN_START})

  FB.login(response => {
    if (response.status === 'connected') {
      dispatch({type: FB_LOGIN_COMPLETE, user: response.authResponse})
    } else {
      dispatch({type: FB_LOGIN_FAILED, status: response.status})
    }
  })
}

export const init = FB => dispatch => {
  FB.init({ appId: process.env.fbAppId, version: 'v2.9' })
  dispatch({type: FB_INIT_START, client: FB})

  FB.getLoginStatus(response => {
    dispatch({type: FB_INIT_COMPLETE, user: response.authResponse})
  })
}
