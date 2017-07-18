import React from 'react'
import { connect } from 'react-redux'

import { fetchVoms, createVom } from '../actions/index.js'
import VomSince from '../components/vom-since.jsx'
import VomCreate from '../components/vom-create.jsx'
import VomMonth from '../components/vom-month.jsx'

class VomApp extends React.Component {
  componentDidMount () {
    this.props.dispatch(fetchVoms())
  }

  handleCreate () {
    this.props.dispatch(createVom(Date.now()))
  }

  render () {
    const {voms, lastVom, creatingVom, fetchingVoms} = this.props

    return (
      <div>
        <VomSince loading={fetchingVoms} lastVom={lastVom} />
        <VomCreate onCreate={this.handleCreate.bind(this)} disabled={creatingVom} />
        <VomMonth voms={voms} />
      </div>
    )
  }
}

export default connect(state => state)(VomApp)
