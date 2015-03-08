var React = require('react')
  , VomApp = require('./components/vom/index')

module.exports = class App {
  constructor(voms) {
    this.voms = voms
  }

  start(domNode) {
    if (process.browser) {
      return React.render(<VomApp voms={this.voms} />, domNode)
    } else {
      return React.renderToString(<VomApp voms={this.voms} />)
    }
  }
}

if (process.browser) window.App = module.exports
