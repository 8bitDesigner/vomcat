var React = require('react')
  , moment = require('moment')
  , VomSince = require('./vom-since')
  , VomCreate = require('./vom-create')
  , VomMonth = require('./vom-month')

export default class Vom extends React.Component {
  constructor(props) {
    super(props)
    this.state = { voms: props.voms.map(v => new Date(v)) }
    if (process.browser) this.model = new (require('../../models/voms'))()
  }

  get voms()        { return this.state.voms }
  set voms(newVoms) { this.setState({voms: newVoms }) }

  appendVom() {
    this.model.create(err => {
      this.voms = this.voms.concat([new Date()])
    })
  }

  render() {
    return (
      <div>
        <VomSince lastVom={this.voms[this.voms.length -1]} />
        <VomCreate onSubmit={this.appendVom.bind(this)} />
        <VomMonth voms={this.voms} month={moment()}/>
      </div>
    )
  }
}
