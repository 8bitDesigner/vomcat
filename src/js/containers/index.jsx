import React from 'react'
import { connect } from 'react-redux'

import VomList from '../components/vom-list.jsx'
import FBLoginButton from '../components/fb-login-button.jsx'

class VomApp extends React.Component {
  render () {
    const {voms, session, dispatch} = this.props

    if (session.awsClient) {
      return <VomList dispatch={dispatch} voms={voms} />
    } else {
      return <FBLoginButton dispatch={dispatch} session={session} />
    }
  }
}

export default connect(state => state)(VomApp)
