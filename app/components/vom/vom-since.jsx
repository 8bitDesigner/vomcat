var React = require('react')
  , moment = require('moment')

export default class VomSince extends React.Component {
  get lastVom() { return this.props.lastVom }
  get message() {
    if (this.lastVom) {
      return `It has been ${moment(this.lastVom).fromNow(true)} since last vom!`
    } else {
      return `No voms yet, hooray!`
    }
  }

  render() {
    return <h1 className="h4">{this.message}</h1>
  }
}


