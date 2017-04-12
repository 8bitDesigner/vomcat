import React from 'react'
import moment from 'moment'
import VomSince from './vom-since.jsx'
import VomCreate from './vom-create.jsx'
import VomMonth from './vom-month.jsx'
import VomModel from './../../models/voms.jsx'

export default class Vom extends React.Component {
  constructor (props = {}) {
    super(props)
    this.state = {
      voms: []
    }

    this.model = new VomModel()

    this.model.get((error, dates) => {
      if (error) {
        console.error(error)
      } else {
        this.setState({ voms: dates.map(d => new Date(d)) })
      }
    })
  }

  get voms () {
    return this.state.voms
  }

  set voms (newVoms) {
    this.setState({voms: newVoms})
  }

  appendVom () {
    this.model.create(err => {
      if (!err) { this.voms = this.voms.concat([new Date()]) }
    })
  }

  render () {
    return (
      <div>
        <VomSince lastVom={this.voms[this.voms.length - 1]} />
        <VomCreate onSubmit={this.appendVom.bind(this)} />
        <VomMonth voms={this.voms} month={moment()} />
      </div>
    )
  }
}
