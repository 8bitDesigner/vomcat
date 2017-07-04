import React from 'react'
import moment from 'moment'

export default class VomSince extends React.Component {
  componentDidMount () {
    this.interval = setInterval(this.forceUpdate.bind(this), 60000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  get message () {
    if (this.props.loading) {
      return 'Loading...'
    } else if (this.props.lastVom) {
      return `It has been ${moment(this.props.lastVom).fromNow(true)} since last vom!`
    } else {
      return 'No voms yet, hooray!'
    }
  }

  render () {
    return <h1 className='h4'>{this.message}</h1>
  }
}
