import React from 'react'

import { fetchVoms, createVom } from '../actions/voms.js'
import VomSince from './vom-since.jsx'
import VomCreate from './vom-create.jsx'
import VomMonth from './vom-month.jsx'

export default class VomList extends React.Component {
  componentDidMount () {
    this.props.dispatch(fetchVoms())
  }

  handleCreate () {
    this.props.dispatch(createVom(Date.now()))
  }

  render () {
    const {fetching, last, list, creating} = this.props.voms

    return (
      <div>
        <VomSince loading={fetching} lastVom={last} />
        <VomCreate onCreate={this.handleCreate.bind(this)} disabled={creating} />
        <VomMonth voms={list} />
      </div>
    )
  }
}
