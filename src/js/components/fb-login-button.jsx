import React from 'react'
import load from '../lib/script-loader.js'
import { init, login } from '../actions/session.js'

export default class FBLoginButton extends React.Component {
  componentDidMount () {
    load('//connect.facebook.net/en_US/sdk.js', 'facebook-jssdk')
    .then(FB => this.props.dispatch(init(FB)))
  }

  render () {
    const {session, dispatch} = this.props

    if (session.initing) {
      return null
    } else {
      return <button onClick={() => dispatch(login)} disabled={session.loggingIn}>Login</button>
    }
  }
}
