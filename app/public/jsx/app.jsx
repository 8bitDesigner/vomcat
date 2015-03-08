var React = require('react')
  , Vom = require('./vom')
  , model = require('./app/lib/voms.js')

class App {
  start() {
    if (process.browser) {
      React.render(<Vom />, document.getElementById('ReactApp'))
      console.log(React.renderToString(<Vom model={model} />))
    } else {
      React.renderToString(<Vom model={model} />)
    }
  }
}
