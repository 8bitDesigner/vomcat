var React = require('react')

export default class VomCreate extends React.Component {
  render() {
    return (
      <button
        className="btn btn-lg btn-primary btn-block"
        onClick={this.props.onSubmit}
      >"Did cat vom?"</button>
    )
  }
}

