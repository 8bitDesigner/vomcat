var React = require('../../../node_modules/react/dist/react.min.js')
  , moment = require('../../../node_modules/moment/min/moment.min.js')
  , Calendar = require('./calendar.jsx')
  , request = require('browser-request')

class Vom extends React.Component {
  constructor(...args) {
    super(args)
    this.state = {voms: []}
  }

  get voms()        { return this.state.voms }
  set voms(newVoms) { this.setState({voms: newVoms }) }

  appendVom() {
    request.put('/voms', (err) => {
      this.voms = this.voms.concat([new Date()])
    })
  }

  updateVoms() {
    request({ method: "GET", uri: "/voms", json: true }, (err, req, body) => {
      this.voms = body.map((v) => new Date(v))
    })
  }

  componentDidMount() {
    this.updateVoms()
  }

  render() {
    return (
      <div>
        <Vom.Since lastVom={this.voms[this.voms.length -1]} />
        <Vom.Create onSubmit={this.appendVom.bind(this)} />
        <Vom.Month voms={this.voms} month={moment()}/>
      </div>
    )
  }
}

Vom.Create = class VomCreate extends React.Component {
  render() {
    return (
      <button
        className="btn btn-lg btn-primary btn-block"
        onClick={this.props.onSubmit}
      >"Did cat vom?"</button>
    )
  }
}

Vom.Since = class VomSince extends React.Component {
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

Vom.Month = class VomMonth extends Calendar {
  get voms()       { return this.props.voms.map(v => moment(v)) }

  classNamesFor(date) {
    var classes = super.classNamesFor(date)
    if (this.voms.some(v => v.isSame(date, 'day'))) { classes.push('day-vom') }
    return classes
  }
}

class App {
  constructor() { React.render(<Vom />, document.getElementById('ReactApp')) }
}

new App()